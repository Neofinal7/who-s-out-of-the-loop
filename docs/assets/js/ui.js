'use strict';
// ════════════════════════════════════════════════════════════════
// ui.js — Screen navigation, UI utilities, player setup UI,
//          render helpers (options, rules, genres), audio engine,
//          haptics, animations, PWA setup, splash + init
// ════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════
// NAVIGATION + UI UTILITIES
// ════════════════════════════════════════════════════════════════
// Static Array (not live NodeList) — safe to iterate while modifying classes
const _allScreens=Array.from(document.querySelectorAll('.screen'));
// Track the currently visible screen — lets show() remove active from just ONE screen
// instead of iterating and invalidating all N screens on every transition.
let _activeScreen=document.querySelector('.screen.active');
function show(id,instant){
 const el=document.getElementById(id);
 if(!el){console.error('Missing screen:',id);return;}
 if(pendingShowTimer){ clearTimeout(pendingShowTimer); pendingShowTimer=null; }
 clearUiPress();
 if(_activeScreen && _activeScreen!==el) _activeScreen.classList.remove('active');
 el.scrollTop=0;
 _activeScreen=el;
 el.classList.add('active');
}
function closeModal(id,e){if(e.target===document.getElementById(id))closeModalDirect(id);}
function closeModalDirect(id){const el=document.getElementById(id);if(el)el.classList.add('hidden');}
function openSettings(){getAudio();playSound('settings');document.getElementById('settings-modal').classList.remove('hidden');}
function openOptions(){playSound('tap');haptic('light');renderOptionsModal();document.getElementById('options-modal').classList.remove('hidden');}
function openRulesModal(){
 playSound('tap'); haptic('light');
 if(homeMenuNavLock) return;
 homeMenuNavLock=true;
 clearUiPress();
 clearHomeMenuPressed();
 renderRulesModal();
 document.getElementById('rules-modal').classList.remove('hidden');
 homeMenuNavLock=false;
}
function showHistory(){
 haptic('light');
 if(homeMenuNavLock) return;
 homeMenuNavLock=true;
 clearUiPress();
 clearHomeMenuPressed();
 show('s-history');
 renderHistory();
 homeMenuNavLock=false;
}
function goToPlayerSetup(mode){
 haptic('light'); playSound('tap');
 if(homeMenuNavLock) return;
 homeMenuNavLock=true;
 clearUiPress();
 clearHomeMenuPressed();
 gameMode=mode||'normal';
 if(mode==='story'){
  selectedGenre='story';
  genreMode='pick';
 }
 show('s-players');
 rebuildPlayerGrid(false);
 homeMenuNavLock=false;
}
function toggleLangMenu(){
 const dd=document.getElementById('lang-dropdown');
 const opening=dd.classList.contains('hidden');
 // Close any open dropdown first
 dd.classList.add('hidden');
 if(opening){
  dd.innerHTML=Object.entries(LANG_LABELS).map(([k,v])=>{
   const active=k===lang?' active':'';
   return '<div class="lang-opt'+active+'" data-lang="'+k+'">'+v+'</div>';
  }).join('');
  dd.classList.remove('hidden');
 }
}
// Single top-level delegation for lang dropdown — lives on document, never removed
document.addEventListener('click',function(e){
 const dd=document.getElementById('lang-dropdown');
 if(!dd||dd.classList.contains('hidden')) return;
 const opt=e.target.closest('.lang-opt');
 if(opt){
  const l=opt.getAttribute('data-lang');
  if(l){ dd.classList.add('hidden'); setLang(l); }
  return;
 }
 // Click outside dropdown and lang button closes it
 if(!e.target.closest('#lang-btn')){
  dd.classList.add('hidden');
 }
},true); // useCapture=true so it fires before any stopPropagation
function setLang(l){
 lang=l;T=LANGS[l]||LANGS.en;
 document.getElementById('lang-dropdown').classList.add('hidden');
 document.documentElement.lang=l==='ar'?'ar':'en';
 document.documentElement.dir=T.dir||'ltr';
 document.getElementById('lang-label').textContent=LANG_LABELS[l].split(' ')[0];
 applyTranslations();rebuildPlayerGrid(true);
}
function applyTranslations(){
 const s=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
 const h=(id,v)=>{const el=document.getElementById(id);if(el)el.innerHTML=v;};
 h('hero-title',T.heroTitle||'مين خارج اللعبة');
 s('hero-sub',T.heroSub||'');s('home-badge',T.badge||'Party Game');
 s('menu-play',T.menuPlay||'العب الآن');s('menu-play-sub',T.menuPlaySub||'');
 s('menu-story',T.menuStory||'سوالف');s('menu-story-sub',T.menuStorySub||'');
 s('menu-rules',T.menuRules||'القواعد');s('menu-rules-sub',T.menuRulesSub||'');
 s('menu-history',T.menuHistory||'السجل');s('menu-history-sub',T.menuHistorySub||'');
 s('options-btn-lbl',T.optionsBtnLbl||'خيارات');
 s('players-title',T.labelPlayers||'اللاعبون');
 s('label-players',T.labelPlayers||'اللاعبون');
 s('label-add-player',T.labelAddPlayer||'اضافة لاعب');
 s('btn-start',T.btnStart||'ابدأ!');s('btn-back-players',T.btnBack||'رجوع');
 s('setup-title',T.setupTitle||'اعداد الجولة');s('setup-sub',T.setupSub||'');
 s('label-genre-mode',T.labelGenreMode||'طريقة الفئة');
 s('label-random',T.labelRandom||'عشوائي');s('label-pick-genre',T.labelPickGenre||'اختار فئة');
 s('label-pick-a-genre',T.labelPickAGenre||'اختار الفئة');
 s('label-outsider-mode',T.labelOutsiderMode||'وضع الخارج');
 s('label-standard',T.labelStandard||'يفكر انه داخل');s('label-knows',T.labelKnows||'يعرف انه برا');
 s('btn-start-round',T.btnStartRound||'ابدأ الجولة!');s('btn-back-setup',T.btnBack||'رجوع');
 s('cover-warning',T.coverWarning||'ما تحكوا!');s('btn-show-word',T.btnShowWord||'شوف كلمتي');
 s('btn-memorized',T.btnMemorized||'حفظت');
 s('questions-badge',T.questionsBadge||'اسئلة');s('questions-title',T.questionsTitle||'اسألوا!');
 s('questions-sub',T.questionsSub||'');s('label-remaining',T.labelRemaining||'باقي');
 s('btn-done-questions',T.btnDoneQuestions||'تصويت');s('label-done-q',T.labelDoneQ||'تم');
 s('vote-badge',T.voteBadge||'التصويت');s('label-round',T.labelRound||'دور');s('label-of',T.labelOf||'من');
 s('tally-badge',T.tallyBadge||'نتائج');s('tally-title',T.tallyTitle||'النتائج');s('tally-sub',T.tallySub||'');
 s('btn-reveal',T.btnReveal||'اكشف!');s('reveal-label',T.revealLabel||'خارج اللعبة كان');
 s('label-group-word',T.labelGroupWord||'كلمة الجماعة');s('label-outsider-word',T.labelOutsiderWord||'كلمة الخارج');
 s('settings-title-text',T.settingsTitle||'الاعدادات');
 s('label-music',T.labelMusic||'موسيقى');s('label-music-sub',T.labelMusicSub||'');
 s('label-sfx',T.labelSfx||'اصوات');s('label-sfx-sub',T.labelSfxSub||'');
 s('label-vol',T.labelVol||'مستوى الصوت');
 s('history-title',T.historyTitle||'السجل');s('btn-back-history',T.btnBack||'رجوع');
 s('history-badge','📜 '+(T.historyTitle||'السجل'));
 s('btn-clear-lbl',T.clearHistory||'مسح السجل');
 s('btn-rematch',T.rematch||'لعبة جديدة!');s('btn-home-match',T.homeBtn||'القائمة');
 s('btn-twist-ok',T.twistBtnOk||'نبدأ!');s('hot-badge','HOT');
 // Image strip labels
 const ar=T.dir==='rtl';
 s('home-strip-lbl', ar?'العب مع أصحابك ✨':'Play with your crew ✨');
 s('players-strip-lbl', ar?'مين معاك الليلة؟ 👥':"Who's playing tonight? 👥");
 s('tally-strip-lbl', ar?'الجمهور اختار — والنتيجة؟':"The crowd voted — the verdict?");
 s('reveal-strip-lbl', ar?'اللحظة الحقيقية':'The Moment of Truth');
 s('matchover-strip-lbl', ar?'بطل اللعبة':'Match Champion');
 s('cover-strip-lbl', ar?'دورك — خذ التلفون':'Your turn — take the phone');
 s('setup-strip-lbl', ar?'جهّزوا الجولة':'Set up the round');
 renderGenreGrid();
}
function rebuildPlayerGrid(keepValues){
 const grid=document.getElementById('players-grid');if(!grid)return;
 const oldVals=keepValues?[...grid.querySelectorAll('.player-input')].map(i=>i.value):[];
 grid.innerHTML='';
 const count=Math.max(3,oldVals.length);
 for(let i=0;i<count;i++)appendPlayerRow(grid,i,oldVals[i]||'');
 updateCountLabel();
 const addBtn=document.getElementById('add-player-btn');
 if(addBtn)addBtn.style.display=count>=15?'none':'flex';
}
function appendPlayerRow(grid,idx,val){
 const row=document.createElement('div');row.className='player-row';
 const ph=(T.placeholders&&T.placeholders[idx])||T.defaultName(idx);
 const av=AVATARS[idx%AVATARS.length];
 row.innerHTML='<span class="player-num">'+av+'</span><input class="player-input" type="text" placeholder="'+ph+'" maxlength="12" value="'+(val||'')+'"><button class="remove-btn" onclick="removePlayer(this)">'+String.fromCharCode(10005)+'</button>';
 grid.appendChild(row);
}
function addPlayer(){
 const grid=document.getElementById('players-grid');
 const count=grid.querySelectorAll('.player-input').length;
 if(count>=15){document.getElementById('add-player-btn').style.display='none';return;}
 playSound('add');haptic('light');
 appendPlayerRow(grid,count,'');
 grid.lastChild.querySelector('input').focus();
 updateCountLabel();
 if(count+1>=15)document.getElementById('add-player-btn').style.display='none';
}
function removePlayer(btn){
 const grid=document.getElementById('players-grid');
 if(grid.querySelectorAll('.player-row').length<=3)return;
 playSound('remove');haptic('medium');
 btn.closest('.player-row').remove();
 [...grid.querySelectorAll('.player-row')].forEach((r,i)=>{
  r.querySelector('.player-num').textContent=AVATARS[i%AVATARS.length];
  r.querySelector('input').placeholder=(T.placeholders&&T.placeholders[i])||T.defaultName(i);
 });
 updateCountLabel();
 document.getElementById('add-player-btn').style.display='flex';
}
function updateCountLabel(){
 const n=document.querySelectorAll('.player-input').length;
 const el=document.getElementById('player-count-label');
 if(el)el.textContent=n+' '+(T.playersCountLbl||'players');
}
function setRoundCount(n){
 matchRoundCount=n;playSound('select');haptic('light');
 [1,3,5].forEach(x=>{const btn=document.getElementById('rounds-btn-'+x);if(btn)btn.className='tgl'+(n===x?' sel':'');});
}
function toggleOption(key){
 if(key==='twistsOn')twistsOn=!twistsOn;
 if(key==='gameQOn')gameQOn=!gameQOn;
 playSound('toggle');haptic('light');
 const el=document.getElementById(key==='twistsOn'?'twists-toggle':'gq-toggle');
 if(el)el.classList.toggle('on',key==='twistsOn'?twistsOn:gameQOn);
}
function renderOptionsModal(){
 const tt=document.getElementById('twists-toggle');if(tt)tt.classList.toggle('on',twistsOn);
 const gt=document.getElementById('gq-toggle');if(gt)gt.classList.toggle('on',gameQOn);
 [1,3,5].forEach(n=>{const btn=document.getElementById('rounds-btn-'+n);if(btn)btn.className='tgl'+(matchRoundCount===n?' sel':'');});
 const s=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
 s('options-title',T.optionsTitle||'خيارات اللعبة');
 s('opt-rounds-lbl',T.optRoundsLbl||'عدد الجولات');
 s('opt-twists-sec',T.optTwistsSec||'التحديات');
 s('opt-twists-lbl',T.optTwistsLbl||'تحديات');s('opt-twists-sub',T.optTwistsSub||'');
 s('opt-gq-lbl',T.optGqLbl||'سؤال اللعبة');s('opt-gq-sub',T.optGqSub||'');
 s('opt-save',T.optSave||'حفظ');
 const ar=T.dir==='rtl';
 const ps=document.getElementById('punish-selector');
 if(ps){
  const opts=[
   {k:'any', e:'🎲', lbl:ar?'أي عقوبة (الجماعة تختار)':'Any (group picks each time)'},
   {k:'truth',e:'💬', lbl:ar?'صراحة دايماً':'Always Truth'},
   {k:'dare', e:'🎭', lbl:ar?'تحدي دايماً':'Always Dare'},
   {k:'guess',e:'🧠', lbl:ar?'خمّن الكلمة دايماً':'Always Guess the Word'},
  ];
  ps.innerHTML=`<div class="toggle-row" style="flex-wrap:wrap;gap:6px;">
   ${opts.map(o=>`<button class="tgl${selectedPunishment===o.k?' sel':''}" style="flex:1 1 40%;font-size:12px;padding:9px 5px;" onclick="setPunishment('${o.k}')">${o.e} ${o.lbl}</button>`).join('')}
  </div>`;
 }
}
function setPunishment(type){
 selectedPunishment=type;
 playSound('select');haptic('light');
 renderOptionsModal();
}
function renderRulesModal(){
 const ar=T.dir==='rtl';
 const items=ar?[
  {e:'🕵️',t:'الهدف',d:'واحد من اللاعبين عنده كلمة مختلفة — الجماعة تحاول تكشفه.'},
  {e:'🎯',t:'الكلمات',d:'الجماعة تشوف نفس الكلمة. الخارج يشوف كلمة مختلفة أو ما يشوف شي.'},
  {e:'❓',t:'الأسئلة',d:'كل لاعب يسأل اللي جنبه سؤال عن الكلمة. جاوب بذكاء.'},
  {e:'🗳️',t:'التصويت',d:'كل لاعب يصوت على مين يشك إنه الخارج.'},
  {e:'📊',t:'النقاط',d:'إذا مسكوا الخارج: الجماعة +10 للشخص، الخارج +5. إذا نجا الخارج: الخارج +10، الجماعة +0. إذا خمّن الخارج الكلمة صح: +10 إضافية.'},
  {e:'🎲',t:'التحديات',d:'في كل جولة احتمال يصير تحدي مفاجئ يغير اللعبة — مو دايماً!'},
  {e:'📖',t:'القصص',d:'وضع خاص — كل لاعب يقرأ قصة مختلفة ويحاول يخدع الكل.'},
  {e:'🎡',t:'عقوبة العجلة',d:'إذا خسر الخارج — عجلة الحظ تدور وتختار بين: جرائة (تحدي)، صراحة (سؤال)، أو فرصة ثانية (خمّن كلمة الجماعة).'},
 ]:[
  {e:'🕵️',t:'Goal',d:'One player has a different word. The group tries to find them out.'},
  {e:'🎯',t:'Words',d:'Everyone sees the same word. The Outsider sees something different or nothing.'},
  {e:'❓',t:'Questions',d:'Each player asks the one next to them a question about the word. Answer smart.'},
  {e:'🗳️',t:'Voting',d:'Everyone votes on who they think is the Outsider.'},
  {e:'📊',t:'Points',d:'Group caught Outsider: each insider +10, Outsider +5. Outsider escaped: Outsider +10, group +0. Outsider guesses the word correctly: +10 bonus.'},
  {e:'🎲',t:'Twists',d:'Each round has a ~60% chance of a surprise twist — not every round!'},
  {e:'📖',t:'Stories',d:'Special mode — each player reads a different story and tries to bluff.'},
  {e:'🎡',t:'Punishment Wheel',d:'If the Outsider loses — a spinning wheel randomly picks: Dare (جرائة), Truth (صراحة), or Second Chance (guess the group word).'},
 ];
 const el=document.getElementById('rules-modal-title');if(el)el.textContent=T.rulesTitle||'القواعد';
 const content=document.getElementById('rules-content');
 if(content)content.innerHTML=items.map(x=>'<div class="rules-item"><div class="ri-emoji">'+x.e+'</div><div><div class="ri-title">'+x.t+'</div><div class="ri-desc">'+x.d+'</div></div></div>').join('');
}

