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
 const ar=T.dir==='rtl';
 const appTitle=ar?'مين خارج اللعبة':"Who's Out of the Loop?";
 document.title=appTitle;
 const appMeta=document.querySelector('meta[name="apple-mobile-web-app-title"]');
 if(appMeta) appMeta.content=appTitle;
 const appName=document.querySelector('meta[name="application-name"]');
 if(appName) appName.content=appTitle;
 const splash=document.getElementById('splash');
 if(splash){
  const t=splash.querySelector('.spl-title');
  const sub=splash.querySelector('.spl-sub');
  if(t) t.textContent=appTitle;
  if(sub) sub.textContent=ar?'يقلب اللعبة بين الأصدقاء — مين فهم كلمة مختلفة أولاً':'A party game of hidden words and bluffing';
 }
 const install=document.getElementById('install-banner');
 if(install){
  const t=install.querySelector('.ib-title');
  const sub=install.querySelector('.ib-sub');
  const btn=install.querySelector('.ib-btn');
  if(t) t.textContent=ar?'حمّل التطبيق':'Install the app';
  if(sub) sub.textContent=ar?'العب بدون انترنت':'Play offline anytime';
  if(btn) btn.textContent=ar?'تثبيت':'Install';
 }
 h('hero-title',T.heroTitle||'مين خارج اللعبة');
 s('hero-sub',T.heroSub||'');s('home-badge',T.badge||'Party Game');
 s('menu-play',T.menuPlay||'العب الآن');s('menu-play-sub',T.menuPlaySub||'');
 s('menu-story',T.menuStory||'سوالف');s('menu-story-sub',T.menuStorySub||'');
 s('menu-rules',T.menuRules||'القواعد');s('menu-rules-sub',T.menuRulesSub||'');
 s('menu-history',T.menuHistory||'السجل');s('menu-history-sub',T.menuHistorySub||'');
 s('players-title',T.labelPlayers||'اللاعبون');
 s('label-players',T.labelPlayers||'اللاعبون');
 s('players-badge',T.labelPlayers||'اللاعبون');
 s('players-sub',T.playersSub|| (ar?'أضيفوا اللاعبين قبل ما تبدأوا':'Add players before starting'));
 s('label-add-player',T.labelAddPlayer||'اضافة لاعب');
 s('btn-start',T.btnStart||'ابدأ!');s('btn-back-players',T.btnBack||'رجوع');
 s('setup-title',T.setupTitle||'اعداد الجولة');s('setup-sub',T.setupSub||'');
 s('setup-badge',T.setupBadge||'⚙️ إعداد الجولة');
 s('label-genre-mode',T.labelGenreMode||'طريقة الفئة');
 s('label-random',T.labelRandom||'عشوائي');s('label-pick-genre',T.labelPickGenre||'اختار فئة');
 s('label-pick-a-genre',T.labelPickAGenre||'اختار الفئة');
 s('label-outsider-mode',T.labelOutsiderMode||'وضع الخارج');
 s('label-standard',T.labelStandard||'يفكر انه داخل');s('label-knows',T.labelKnows||'يعرف انه برا');
 s('btn-start-round',T.btnStartRound||'ابدأ الجولة!');s('btn-back-setup',T.btnBack||'رجوع');
 s('cover-warning',T.coverWarning||'ما تحكوا!');s('btn-show-word',T.btnShowWord||'شوف كلمتي');
 s('cover-pass-text',T.coverPassText|| (ar?'سلّم التلفون لـ':'Pass phone to'));
 s('cover-eyes-text',T.coverEyesText|| (ar?'الباقين يبعدوا عيونهم!':'everyone else look away!'));
 s('btn-memorized',T.btnMemorized||'حفظت');
 s('questions-badge',T.questionsBadge||'اسئلة');s('questions-title',T.questionsTitle||'اسألوا!');
 s('questions-sub',T.questionsSub||'');s('label-remaining',T.labelRemaining||'باقي');
 s('label-done-q',T.labelDoneQ||'تم');
 s('vote-badge',T.voteBadge||'التصويت');s('label-round',T.labelRound||'دور');s('label-of',T.labelOf||'من');
 s('tally-badge',T.tallyBadge||'نتائج');s('tally-title',T.tallyTitle||'النتائج');s('tally-sub',T.tallySub||'');
 s('btn-reveal',T.btnReveal||'اكشف!');s('reveal-label',T.revealLabel||'خارج اللعبة كان');
 s('label-group-word',T.labelGroupWord||'كلمة الجماعة');s('label-outsider-word',T.labelOutsiderWord||'كلمة الخارج');
 s('settings-title-text',T.settingsTitle||'الاعدادات');
 s('label-music',T.labelMusic||'موسيقى');s('label-music-sub',T.labelMusicSub||'');
 s('label-sfx',T.labelSfx||'اصوات');s('label-sfx-sub',T.labelSfxSub||'');
 s('label-vol',T.labelVol||'مستوى الصوت');
 s('opt-rounds-lbl',T.optRoundsLbl|| (ar?'عدد الجولات في اللعبة':'Rounds per match'));
 s('opt-twists-sec',T.optTwistsSec|| (ar?'التحديات العشوائية':'Random Twists'));
 s('opt-twists-lbl',T.optTwistsLbl|| (ar?'🎲 تحديات مفاجئة':'🎲 Random Twists'));
 s('opt-twists-sub',T.optTwistsSub|| (ar?'أحداث تغير مجرى اللعبة':'Events that change the game'));
 s('opt-twist-count-lbl',T.optTwistCountLbl|| (ar?'🎯 عدد التحديات في الجولة':'🎯 Twists per round'));
 s('opt-twist-count-sub',T.optTwistCountSub|| (ar?'اختار كم تحدي يطلع بكل جولة':'Choose how many twists can happen each round'));
  s('opt-twist-count-note',T.optTwistCountNote|| (ar?'🔒 1 دائمًا، و2 و3 يفتحوا عند 5+ لاعبين، و5 عند 11+ لاعبين':'🔒 1 is always available, 2 and 3 unlock at 5+ players, and 5 unlocks at 11+ players'));
 s('opt-gq-lbl',T.optGqLbl|| (ar?'❓ سؤال اللعبة':'❓ Game Question'));
 s('opt-gq-sub',T.optGqSub|| (ar?'سؤال ذكي يطرحه اللعب':'An extra question from the game'));
 s('opt-imposters-lbl',T.optImpostersLbl|| (ar?'🕵️ عدد الخارجين':'🕵️ Number of Outsiders'));
 s('opt-imposters-note',T.optImpostersNote|| (ar?'⚠️ يحتاج 5 لاعبين أو أكثر لاختيار 2 خارجين':'⚠️ Requires 5+ players to choose 2 outsiders'));
 s('history-title',T.historyTitle||'السجل');s('btn-back-history',T.btnBack||'رجوع');
 s('history-badge','📜 '+(T.historyTitle||'السجل'));
 s('btn-clear-lbl',T.clearHistory||'مسح السجل');
 s('btn-rematch',T.rematch||'لعبة جديدة!');s('btn-home-match',T.homeBtn||'القائمة');
 s('btn-twist-ok',T.twistBtnOk||'نبدأ!');s('hot-badge','HOT');
 s('match-over-badge',T.matchOverLabel|| (ar?'🏆 نهاية اللعبة':'🏆 Match Over'));
 s('rules-close-btn','✕');
 // Image strip labels
 s('home-strip-lbl', ar?'العب مع أصحابك ✨':'Play with your crew ✨');
 s('players-strip-lbl', ar?'مين معاك الليلة؟ 👥':"Who's playing tonight? 👥");
 s('tally-strip-lbl', ar?'الجمهور اختار — والنتيجة؟':"The crowd voted — the verdict?");
 s('reveal-strip-lbl', ar?'اللحظة الحقيقية':'The Moment of Truth');
 s('matchover-strip-lbl', ar?'بطل اللعبة':'Match Champion');
 s('cover-strip-lbl', ar?'دورك — خذ التلفون':'Your turn — take the phone');
 s('setup-strip-lbl', ar?'جهّزوا الجولة':'Set up the round');
 const rulesModal=document.getElementById('rules-modal');
 if(rulesModal && !rulesModal.classList.contains('hidden')) renderRulesModal();
 if(document.getElementById('s-options')?.classList.contains('active')){
  syncTwistCountButtons();
  _syncOutsiderButtons();
 }
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
 const hint=T.dir==='rtl'?'غيّر الاسم هنا':'Tap to rename';
 row.innerHTML='<div class="player-row-head"><span class="player-num">'+av+'</span><div class="player-copy"><div class="player-slot">'+ph+'</div><div class="player-hint">'+hint+'</div></div><button class="remove-btn" onclick="removePlayer(this)">'+String.fromCharCode(10005)+'</button></div><input class="player-input" type="text" placeholder="'+ph+'" maxlength="12" value="'+(val||'')+'">';
 grid.appendChild(row);
}
function addPlayer(){
 const grid=document.getElementById('players-grid');
 const count=grid.querySelectorAll('.player-input').length;
 if(count>=15){document.getElementById('add-player-btn').style.display='none';return;}
 playSound('add');haptic('light');
 appendPlayerRow(grid,count,'');
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
  const ph=(T.placeholders&&T.placeholders[i])||T.defaultName(i);
  const slot=r.querySelector('.player-slot');
  if(slot) slot.textContent=ph;
  r.querySelector('input').placeholder=ph;
 });
 updateCountLabel();
 document.getElementById('add-player-btn').style.display='flex';
}
function updateCountLabel(){
 const n=document.querySelectorAll('.player-input').length;
 const el=document.getElementById('player-count-label');
 if(el){
  const label=T.playersCountLbl||'players';
  const hint=T.dir==='rtl'?'رتبوا الأسماء قبل البداية':'Set your lineup before starting';
  el.innerHTML='<span class="player-count-badge">👥 '+n+' '+label+'</span><div style="font-size:12px;color:var(--muted);line-height:1.6;">'+hint+'</div>';
 }
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
 if(key==='twistsOn') syncTwistCountButtons();
}

