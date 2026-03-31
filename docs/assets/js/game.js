'use strict';
// ════════════════════════════════════════════════════════════════
// game.js — Core game logic: topic/story picking, round start,
//            twists (pre-word + mid-question), cover/word screens,
//            questions phase, voting, tally, reveal, punishment,
//            scoring, match flow, history save/render/clear
// ════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════
// TOPIC / STORY PICKERS
// ════════════════════════════════════════════════════════════════
function pickTopic(pool){
 if(!pool||!pool.length) return TOPICS[0];
 if(pool.length===1) return pool[0];
 let idx,attempts=0;
 do{ idx=Math.floor(Math.random()*pool.length); attempts++; }
 while(attempts<20&&TOPICS.indexOf(pool[idx])===lastTopicIdx);
 lastTopicIdx=TOPICS.indexOf(pool[idx]);
 return pool[idx];
}
function pickStory(){
 if(STORIES.length<=1) return 0;
 let idx,attempts=0;
 do{ idx=Math.floor(Math.random()*STORIES.length); attempts++; }
 while(attempts<20&&idx===lastStoryIdx);
 lastStoryIdx=idx;
 return idx;
}
function assignOutsiderWord(pool,chosenTopic){
 if(outsiderMode==='knows'||gameMode==='story'){ outsiderWord=null; return; }
 if(genreMode==='pick'&&pool.length>1){
  const other=pool.filter(t=>t!==chosenTopic);
  const ot=other[Math.floor(Math.random()*other.length)];
  outsiderWord=ot[lang]?ot[lang][0]:ot.ar[0];
 } else {
  outsiderWord=chosenTopic[lang]?chosenTopic[lang][1]:chosenTopic.ar[1];
 }
}
function getGroupWord(){
 if(gameMode==='story'||!topic) return null;
 return topic[lang]?topic[lang][0]:topic.ar[0];
}
function getOutsiderDisplay(){
 if(outsiderMode==='knows') return T.knewOutsider||'(Knew they were out)';
 if(gameMode==='story') return null;
 return outsiderWord||'—';
}
function generateQuestions(){
 const n=players.length;
 let askers = []; for(let i=0;i<n;i++) askers.push(i);
 let targets = []; for(let i=0;i<n;i++) targets.push(i);
 askers.sort(()=>Math.random()-0.5);
 targets.sort(()=>Math.random()-0.5);
 
 const base=[];
 for(let i=0; i<n; i++){
   let a = askers[i];
   let tIdx = 0;
   while(tIdx < targets.length && targets[tIdx] === a){ tIdx++; }
   if(tIdx >= targets.length){
     let t = targets[0];
     let swappedTarget = base[0].target;
     base[0].target = t;
     base.push({asker: a, target: swappedTarget});
   } else {
     let t = targets[tIdx];
     targets.splice(tIdx, 1);
     base.push({asker: a, target: t});
   }
 }
 
 const bonus=[];
 for(let i=0; i<2; i++){
  let a = Math.floor(Math.random()*n);
  let b = Math.floor(Math.random()*n);
  while(a===b) b = Math.floor(Math.random()*n);
  bonus.push({asker:a, target:b, isBonus:true});
 }
 return [...base,...bonus];
}


// ════════════════════════════════════════════════════════════════
// START GAME
// ════════════════════════════════════════════════════════════════
function startGame(){
 if(!safePlayers()) return;
 if(genreMode==='pick'&&!selectedGenre){ alert(T.labelPickAGenre+'!'); return; }
 playSound('start'); haptic('heavy');

 // NEW: Randomize player order (Who takes word first/last)
 for(let i = players.length - 1; i > 0; i--){
   const j = Math.floor(Math.random() * (i + 1));
   [players[i], players[j]] = [players[j], players[i]];
 }

 // Reset round state
 outsiderIdx=Math.floor(Math.random()*players.length);
 outsiderIdx2=-1;
 if(outsiderCount===2&&players.length>=5){
  let idx2=outsiderIdx;
  let attempts=0;
  while(idx2===outsiderIdx&&attempts<30){ idx2=Math.floor(Math.random()*players.length); attempts++; }
  outsiderIdx2=idx2;
 }
 currentIdx=0; votes={}; currentOpenVoter=0; openVoteOrder=[];
 twistReverseVote=false; twistForcedVoterIdx=-1; twistForcedTargetIdx=-1;
 twistWordSwapped=false; twistSwappedList=[];
 insiderSpyIdx=-1;
 pendingPrivateLetter=null;
 lockedEarlyVotes={};
 trustVoteLocks={};
 activeTwist=null;
 lastFiredTwistId=null;
 lastSpyIdx=-1;
 roundScores={};
 players.forEach(n=>{ roundScores[n]=0; });

 // Pick topic or story
 if(gameMode==='story'||(genreMode==='pick'&&selectedGenre==='story')){
  gameMode='story';
  storyIdx=pickStory();
  topic=null; outsiderWord=null;
 } else {
  let pool=TOPICS;
  if(genreMode==='pick'&&selectedGenre&&selectedGenre!=='story'){
   pool=TOPICS.filter(t=>t.catKey===selectedGenre);
   if(!pool.length) pool=TOPICS;
  }
  topic=pickTopic(pool);
  assignOutsiderWord(pool,topic);
 }

 questions=generateQuestions();
 currentQIdx=0;
 activeTwist=null;
 twistFired=false;
 gameQFired=false;
 roundEventCount=0;

 // Twist budget scales with player count
 targetTwistsCount = 0;
 if(twistsOn){
  const pc = players.length;
  if(pc <= 6)       targetTwistsCount = 1;
  else if(pc <= 10) targetTwistsCount = 2;
  else              targetTwistsCount = 3;
 }

 // Game question fires N times based on player count, at unique random indices
 gameQFireAtQ = -1; // legacy single-slot (unused when schedule is active)
 window.gameQSchedule = [];
 if(gameQOn && gameMode !== 'story' && topic){
  const pc = players.length;
  let gqCount;
  if(pc <= 6)       gqCount = 1;
  else if(pc <= 10) gqCount = 2;
  else              gqCount = 3;
  // Build a pool of valid indices (Q2 onward = index >= 1)
  const pool = [];
  for(let i = 1; i < questions.length; i++) pool.push(i);
  // Pick gqCount unique indices from the pool
  const chosen = [];
  while(chosen.length < gqCount && pool.length > 0){
   const r = Math.floor(Math.random() * pool.length);
   chosen.push(pool.splice(r, 1)[0]);
  }
  chosen.sort((a, b) => a - b);
  window.gameQSchedule = chosen;
 }

 // Schedule twists — guaranteed slots, never clashing with GQ slots
 window.currentTwistSchedule = [];
 if(twistsOn && targetTwistsCount > 0){
  // 30% chance one twist fires pre-word instead of mid-questions
  const preWord = Math.random() < 0.30;
  const midCount = preWord ? targetTwistsCount - 1 : targetTwistsCount;

  // Build mid-question slots avoiding any index already taken by GQ
  const _takenByGQ = window.gameQSchedule.slice();
  const _pool = [];
  for(let i = 1; i < questions.length; i++){
   if(!_takenByGQ.includes(i)) _pool.push(i);
  }
  const _midSlots = [];
  while(_midSlots.length < midCount && _pool.length > 0){
   const r = Math.floor(Math.random() * _pool.length);
   _midSlots.push(_pool.splice(r, 1)[0]);
  }
  _midSlots.sort((a, b) => a - b);
  window.currentTwistSchedule = _midSlots;

  if(preWord){
   try{
    firePreWordTwist();
   } catch(err){
    console.error('pre-word twist failed', err);
    activeTwist=null;
    showCover();
   }
   return;
  }
 }

 showCover();
}

// ════════════════════════════════════════════════════════════════
// TWISTS — each has real enforced mechanics
// ════════════════════════════════════════════════════════════════

// Twists that must fire BEFORE words (affect what players see)
const PRE_WORD_TWISTS=['word_swap','insider_spy','private_letter'];
// Twists that fire MID-QUESTIONS (affect questions or voting)
const MID_Q_TWISTS=['forced_vote','reverse_vote','time_pressure','whisper_round'];

let timePressureTimer=null;
// Dual-outsider support
let outsiderCount=1;   // 1 or 2 — set once per match in options screen
let outsiderIdx2=-1;   // second outsider index (-1 when outsiderCount===1)
function isOutsiderIdx(i){ return i===outsiderIdx||(outsiderCount===2&&i===outsiderIdx2); }
let lastFiredTwistId=null; // tracks last mid-question twist to prevent immediate repeats
let lastSpyIdx=-1;         // tracks last insider_spy recipient to prevent same player twice in a row
let swapCurrentIdx=0;
let earlyVotePlayerIdx=-1;   // forced_vote: who votes early
let earlyVoteResult=-1;     // forced_vote: who they voted for
let reverseVotePlayerIdx=-1; // reverse_vote: who votes early
let reverseVoteResult=-1;    // reverse_vote: who they voted for (insider pick) // tracks which swapped player is currently seeing their word
let lockedEarlyVotes={};     // voterIdx -> { targetIdx, reason: 'forced_vote'|'surrender' }
let trustVoteLocks={};       // voterIdx -> targetIdx (cannot vote this player in final vote)

function showTwistScreen(emoji,title,desc,specificDesc,arOverride){
 const ar=typeof arOverride==='boolean'?arOverride:T.dir==='rtl';
 const banner=document.getElementById('twist-banner-el');
 const details=document.getElementById('twist-details-el');
 if(banner){
  banner.innerHTML=`
   <div class="twist-banner" style="background:linear-gradient(135deg,#1a3a6a,#0d2247);">
    <span class="twist-emoji">${emoji||'🎲'}</span>
    <div class="twist-label">${title||''}</div>
    <div class="twist-text">${desc||''}</div>
   </div>`;
 }
 if(details) details.innerHTML=specificDesc||'';
 const okBtn=document.getElementById('btn-twist-ok');
 if(okBtn){
  okBtn._earlyVoteSkip=false;
  okBtn.style.display='flex';
  okBtn.style.opacity='';
  okBtn.textContent=ar?(T.twistBtnOk||'نبدأ!'):(T.twistBtnOk||'Let\'s go!');
 }
 show('s-twist',true);
}

function firePreWordTwist(){
 const ar=T.dir==='rtl';
 const avail=PRE_WORD_TWISTS.filter(id=>{
  if(gameMode==='story'||!topic){
   // Story mode has no word-pair logic, so skip pre-word twists safely.
   return false;
  }
  if(id==='word_swap'&&players.length<3) return false;
  if(id==='insider_spy'&&players.length<3) return false;
  if(id==='private_letter'&&players.length<2) return false;
  return true;
 });
 if(!avail.length){ activeTwist=null; showCover(); return; }
 const id=avail[Math.floor(Math.random()*avail.length)];
 activeTwist={id};

 if(id==='word_swap'){
  let a=Math.floor(Math.random()*players.length);
  let b=a;
  while(b===a) b=Math.floor(Math.random()*players.length);
  twistSwappedList=[a,b];
  twistWordSwapped=true;
  swapCurrentIdx=0;
  _ensureSwapWords();
  const wordA=(isOutsiderIdx(a)?(outsiderWord||'—'):(getGroupWord()||'—'));
  const wordB=(isOutsiderIdx(b)?(outsiderWord||'—'):(getGroupWord()||'—'));
  twistSwapWords=[wordB,wordA];
  activeTwist.swapDone=false;
  activeTwist.swapA=a;
  activeTwist.swapB=b;
  showTwistScreen(
   '🔄',
   ar?'تبديل كلمات سري':'Secret Word Swap',
   ar?`${players[a]} و ${players[b]} يتبادلون الكلمات بعد أول لفتين.`
     :`${players[a]} and ${players[b]} will swap words after the first two reveals.`,
   `<div style="background:rgba(255,165,0,.1);border:2px solid var(--orange);border-radius:12px;padding:14px;margin-top:12px;text-align:center;font-size:14px;font-weight:700;color:var(--orange);">
    🔄 ${ar?'انتظروا بداية الجولة ثم يحصل التبديل سرياً':'The swap will trigger privately once the round starts'}
   </div>`,
   ar
  );
  return;
 }

 if(id==='insider_spy'){
  const insiders=players.map((_,i)=>i).filter(i=>!isOutsiderIdx(i));
  if(!insiders.length){ activeTwist=null; showCover(); return; }
  // Exclude last spy recipient when pool allows, so same player never gets intel twice in a row
  const spyPool=insiders.length>1?insiders.filter(i=>i!==lastSpyIdx):insiders;
  insiderSpyIdx=spyPool[Math.floor(Math.random()*spyPool.length)];
  lastSpyIdx=insiderSpyIdx;
  showTwistScreen(
   '🕵️',
   ar?'عميل سري':'Secret Agent',
   ar?'لاعب واحد سيحصل على معلومات سرية عند رؤية كلمته — لكن بسرية تامة.'
     :'One player will receive secret intel on their private word screen — privately.',
   `<div style="background:rgba(155,93,229,.1);border:2px solid var(--purple);border-radius:12px;padding:14px;margin-top:12px;text-align:center;font-size:14px;font-weight:700;color:var(--purple);">
    🕵️ ${ar?'المعلومة ستظهر لشخص واحد فقط — بدون ما أحد يعرف مين':'Only one player will see this — no one else knows who'}
   </div>`,
   ar
  );
  return;
 }

 if(id==='private_letter'){
  const receiver=Math.floor(Math.random()*players.length);
  let target=receiver;
  while(target===receiver) target=Math.floor(Math.random()*players.length);
  const word=isOutsiderIdx(target)?(outsiderWord||'-'):(getGroupWord()||'-');
  pendingPrivateLetter={receiver,target,letter:(word[0]||'?'),shown:false};
  activeTwist.id='private_letter_preword';
  showTwistScreen(
   '🤫',
   ar?'حرف سري خاص':'Private Secret Letter',
   ar?'لاعب واحد سيستلم حرفاً سرياً خلال شاشة كلمته الخاصة — بسرية تامة.'
     :'One player will receive a private secret letter during their word reveal — privately.',
   `<div style="background:rgba(59,143,255,.1);border:2px solid var(--blue);border-radius:12px;padding:14px;margin-top:12px;text-align:center;font-size:14px;font-weight:700;color:var(--blue);">
    🤫 ${ar?'المعلومة ستظهر لشخص واحد فقط — بدون ما أحد يعرف مين':'Only one player will see this — no one else knows who'}
   </div>`,
   ar
  );
  return;
 }

 activeTwist=null;
 showCover();
}