function goToRoundSetup(){
 markUiPress(document.getElementById('btn-start'),'mouse');
 const inputs=document.querySelectorAll('.player-input');
 let count=0;
 inputs.forEach((inp,i)=>{ if(i<3||inp.value.trim()) count++; });
 if(count<3){ alert(T.minPlayers); return; }
 playSound('start'); haptic('heavy');
 // Collect players
 players=[];
 inputs.forEach((inp,i)=>{
  const v=inp.value.trim();
  if(i<3) players.push(v||T.defaultName(i));
  else if(v) players.push(v);
 });
 // Init match if first round
 if(!matchActive){
  matchActive=true;
  currentMatchRound=0;
  matchScores={};
  matchRoundHistory=[];
  players.forEach(n=>{ matchScores[n]=0; });
 }
 show('s-setup');
 requestAnimationFrame(()=>renderSetupScreen());
}

function renderSetupScreen(){
 const pips=document.getElementById('round-counter-dots');
 if(pips){
  pips.innerHTML=Array.from({length:matchRoundCount},(_,i)=>{
   let cls='round-pip';
   if(i<currentMatchRound) cls+=' done';
   else if(i===currentMatchRound) cls+=' active';
   return `<div class="${cls}"></div>`;
  }).join('');
 }
 const rb=document.getElementById('round-info-badge');
 if(rb) rb.textContent=T.roundLbl(currentMatchRound+1,matchRoundCount);
 // Sync genre mode buttons
 const grb=document.getElementById('genre-random-btn');
 const gpb=document.getElementById('genre-pick-btn');
 if(grb) grb.className='tgl'+(genreMode==='random'?' sel':'');
 if(gpb) gpb.className='tgl'+(genreMode==='pick'?' sel':'');
 const gps=document.getElementById('genre-picker-section');
 if(gps) gps.style.display=genreMode==='pick'?'block':'none';
 // Sync outsider mode buttons
 const osb=document.getElementById('outsider-standard-btn');
 const okb=document.getElementById('outsider-knows-btn');
 if(osb) osb.className='tgl'+(outsiderMode==='standard'?' sel':'');
 if(okb) okb.className='tgl'+(outsiderMode==='knows'?' sel':'');
 renderGenreGrid();
}