function getAllowedTwistCounts(playerCount){
 const n=Number(playerCount||0);
 if(n>=11) return [1,2,3,5];
 if(n>=5) return [1,2,3];
 return [1];
}

function getTwistCountMeta(n, ar){
 if(n===1) return {label:'1',sub:ar?'دايمًا':'Always'};
 if(n===2) return {label:'2',sub:'5+'};
 if(n===3) return {label:'3',sub:'5+'};
 if(n===5) return {label:'5',sub:'11+'};
 return {label:String(n),sub:''};
}

function syncTwistCountButtons(){
 const ar=T.dir==='rtl';
 const note=document.getElementById('opt-twist-count-note');
 const title=document.getElementById('opt-twist-count-lbl');
 const sub=document.getElementById('opt-twist-count-sub');
 const allowed=getAllowedTwistCounts(players.length);
 if(!allowed.includes(selectedTwistCount)) selectedTwistCount=allowed[0]||1;
 [1,2,3,5].forEach(n=>{
  const btn=document.getElementById('twists-count-btn-'+n);
  if(!btn) return;
  const unlocked=twistsOn&&allowed.includes(n);
  const sel=twistsOn&&selectedTwistCount===n;
  btn.className='tgl'+(sel?' sel':'')+(unlocked?'':' tgl-locked');
  const meta=getTwistCountMeta(n, ar);
  btn.innerHTML=`<span class="twist-count-main">${meta.label}</span><span class="twist-count-mini">${meta.sub}</span>`;
  if(!unlocked) btn.innerHTML+=`<span class="twist-count-mini">🔒</span>`;
  btn.setAttribute('aria-disabled',unlocked?'false':'true');
  btn.dataset.locked=unlocked?'0':'1';
 }
 );
 if(note){
  note.style.display='block';
  note.textContent=twistsOn
   ?(T.optTwistCountNote||'🔒 1 is always available, 2 and 3 unlock at 5+ players, and 5 unlocks at 11+ players')
   :(ar?'فعّل التحديات أولاً':'Turn twists on first');
 }
 if(title) title.textContent=T.optTwistCountLbl||'🎯 Twists per round';
 if(sub) sub.textContent=T.optTwistCountSub||'Choose how many twists can happen each round';
}