function fireRandomTwist(){
 const ar=T.dir==='rtl';
 let midAvail=[
  'forced_vote','reverse_vote','time_pressure','whisper_round',
  'surrender','word_swap_mid',
 ].filter(id=>{
  if(id==='surrender'&&players.length<3) return false;
  if(id==='word_swap_mid'&&(gameMode==='story'||!topic)) return false;
  // forced_vote and surrender only allowed after Q1 is done
  if((id==='forced_vote'||id==='surrender')&&currentQIdx<1) return false;
  return true;
 });
 if(!midAvail.length){ renderSpotlightQ(); return; }

 // Exclude the last fired twist to prevent back-to-back repeats,
 // but only when the remaining pool has more than one option.
 const withoutLast=midAvail.filter(x=>x!==lastFiredTwistId);
 if(withoutLast.length>0) midAvail=withoutLast;

 // reverse_vote only allowed at 50%+ progress — filter it out if too early
 if(currentQIdx<Math.floor(questions.length*0.5)){
  const noReverse=midAvail.filter(x=>x!=='reverse_vote');
  if(noReverse.length>0) midAvail=noReverse;
 }

 if(!midAvail.length){ renderSpotlightQ(); return; }
 const id=midAvail[Math.floor(Math.random()*midAvail.length)];
 activeTwist={id};
 lastFiredTwistId=id;

 let emoji='', title='', desc='', specificDesc='';

 if(id==='forced_vote'){
  emoji='🗳️';
  title=ar?'صوّت الآن!':'Vote Right Now!';
  earlyVotePlayerIdx=Math.floor(Math.random()*players.length);
  earlyVoteResult=-1;
  desc=ar
   ?`${players[earlyVotePlayerIdx]} — صوّت الحين على مين تشك إنه الخارج! الأسئلة تكمل بعدين.`
   :`${players[earlyVotePlayerIdx]} — vote RIGHT NOW on who you think is the Outsider! Questions continue after.`;
  specificDesc=`<div style="background:rgba(255,165,0,.12);border:2px solid var(--orange);border-radius:12px;padding:14px;margin-top:12px;text-align:center;">
   <div style="font-size:36px;margin-bottom:6px;">${AVATARS[earlyVotePlayerIdx%AVATARS.length]}</div>
   <div style="font-size:22px;font-weight:900;">${players[earlyVotePlayerIdx]}</div>
   <div style="font-size:12px;color:var(--orange);font-weight:700;margin-top:4px;">${ar?'يختار الآن — ثم تكمل الأسئلة':'chooses now — then questions continue'}</div>
  </div>`;

 } else if(id==='reverse_vote'){
  emoji='🔃';
  title=ar?'صوّت للداخل الآن!':'Vote for an Insider Now!';
  reverseVotePlayerIdx=Math.floor(Math.random()*players.length);
  reverseVoteResult=-1;
  desc=ar
   ?`${players[reverseVotePlayerIdx]} — مين تثق إنه داخل اللعبة؟ صوّت الحين — الكل يشوف اختيارك، وما تقدر تصوّت ضده بالتصويت النهائي!`
   :`${players[reverseVotePlayerIdx]} — who do you trust is an Insider? Vote NOW — everyone sees your pick, and you cannot vote against this same player in the final vote!`;
  specificDesc=`<div style="background:rgba(59,143,255,.1);border:2px solid var(--blue);border-radius:12px;padding:14px;margin-top:12px;text-align:center;">
   <div style="font-size:36px;margin-bottom:6px;">${AVATARS[reverseVotePlayerIdx%AVATARS.length]}</div>
   <div style="font-size:22px;font-weight:900;">${players[reverseVotePlayerIdx]}</div>
   <div style="font-size:12px;color:var(--blue);font-weight:700;margin-top:4px;">${ar?'الكل يشوف اختياره — وما يقدر يصوّت ضد نفس الشخص بالنهاية!':'everyone sees their pick — and they cannot vote against the same player at the end!'}</div>
  </div>`;

 } else if(id==='time_pressure'){
  emoji='⏱️';
  title=ar?'ضغط الوقت!':'Time Pressure!';
  desc=ar?'كل لاعب عنده 10 ثواني فقط يجاوب — المؤقت يبدأ مع كل سؤال. إذا انتهى الوقت ينتقل تلقائياً.':'Each player has 10 seconds to answer — the timer starts with each question. Time runs out = auto-skip.';
  specificDesc=`<div style="background:rgba(255,59,92,.08);border:2px solid #ffb3c0;border-radius:12px;padding:14px;margin-top:12px;text-align:center;font-size:13px;font-weight:700;color:var(--red);">⏱️ ${ar?'مؤقت 10 ثواني على كل سؤال باقي':'10-second countdown on every remaining question'}</div>`;

 } else if(id==='whisper_round'){
  emoji='🤫';
  title=ar?'جولة الهمس!':'Whisper Round!';
  desc=ar?'بقية الأسئلة لازم تُجاب بالهمس — الجماعة تراقب. زر "تم" سيتغير للتأكيد.':'Remaining answers must be whispered — the group watches. Done button changes to confirm.';
  specificDesc=`<div style="background:rgba(59,143,255,.08);border:2px solid #b3c6ff;border-radius:12px;padding:14px;margin-top:12px;text-align:center;font-size:13px;font-weight:700;color:var(--blue);">🤫 ${ar?'الزر سيصبح "همسنا ✓" لتأكيد الهمس':'Button will change to "Whispered ✓" to confirm'}</div>`;

 } else if(id==='surrender'){
  // Pick player weighted by score (higher score = higher chance, but not 100% top)
  emoji='🏳️';
  title=ar?'لاعب يستسلم!':'Player Surrenders!';
  const sorted=Object.entries(matchScores).sort((a,b)=>b[1]-a[1]);
  // Weights: rank 1 = 50%, rank 2 = 25%, rest split remaining
  const weights=players.map((_,i)=>{
   const rank=sorted.findIndex(([n])=>n===players[i]);
   if(rank===0) return 50;
   if(rank===1) return 25;
   const rest=25/(Math.max(1,players.length-2));
   return rest;
  });
  const total=weights.reduce((a,b)=>a+b,0);
  let r=Math.random()*total, surrenderIdx=0;
  for(let i=0;i<weights.length;i++){ r-=weights[i]; if(r<=0){surrenderIdx=i;break;} }
  activeTwist.surrenderIdx=surrenderIdx;
  desc=ar
   ?`${players[surrenderIdx]} — يستسلم هاللعبة! يعلن رأيه الحين ويخسر حق التصويت.`
   :`${players[surrenderIdx]} — surrenders this round! They declare their opinion now and lose voting rights.`;
  specificDesc=`<div style="background:rgba(255,59,92,.08);border:2px solid #ffc5d0;border-radius:12px;padding:14px;margin-top:12px;text-align:center;">
   <div style="font-size:36px;margin-bottom:6px;">${AVATARS[surrenderIdx%AVATARS.length]}</div>
   <div style="font-size:22px;font-weight:900;">${players[surrenderIdx]}</div>
   <div style="font-size:12px;color:var(--red);font-weight:700;margin-top:4px;">${ar?'يستسلم — يصوت الآن ويخسر حق التصويت النهائي':'surrenders — votes now, loses final vote'}</div>
  </div>`;
  // Re-use forced_vote mechanism: this player votes now and is excluded from final vote
  earlyVotePlayerIdx=surrenderIdx;
  earlyVoteResult=-1;
  activeTwist.id='surrender'; // keep as surrender for exclude logic

 } else if(id==='word_swap_mid'){
  // Two specific players swap words mid-game — shown publicly, both then answer differently
  emoji='🔄';
  title=ar?'تبادل كلمات الآن!':'Word Swap Now!';
  const a=Math.floor(Math.random()*players.length);
  let b=a; while(b===a) b=Math.floor(Math.random()*players.length);
  activeTwist.swapA=a; activeTwist.swapB=b;
  // Actually swap their concepts: tell the group both players switch
  desc=ar
   ?`${players[a]} و ${players[b]} — كلمتكم اتبدلت! كل واحد يتظاهر بكلمة الثاني.`
   :`${players[a]} and ${players[b]} — your words are swapped! Each pretends to have the other word.`;
  specificDesc=`<div style="background:rgba(255,165,0,.1);border:2px solid var(--orange);border-radius:12px;padding:14px;margin-top:12px;text-align:center;font-size:14px;font-weight:700;color:var(--orange);">
   🔄 ${ar?'يتظاهران بكلمة الثاني من الآن':'They pretend to have each others word from now on'}
  </div>`;

 } else if(id==='reveal_letter'){
  // A specific player must say the first letter of their word out loud
  emoji='🔤';
  title=ar?'اكشف الحرف الأول!':'Reveal First Letter!';
  const pIdx=Math.floor(Math.random()*players.length);
  activeTwist.revealPlayerIdx=pIdx;
  const word=isOutsiderIdx(pIdx)?outsiderWord||'—':getGroupWord()||'—';
  const letter=word[0]||'?';
  activeTwist.revealLetter=letter;
  desc=ar
   ?`${players[pIdx]} — لازم تقول الحرف الأول من كلمتك أمام الكل الحين!`
   :`${players[pIdx]} — must say the FIRST LETTER of their word out loud right now!`;
  specificDesc=`<div style="background:rgba(155,93,229,.1);border:2px solid var(--purple);border-radius:12px;padding:16px;margin-top:12px;text-align:center;">
   <div style="font-size:36px;margin-bottom:6px;">${AVATARS[pIdx%AVATARS.length]}</div>
   <div style="font-size:22px;font-weight:900;">${players[pIdx]}</div>
   <div style="font-size:13px;color:var(--purple);margin-top:6px;">${ar?'يقول الحرف الأول من كلمته أمام الكل':'says the first letter of their word out loud'}</div>
   <div style="font-size:42px;font-weight:900;color:var(--purple);margin-top:10px;letter-spacing:4px;">${letter}</div>
   <div style="font-size:11px;color:var(--muted);margin-top:6px;">${ar?'(الكل يشوف هالشاشة — الخارج يتظاهر بحرفه)':'(everyone sees this — the Outsider must bluff their letter)'}</div>
  </div>`;

 } else if(id==='private_letter'){
  const receiver=Math.floor(Math.random()*players.length);
  let target=receiver; while(target===receiver) target=Math.floor(Math.random()*players.length);
  const word=isOutsiderIdx(target)?outsiderWord||'-':getGroupWord()||'-';
  pendingPrivateLetter={receiver,target,letter:(word[0]||'?'),shown:false};
  activeTwist.id='private_letter_preword';
  showTwistScreen(
   '🤫',
   ar?'حرف سري مجدول!':'Scheduled Secret Letter!',
   ar?'لاعب واحد سيستلم حرفاً سرياً خلال شاشة كلمته الخاصة — بسرية تامة.'
     :'One player will receive a secret letter during their private word reveal — privately.',
   `<div style="background:rgba(59,143,255,.1);border:2px solid var(--blue);border-radius:12px;padding:14px;margin-top:12px;text-align:center;font-size:14px;font-weight:700;color:var(--blue);">
    🤫 ${ar?'المعلومة ستظهر لشخص واحد فقط — بدون ما أحد يعرف مين':'Only one player will see this — no one else knows who'}
   </div>`,
   ar
  );
  consumeEvent();
  return;
 }
 
 showTwistScreen(emoji,title,desc,specificDesc,ar);
 consumeEvent();
}