function renderGenreGrid(){
 const grid=document.getElementById('genre-grid');
 if(!grid) return;
 const genres=T.genres||LANGS.ar.genres;
 grid.innerHTML=Object.entries(genres).map(([key,g])=>{
  const isStory=g.isStory||key==='story';
  const isSel=selectedGenre===key;
  const cls=['genre-card',isSel?'selected':'',isStory?'story-genre':''].filter(Boolean).join(' ');
  const extra=isStory?`<div class="hot-badge" style="top:4px;left:4px;">🔥</div>`:'';
  return `<button class="${cls}" onclick="selectGenre('${key}')" style="position:relative;overflow:hidden;">
   ${extra}${g.label}
  </button>`;
 }).join('');
}

function setGenreMode(mode){
 playSound('toggle'); haptic('light');
 genreMode=mode;
 if(mode==='random'){
  if(selectedGenre==='story') selectedGenre=null;
  if(gameMode==='story') gameMode='normal';
 } else if(mode==='pick'&&selectedGenre==='story'){
  gameMode='story';
 }
 document.getElementById('genre-random-btn').className='tgl'+(mode==='random'?' sel':'');
 document.getElementById('genre-pick-btn').className='tgl'+(mode==='pick'?' sel':'');
 document.getElementById('genre-picker-section').style.display=mode==='pick'?'block':'none';
 renderGenreGrid();
}
function selectGenre(key){
 playSound('select'); haptic('light');
 selectedGenre=key;
 // Story genre forces story mode
 if(key==='story') gameMode='story';
 else if(gameMode==='story') gameMode='normal';
 renderGenreGrid();
}
function setOutsiderMode(mode){
 playSound('toggle'); haptic('light');
 outsiderMode=mode;
 document.getElementById('outsider-standard-btn').className='tgl'+(mode==='standard'?' sel':'');
 document.getElementById('outsider-knows-btn').className='tgl'+(mode==='knows'?' sel':'');
}