function setTwistCount(n){
 const allowed=getAllowedTwistCounts(players.length);
 if(!twistsOn) return;
 if(!allowed.includes(n)) return;
 selectedTwistCount=n;
 playSound('select');haptic('light');
 syncTwistCountButtons();
}
function renderRulesModal(){
 const ar=T.dir==='rtl';
 const sections=ar?[
  {
   e:'🎯',
   t:'الهدف',
   items:[
    {e:'1',t:'الفكرة',d:'واحد من اللاعبين عنده كلمة مختلفة، والجماعة تحاول تكشفه قبل نهاية الجولة.'},
    {e:'2',t:'الفوز',d:'بعد التصويت، نقارن النتيجة ونحسب النقاط، وبعد عدد الجولات المحدد يفوز أعلى مجموع.'},
   ],
  },
  {
   e:'⚙️',
   t:'قبل البداية',
   items:[
    {e:'👥',t:'عدد اللاعبين',d:'لازم 3 لاعبين على الأقل. خيار الخارجين الاثنين يفتح فقط إذا عندكم 5 لاعبين أو أكثر.'},
    {e:'🎛️',t:'الإعدادات',d:'تقدر تختار عدد الجولات، وتشغّل أو تطفي التحديات العشوائية، وسؤال اللعبة، وطريقة الفئة.'},
    {e:'📚',t:'وضع القصص',d:'في هذا الوضع، كل لاعب يشوف قصة مختلفة بدل كلمة عادية.'},
   ],
  },
  {
   e:'🔁',
   t:'سير الجولة',
   items:[
    {e:'📱',t:'الكلمة',d:'يمر التلفون على اللاعبين واحد واحد، وكل لاعب يشوف كلمته الخاصة بسرية.'},
    {e:'❓',t:'الأسئلة',d:'كل لاعب يسأل اللي جنبه سؤال عن الكلمة. إذا كان سؤال اللعبة شغال، يطلع لاعب عشوائي بسؤال إضافي.'},
    {e:'🗳️',t:'التصويت',d:'بعد الأسئلة يبدأ التصويت. بعض التحديات قد تجبر لاعبًا على التصويت مبكرًا أو تغيّر شكل التصويت النهائي.'},
   ],
  },
  {
   e:'🎲',
   t:'التحديات',
   items:[
    {e:'⏱️',t:'متى تطلع؟',d:'إذا كانت التحديات مفعّلة، تختار من الإعدادات كم تحدي يطلع بكل جولة: 1 أو 2 أو 3 أو 5 حسب عدد اللاعبين.'},
    {e:'🧠',t:'كيف تطلع؟',d:'التحديات تتوزع على الجولة حسب العدد المختار بدل ما تتغير تلقائياً مع عدد اللاعبين.'},
    {e:'✨',t:'أمثلة',d:'تبديل كلمات، جاسوس سري، حرف سري، الحرف الثالث علنًا، عدد الحروف علنًا، وتلميحان واحد منهما كذب.'},
   ],
  },
  {
   e:'📊',
   t:'النقاط',
   items:[
    {e:'✅',t:'إذا مسكوا الخارج',d:'كل لاعب داخل +10، والخارج +5.'},
    {e:'🏃',t:'إذا نجا الخارج',d:'الخارج +10 والجماعة +0.'},
    {e:'🌟',t:'بونص إضافي',d:'إذا الخارج خمّن كلمة الجماعة صح، يأخذ +10 إضافية. وإذا لاعب وثق في داخل صح في تحدي التصويت العكسي، يأخذ +5.'},
   ],
  },
  {
   e:'🎡',
   t:'النهاية والعقوبة',
   items:[
    {e:'🏆',t:'نهاية المباراة',d:'بعد آخر جولة، أعلى مجموع نقاط يفوز بالمباراة.'},
    {e:'🎯',t:'عجلة العقوبة',d:'إذا مسكوا الخارج وكان وضع العقوبة عشوائيًا، العجلة تختار بين صراحة، تحدي، أو فرصة ثانية لتخمين كلمة الجماعة.'},
    {e:'📖',t:'معلومة مهمة',d:'إذا كانت العقوبة "تخمين"، يقدر الخارج يحاول يخطف بونص بدل العجلة.'},
   ],
  },
 ]:[
  {
   e:'🎯',
   t:'Goal',
   items:[
    {e:'1',t:'The point',d:'One player has a different word, and the group tries to uncover them before the round ends.'},
    {e:'2',t:'Winning',d:'After voting, points are tallied. The highest total after the chosen number of rounds wins the match.'},
   ],
  },
  {
   e:'⚙️',
   t:'Before You Start',
   items:[
    {e:'👥',t:'Players',d:'You need at least 3 players. The 2-Outsider option only unlocks at 5+ players.'},
    {e:'🎛️',t:'Setup',d:'You can choose rounds, toggle random twists, toggle Game Question, and pick a genre or go random.'},
    {e:'📚',t:'Story Mode',d:'In story mode, each player gets a different story instead of a normal word.'},
   ],
  },
  {
   e:'🔁',
   t:'Round Flow',
   items:[
    {e:'📱',t:'Word Reveal',d:'Pass the phone around one player at a time. Everyone sees their word privately.'},
    {e:'❓',t:'Questions',d:'Each player asks the person next to them a question about the word. If Game Question is on, a random extra question can appear.'},
    {e:'🗳️',t:'Voting',d:'After the questions, everyone votes. Some twists can force an early vote or change the final vote rules.'},
   ],
  },
  {
   e:'🎲',
   t:'Twists',
   items:[
    {e:'⏱️',t:'When they fire',d:'If twists are on, you choose exactly how many twists happen each round: 1, 2, 3, or 5. The option unlocks based on player count.'},
    {e:'🧠',t:'How they feel',d:'Twists are now driven by the new twist-count setting instead of an automatic player-count scale.'},
    {e:'✨',t:'Examples',d:'Word swap, secret spy, private letter, third-letter public, letter count public, two clues one lie, forced vote, reverse vote, whisper round, and time pressure.'},
   ],
  },
  {
   e:'📊',
   t:'Scoring',
   items:[
    {e:'✅',t:'Caught the Outsider',d:'Each insider gets +10. The Outsider gets +5.'},
    {e:'🏃',t:'Outsider escapes',d:'The Outsider gets +10 and the group gets +0.'},
    {e:'🌟',t:'Bonus points',d:'If the Outsider guesses the group word correctly, they get +10 more. A correct trust in reverse vote also gives +5.'},
   ],
  },
  {
   e:'🎡',
   t:'Finish & Wheel',
   items:[
    {e:'🏆',t:'Match end',d:'When the last round is done, the player with the highest score wins the match.'},
    {e:'🎯',t:'Wheel punishment',d:'If the Outsider is caught and punishment is random, the wheel can pick Truth, Dare, or Second Chance.'},
    {e:'📖',t:'Note',d:'If punishment is set to Guess, the Outsider gets the guess challenge instead of the wheel.'},
   ],
  },
 ];
 const el=document.getElementById('rules-modal-title');if(el)el.textContent=T.rulesTitle||'القواعد';
 const content=document.getElementById('rules-content');
 if(content){
  const renderSection=sec=>`
   <div class="rules-section" style="background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:14px 14px 6px;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
     <div style="width:34px;height:34px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.08);font-size:18px;">${sec.e}</div>
     <div style="font-size:16px;font-weight:900;">${sec.t}</div>
    </div>
    ${sec.items.map(x=>'<div class="rules-item" style="padding:12px 0;"><div class="ri-emoji">'+x.e+'</div><div><div class="ri-title">'+x.t+'</div><div class="ri-desc">'+x.d+'</div></div></div>').join('')}
   </div>`;
  content.innerHTML=`
   <div style="display:grid;gap:14px;">
    <div style="background:linear-gradient(135deg,rgba(255,94,153,.12),rgba(59,143,255,.08));border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:14px 16px;">
     <div style="font-size:14px;font-weight:900;margin-bottom:6px;">${ar?'ملخص سريع':'Quick Start'}</div>
     <div style="font-size:13px;line-height:1.75;color:var(--muted);">${ar?'كل جولة فيها كلمة سرية، أسئلة، تصويت، وأحيانًا تحديات عشوائية. بعد عدد الجولات المحدد، أعلى مجموع نقاط يفوز.':'Each round has a hidden word, questions, voting, and sometimes random twists. After the chosen number of rounds, the highest score wins the match.'}</div>
    </div>
    ${sections.map(renderSection).join('')}
   </div>`;
 }
}