function executeTwistAndContinue(){
 haptic('medium'); playSound('start');

 // ── Game Question return (fires regardless of whether a twist is active) ──
 // Safety: if OK button was shown as an early-vote skip fallback, handle it
 const _okBtnRef=document.getElementById('btn-twist-ok');
 if(_okBtnRef&&_okBtnRef._earlyVoteSkip){
  _okBtnRef._earlyVoteSkip=false;
  _okBtnRef.style.opacity='';
  activeTwist=null;
  renderSpotlightQ();
  show('s-questions');
  return;
 }
 if(gameQuestionActive){
  gameQuestionActive=false;
  _timerPaused=false;
  renderSpotlightQ();
  if(activeTwist&&activeTwist.id==='time_pressure'){
   _timerSecsLeft=10;
   startTimerCountdown();
  }
  show('s-questions');
  return;
 }

 if(!activeTwist){ renderSpotlightQ(); show('s-questions'); return; }
 const id=activeTwist.id;
 if(id==='_done_private_letter'){ activeTwist=null; renderSpotlightQ(); show('s-questions'); return; }

 if(id==='word_swap'||id==='insider_spy'){
  // Start normal cover flow — swap reveal will fire after first 2 players have seen their words
  showCover();
 } else if(id==='private_letter_preword'){
  activeTwist=null;
  showCover();
 } else if(id==='forced_vote'||id==='surrender'){
  showEarlyVoteScreen('forced_vote');
 } else if(id==='reverse_vote'){
  showEarlyVoteScreen('reverse_vote');
 } else if(id==='private_letter'){
  showPrivateLetterScreen();
 } else {
  // time_pressure, whisper_round, word_swap_mid, reveal_letter: return to questions
  renderSpotlightQ();
  show('s-questions');
 }
}

// ── Early Vote Screen (forced_vote and reverse_vote) ─────────
function showEarlyVoteScreen(type){
 const ar=T.dir==='rtl';
 const voterIdx=type==='forced_vote'?earlyVotePlayerIdx:reverseVotePlayerIdx;
 const voterName=players[voterIdx];
 const isInsiderVote=type==='reverse_vote';

 // Build candidate list — everyone except the voter
 const candidates=players.map((name,i)=>{
  if(i===voterIdx) return '';
  return `<div class="vote-option" id="ev-opt-${i}" onclick="submitEarlyVote('${type}',${i})">
   <span class="check" id="ev-chk-${i}"></span>
   <span>${AVATARS[i%AVATARS.length]} ${name}</span>
  </div>`;
 }).join('');

 document.getElementById('twist-banner-el').innerHTML=`
  <div class="twist-banner" style="background:linear-gradient(135deg,${isInsiderVote?'#0d2247,#1a3a6a':'#7a3000,#b34a00'});">
   <span class="twist-emoji">${isInsiderVote?'🔃':'🗳️'}</span>
   <div class="twist-label">${ar?'صوّت الآن!':'Vote Now!'}</div>
   <div class="twist-text">${ar?isInsiderVote?`${voterName} — مين تثق فيه؟ (ما تقدر تصوّت ضده بالنهاية)`:`${voterName} — مين الخارج؟`:isInsiderVote?`${voterName} — who do you trust? (You cannot vote against this player later)`:`${voterName} — who is the Outsider?`}</div>
  </div>`;

 document.getElementById('twist-details-el').innerHTML=`
  <div class="card" style="padding:16px;">
   <div style="font-size:13px;color:var(--muted);text-align:center;margin-bottom:12px;">
    ${ar?isInsiderVote?'اختر الشخص اللي تثق إنه داخل اللعبة (مو الخارج)':'اختر الشخص اللي تشك إنه الخارج':'Pick the person you ${isInsiderVote?"trust is an Insider":"think is the Outsider"}'}
   </div>
   <div class="vote-select">${candidates}</div>
   ${isInsiderVote?`<div style="margin-top:10px;font-size:12px;font-weight:700;text-align:center;color:var(--blue);">${ar?'⚠️ تذكير: اللاعب اللي تثق فيه الآن، ما تقدر تصوّت ضده في التصويت النهائي':'⚠️ Reminder: You cannot vote against this trusted player in the final vote.'}</div>`:''}
  </div>`;

 // All vote types must vote — no skip allowed for any of them.
 const okBtn=document.getElementById('btn-twist-ok');
 if(okBtn){
  okBtn.style.display='none';
  okBtn._earlyVoteSkip=false;
 }
 show('s-twist',true);
}

function submitEarlyVote(type,targetIdx){
 const ar=T.dir==='rtl';
 // Mark selection
 document.querySelectorAll('[id^="ev-opt-"]').forEach(el=>{
  el.style.pointerEvents='none';
  el.style.opacity='0.5';
 });
 const selEl=document.getElementById('ev-opt-'+targetIdx);
 if(selEl){ selEl.classList.add('selected'); selEl.style.opacity='1'; }
 const chkEl=document.getElementById('ev-chk-'+targetIdx);
 if(chkEl) chkEl.textContent='✓';

 if(type==='forced_vote'){
  earlyVoteResult=targetIdx;
  if(earlyVotePlayerIdx>=0){
   const reason=(activeTwist&&activeTwist.id==='surrender')?'surrender':'forced_vote';
   lockedEarlyVotes[earlyVotePlayerIdx]={targetIdx,reason};
  }
 } else {
  reverseVoteResult=targetIdx;
  if(reverseVotePlayerIdx>=0){
   trustVoteLocks[reverseVotePlayerIdx]=targetIdx;
  }
 }

 playSound('vote'); haptic('heavy');

 // After 1.5s, clear the twist and return directly to questions
 setTimeout(()=>{
  activeTwist=null; // CRITICAL: clear so executeTwistAndContinue won't loop
  // Restore OK button state for future use
  const _okBtn=document.getElementById('btn-twist-ok');
  if(_okBtn){ _okBtn.style.display='flex'; _okBtn.style.opacity=''; _okBtn._earlyVoteSkip=false; }
  renderSpotlightQ();
  show('s-questions');
 },1500);
}

function showPrivateLetterScreen(){
 if(!activeTwist||!activeTwist.privateReceiver&&activeTwist.privateReceiver!==0){ renderSpotlightQ(); show('s-questions'); return; }
 const ar=T.dir==='rtl';
 const receiver=activeTwist.privateReceiver;
 const target=activeTwist.privateTarget;
 const letter=activeTwist.privateLetter||'?';

 document.getElementById('twist-banner-el').innerHTML=`
  <div class="twist-banner" style="background:linear-gradient(135deg,#1a3a6a,#0d2247);">
   <span class="twist-emoji">🤫</span>
   <div class="twist-label">${ar?'حرف سري':'Secret Letter'}</div>
   <div class="twist-text">${ar?`${players[receiver]} — معلومة سرية!`:`${players[receiver]} — secret info!`}</div>
  </div>`;
 document.getElementById('twist-details-el').innerHTML=`
  <div class="card" style="padding:18px;text-align:center;">
   <div style="font-size:13px;color:var(--muted);margin-bottom:12px;">${ar?'سلّم التلفون لـ '+players[receiver]+' — الكل يبعد عيونه!':'Pass phone to '+players[receiver]+' — everyone look away!'}</div>
   <div style="background:var(--s2);border-radius:12px;padding:16px;margin-bottom:12px;">
    <div style="font-size:13px;font-weight:700;color:var(--blue);margin-bottom:6px;">${ar?'الحرف الأول من كلمة '+players[target]+':':'First letter of '+players[target]+'s word:'}</div>
    <div style="font-size:52px;font-weight:900;color:var(--blue);letter-spacing:6px;">${letter}</div>
   </div>
   <div style="font-size:12px;color:var(--muted);">${ar?'لا تخبر أحد — استخدمها لصالحك!':'Tell no one — use this to your advantage!'}</div>
  </div>`;
 const okBtn=document.getElementById('btn-twist-ok');
 if(okBtn){ okBtn.style.display='flex'; okBtn.textContent=ar?'✅ حفظت — نكمل':'✅ Got it — Continue'; }
 // Override: this OK button should return to questions
 activeTwist.id='_done_private_letter';
 show('s-twist',true);
}

// ── Word Swap Private Flow ─────────────────────────────────────
let twistSwapWords=[]; // new words for each swapped player (module-level — must stay here)
// Safety: ensure twistSwapWords is always an array even if reassigned elsewhere
function _ensureSwapWords(){ if(!Array.isArray(twistSwapWords)) twistSwapWords=[]; }

function showNextSwapCover(){
 _ensureSwapWords();
 if(swapCurrentIdx>=twistSwappedList.length){
  // All swapped players have seen their new word — resume normal cover flow
  // Safety: ensure we don't re-enter swap
  if(activeTwist&&activeTwist.id==='word_swap') activeTwist.swapDone=true;
  if(currentIdx<players.length) showCover();
  else showQuestionsPhase();
  return;
 }
 const playerIdx=twistSwappedList[swapCurrentIdx];
 const otherIdx=swapCurrentIdx===0?twistSwappedList[1]:twistSwappedList[0];
 const name=players[playerIdx];
 const otherName=players[otherIdx];
 const av=AVATARS[playerIdx%AVATARS.length];
 const ar=T.dir==='rtl';
 const dotsEl=document.getElementById('swap-dots');
 if(dotsEl) dotsEl.innerHTML=twistSwappedList.map((_,i)=>{
  let c='dot';
  if(i<swapCurrentIdx) c+=' done';
  if(i===swapCurrentIdx) c+=' active';
  return `<div class="${c}"></div>`;
 }).join('');
 document.getElementById('swap-avatar').textContent=av;
 document.getElementById('swap-name').textContent=name;
 document.getElementById('swap-sub').textContent=
  ar?`سلّم التلفون لـ ${name} — بيستلم كلمة ${otherName} 🔄 الباقين يبعدون عيونهم!`
    :`Pass phone to ${name} — they receive ${otherName}'s word 🔄 everyone else look away!`;
 document.getElementById('swap-warning').textContent=ar?'⚠️ الكلمة اللي بتشوفها سرية!':'⚠️ The word you see is secret!';
 const showBtn=document.getElementById('btn-show-swap');
 if(showBtn) showBtn.textContent=ar?`👁️ استلم كلمة ${otherName}`:`👁️ Receive ${otherName}'s word`;
 show('s-swap-reveal');
}

function showSwapWord(){
 const playerIdx=twistSwappedList[swapCurrentIdx];
 const otherIdx=swapCurrentIdx===0?twistSwappedList[1]:twistSwappedList[0];
 const otherName=players[otherIdx];
 const receivedWord=twistSwapWords[swapCurrentIdx]||'—';
 const ar=T.dir==='rtl';
 const inner=document.getElementById('swap-word-inner');
 if(inner) inner.innerHTML=`
  <div style="text-align:center;padding:0 8px;">
   <div style="font-size:13px;font-weight:700;color:var(--orange);margin-bottom:18px;background:rgba(255,165,0,.1);border:1.5px solid var(--orange);border-radius:30px;padding:7px 16px;display:inline-block;">
    🔄 ${ar?'تبادل الكلمات':'Word Swap'}
   </div>
   <div style="font-size:14px;color:var(--muted);margin-bottom:8px;">
    ${ar?`تستلم الكلمة من ${otherName}:`:`You receive the word from ${otherName}:`}
   </div>
   <div style="font-size:15px;font-weight:700;color:var(--muted);margin-bottom:6px;">
    ${ar?`${otherName} 🤝 أنت`:`${otherName} 🤝 You`}
   </div>
   <div class="word-huge" style="margin:18px 0;">${receivedWord}</div>
   <div class="word-hint">${ar?'هذي كلمتك الجديدة — احفظها وتظاهر فيها أمام الجماعة':'This is your new word — memorize it and bluff with it in front of the group'}</div>
  </div>`;
 playSound('word'); haptic('heavy');
 show('s-swap-word');
}