// ════════════════════════════════════════════════════════════════
// GUARDS
// ════════════════════════════════════════════════════════════════
function safePlayers(){
 if(!players||players.length<3){ alert(T.minPlayers||'Need at least 3 players!'); return false; }
 return true;
}
function safeTopic(){
 return !!(topic);
}


// ════════════════════════════════════════════════════════════════
// AUDIO ENGINE
// ════════════════════════════════════════════════════════════════
let audioCtx=null,sfxGainNode=null,compressor=null;
let sfxOn=true,masterVol=1.0;

function getAudio(){
 if(!audioCtx){
  audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  compressor=audioCtx.createDynamicsCompressor();
  compressor.threshold.value=-3; compressor.knee.value=2;
  compressor.ratio.value=6; compressor.attack.value=0.001; compressor.release.value=0.08;
  compressor.connect(audioCtx.destination);
  sfxGainNode=audioCtx.createGain(); sfxGainNode.gain.value=masterVol*2.2; sfxGainNode.connect(compressor);
 }
 // Only resume if actually suspended — avoids async overhead on every sound call
 if(audioCtx.state==='suspended') audioCtx.resume();
 return audioCtx;
}

function playSound(type){
 if(!sfxOn) return;
 try{
  const ctx=getAudio(),t=ctx.currentTime;
  const mk=(freq,wt,start,dur,gain)=>{
   const o=ctx.createOscillator(),g=ctx.createGain();
   o.type=wt||'sine'; o.frequency.value=freq;
   g.gain.setValueAtTime(gain*2.2,t+start);
   g.gain.exponentialRampToValueAtTime(0.0001,t+start+dur);
   o.connect(g); g.connect(sfxGainNode); o.start(t+start); o.stop(t+start+dur+.01);
  };
  const nz=(start,dur,gain)=>{
   const buf=ctx.createBuffer(1,ctx.sampleRate*dur,ctx.sampleRate),d=buf.getChannelData(0);
   for(let j=0;j<d.length;j++) d[j]=(Math.random()*2-1)*(1-j/d.length);
   const s=ctx.createBufferSource(),g=ctx.createGain();
   s.buffer=buf; g.gain.value=gain*2.2; s.connect(g); g.connect(sfxGainNode); s.start(t+start);
  };
  switch(type){
   case 'tap':mk(520,'sine',0,.08,1.2);break;
   case 'back':mk(320,'sine',0,.08,1.0);break;
   case 'start':mk(440,'sine',0,.05,1.0);mk(660,'sine',.06,.1,1.2);mk(880,'sine',.13,.15,1.0);break;
   case 'done':mk(523,'sine',0,.15,1.4);mk(659,'sine',.1,.18,1.4);mk(784,'sine',.2,.22,1.4);break;
   case 'skip':mk(400,'sine',0,.06,.8);mk(300,'sine',.06,.08,.6);break;
   case 'word':mk(660,'sine',0,.04,1.5);mk(880,'sine',.05,.08,1.3);mk(1100,'sine',.1,.14,1.0);break;
   case 'vote':mk(440,'sine',0,.05,1.2);mk(550,'sine',.06,.09,1.0);break;
   case 'add':mk(600,'sine',0,.06,1.0);mk(800,'sine',.07,.1,1.2);break;
   case 'remove':mk(400,'sine',0,.05,.9);mk(280,'sine',.05,.08,.7);break;
   case 'toggle':mk(660,'sine',0,.06,1.0);break;
   case 'select':mk(500,'sine',0,.05,1.0);mk(700,'sine',.05,.08,1.1);break;
   case 'reveal':
    mk(120,'sawtooth',0,.4,1.8);nz(0,.4,.8);
    setTimeout(()=>{if(!sfxOn)return;[784,988,1175,1568].forEach((f,i)=>mk(f,'sine',i*.11,.25,1.6));},450);
    break;
   case 'win':[523,659,784,1047,1319].forEach((f,i)=>mk(f,'sine',i*.09,.3,1.5));break;
   case 'lose':[400,320,250].forEach((f,i)=>mk(f,'sine',i*.1,.25,1.2));break;
   case 'settings':mk(550,'sine',0,.07,.9);break;
  }
 } catch(e){}
}