function goToRoundSetup(){
 markUiPress(document.getElementById('btn-start'),'mouse');
 const inputs=document.querySelectorAll('.player-input');
 let count=0;
 inputs.forEach((inp,i)=>{ if(i<3||inp.value.trim()) count++; });
 if(count<3){ alert(T.minPlayers); return; }
 playSound('start'); haptic('heavy');
 // Collect players
 players = [];
inputs.forEach((inp, i) => {
  const v = inp.value.trim();
  players.push(v || T.defaultName(i));
});
 // Always show options screen — reset match state fresh each time from players screen
 matchActive=true;
 currentMatchRound=0;
 matchScores={};
 matchRoundHistory=[];
 players.forEach(n=>{ matchScores[n]=0; });
 showOptionsScreen();
}

function _syncOutsiderButtons(){
 const ar=T.dir==='rtl';
 const enough=(players&&players.length>=5);
 if(!enough && outsiderCount===2) outsiderCount=1;
 const ib1=document.getElementById('imposters-btn-1');
 const ib2=document.getElementById('imposters-btn-2');
 const note=document.getElementById('opt-imposters-note');
 if(ib1){
  ib1.className='tgl'+(outsiderCount===1?' sel':'');
  ib1.textContent=ar?'1 خارج':'1 Outsider';
 }
 if(ib2){
  if(enough){
   ib2.className='tgl'+(outsiderCount===2?' sel':'');
   ib2.textContent=ar?'2 خارجين':'2 Outsiders';
  } else {
   ib2.className='tgl tgl-locked';
   ib2.textContent=ar?'2 خارجين 🔒':'2 Outsiders 🔒';
  }
 }
 if(note) note.style.display=enough?'none':'block';
}