function nextSwapPlayer(){
 playSound('tap'); haptic('light');
 swapCurrentIdx++;
 showNextSwapCover();
}

// ════════════════════════════════════════════════════════════════
// COVER + WORD SCREENS
// ════════════════════════════════════════════════════════════════
function updateDots(){
 const d=document.getElementById('prog-dots');
 if(!d) return;
 d.innerHTML=players.map((_,i)=>{
  let c='dot';
  if(i<currentIdx) c+=' done';
  if(i===currentIdx) c+=' active';
  return `<div class="${c}"></div>`;
 }).join('');
}

function showCover(){
 if(!safePlayers()) return;
 updateDots();
 const av=AVATARS[currentIdx%AVATARS.length];
 const name=players[currentIdx]||'?';
 document.getElementById('cover-avatar').textContent=av;
 document.getElementById('cover-name').textContent=name;
 document.getElementById('cover-name2').textContent=name;
 document.getElementById('cover-pass-text').textContent=T.coverPassText;
 document.getElementById('cover-eyes-text').textContent=T.coverEyesText;
 document.getElementById('cover-warning').textContent=T.coverWarning;
 show('s-cover');
}

function showWord(){
 playSound('word'); haptic('heavy');
 const isOutsider=isOutsiderIdx(currentIdx);
 const isSwapped=twistWordSwapped&&twistSwappedList.includes(currentIdx)&&!isOutsider;
 const wrap=document.getElementById('word-wrap-inner');

 if(gameMode==='story'){
  const si=storyIdx>=0&&storyIdx<STORIES.length?storyIdx:0;
  const story=STORIES[si];
  if(!story){ wrap.innerHTML=`<div class="word-huge">?</div>`; show('s-word'); return; }
  const version=isOutsider?story.outsider:story.insider;
  const text=(version[lang]||version.ar||'');
  if(isOutsider&&outsiderMode==='knows'){
   wrap.innerHTML=`
    <div class="outsider-card">
     <span class="outsider-emoji">🕵️</span>
     <div class="outsider-title">${T.outsiderTitle}</div>
     <div class="outsider-sub">${T.outsiderSub}</div>
    </div>`;
  } else {
   const lbl=T.dir==='rtl'?'القصة':'Story';
   wrap.innerHTML=`
    <div class="story-card">
     <span class="story-label">${lbl} ${story.e}</span>
     <div class="story-text">${text}</div>
    </div>
    <div class="word-hint">${T.wordHint}</div>`;
  }
 } else if(isOutsider&&outsiderMode==='knows'){
  wrap.innerHTML=`
   <div class="outsider-card">
    <span class="outsider-emoji">🕵️</span>
    <div class="outsider-title">${T.outsiderTitle}</div>
    <div class="outsider-sub">${T.outsiderSub}</div>
   </div>`;
 } else {
  if(isSwapped){
   const word=getGroupWord()||'—';
   wrap.innerHTML=`
    <div style="text-align:center;">
     <div class="word-huge">${word}</div>
     <div class="word-hint">${T.wordHint}</div>
    </div>`;
  } else if(isOutsider){
   const word=outsiderWord||'—';
   wrap.innerHTML=`
    <div class="word-huge">${word}</div>
    <div class="word-hint">${T.wordHint}</div>`;
  } else {
   const word=getGroupWord()||'—';
   wrap.innerHTML=`
    <div class="word-huge">${word}</div>
    <div class="word-hint">${T.wordHint}</div>`;
  }
 }
 document.getElementById('btn-memorized').textContent=T.btnMemorized;

 // Pre-word private letter: reveal only on receiver's personal word screen
 if(pendingPrivateLetter&&pendingPrivateLetter.receiver===currentIdx&&!pendingPrivateLetter.shown&&gameMode!=='story'){
  const ar2=T.dir==='rtl';
  const p=pendingPrivateLetter;
  const privatePanel=document.createElement('div');
  privatePanel.style.cssText='margin-top:16px;width:100%;';
  privatePanel.innerHTML=`
   <div style="background:linear-gradient(135deg,#1a3a6a,#0d2247);border:2px solid rgba(59,143,255,.55);border-radius:16px;padding:14px 12px;text-align:center;">
    <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:8px;">🤫 ${ar2?'معلومة سرية':'Secret Info'}</div>
    <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,.85);">${ar2?`حرف كلمة ${players[p.target]} الأول:`:`First letter of ${players[p.target]}'s word:`}</div>
    <div style="font-size:46px;font-weight:900;color:var(--blueL);margin-top:6px;letter-spacing:5px;">${p.letter}</div>
   </div>`;
  wrap.appendChild(privatePanel);
  pendingPrivateLetter.shown=true;
 }

 // Insider spy: inject secret intel panel at the bottom of their word screen
 if(insiderSpyIdx>=0&&currentIdx===insiderSpyIdx&&!isOutsider&&gameMode!=='story'){
  const ar2=T.dir==='rtl';
  const outsiderName=players[outsiderIdx]||'?';
  const groupWord=getGroupWord()||'—';
  const outWord=outsiderWord||'—';
  const spyPanel=document.createElement('div');
  spyPanel.style.cssText='margin-top:22px;width:100%;';
  spyPanel.innerHTML=`
   <div style="background:linear-gradient(135deg,#1a0533,#2d0b5e);border:2px solid rgba(155,93,229,.6);border-radius:18px;padding:18px 16px;text-align:${ar2?'right':'left'};">
    <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:12px;text-align:center;">🕵️ ${ar2?'معلومات سرية — لك وحدك':'Secret Intel — For Your Eyes Only'} 🕵️</div>
    <div style="display:flex;flex-direction:column;gap:10px;">
     <div style="background:rgba(255,255,255,.08);border-radius:12px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:12px;font-weight:700;color:rgba(255,255,255,.55);">${ar2?'كلمة الجماعة':'Group Word'}</span>
      <span style="font-size:17px;font-weight:900;color:#fff;">${groupWord}</span>
     </div>
     <div style="background:rgba(255,59,92,.15);border:1.5px solid rgba(255,59,92,.4);border-radius:12px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:12px;font-weight:700;color:rgba(255,180,180,.7);">${ar2?'كلمة الخارج':'Outsider Word'}</span>
      <span style="font-size:17px;font-weight:900;color:#ff8fa3;">${outWord}</span>
     </div>
     <div style="background:rgba(255,149,0,.15);border:1.5px solid rgba(255,149,0,.4);border-radius:12px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:12px;font-weight:700;color:rgba(255,200,120,.7);">${ar2?'الخارج هو':'Outsider is'}</span>
      <span style="font-size:17px;font-weight:900;color:#ffbb55;">${outsiderName}</span>
     </div>
    </div>
    <div style="font-size:11px;color:rgba(255,255,255,.35);text-align:center;margin-top:12px;line-height:1.6;">${ar2?'تظاهر إنك ما تعرف — أو استخدم هالمعلومات بذكاء 😏':'Act like you know nothing — or use this wisely 😏'}</div>
   </div>`;
  wrap.appendChild(spyPanel);
 }

 show('s-word');
}

function nextPlayer(){
 playSound('tap'); haptic('light');
 currentIdx++;
 // word_swap twist fires after the first 2 players have seen their original words
 // Guard: only fire if swapDone is false AND we have enough players
 if(activeTwist&&activeTwist.id==='word_swap'&&!activeTwist.swapDone&&currentIdx===2&&players.length>=3){
  activeTwist.swapDone=true; // prevent re-firing
  activeTwist.resumeFromIdx=currentIdx; // remember where to resume normal flow
  swapCurrentIdx=0;
  showNextSwapCover();
  return;
 }
 if(currentIdx<players.length) showCover();
 else showQuestionsPhase();
}

// ════════════════════════════════════════════════════════════════
// QUESTIONS PHASE
// ════════════════════════════════════════════════════════════════
function showQuestionsPhase(){
 releaseQuestionAdvanceLock();
 if(questionAdvanceRetryTimer){ clearTimeout(questionAdvanceRetryTimer); questionAdvanceRetryTimer=null; }
 currentQIdx=0;
 gameQuestionActive=false;
 gameQuestionAnswered=false;
 renderSpotlightQ();
 updateQRemain(questions.length);
 updateScoreBar();

 // Show twist reminder banner if active twist affects questions phase
 const rem=document.getElementById('twist-reminder');
 if(rem&&activeTwist){
  const ar=T.dir==='rtl';
  const lk=ar?'ar':'en';
  if(activeTwist.id==='time_pressure'){
   rem.style.display='block';
   rem.innerHTML=`<div style="background:#fff9e6;border:2px solid #ffe680;border-radius:12px;padding:10px 14px;margin-bottom:10px;text-align:center;font-size:13px;font-weight:700;color:#9a6600;">⏱️ ${ar?'كل إجابة لازم تكون خلال 10 ثواني!':'Each answer must be within 10 seconds!'}</div>`;
  } else if(activeTwist.id==='whisper_round'||activeTwist.id==='silent_round'){
   rem.style.display='block';
   rem.innerHTML=`<div style="background:#f0f4ff;border:2px solid #b3c6ff;border-radius:12px;padding:10px 14px;margin-bottom:10px;text-align:center;font-size:13px;font-weight:700;color:#1a3a9a;">🤫 ${ar?'كل الأجوبة لازم تكون بالهمس!':'All answers must be whispered!'}</div>`;
  } else if(activeTwist.id==='reverse_vote'){
   rem.style.display='block';
   rem.innerHTML=`<div style="background:#fff0f3;border:2px solid #ffc5d0;border-radius:12px;padding:10px 14px;margin-bottom:10px;text-align:center;font-size:13px;font-weight:700;color:var(--red);">🔃 ${ar?'تذكير: التصويت العكسي — الأكثر أصوات يفوز!':'Reminder: Reverse Vote — most voted wins!'}</div>`;
  } else {
   rem.style.display='none';
  }
 } else if(rem){
  rem.style.display='none';
 }

 show('s-questions');
}

let gameQuestionActive=false;
let gameQuestionTarget=-1;
let gameQuestionText='';
let gameQuestionAnswered=false;

function fireGameQuestion(){
 if(gameMode==='story'||!topic) return;
 const ar=T.dir==='rtl';
 gameQuestionTarget=Math.floor(Math.random()*players.length);
 const name=players[gameQuestionTarget];
 const qs=ar?GAME_QUESTIONS_AR:GAME_QUESTIONS_EN;
 gameQuestionText=qs[Math.floor(Math.random()*qs.length)]();
 gameQuestionActive=true;
 gameQuestionAnswered=false;

 // Pause the timer if time_pressure is active
 if(_timePressureInterval){
  clearInterval(_timePressureInterval);
  _timePressureInterval=null;
  _timerGeneration++; // invalidate any in-flight tick
  _timerPaused=true;
 }

 const word=getGroupWord()||'?';

 document.getElementById('twist-banner-el').innerHTML=`
  <div class="twist-banner" style="background:linear-gradient(135deg,#1a3a6a,#0d2247);">
   <span class="twist-emoji">❓</span>
   <div class="twist-label">${T.gqLabel||'Game Question'}</div>
   <div class="twist-text">${ar?'سؤال للاعب محدد!':'A question for a specific player!'}</div>
  </div>`;
 document.getElementById('twist-details-el').innerHTML=`
  <div class="card" style="padding:20px;text-align:center;">
   <div style="font-size:32px;margin-bottom:6px;">${AVATARS[gameQuestionTarget%AVATARS.length]}</div>
   <div style="font-size:20px;font-weight:900;margin-bottom:10px;">${name}</div>
   <div style="font-size:13px;color:var(--muted);margin-bottom:12px;">${ar?'أجب بصدق — الكل يستمع ويحكم:':'Answer honestly — everyone listens:'}</div>
   <div style="font-size:17px;font-weight:700;color:var(--text);line-height:1.7;background:var(--s2);padding:14px;border-radius:12px;">${gameQuestionText}</div>
   <div style="font-size:12px;color:var(--muted);margin-top:10px;line-height:1.6;">${ar?'الخارج يعرف كلمة مختلفة — جوابه سيكشفه':'The Outsider has a different word — their answer will expose them'}</div>
  </div>`;
 const _gqOkBtn=document.getElementById('btn-twist-ok');
 if(_gqOkBtn){ _gqOkBtn.textContent=ar?'✅ أجبنا — نكمل':'✅ Answered — Continue'; _gqOkBtn.style.display='flex'; }
 playSound('reveal'); haptic('heavy');
 consumeEvent();
 show('s-twist',true);
}

function answerGameQ(ans){
 const el=document.getElementById('gq-card-el');
 if(el){
  el.innerHTML=`<div class="gq-label" style="color:var(--green);">${T.gqRecorded||'✅ Recorded'}</div>
   <div style="font-size:14px;font-weight:700;color:var(--text);margin-top:6px;">${gameQuestionText}</div>
   <div style="font-size:22px;font-weight:900;color:var(--blue);margin-top:8px;">${ans?(T.gqYes||'Yes'):(T.gqNo||'No')}</div>`;
  setTimeout(()=>{ if(el) el.remove(); },2000);
 }
 gameQuestionAnswered=true;
 playSound('done'); haptic('medium');
}

let _timePressureInterval=null;
let _timerPaused=false;
let _timerSecsLeft=10;
// Generation counter: incremented every time the timer is killed.
// Each closure captures its own snapshot; stale closures self-abort.
let _timerGeneration=0;

function renderSpotlightQ(){
 releaseQuestionAdvanceLock();
 if(questionAdvanceRetryTimer){ clearTimeout(questionAdvanceRetryTimer); questionAdvanceRetryTimer=null; }
 if(_timePressureInterval){ clearInterval(_timePressureInterval); _timePressureInterval=null; _timerGeneration++; }

 const spot=document.getElementById('q-spotlight');
 if(currentQIdx>=questions.length){
  // Questions phase done — kill timer and clear active twist visuals
  if(_timePressureInterval){clearInterval(_timePressureInterval);_timePressureInterval=null;_timerGeneration++;}
  _timerPaused=false; _timerSecsLeft=10;
  activeTwist=null;
  spot.innerHTML=`<div style="text-align:center;padding:28px 0;">
   <div style="font-size:46px;margin-bottom:10px;">✅</div>
   <div style="font-size:19px;font-weight:900;">${T.allDone}</div>
  </div>`;
  document.getElementById('btn-done-q').style.display='none';
  document.getElementById('btn-skip-q').style.display='none';
  const _voteBtn=document.getElementById('btn-done-questions');
  if(_voteBtn) _voteBtn.style.display='flex';
  return;
 }

 const q=questions[currentQIdx];
 const n=players.length;
 const isBonus=q.isBonus||currentQIdx>=n;
 const cc=(topic&&topic.cc)||'#3b8fff';
 const isTimePressure=activeTwist&&activeTwist.id==='time_pressure';
 const isWhisper=activeTwist&&activeTwist.id==='whisper_round';
 const ar=T.dir==='rtl';

 // Build shell once; on subsequent calls patch only dynamic nodes
 if(!spot.querySelector('.q-spot')){
  const r=28,circ=2*Math.PI*r;
  spot.innerHTML=`
   <div class="q-spot" id="q-spot-card">
    <div id="q-timer-wrap"></div>
    <div class="q-num" id="q-num-el"></div>
    <div class="q-asker" id="q-asker-el"></div>
    <div class="q-name" id="q-name-el"></div>
    <div class="q-arrow">↓</div>
    <div class="q-target-av" id="q-target-av-el"></div>
    <div class="q-target-name" id="q-target-name-el"></div>
    <div class="q-dots" id="q-dots-el"></div>
   </div>`;
 }

 // Patch border color + shadow on card
 const card=document.getElementById('q-spot-card');
 if(card){
  card.style.borderColor=isTimePressure?'var(--red)':cc;
  card.style.boxShadow=isTimePressure?'0 8px 32px rgba(255,59,92,.2)':'';
 }

 // Patch timer
 const timerWrap=document.getElementById('q-timer-wrap');
 if(timerWrap){
  if(isTimePressure&&!timerWrap.querySelector('.timer-ring')){
   const r=28,circ=2*Math.PI*r;
   timerWrap.innerHTML=`<div class="timer-ring" id="timer-ring">
    <svg width="70" height="70" viewBox="0 0 70 70">
     <circle class="timer-bg" cx="35" cy="35" r="${r}" stroke-dasharray="${circ}"/>
     <circle class="timer-fill" id="timer-arc" cx="35" cy="35" r="${r}" stroke-dasharray="${circ}" stroke-dashoffset="0"/>
    </svg>
    <div class="timer-num" id="timer-num">10</div>
   </div>`;
  } else if(!isTimePressure){
   timerWrap.innerHTML='';
  }
 }

 // Patch text/emoji nodes directly — no innerHTML on the whole card
 const numEl=document.getElementById('q-num-el');
 if(numEl){ numEl.textContent=isBonus?`★ ${T.bonusLabel} / ${questions.length}`:`#${currentQIdx+1} / ${questions.length}`; numEl.style.color=cc; numEl.style.background=cc+'18'; }
 const askerEl=document.getElementById('q-asker-el');
 if(askerEl) askerEl.textContent=AVATARS[q.asker%AVATARS.length];
 const nameEl=document.getElementById('q-name-el');
 if(nameEl) nameEl.textContent=players[q.asker]||'?';
 const targetAvEl=document.getElementById('q-target-av-el');
 if(targetAvEl) targetAvEl.textContent=AVATARS[q.target%AVATARS.length];
 const targetNameEl=document.getElementById('q-target-name-el');
 if(targetNameEl) targetNameEl.textContent=players[q.target]||'?';

 // Patch progress dots — only update class, don't rebuild DOM nodes unless count changed
 const dotsEl=document.getElementById('q-dots-el');
 if(dotsEl){
  const dots=dotsEl.children;
  if(dots.length!==questions.length){
   dotsEl.innerHTML=questions.map((_,i)=>`<div class="q-dot${i<currentQIdx?' done':i===currentQIdx?' active':''}"></div>`).join('');
  } else {
   for(let i=0;i<dots.length;i++){
    const d=dots[i];
    const want=i<currentQIdx?'q-dot done':i===currentQIdx?'q-dot active':'q-dot';
    if(d.className!==want) d.className=want;
   }
  }
 }

 const doneBtn=document.getElementById('btn-done-q');
 const skipBtn=document.getElementById('btn-skip-q');
 doneBtn.style.display='flex';
 skipBtn.style.display='flex';

 if(isWhisper){
  doneBtn.textContent=ar?'🤫 همسنا ✓':'🤫 Whispered ✓';
  doneBtn.style.background='var(--blue)';
  doneBtn.style.color='#fff';
 } else {
  doneBtn.textContent='✓ '+(T.labelDoneQ||'تم');
  doneBtn.style.background='';
  doneBtn.style.color='';
 }

 if(isTimePressure&&!_timerPaused){
  // Always kill any lingering interval and reset to a clean 10 before
  // starting the countdown, so a previous question's half-expired timer
  // can never bleed into the new question.
  if(_timePressureInterval){ clearInterval(_timePressureInterval); _timePressureInterval=null; _timerGeneration++; }
  _timerSecsLeft=10;
  startTimerCountdown();
 }
}

function startTimerCountdown(){
 const circ=2*Math.PI*28;
 // Snapshot generation so stale closures can self-abort
 const myGen=_timerGeneration;
 let secs=_timerSecsLeft;
 // Prime the display immediately with fresh DOM refs
 const _numPrime=document.getElementById('timer-num');
 if(_numPrime){_numPrime.textContent=secs;_numPrime.classList.remove('timer-urgent');}
 _timePressureInterval=setInterval(()=>{
  // Stale-closure guard: if generation changed, this tick belongs to
  // a killed timer — stop immediately without any side-effects
  if(_timerGeneration!==myGen){
   clearInterval(_timePressureInterval);
   return;
  }
  secs--;
  _timerSecsLeft=secs;
  // Always resolve DOM refs fresh — never use stale captures
  const num=document.getElementById('timer-num');
  const arc=document.getElementById('timer-arc');
  if(num) num.textContent=secs;
  if(arc) arc.style.strokeDashoffset=((10-secs)/10)*circ;
  if(secs<=3&&num) num.classList.add('timer-urgent');
  if(secs<=0){
   clearInterval(_timePressureInterval); _timePressureInterval=null;
   _timerSecsLeft=10; // reset for next question
   playSound('skip'); haptic('medium');
   advanceQ(); // auto-skip — renderSpotlightQ will start fresh timer for next Q
  }
 },1000);
}

function advanceQ(){
 if(questionAdvanceLocked){
  // Recover from rare stale-lock cases so Done/Skip never gets stuck.
  if(Date.now()-questionAdvanceLockedAt>420){
   releaseQuestionAdvanceLock();
  } else {
   return false;
  }
 }
 questionAdvanceLocked=true;
 questionAdvanceLockedAt=Date.now();
 if(questionAdvanceLockTimer) clearTimeout(questionAdvanceLockTimer);
 questionAdvanceLockTimer=setTimeout(()=>{ releaseQuestionAdvanceLock(); },180);
 currentQIdx++;
 lastQuestionAdvanceAt=Date.now();
 updateQRemain(Math.max(0,questions.length-currentQIdx));
 
 // Drop stale scheduled indices if we jumped quickly
 while(window.gameQSchedule && window.gameQSchedule.length > 0 && window.gameQSchedule[0] < currentQIdx){
  window.gameQSchedule.shift();
 }
 // Fire Game Question(s) at their scheduled indices
 if(window.gameQSchedule && window.gameQSchedule.length > 0 && window.gameQSchedule[0] <= currentQIdx){
  window.gameQSchedule.shift();
  fireGameQuestion();
  releaseQuestionAdvanceLock();
  // Safety: if no card became active, keep gameplay moving.
  if(!gameQuestionActive) renderSpotlightQ();
  return true;
 }

 while(window.currentTwistSchedule && window.currentTwistSchedule.length > 0 && window.currentTwistSchedule[0] < currentQIdx){
  window.currentTwistSchedule.shift();
 }
 // Fire Twist at its scheduled index (independent of GQ)
 if(window.currentTwistSchedule && window.currentTwistSchedule.length > 0 && window.currentTwistSchedule[0] <= currentQIdx){
  window.currentTwistSchedule.shift();
  fireRandomTwist();
  releaseQuestionAdvanceLock();
  const twistEl=document.getElementById('s-twist');
  const twistShown=!!(twistEl&&twistEl.classList.contains('active'));
  if(!twistShown&&(!activeTwist||!activeTwist.id)) renderSpotlightQ();
  return true;
 }
 
 renderSpotlightQ();
 releaseQuestionAdvanceLock();
 return true;
}
function doneQ(){
 const btn=document.getElementById('btn-done-q');
 markUiPress(btn,lastUiPressPointer||'mouse');
 playSound('done'); haptic('medium');
 if(!advanceQ()) scheduleQuestionAdvanceRetry();
}
function skipQ(){
 const btn=document.getElementById('btn-skip-q');
 markUiPress(btn,lastUiPressPointer||'mouse');
 playSound('tap'); haptic('light');
 if(!advanceQ()) scheduleQuestionAdvanceRetry();
}
function updateQRemain(n){ const el=document.getElementById('q-remain'); if(el) el.textContent=n; }

// ════════════════════════════════════════════════════════════════
// VOTING
// ════════════════════════════════════════════════════════════════
function startVotePhase(){
 // Kill time_pressure timer when entering vote phase
 if(_timePressureInterval){clearInterval(_timePressureInterval);_timePressureInterval=null;_timerGeneration++;}
 _timerPaused=false; _timerSecsLeft=10;
 votes={}; currentOpenVoter=0; openVoteOrder=[];
 const ar=T.dir==='rtl';

 // Early forced/surrender votes are final and must not vote again.
 Object.keys(lockedEarlyVotes).forEach(k=>{
  const voterIdx=Number(k);
  const info=lockedEarlyVotes[k];
  if(Number.isInteger(voterIdx)&&info&&Number.isInteger(info.targetIdx)&&info.targetIdx>=0&&info.targetIdx<players.length){
   votes[voterIdx]=info.targetIdx;
  }
 });

 // Build final voting queue (exclude players who already cast early locked votes)
 openVoteOrder=players.map((_,idx)=>idx).filter(idx=>typeof votes[idx]!=='number');

 // Show reminders on vote screen for active vote constraints
 const reminders=[];
 Object.keys(lockedEarlyVotes).forEach(k=>{
  const voterIdx=Number(k);
  const info=lockedEarlyVotes[k];
  if(!Number.isInteger(voterIdx)||!info||!Number.isInteger(info.targetIdx)) return;
  const voterName=players[voterIdx]||'?';
  const targetName=players[info.targetIdx]||'?';
  if(info.reason==='surrender'){
   reminders.push(`<div style="background:#fff0f3;border:2px solid #ffc5d0;border-radius:12px;padding:10px 14px;margin-bottom:12px;text-align:center;font-size:13px;font-weight:700;color:var(--red);">🏳️ ${ar?`${voterName} استسلم وصوّت مبكرًا على ${targetName} — وما رح يصوّت مرة ثانية`:`${voterName} surrendered and already voted early for ${targetName} — no second vote`}</div>`);
  } else {
   reminders.push(`<div style="background:#fff4e6;border:2px solid #ffcc80;border-radius:12px;padding:10px 14px;margin-bottom:12px;text-align:center;font-size:13px;font-weight:700;color:var(--orange);">🗳️ ${ar?`${voterName} صوّت مبكرًا على ${targetName} — وما رح يصوّت بالنهاية`:`${voterName} already voted early for ${targetName} — no final vote`}</div>`);
  }
 });
 if(reverseVotePlayerIdx>=0&&reverseVoteResult>=0){
  const trusterName=players[reverseVotePlayerIdx]||'?';
  const trustedName=players[reverseVoteResult]||'?';
  reminders.push(`<div style="background:#e8f4fd;border:2px solid #7ec8e3;border-radius:12px;padding:10px 14px;margin-bottom:12px;text-align:center;font-size:13px;font-weight:700;color:#1565c0;">🔃 ${ar?`${trusterName} اختار ${trustedName} كشخص موثوق — ما يقدر يصوّت ضده بالنهاية`:`${trusterName} trusted ${trustedName} — cannot vote against them in final voting`}</div>`);
 }
 const vrem=document.getElementById('vote-twist-reminder');
 if(vrem){
  if(reminders.length){
   vrem.style.display='block';
   vrem.innerHTML=reminders.join('');
  } else {
   vrem.style.display='none';
   vrem.innerHTML='';
  }
 }

 if(!openVoteOrder.length){
  showTally();
  return;
 }
 renderOpenVote();
 document.getElementById('vote-total').textContent=openVoteOrder.length;
 // Clear active mid-round twists now that voting has started
 activeTwist=null;
 show('s-vote');
}

function renderOpenVote(){
 const phasesDiv=document.getElementById('vote-phases');
 if(currentOpenVoter>=openVoteOrder.length){ showTally(); return; }
 voteCastLocked=false;
 const ar=T.dir==='rtl';
 const voterIdx=openVoteOrder[currentOpenVoter];
 const voterName=players[voterIdx];
 const av=AVATARS[voterIdx%AVATARS.length];
 // Check if this voter has a forced vote (twist)
 const isForced=twistForcedVoterIdx===voterIdx;
 const trustLockedTarget=trustVoteLocks[voterIdx];
 const hasTrustLock=Number.isInteger(trustLockedTarget)&&trustLockedTarget>=0;

 const opts=players.map((name,i)=>{
  if(i===voterIdx) return '';
  const isForce=isForced&&i===twistForcedTargetIdx;
  const isTrustBlocked=hasTrustLock&&i===trustLockedTarget;
  const isBlocked=(isForced&&!isForce)||isTrustBlocked;
  return `<div class="vote-option${isForce?' forced':''}${isBlocked?' vote-blocked':''}" id="vopt-${i}" onclick="castOpenVote(${i})">
   <span class="check" id="vcheck-${i}"></span>
   <span>${AVATARS[i%AVATARS.length]} ${name}${isForce?' ⚠️':''}${isTrustBlocked?' 🚫':''}</span>
  </div>`;
 }).join('');

 document.getElementById('vote-turn-num').textContent=currentOpenVoter+1;
 phasesDiv.innerHTML=`
  <div class="card" style="text-align:center;margin-bottom:14px;padding:18px;">
   <div style="font-size:42px;margin-bottom:5px;">${av}</div>
   <div style="font-size:21px;font-weight:900;">${voterName}</div>
   <div style="font-size:13px;color:var(--muted);margin-top:4px;">${T.voteWho}</div>
   ${isForced?`<div style="font-size:12px;color:var(--orange);font-weight:700;margin-top:6px;">⚠️ ${T.mustVoteForcedLabel||'Must vote for'} ${players[twistForcedTargetIdx]}</div>`:''}
   ${hasTrustLock?`<div style="font-size:12px;color:#1565c0;font-weight:700;margin-top:6px;">🔒 ${ar?`لا يمكن التصويت ضد ${players[trustLockedTarget]}`:`Cannot vote against ${players[trustLockedTarget]}`}</div>`:''}
  </div>
  <div class="vote-select" id="vote-opts">${opts}</div>`;
}

function castOpenVote(targetIdx){
 if(voteCastLocked) return;
 voteCastLocked=true;
 const voterIdx=openVoteOrder[currentOpenVoter];
 // Enforce forced vote twist
 if(twistForcedVoterIdx===voterIdx&&targetIdx!==twistForcedTargetIdx){ voteCastLocked=false; return; }
 if(trustVoteLocks[voterIdx]===targetIdx){ voteCastLocked=false; return; }
 votes[voterIdx]=targetIdx;
 playSound('vote'); haptic('medium');
 const wrap=document.getElementById('vote-opts');
 if(wrap) wrap.style.pointerEvents='none';
 const el=document.getElementById('vopt-'+targetIdx);
 if(el){ el.classList.add('selected'); const ch=document.getElementById('vcheck-'+targetIdx); if(ch) ch.textContent='✓'; }
 setTimeout(()=>{
  currentOpenVoter++;
  if(wrap) wrap.style.pointerEvents='';
  renderOpenVote();
 },420);
}

// ════════════════════════════════════════════════════════════════
// TALLY
// ════════════════════════════════════════════════════════════════
function showTally(){
 playSound('tap'); haptic('medium');
 const counts=buildVoteCounts();
 const max=Math.max(...Object.values(counts));
 const sorted=[...players.keys()].sort((a,b)=>counts[b]-counts[a]);
 document.getElementById('tally-list').innerHTML=sorted.map(i=>{
  const pct=max>0?(counts[i]/max)*100:0;
  const c=CHIP_COLORS[i%CHIP_COLORS.length];
  return `<div class="tally-row">
   <div class="tally-top">
    <div class="tally-name">${AVATARS[i%AVATARS.length]} ${players[i]}</div>
    <div class="tally-count">${T.voteCount(counts[i])}</div>
   </div>
   <div class="tally-bg"><div class="tally-bar" data-pct="${pct}" style="width:0%;background:${c};"></div></div>
  </div>`;
 }).join('');
 show('s-tally');
 // Animate bars: start at 0, set final width after two frames so transition fires
 requestAnimationFrame(()=>{
  requestAnimationFrame(()=>{
   document.querySelectorAll('#tally-list .tally-bar').forEach(bar=>{
    bar.style.width=(bar.dataset.pct||'0')+'%';
   });
  });
 });
}

function buildVoteCounts(){
 const counts={};
 players.forEach((_,i)=>counts[i]=0);
 Object.values(votes).forEach(v=>{ counts[v]=(counts[v]||0)+1; });
 return counts;
}

// ════════════════════════════════════════════════════════════════
// REVEAL
// ════════════════════════════════════════════════════════════════
function showReveal(){
 playSound('reveal'); haptic('heavy');
 // Kill time_pressure timer and clear mid-round twists on reveal
 if(_timePressureInterval){clearInterval(_timePressureInterval);_timePressureInterval=null;_timerGeneration++;}
 _timerPaused=false; _timerSecsLeft=10;
 // Clear any lingering active twist (whisper_round, word_swap_mid, etc.)
 activeTwist=null;
 const counts=buildVoteCounts();
 const maxV=Math.max(...Object.values(counts));
 const topVoted=Object.keys(counts).filter(k=>counts[k]===maxV).map(Number);

 // Reverse vote twist flips who wins
 let groupWon=topVoted.includes(outsiderIdx)||(outsiderCount===2&&topVoted.includes(outsiderIdx2));
 if(twistReverseVote) groupWon=!groupWon;

 setTimeout(()=>playSound(groupWon?'win':'lose'),480);
 applyRoundScores(groupWon,counts);
 updateScoreBar();

 // Outsider name + words
 document.getElementById('reveal-name').textContent=outsiderCount===2&&outsiderIdx2>=0?(players[outsiderIdx]||'?')+' & '+(players[outsiderIdx2]||'?'):players[outsiderIdx]||'?';
 const gw=getGroupWord();
 const ow=getOutsiderDisplay();

 // Words chips — hidden until after punishment/guess phase to preserve outsider's guess opportunity
 const wSection=document.getElementById('words-chips-section');
 wSection.style.display='none';
 // Store words for later reveal after punishment
 wSection.dataset.gw=gw||'—';
 wSection.dataset.ow=ow||'';
 wSection.dataset.mode=gameMode;
 wSection.dataset.storyIdx=storyIdx;
 wSection.dataset.outsiderMode=outsiderMode;

 // Verdict
 const msgs=groupWon?T.caught:T.safe;
 document.getElementById('reveal-tagline').textContent=msgs[Math.floor(Math.random()*msgs.length)];
 document.getElementById('confetti-strip').textContent=
  (groupWon?['🎉','🎊','🥳','🎯','🙈','😂']:['😏','🏆','🎬','🕶️','🤫','😎']).join('');
 document.getElementById('verdict-wrap').innerHTML=groupWon
  ?`<div class="result-verdict verdict-win">🎉 ${T.groupWon(outsiderCount===2&&outsiderIdx2>=0?players[outsiderIdx]+' & '+players[outsiderIdx2]:players[outsiderIdx],(counts[outsiderIdx]||0)+(outsiderCount===2&&outsiderIdx2>=0?counts[outsiderIdx2]||0:0))}</div>`
  :`<div class="result-verdict verdict-lose">😏 ${T.outsiderWon}</div>`;

 // Punishment
 renderPunishment(groupWon,counts);

 // Micro-motivators
 renderMicroRewards();
 // Show early vote results if any
 const earlyWrap=document.getElementById('micro-rewards-wrap');
 if(earlyWrap){
  let earlyHtml='';
  if(earlyVoteResult>=0&&earlyVotePlayerIdx>=0){
   const ar2=T.dir==='rtl';
   const correct=isOutsiderIdx(earlyVoteResult);
   earlyHtml+=`<div class="micro-reward ${correct?'mr-perfect':'mr-comeback'}" style="width:100%;justify-content:center;margin-bottom:4px;">
    🗳️ ${players[earlyVotePlayerIdx]} ${ar2?'صوّت مبكر على':'voted early for'} ${players[earlyVoteResult]} ${correct?'✅':'❌'}
   </div>`;
  }
  if(reverseVoteResult>=0&&reverseVotePlayerIdx>=0){
   const ar2=T.dir==='rtl';
   const correct=!isOutsiderIdx(reverseVoteResult);
   earlyHtml+=`<div class="micro-reward ${correct?'mr-mvp':'mr-close'}" style="width:100%;justify-content:center;margin-bottom:4px;">
    🔃 ${players[reverseVotePlayerIdx]} ${ar2?'وثق في':'trusted'} ${players[reverseVoteResult]} ${correct?'✅ صح':'❌ غلط'}
   </div>`;
  }
  earlyWrap.innerHTML=earlyHtml+(earlyWrap.innerHTML||'');
 }


 // Scoreboard
 document.getElementById('scoreboard-wrap').innerHTML=renderScoreboard();

 // Buttons
 const isLastRound=currentMatchRound>=matchRoundCount-1;
 document.getElementById('reveal-btn-row').innerHTML=isLastRound
  ?`<button class="btn btn-yellow" onclick="showMatchOver()" id="btn-match-over">${T.endMatchBtn||'🏆 End of Match!'}</button>
    <button class="btn btn-ghost" onclick="goHome()" id="btn-go-home">${T.btnGoHome}</button>`
  :`<button class="btn btn-green" onclick="nextRound()" id="btn-new-round">${T.btnNewRound}</button>
    <button class="btn btn-ghost" onclick="goHome()" id="btn-go-home">${T.btnGoHome}</button>`;

 show('s-reveal');
}

// ════════════════════════════════════════════════════════════════
// PUNISHMENT
// ════════════════════════════════════════════════════════════════
function renderPunishment(groupWon, counts){
 const wrap=document.getElementById('punishment-wrap');
 // Punishment only applies when the outsider is caught — outsider winning means no punishment
 if(!groupWon){ wrap.innerHTML=''; revealWords(); return; }
 const loserIdx=outsiderIdx;
 const loserName=players[loserIdx]||'?';
 const canGuess=gameMode!=='story'&&topic!==null&&outsiderMode!=='knows';

 if(selectedPunishment!=='any'){
  const sp=selectedPunishment==='guess'&&!canGuess?'truth':selectedPunishment;
  if(sp==='truth'){
   wrap.innerHTML=`<div class="punish-wrap">
    <div class="punish-title">${T.punishHeader||'⚡ Punishment'}: ${loserName}</div>
    <div class="punish-result" style="background:#e8f4fd;border-color:#7ec8e3;color:#1565c0;margin-top:0;">
     💬 ${T.punishTruthResult||'The group asks them any question — they must answer truthfully!'}
    </div></div>`;
   revealWords();
  } else if(sp==='dare'){
   wrap.innerHTML=`<div class="punish-wrap">
    <div class="punish-title">${T.punishHeader||'⚡ Punishment'}: ${loserName}</div>
    <div class="punish-result" style="background:#fff0f3;border-color:#ffc5d0;color:var(--red);margin-top:0;">
     🎭 ${T.punishDareResult||'The group assigns a dare of their choice — they must do it!'}
    </div></div>`;
   revealWords();
  } else if(sp==='guess'){
   wrap.innerHTML=`<div class="punish-wrap"><div class="punish-title">${T.punishHeader||'⚡ Punishment'}: ${loserName}</div><div id="punish-result-area"></div></div>`;
   showGuessChallenge(document.getElementById('punish-result-area'));
   // words revealed after guess is submitted (in submitGuess)
  }
  return;
 }

 // AUTO-SPIN WHEEL for 'any' punishment — always fires
 const punishments=['truth','dare'].concat(canGuess?['guess']:[]);
 const ar=T.dir==='rtl';
 const punishEmoji={'truth':'💬','dare':'🎯','guess':'🌟'};
 const punishLabel={'truth':ar?'صراحة':'Truth','dare':ar?'جرائة':'Dare','guess':ar?'فرصة ثانية':'Second Chance'};
 
 wrap.innerHTML=`
  <div class="punish-wrap" style="text-align:center;">
   <div class="punish-title" style="margin-bottom:8px;">${T.punishHeader||'⚡ Punishment'} — ${loserName}</div>
   <div style="font-size:13px;color:var(--muted);margin-bottom:18px;">${T.dir==='rtl'?'العجلة تختار!':'The wheel decides!'}</div>
   <div id="punish-wheel-wrap" style="display:flex;flex-direction:column;align-items:center;gap:16px;">
    <div id="punish-wheel" style="width:120px;height:120px;border-radius:50%;border:4px solid var(--pink);display:flex;align-items:center;justify-content:center;font-size:52px;background:linear-gradient(135deg,var(--surface2),var(--surface3));box-shadow:var(--glow-pink);transition:transform 0.1s;">🎰</div>
    <button onclick='spinPunishWheel(${JSON.stringify(punishments)},${JSON.stringify(punishEmoji)},${JSON.stringify(punishLabel)},${canGuess})' style="background:linear-gradient(135deg,var(--pink),var(--orange));color:#fff;border:none;border-radius:30px;padding:14px 32px;font-size:16px;font-weight:900;cursor:pointer;font-family:'Cairo',sans-serif;box-shadow:var(--glow-pink);" id="spin-btn">
     ${T.dir==='rtl'?'🎯 دوّر العجلة!':'🎯 Spin the Wheel!'}
    </button>
   </div>
   <div id="punish-result-area" style="margin-top:16px;"></div>
  </div>`;
}

function spinPunishWheel(punishments,emojis,labels,canGuess){
 const wheel=document.getElementById('punish-wheel');
 const btn=document.getElementById('spin-btn');
 if(!wheel||!btn) return;
 btn.disabled=true; btn.style.opacity='0.5';
 const chosen=punishments[Math.floor(Math.random()*punishments.length)];
 const emojiList=Object.values(emojis);
 let tick=0;
 const totalTicks=22+Math.floor(Math.random()*12);
 function step(){
  if(tick>=totalTicks){
   wheel.textContent=emojis[chosen];
   wheel.style.transition='transform 0.4s cubic-bezier(.34,1.56,.64,1)';
   wheel.style.transform='scale(1.35)';
   const glows={'truth':'0 0 40px rgba(68,138,255,.9)','dare':'0 0 40px rgba(255,61,154,.9)','guess':'0 0 40px rgba(61,220,90,.9)'};
   wheel.style.boxShadow=glows[chosen]||'';
   playSound('word'); haptic('heavy');
   setTimeout(()=>{
    wheel.style.transform='scale(1)';
    const area=document.getElementById('punish-result-area');
    if(!area) return;
    if(chosen==='guess'&&canGuess){area.innerHTML='';showGuessChallenge(area);}
    else if(chosen==='truth'){
     area.innerHTML=`<div class="punish-result" style="background:#e8f4fd;border-color:#7ec8e3;color:#1565c0;">💬 ${T.punishTruthResult||'Ask them any question — they must answer honestly!'}</div>`;
     revealWords();
    } else {
     area.innerHTML=`<div class="punish-result" style="background:#fff0f3;border-color:#ffc5d0;color:var(--red);">🎭 ${T.punishDareResult||'Assign a dare — they must do it!'}</div>`;
     revealWords();
    }
   },600);
  } else {
   wheel.textContent=emojiList[tick%emojiList.length];
   wheel.style.transform=`rotate(${tick*36}deg) scale(${0.92+Math.sin(tick*0.8)*0.08})`;
   const delay=tick<totalTicks-8?60:tick<totalTicks-3?140:280;
   tick++;
   setTimeout(step,delay);
  }
 }
 step();
}

function revealWords(){
 const wSection=document.getElementById('words-chips-section');
 if(!wSection||wSection.dataset.revealed) return;
 wSection.dataset.revealed='1';
 const gMode=wSection.dataset.mode;
 const oMode=wSection.dataset.outsiderMode;
 const gw=wSection.dataset.gw;
 const ow=wSection.dataset.ow;
 const sIdx=parseInt(wSection.dataset.storyIdx);
 if(gMode==='story'&&sIdx>=0){
  const story=STORIES[sIdx];
  wSection.style.display='';
  const lgEl=document.getElementById('label-group-word');
  const loEl=document.getElementById('label-outsider-word');
  const realEl=document.getElementById('real-word');
  const fakeEl=document.getElementById('fake-word');
  if(lgEl) lgEl.textContent=T.groupStoryLbl||'Group Story';
  if(loEl) loEl.textContent=T.outsiderStoryLbl||'Outsider Story';
  if(realEl) realEl.textContent=story.e+' '+(T.dir==='rtl'?'قصة الجماعة':'Group\'s story');
  if(fakeEl) fakeEl.textContent=story.e+' '+(T.dir==='rtl'?'قصة الخارج':'Outsider\'s story');
 } else if(oMode!=='knows'&&ow){
  wSection.style.display='';
  const realEl=document.getElementById('real-word');
  const fakeEl=document.getElementById('fake-word');
  const lgEl=document.getElementById('label-group-word');
  const loEl=document.getElementById('label-outsider-word');
  if(lgEl) lgEl.textContent=T.labelGroupWord||'كلمة الجماعة';
  if(loEl) loEl.textContent=T.labelOutsiderWord||'كلمة الخارج';
  if(realEl) realEl.textContent=gw||'—';
  if(fakeEl) fakeEl.textContent=ow;
 }
}

function choosePunishment(type, btn){
 btn.closest('.punish-opts').querySelectorAll('.punish-opt').forEach(b=>b.classList.remove('selected'));
 btn.classList.add('selected');
 playSound('select'); haptic('medium');
 const area=document.getElementById('punish-result-area');
 if(type==='truth'){
  area.innerHTML=`<div class="punish-result" style="background:#e8f4fd;border-color:#7ec8e3;color:#1565c0;">
   💬 ${T.punishTruthResult||'The group asks them any question — they must answer truthfully!'}
  </div>`;
  revealWords();
 } else if(type==='dare'){
  area.innerHTML=`<div class="punish-result" style="background:#fff0f3;border-color:#ffc5d0;color:var(--red);">
   🎭 ${T.punishDareResult||'The group assigns a dare of their choice — they must do it!'}
  </div>`;
  revealWords();
 } else if(type==='guess'){
  showGuessChallenge(area);
  // words revealed after guess is submitted (in submitGuess)
 }
}

function showGuessChallenge(area){
 if(!topic||gameMode==='story'){ area.innerHTML=''; return; }
 const correctWord=getGroupWord();
 const wrong=TOPICS.filter(t=>t!==topic).sort(()=>Math.random()-.5).slice(0,3)
  .map(t=>t[lang]?t[lang][0]:t.ar[0]);
 const opts=[correctWord,...wrong].sort(()=>Math.random()-.5);
 area.innerHTML=`
  <div class="guess-card">
   <div class="guess-title">${T.guessTitle||'🎯 Guess Challenge'}</div>
   <div class="guess-q" style="font-size:14px;color:#1565c0;margin-bottom:10px;">
    ${T.guessWordQ||"What was the group's word?"}
   </div>
   <div class="guess-opts">
    ${opts.map((w,i)=>`<div class="guess-opt" id="gopt-${i}" onclick="submitGuess('${encodeURIComponent(w)}','${encodeURIComponent(correctWord)}',${i})">${w}</div>`).join('')}
   </div>
  </div>`;
}

function findMostVotedNonOutsider(counts){
 let best=-1, bestCount=0;
 Object.entries(counts).forEach(([k,v])=>{
  const i=Number(k);
  if(!isOutsiderIdx(i)&&v>bestCount){ best=i; bestCount=v; }
 });
 return best>=0?best:(outsiderIdx===0?1:0);
}

function submitGuess(encW,encCorrect,idx){
 const w=decodeURIComponent(encW), correct=decodeURIComponent(encCorrect);
 const isRight=w===correct;
 document.querySelectorAll('.guess-opt').forEach((el,i)=>{
  el.onclick=null;
  if(el.id===`gopt-${idx}`) el.classList.add(isRight?'correct':'wrong');
  if(!isRight&&decodeURIComponent(encCorrect)===el.textContent.trim()) el.classList.add('correct');
 });
 if(isRight){
  // +10 bonus to the outsider (they guessed correctly)
  const loserName=outsiderCount===2&&outsiderIdx2>=0?players[outsiderIdx]+' & '+players[outsiderIdx2]:players[outsiderIdx];
  if(loserName&&roundScores[loserName]!==undefined) roundScores[loserName]+=10;
  if(loserName&&matchScores[loserName]!==undefined) matchScores[loserName]+=10;
  updateScoreBar();
  document.getElementById('scoreboard-wrap').innerHTML=renderScoreboard();
 }
 playSound(isRight?'win':'lose'); haptic(isRight?'heavy':'medium');
 revealWords();
 const res=document.createElement('div');
 res.className='punish-result';
 res.style.marginTop='10px';
 res.textContent=isRight?(T.guessWin||'صح! +10 نقاط 🎉'):(T.guessLose||'غلط! 😅');
 const gc=document.querySelector('.guess-card');
 if(gc) gc.appendChild(res);
}

// ════════════════════════════════════════════════════════════════
// MICRO-MOTIVATORS
// ════════════════════════════════════════════════════════════════
function renderMicroRewards(){
 // micro-reward badges removed — function kept for call-site compatibility
}

function showMotivator(text){
 const el=document.getElementById('motivator');
 if(!el) return;
 el.textContent=text;
 el.classList.remove('hidden');
 clearTimeout(showMotivator._t);
 showMotivator._t=setTimeout(()=>el.classList.add('hidden'),2200);
}

// ════════════════════════════════════════════════════════════════
// SCORING
// ════════════════════════════════════════════════════════════════
function applyRoundScores(groupWon,counts){
 players.forEach((name,i)=>{
  let pts=0;
  if(groupWon){
   // Group caught the outsider(s): each insider +10, each outsider +5 (tried)
   pts=isOutsiderIdx(i)?5:10;
  } else {
   // Outsider(s) escaped: outsiders +10, insiders +0
   pts=isOutsiderIdx(i)?10:0;
  }
  roundScores[name]=(roundScores[name]||0)+pts;
  matchScores[name]=(matchScores[name]||0)+pts;
 });
 // reverse_vote trust bonus: +5 if the trusting player picked correctly
 if(reverseVotePlayerIdx>=0&&reverseVoteResult>=0){
  const _trusted=reverseVoteResult;
  const _truster=reverseVotePlayerIdx;
  const _correctTrust=!isOutsiderIdx(_trusted); // trusted a real insider
  if(_correctTrust){
   const _trusterName=players[_truster];
   if(_trusterName){
    roundScores[_trusterName]=(roundScores[_trusterName]||0)+5;
    matchScores[_trusterName]=(matchScores[_trusterName]||0)+5;
   }
  }
 }
 const roundWinner=Object.entries(roundScores).sort((a,b)=>b[1]-a[1])[0]?.[0];
 matchRoundHistory.push({
  round:currentMatchRound+1,
  outsider:outsiderCount===2&&outsiderIdx2>=0?players[outsiderIdx]+' & '+players[outsiderIdx2]:players[outsiderIdx],
  groupWon,
  roundWinner,
  scores:{...roundScores},
 });
 currentMatchRound++;
 // Save history only when the full match is complete
 if(currentMatchRound>=matchRoundCount) saveHistory();
}

function renderScoreboard(){
 const entries=Object.entries(matchScores).sort((a,b)=>b[1]-a[1]);
 if(!entries.length) return '';
 const medals=['🥇','🥈','🥉'];
 const rows=entries.map(([name,pts],i)=>{
  const delta=roundScores[name]||0;
  const isLeader=i===0;
  return `<div class="sb-row${isLeader?' leader':''}">
   <span class="sb-name">${medals[i]||''} ${name}</span>
   <span style="display:flex;align-items:center;gap:4px;">
    ${delta>0?`<span class="sb-delta">+${delta}</span>`:''}
    <span class="sb-pts">${pts}</span>
   </span>
  </div>`;
 }).join('');
 return `<div class="scoreboard"><div class="sb-title">🏆 Scoreboard — ${T.roundLbl(Math.min(currentMatchRound,matchRoundCount),matchRoundCount)}</div>${rows}</div>`;
}

function updateScoreBar(){
 const bar=document.getElementById('score-bar');
 const entries=Object.entries(matchScores).sort((a,b)=>b[1]-a[1]);
 if(!entries.length){ bar.classList.remove('visible'); document.body.classList.remove('has-scorebar'); return; }
 bar.classList.add('visible'); document.body.classList.add('has-scorebar');
 const medals=['🥇','🥈','🥉'];
 bar.innerHTML=entries.map(([name,pts],i)=>`
  <div class="score-chip${i===0?' top':''}">
   ${medals[i]||'·'} ${name} <span class="pts">${pts}</span>
  </div>`).join('');
}

// ════════════════════════════════════════════════════════════════
// NEXT ROUND / MATCH OVER
// ════════════════════════════════════════════════════════════════
function nextRound(){
 playSound('start'); haptic('heavy');
 // Reset round-level state (keep match state)
 outsiderIdx=-1; topic=null; outsiderWord=null; currentIdx=0;
 votes={}; currentOpenVoter=0; openVoteOrder=[]; questions=[]; currentQIdx=0;
 storyIdx=-1; outsiderIdx2=-1; activeTwist=null; gameQuestionActive=false;
 if(_timePressureInterval){clearInterval(_timePressureInterval);_timePressureInterval=null;_timerGeneration++;} _timerPaused=false; _timerSecsLeft=10;
 twistFireAtQ=-1; twistFireAtQ2=-1; gameQFireAtQ=-1; twistFired=false; twist2Fired=false; gameQFired=false;
 roundEventCount=0;
 earlyVotePlayerIdx=-1; earlyVoteResult=-1; reverseVotePlayerIdx=-1; reverseVoteResult=-1;
 lockedEarlyVotes={}; trustVoteLocks={};
 twistReverseVote=false; twistForcedVoterIdx=-1; twistForcedTargetIdx=-1;
 twistWordSwapped=false; twistSwappedList=[];
 insiderSpyIdx=-1;
 pendingPrivateLetter=null;
 roundScores={};
 players.forEach(n=>{ roundScores[n]=0; });
 lastFiredTwistId=null;
 lastSpyIdx=-1;
 show('s-setup');
 requestAnimationFrame(()=>renderSetupScreen());
}

function showMatchOver(){
 playSound('win'); haptic('heavy');
 // Find match winner
 const sorted=Object.entries(matchScores).sort((a,b)=>b[1]-a[1]);
 const winner=sorted[0];

 // Winner card
 document.getElementById('match-winner-wrap').innerHTML=`
  <div class="match-winner-card">
   <span class="match-crown">👑</span>
   <div class="mw-label">${T.matchWinnerLbl||'بطل اللعبة'}</div>
   <div class="mw-name">${winner?winner[0]:'?'}</div>
   <div class="mw-pts">${winner?winner[1]:0} ${T.ptsLbl||'pts'}</div>
  </div>`;

 // Full scoreboard
 const sbEntries=sorted.map(([name,pts],i)=>{
  const medals=['🥇','🥈','🥉'];
  return `<div class="sb-row${i===0?' leader':''}">
   <span class="sb-name">${medals[i]||''} ${name}</span>
   <span class="sb-pts">${pts}</span>
  </div>`;
 }).join('');
 document.getElementById('match-sb-wrap').innerHTML=`
  <div class="scoreboard" style="margin-bottom:14px;">
   <div class="sb-title">🏆 ${T.finalScoresLbl||'Final Scores'}</div>
   ${sbEntries}
  </div>`;

 // Round history
 document.getElementById('match-rounds-wrap').innerHTML=matchRoundHistory.map(r=>`
  <div class="round-history-item">
   <div class="rhi-top">
    <span class="rhi-round">${T.roundLblShort||'Round'} ${r.round}</span>
    <span class="rhi-winner">🥇 ${r.roundWinner||'—'}</span>
   </div>
   <div class="rhi-detail">
    ${T.outsiderLbl||'Outsider'}: ${r.outsider} —
    ${r.groupWon?(T.groupWonShort||'Group won'):(T.outsiderWonShort||'Outsider won')}
   </div>
  </div>`).join('');

 // Badge
 document.getElementById('match-over-badge').textContent=T.matchOverLabel||'🏆 Match Over';
 document.getElementById('btn-rematch').textContent=T.rematch||'🔄 New Game!';
 document.getElementById('btn-home-match').textContent=T.homeBtn||'🏠 Home';

 showMotivator(`👑 ${winner?winner[0]:'?'} ${T.dir==='rtl'?'فاز!':'wins!'}`);
 show('s-match-over');
}

function startNewMatch(){
    playSound('start'); haptic('heavy');
    matchActive = false;
    currentMatchRound = 0;
    matchScores = {};
    matchRoundHistory = [];
    outsiderIdx = -1;
    outsiderIdx2 = -1;
    outsiderCount = 1;
    matchRoundCount = 3;
    topic = null;
    outsiderWord = null;
    currentIdx = 0;
    votes = {};
    currentOpenVoter = 0;
    openVoteOrder = [];
    questions = [];
    currentQIdx = 0;
    storyIdx = -1;
    roundScores = {};
    twistFireAtQ = -1; twistFireAtQ2 = -1; gameQFireAtQ = -1; twistFired = false; twist2Fired = false; gameQFired = false;
    if(_timePressureInterval){clearInterval(_timePressureInterval);_timePressureInterval=null;_timerGeneration++;}
    _timerPaused = false; _timerSecsLeft = 10;
    earlyVotePlayerIdx = -1; earlyVoteResult = -1; reverseVotePlayerIdx = -1; reverseVoteResult = -1;
    lockedEarlyVotes = {}; trustVoteLocks = {};
    insiderSpyIdx = -1; twistWordSwapped = false; twistSwappedList = [];
    pendingPrivateLetter = null;
    lastTopicIdx = -1; lastStoryIdx = -1;
    const bar = document.getElementById('score-bar');
    if(bar) bar.classList.remove('visible');
    document.body.classList.remove('has-scorebar');
    show('s-players');
    rebuildPlayerGrid(true);
    
}

function goHome(){
 playSound('back'); haptic('light');
 matchActive=false; matchScores={}; matchRoundHistory=[];
 currentMatchRound=0;
 outsiderIdx=-1; topic=null; outsiderWord=null; currentIdx=0;
 votes={}; currentOpenVoter=0; openVoteOrder=[]; questions=[]; currentQIdx=0;
 storyIdx=-1; outsiderIdx2=-1; roundScores={};
 lastTopicIdx=-1; lastStoryIdx=-1;
 activeTwist=null; twistFireAtQ=-1; gameQFireAtQ=-1; twistFired=false; gameQFired=false;
 twistReverseVote=false; twistForcedVoterIdx=-1;
 twistForcedTargetIdx=-1;
 twistWordSwapped=false; twistSwappedList=[];
 insiderSpyIdx=-1;
 pendingPrivateLetter=null;
 earlyVotePlayerIdx=-1; earlyVoteResult=-1; reverseVotePlayerIdx=-1; reverseVoteResult=-1;
 lockedEarlyVotes={}; trustVoteLocks={};
 genreMode='random'; selectedGenre=null; outsiderMode='standard'; outsiderCount=1;
 const bar=document.getElementById('score-bar');
 bar.classList.remove('visible'); document.body.classList.remove('has-scorebar');
 setGenreMode('random'); setOutsiderMode('standard');
 show('s-home');
}

// ════════════════════════════════════════════════════════════════
// HISTORY
// ════════════════════════════════════════════════════════════════
function saveHistory(){
 // Only save on match completion
 if(currentMatchRound<matchRoundCount) return;
 try{
  const h=JSON.parse(localStorage.getItem('mkh8')||'[]');
  const winner=Object.entries(matchScores).sort((a,b)=>b[1]-a[1])[0];
  h.unshift({
   date:new Date().toLocaleDateString(),
   winner:winner?winner[0]:'?',
   pts:winner?winner[1]:0,
   rounds:matchRoundHistory.map(r=>({r:r.round,outsider:r.outsider,groupWon:r.groupWon,winner:r.roundWinner})),
   players:Object.keys(matchScores),
  });
  if(h.length>20) h.splice(20);
  localStorage.setItem('mkh8',JSON.stringify(h));
 } catch(e){}
}

function renderHistory(){
 const listEl=document.getElementById('history-list');
 let h=[];
 try{ h=JSON.parse(localStorage.getItem('mkh8')||'[]'); } catch(e){}
 const el=document.getElementById('history-title');
 if(el) el.textContent=T.historyTitle||'سجل الألعاب';
 const cl=document.getElementById('btn-clear-lbl');
 if(cl) cl.textContent=T.clearHistory||'مسح السجل';
 const clearBtn=document.getElementById('btn-clear-history');
 if(clearBtn) clearBtn.style.display=h.length?'flex':'none';
 if(!h.length){
  listEl.innerHTML=`<div style="text-align:center;padding:40px 0;color:var(--muted);">
   <div style="font-size:48px;margin-bottom:12px;">🏆</div>
   <div style="font-size:15px;font-weight:700;">${T.historyEmpty||'ما في ألعاب بعد!'}</div>
   <div style="font-size:13px;margin-top:8px;color:var(--muted);">${T.dir==='rtl'?'العب لعبة كاملة (3 جولات) لتظهر هنا':'Complete a full match to see it here'}</div>
  </div>`;
  return;
 }
 listEl.innerHTML=h.map(g=>`
  <div class="history-card">
   <div class="hc-top">
    <span class="hc-date">${g.date}</span>
    <span class="hc-winner">👑 ${g.winner} (${g.pts} ${T.ptsLbl||'pts'})</span>
   </div>
   <div style="font-size:12px;color:var(--muted);margin-bottom:8px;">${(g.players||[]).join(' · ')}</div>
   <div class="hc-rounds">
    ${(g.rounds||[]).map(r=>`<div class="hc-round">
     ${T.roundLblShort||'R'}${r.r}: <strong>${r.outsider}</strong> — ${r.groupWon?(T.caughtShort||'caught'):(T.escapedShort||'escaped')} · 🥇${r.winner||'—'}
    </div>`).join('')}
   </div>
  </div>`).join('');
}

function clearHistory(){
 if(confirm(T.clearHistoryConfirm||'Clear all history?')){
  localStorage.removeItem('mkh8');
  renderHistory();
 }
}