function haptic(type){
 try{
  if(!navigator.vibrate) return;
  if(type==='heavy') navigator.vibrate([40,10,40]);
  else if(type==='medium') navigator.vibrate(30);
  else navigator.vibrate(15);
 } catch(e){}
}

function toggleSfx(){
 sfxOn=!sfxOn;
 document.getElementById('sfx-toggle').classList.toggle('on',sfxOn);
 if(sfxOn) playSound('toggle');
}
function setVolume(v){
 masterVol=v/100;
 if(sfxGainNode) sfxGainNode.gain.value=masterVol*2.2;
}


// ════════════════════════════════════════════════════════════════
// PWA
// ════════════════════════════════════════════════════════════════
function generateIcon(size){
 const canvas=document.createElement('canvas');
 canvas.width=size;canvas.height=size;
 const ctx2=canvas.getContext('2d');
 const grad=ctx2.createLinearGradient(0,0,size,size);
 grad.addColorStop(0,'#ff5e99');grad.addColorStop(1,'#ff7a30');
 const r=size*.22;
 ctx2.beginPath();ctx2.moveTo(r,0);ctx2.lineTo(size-r,0);ctx2.quadraticCurveTo(size,0,size,r);
 ctx2.lineTo(size,size-r);ctx2.quadraticCurveTo(size,size,size-r,size);
 ctx2.lineTo(r,size);ctx2.quadraticCurveTo(0,size,0,size-r);
 ctx2.lineTo(0,r);ctx2.quadraticCurveTo(0,0,r,0);ctx2.closePath();
 ctx2.fillStyle=grad;ctx2.fill();
 ctx2.font=`${size*.52}px serif`;ctx2.textAlign='center';ctx2.textBaseline='middle';
 ctx2.fillText('🕵️',size/2,size/2+size*.03);
 return canvas.toDataURL('image/png');
}
const MANIFEST={name:'مين خارج اللعبة',short_name:'مين خارج',display:'standalone',
 orientation:'portrait',background_color:'#ff5e99',theme_color:'#ff5e99',lang:'ar',dir:'rtl',
 icons:[{src:generateIcon(192),sizes:'192x192',type:'image/png',purpose:'any maskable'},
        {src:generateIcon(512),sizes:'512x512',type:'image/png',purpose:'any maskable'}]};