function showOptionsScreen(){
 const ar=T.dir==='rtl';
 [1,3,5].forEach(n=>{
  const btn=document.getElementById('rounds-btn-'+n);
  if(btn) btn.className='tgl'+(matchRoundCount===n?' sel':'');
 });
 const tt=document.getElementById('twists-toggle');if(tt)tt.classList.toggle('on',twistsOn);
 const gt=document.getElementById('gq-toggle');if(gt)gt.classList.toggle('on',gameQOn);
 syncTwistCountButtons();
 _syncOutsiderButtons();
 const s=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
 s('opt-screen-badge',ar?'🎛️ خيارات اللعبة':'🎛️ Game Options');
 s('opt-screen-title',ar?'خيارات اللعبة':'Game Options');
 s('opt-screen-sub',ar?'اختار إعدادات اللعبة قبل ما تبدأوا':'Set your game options before starting');
  s('btn-confirm-options',ar?'✅ تأكيد وكمّل':'✅ Confirm & Continue');
  s('opt-imposters-lbl',ar?'🕵️ عدد الخارجين':'🕵️ Number of Outsiders');
 s('opt-twist-count-lbl',T.optTwistCountLbl||'🎯 Twists per round');
 s('opt-twist-count-sub',T.optTwistCountSub||'Choose how many twists can happen each round');
 s('opt-twist-count-note',T.optTwistCountNote|| (ar?'🔒 1 دائمًا، و2 و3 يفتحوا عند 5+ لاعبين، و5 عند 11+ لاعبين':'🔒 1 is always available, 2 and 3 unlock at 5+ players, and 5 unlocks at 11+ players'));
  s('btn-back-options',ar?'← رجوع':'← Back');
  show('s-options');
}