const mBlob=new Blob([JSON.stringify(MANIFEST)],{type:'application/json'});
document.getElementById('pwa-manifest').href=URL.createObjectURL(mBlob);

if('serviceWorker' in navigator){
 const SW=`const C='mkg-v8';self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['/'])));self.skipWaiting();});self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim();});self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>r)));});`;
 navigator.serviceWorker.register(URL.createObjectURL(new Blob([SW],{type:'application/javascript'}))).catch(()=>{});
}

let _dip=null;
window.addEventListener('beforeinstallprompt',e=>{
 e.preventDefault();_dip=e;
 if(!localStorage.getItem('ib-dismissed')){
  setTimeout(()=>{
   document.getElementById('install-banner').style.display='flex';
   document.body.style.paddingBottom='90px';
  },3000);
 }
});
function installApp(){
 if(!_dip) return;
 document.getElementById('install-banner').classList.add('hide');
 _dip.prompt();_dip.userChoice.then(()=>{_dip=null;setTimeout(()=>{document.getElementById('install-banner').style.display='none';document.body.style.paddingBottom='';},400);});
}
function dismissInstall(){
 document.getElementById('install-banner').classList.add('hide');
 localStorage.setItem('ib-dismissed','1');
 setTimeout(()=>{document.getElementById('install-banner').style.display='none';document.body.style.paddingBottom='';},400);
}
window.addEventListener('appinstalled',()=>{document.getElementById('install-banner').style.display='none';document.body.style.paddingBottom='';});