function setOutsiderCount(n){
 if(n===2&&(!players||players.length<5)) return;
 outsiderCount=n;
 playSound('select');haptic('light');
 _syncOutsiderButtons();
}

function confirmOptions(){
 playSound('start');haptic('heavy');
 if(players.length<5) outsiderCount=1;
 syncTwistCountButtons();
 show('s-setup');
 requestAnimationFrame(()=>renderSetupScreen());
}

function backFromOptions(){
 playSound('back');haptic('light');
 matchActive=false;
 currentMatchRound=0;
 matchScores={};
 matchRoundHistory=[];
 show('s-players');
 rebuildPlayerGrid(true);
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

const PARTY_PARTICLE_STYLE_ID='party-particle-patch';
function ensureParticlePatchStyles(){
 if(document.getElementById(PARTY_PARTICLE_STYLE_ID)) return;
 const style=document.createElement('style');
 style.id=PARTY_PARTICLE_STYLE_ID;
 style.textContent=`
  #party-particles,.splash-particles{
   contain:strict;
   transform:translateZ(0);
  }
  #splash.hide .party-particle{
   animation-play-state:paused!important;
   opacity:0!important;
  }
  .party-particle{
   background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.98) 0 10%,color-mix(in srgb,var(--color,#ff5e99) 54%, white 46%) 20%,var(--color,#ff5e99) 44%,color-mix(in srgb,var(--color,#ff5e99) 82%, #ffd166 18%) 64%,rgba(255,255,255,0) 82%);
   box-shadow:0 0 12px color-mix(in srgb,var(--color,#ff5e99) 78%, white 22%),0 0 22px color-mix(in srgb,var(--color,#ff5e99) 48%, white 12%);
   filter:saturate(1.34) brightness(1.08);
   contain:paint;
   backface-visibility:hidden;
   transform-origin:center center;
   will-change:transform,opacity;
   animation-name:partyFloatLite!important;
   animation-timing-function:linear!important;
  }
  @keyframes partyFloatLite{
   0%{transform:translate3d(0,-8vh,0) scale(.72);opacity:0;}
   12%{transform:translate3d(calc(var(--drift,0px) * .12),calc(var(--travel,140vh) * .1),0) scale(.82);opacity:var(--intro-opacity,.82);}
   36%{transform:translate3d(calc(var(--drift,0px) * .34),calc(var(--travel,140vh) * .34),0) scale(.94);opacity:calc(var(--opacity,.44) * 1.08);}
   64%{transform:translate3d(calc(var(--drift,0px) * .62),calc(var(--travel,140vh) * .64),0) scale(1.03);opacity:var(--opacity,.44);}
   86%{transform:translate3d(calc(var(--drift,0px) * .86),calc(var(--travel,140vh) * .88),0) scale(1.1);opacity:calc(var(--opacity,.44) * .56);}
   96%{transform:translate3d(calc(var(--drift,0px) * .98),calc(var(--travel,140vh) * .98),0) scale(1.13);opacity:calc(var(--opacity,.44) * .1);}
   100%{transform:translate3d(var(--drift,0px),var(--travel,140vh),0) scale(1.13);opacity:0;}
  }
 `;
 document.head.appendChild(style);
}

function buildPartyParticles(layer,opts={}){
 if(!layer||layer.dataset.ready==='1') return;
 ensureParticlePatchStyles();
 const reduced=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const colors=opts.colors||((typeof CHIP_COLORS!=='undefined'&&CHIP_COLORS.length)?CHIP_COLORS:['#ff4d6d','#ff5e99','#ff7a30','#ff8f3d','#ff6b1a','#ff3d9a','#ffd166']);
 layer.classList.toggle('reduced',reduced);
 layer.dataset.ready='1';
 const frag=document.createDocumentFragment();
 const count=opts.count||(reduced?28:40);
 for(let i=0;i<count;i++){
  const particle=document.createElement('span');
  const sizeMin=opts.sizeMin||2.3;
  const sizeMax=opts.sizeMax||7.4;
  const size=(reduced?sizeMin+0.8:sizeMin)+Math.random()*(sizeMax-sizeMin);
  const durationMin=opts.durationMin||9.5;
  const durationMax=opts.durationMax||16.5;
  const duration=reduced?13+Math.random()*5.5:durationMin+Math.random()*(durationMax-durationMin);
  const color=colors[Math.floor(Math.random()*colors.length)];
  const spreadRoll=Math.random();
  const left=spreadRoll<0.3?16+Math.random()*28:
   spreadRoll<0.6?34+Math.random()*32:
   spreadRoll<0.82?8+Math.random()*18:
   74+Math.random()*18;
  const top=spreadRoll<0.32?Math.random()*14:
   spreadRoll<0.68?4+Math.random()*20:
   spreadRoll<0.88?12+Math.random()*18:
   20+Math.random()*16;
  particle.className='party-particle';
  particle.style.left=`${left}%`;
  particle.style.top=`${top}%`;
  particle.style.setProperty('--size',`${size.toFixed(1)}px`);
  particle.style.setProperty('--drift',`${Math.round((Math.random()*2-1)*(reduced?32:96))}px`);
  particle.style.setProperty('--travel',`${105+Math.round(Math.random()*(reduced?44:150))}vh`);
  particle.style.setProperty('--duration',`${duration.toFixed(1)}s`);
  particle.style.setProperty('--delay',`${-(Math.random()*(reduced?18:16)).toFixed(1)}s`);
  particle.style.setProperty('--opacity',(reduced?0.32+Math.random()*0.14:0.36+Math.random()*0.18).toFixed(2));
  particle.style.setProperty('--intro-opacity',(reduced?0.7+Math.random()*0.08:0.78+Math.random()*0.12).toFixed(2));
  particle.style.setProperty('--color',color);
  frag.appendChild(particle);
 }
 layer.appendChild(frag);
}

function initPartyParticles(){
 buildPartyParticles(document.getElementById('party-particles'));
}

function initSplashParticles(){
 const layer=document.getElementById('splash-particles');
 if(!layer) return;
 buildPartyParticles(layer,{
  count:14,
  sizeMin:3.0,
  sizeMax:6.1,
  durationMin:6.8,
  durationMax:11.8,
  colors:['#ff4d6d','#ff5e99','#ff7a30','#ff8f3d','#ffd166','#ff3d9a','#ff9f1c','#ffa8e8']
 });
}


// ════════════════════════════════════════════════════════════════
// PWA
// ════════════════════════════════════════════════════════════════
// PWA setup deferred — generateIcon uses Canvas 2D which blocks first paint
function _initPWA(){
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
 const ar=T.dir==='rtl';
 const appTitle=ar?'مين خارج اللعبة':"Who's Out of the Loop?";
const MANIFEST={name:appTitle,short_name:ar?'مين خارج':'Who\'s Out',display:'standalone',
 orientation:'portrait',background_color:'#ff5e99',theme_color:'#ff5e99',lang:ar?'ar':'en',dir:T.dir||'ltr',
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
} // end _initPWA
// Defer until after splash renders (generateIcon canvas calls are heavy)
setTimeout(_initPWA,300);


// ════════════════════════════════════════════════════════════════
// SPLASH + CLOSE LANG MENU ON OUTSIDE CLICK
// ════════════════════════════════════════════════════════════════
// Splash: guaranteed minimum visible time from script parse, not window.load
// window.load can fire before/after heavy work — this is frame-safe
(function(){
 const _t0=performance.now();
 const MIN_MS=2200;
 function _hideSplash(){
  const s=document.getElementById('splash');
  if(!s||s.classList.contains('hide'))return;
  s.classList.add('hide');
  setTimeout(()=>{if(s.parentNode)s.remove();},600);
 }
 // After DOM is parsed, schedule hide for remaining time
 const elapsed=performance.now()-_t0;
 setTimeout(_hideSplash,Math.max(MIN_MS-elapsed,MIN_MS));
})();
// lang dropdown click handling moved to toggleLangMenu block above

// ════════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════════
// Defer heavy init — let the splash paint before any heavier UI work starts
requestAnimationFrame(()=>{
 requestAnimationFrame(()=>{
  setTimeout(()=>{
   rebuildPlayerGrid(false);
   applyTranslations();
   initSplashParticles();
   initPartyParticles();
  },60);
 });
});