// ════════════════════════════════════════════════════════════════
// SPLASH + CLOSE LANG MENU ON OUTSIDE CLICK
// ════════════════════════════════════════════════════════════════
window.addEventListener('load',()=>{
 const min=new Promise(r=>setTimeout(r,1400));
 min.then(()=>{
  const s=document.getElementById('splash');
  s.classList.add('hide');
  setTimeout(()=>s.remove(),600);
 });
});
// lang dropdown click handling moved to toggleLangMenu block above

// ════════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════════
// Defer heavy init work until after first paint — keeps splash smooth
requestAnimationFrame(()=>{
 rebuildPlayerGrid(false);
 applyTranslations();
});
// ── Patch: options button wiggle style injection ──
(function(){
 const _s=document.createElement('style');
 _s.textContent=`
/* === OPTIONS BUTTON WIGGLE (injected by patch) === */
@keyframes optionsPulse {
  0%   { transform: rotate(0deg)   scale(1);    }
  10%  { transform: rotate(-8deg)  scale(1.07); }
  20%  { transform: rotate(8deg)   scale(1.07); }
  30%  { transform: rotate(-6deg)  scale(1.05); }
  40%  { transform: rotate(6deg)   scale(1.05); }
  50%  { transform: rotate(-3deg)  scale(1.03); }
  60%  { transform: rotate(3deg)   scale(1.03); }
  70%  { transform: rotate(0deg)   scale(1);    }
  100% { transform: rotate(0deg)   scale(1);    }
}
#options-btn {
  font-size: 19px !important;
  font-weight: 900 !important;
  padding: 13px 24px !important;
  border: 2.5px solid rgba(255,255,255,0.55) !important;
  letter-spacing: 0.5px !important;
  background: linear-gradient(135deg, #ff1f7a, #ff7a30) !important;
  box-shadow: 0 4px 24px rgba(255,94,153,.7), 0 0 0 0 rgba(255,94,153,.4) !important;
}
`;
 document.head.appendChild(_s);
})();
