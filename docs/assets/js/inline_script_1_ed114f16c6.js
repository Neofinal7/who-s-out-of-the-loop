'use strict';
// ════════════════════════════════════════════════════════════════
// TRANSLATIONS
// ════════════════════════════════════════════════════════════════
const LANG_LABELS={ar:'AR 🇸🇦',en:'EN 🇬🇧'};
const LANGS={
 ar:{dir:'rtl',badge:'🎮 Party Game',heroTitle:'مين <span class="hl">خارج اللعبة</span>',heroSub:'واحد منكم بعرف كلمة مختلفة — اسألوا بعض وانكشفوا',
  menuPlay:'العب الآن',menuPlaySub:'أضف اللاعبين وابدأ',menuStory:'قصص 📖',menuStorySub:'قصص غامضة — مين يخدع مين؟',menuRules:'القواعد',menuRulesSub:'كيف تلعب',menuHistory:'السجل',menuHistorySub:'الألعاب السابقة',
  labelPlayers:'اللاعبون',labelAddPlayer:'إضافة لاعب',btnStart:'🎲 ابدأ!',
  setupBadge:'⚙️ إعداد الجولة',setupTitle:'إعداد الجولة',setupSub:'اختار كيف تلعبون هالجولة',
  labelGenreMode:'طريقة الفئة',labelRandom:'عشوائي',labelPickGenre:'اختار فئة',
  labelPickAGenre:'اختار الفئة',labelOutsiderMode:'وضع الخارج',
  labelStandard:'يفكر إنه داخل',labelKnows:'يعرف إنه برا',
  btnStartRound:'🎮 ابدأ الجولة!',btnBack:'← رجوع',
  coverPassText:'سلّم التلفون لـ',coverEyesText:'الباقين يبعدوا عيونهم!',
  coverWarning:'⚠️ ما تحكوا لبعض!',btnShowWord:'👁️ جاهز — شوف كلمتي',
  wordHint:'احفظ كلمتك وسلّم التلفون للشخص الجاي بدون ما تحكي',
  outsiderTitle:'أنت خارج اللعبة! 🕵️',outsiderSub:'الجماعة يناقشون كلمة مختلفة — حاول ما تنكشف!',
  btnMemorized:'✅ حفظت — سلّمت التلفون',
  questionsBadge:'❓ وقت الأسئلة',questionsTitle:'اسألوا بعض!',questionsSub:'كل لاعب يسأل اللاعب اللي جنبه',
  labelRemaining:'باقي',btnDoneQuestions:'🗳️ وقت التصويت!',labelDoneQ:'تم',
  voteBadge:'🗳️ التصويت',labelRound:'دور',labelOf:'من',
  voteWho:'مين تفكر إنه "خارج اللعبة"؟',
  tallyBadge:'📊 نتائج التصويت',tallyTitle:'مين أخذ أكثر أصوات؟',tallySub:'شوفوا النتيجة قبل ما تنكشف الحقيقة',
  btnReveal:'🔍 اكشف!',revealLabel:'خارج اللعبة كان',labelGroupWord:'كلمة الجماعة',labelOutsiderWord:'كلمة الخارج',
  groupWon:(n,v)=>`الجماعة فازت — مسكتوه بـ ${v} صوت!`,outsiderWon:'الخارج فاز — ما حدا مسكه!',
  btnNewRound:'🔄 جولة ثانية!',btnGoHome:'🏠 ارجع للبداية',
  voteCount:(n)=>`${n} صوت`,mustVote:'لازم تختار حدا!',minPlayers:'لازم ٣ لاعبين على الأقل!',
  settingsTitle:'الإعدادات',labelMusic:'🎵 موسيقى',labelMusicSub:'موسيقى خلفية هادية',
  labelSfx:'🔊 أصوات',labelSfxSub:'أصوات التأثيرات',labelVol:'🎚️ مستوى الصوت',
  placeholders:['الأول','الثاني','الثالث','الرابع','الخامس','السادس','السابع','الثامن','التاسع','العاشر','الحادي عشر','الثاني عشر','الثالث عشر','الرابع عشر','الخامس عشر'],
  defaultName:(i)=>`لاعب ${i+1}`,
  caught:['اتمسك! هههه 😂','كل الأدلة كانت عليه من البداية 🧐','اعترف! اعترف! 😤','الجماعة ذكية عليه! 🎉','مبروك يا ممثل على المحاولة 🎭'],
  safe:['ياه! نجح يخدعكم! 😏','عبقري — ما قدروا يمسكوه 🧠','الخارج فاز! 🏆','الأوسكار إله هالروندة 🎬','خدعهم بكل برود! 😎'],
  bonusLabel:'بونص',allDone:'خلصت الأسئلة!',roundChallenge:'تحدي الجولة',
  roundLbl:(r,t)=>`جولة ${r} من ${t}`,matchWinnerLbl:'بطل اللعبة',rematch:'🔄 لعبة جديدة!',homeBtn:'🏠 القائمة',
  historyTitle:'سجل الألعاب',historyEmpty:'ما في ألعاب سابقة بعد!',clearHistory:'مسح السجل',
  rulesTitle:'قواعد اللعبة',optionsTitle:'خيارات اللعبة',
  optRoundsLbl:'عدد الجولات في اللعبة',optTwistsSec:'التحديات العشوائية',
  optTwistsLbl:'🎲 تحديات مفاجئة',optTwistsSub:'أحداث تغير مجرى اللعبة',
  optGqLbl:'❓ سؤال اللعبة',optGqSub:'سؤال إضافي يطرحه اللعب',
  optPunishSec:'نوع العقوبة للخاسر',optSave:'✅ حفظ',
  punishTitle:'اختار العقوبة',
  punishTruth:'الصراحة — اسأله سؤال ما عنده خيار',punishDare:'التحدي — اعمل حاجة أمام الكل',
  punishGuess:'خمّن الكلمة — إذا صح يأخذ نقاط',
  guessTitle:'🎯 تحدي التخمين',guessQ:(name)=>`${name} — خمّن: وش كانت كلمة الجماعة؟`,
  guessWin:'صح! +10 نقاط 🎉',guessLose:'غلط! 😅',
  motivStreak:(n)=>`🔥 سلسلة ${n} انتصارات!`,motivComeback:'⚡ عودة قوية!',
  motivPerfect:'✨ جولة مثالية!',motivClose:'😅 قريب جداً!',motivMvp:(n)=>`⭐ MVP — ${n}!`,motivWins:'فاز!',
  twistBtnOk:'👍 فاهمين — نبدأ!',
  storyLbl:'القصة',playersLbl:'اللاعبون',optionsBtnLbl:'خيارات',
  punishAny:'عشوائي (العجلة تختار! 🎰)',punishAlwaysTruth:'صراحة دايماً',punishAlwaysDare:'تحدي دايماً',punishAlwaysGuess:'خمّن الكلمة دايماً',
  punishHeader:'⚡ العقوبة',punishPickLabel:'الجماعة تختار العقوبة:',
  punishTruthResult:'الجماعة تسأله سؤال من اختيارهم — هو لازم يجاوب بصراحة!',
  punishDareResult:'الجماعة تحدده بتحدي من اختيارهم — لازم ينفذه!',
  twistLabel:'تحدي مفاجئ 🎲',
  gqLabel:'⚡ سؤال اللعبة',gqYes:'✅ نعم',gqNo:'❌ لا',gqRecorded:'✅ تم التسجيل',
  guessWordQ:'وش كانت كلمة الجماعة؟',
  matchOverLabel:'🏆 نهاية اللعبة',endMatchBtn:'🏆 نهاية اللعبة!',
  finalScoresLbl:'النتيجة النهائية',roundLblShort:'جولة',outsiderLbl:'الخارج',
  groupWonShort:'الجماعة فازت',outsiderWonShort:'الخارج فاز',
  caughtShort:'مسكوه',escapedShort:'فر',ptsLbl:'نقطة',
  clearHistoryConfirm:'تأكيد مسح السجل؟',groupStoryLbl:'قصة الجماعة',outsiderStoryLbl:'قصة الخارج',
  mustVoteForcedLabel:'لازم تصوت على',playersCountLbl:'لاعبين',knewOutsider:'(كان يعرف إنه خارج)',
  genres:{
   food:{label:'🍕 أكل',cc:'#ff7a30'},sweets:{label:'🍰 حلويات',cc:'#ff5e99'},
   drinks:{label:'☕ مشروبات',cc:'#9b5de5'},countries:{label:'🌍 بلدان',cc:'#3b8fff'},
   cities:{label:'🏙️ مدن',cc:'#00bfa5'},animals:{label:'🦁 حيوانات',cc:'#f5c800'},
   sports:{label:'⚽ رياضة',cc:'#2dcc6f'},jobs:{label:'👨‍⚕️ مهن',cc:'#9b5de5'},
   nature:{label:'🌋 طبيعة',cc:'#ff3b5c'},tech:{label:'💻 تقنية',cc:'#3b8fff'},
   story:{label:'📖 قصص 🔥',cc:'#9b5de5',isStory:true},
  },
  dares:['اعمل صوت حيوان والكل يخمن أي حيوان 🐸','غني أي أغنية بصوت خافت جداً 🎵','قل اسمك بالمقلوب بأسرع وقت ممكن 🔄','اعمل أصعب وجه ممكن ١٠ ثواني بدون تضحك 😤','قلد صوت شخص بالغرفة — الكل يخمن مين 🎭','اعمل حركة رقص لمدة ٥ ثواني 💃','قول "أنا بريء" بأكثر طريقة مقنعة ممكن 🕵️','اتكلم عن أي موضوع ٣٠ ثانية بدون توقف 🗣️'],
  truths:['أكثر شي محرج صار لك؟','من الأكثر اهتمامك بالغرفة؟','آخر كذبة قلتها على شخص بالغرفة؟','وش تفكر فيه هلأ بصراحة؟','مين الأفضل بهاللعبة برأيك؟'],
 },
 en:{dir:'ltr',badge:'🎮 Party Game',heroTitle:'Who\'s <span class="hl">Out of the Loop</span>',heroSub:'One of you knows a different word — ask questions and uncover the Outsider',
  menuPlay:'Play Now',menuPlaySub:'Add players and start',menuStory:'Stories 📖',menuStorySub:'Mystery tales',menuRules:'Rules',menuRulesSub:'How to play',menuHistory:'History',menuHistorySub:'Past games',
  labelPlayers:'Players',labelAddPlayer:'Add player',btnStart:'🎲 Start!',
  setupBadge:'⚙️ Round Setup',setupTitle:'Round Setup',setupSub:'Choose how this round plays',
  labelGenreMode:'Genre Mode',labelRandom:'Random',labelPickGenre:'Pick Genre',
  labelPickAGenre:'Choose Genre',labelOutsiderMode:'Outsider Mode',
  labelStandard:"Thinks they're in",labelKnows:"Knows they're out",
  btnStartRound:'🎮 Start Round!',btnBack:'← Back',
  coverPassText:'Pass phone to',coverEyesText:'everyone else look away!',
  coverWarning:'⚠️ No talking!',btnShowWord:"👁️ Ready — See my word",
  wordHint:'Memorize your word and pass the phone without talking',
  outsiderTitle:"You're the Outsider! 🕵️",outsiderSub:"The group has a different word — try not to get caught!",
  btnMemorized:'✅ Got it — Passed the phone',
  questionsBadge:'❓ Question Time',questionsTitle:'Ask each other!',questionsSub:'Each player asks the one next to them',
  labelRemaining:'Left',btnDoneQuestions:'🗳️ Vote time!',labelDoneQ:'Done',
  voteBadge:'🗳️ Voting',labelRound:'Round',labelOf:'of',
  voteWho:'Who do you think is Out of the Loop?',
  tallyBadge:'📊 Vote Results',tallyTitle:'Who got the most votes?',tallySub:'See results before the reveal',
  btnReveal:"🔍 Reveal!",revealLabel:'The Outsider was',labelGroupWord:"Group's word",labelOutsiderWord:"Outsider's word",
  groupWon:(n,v)=>`Group wins — caught with ${v} vote${v===1?'':'s'}!`,outsiderWon:"Outsider wins — nobody caught them!",
  btnNewRound:'🔄 New Round!',btnGoHome:'🏠 Back to Start',
  voteCount:(n)=>`${n} vote${n===1?'':'s'}`,mustVote:'Pick someone first!',minPlayers:'Need at least 3 players!',
  settingsTitle:'Settings',labelMusic:'🎵 Music',labelMusicSub:'Chill background music',
  labelSfx:'🔊 Sounds',labelSfxSub:'Sound effects',labelVol:'🎚️ Volume',
  placeholders:['Player 1','Player 2','Player 3','Player 4','Player 5','Player 6','Player 7','Player 8','Player 9','Player 10','Player 11','Player 12','Player 13','Player 14','Player 15'],
  defaultName:(i)=>`Player ${i+1}`,
  caught:['Caught! Hahaha 😂','The evidence was there all along 🧐','Admit it! Admit it! 😤','The group outsmarted you! 🎉','Nice try, actor 🎭'],
  safe:["Wow, they fooled you! 😏","Genius — nobody caught them 🧠","Outsider wins! 🏆","Oscar-worthy performance 🎬","Ice cold bluff 😎"],
  bonusLabel:'Bonus',allDone:'All questions done!',roundChallenge:'Round Challenge',
  roundLbl:(r,t)=>`Round ${r} of ${t}`,matchWinnerLbl:'Match Winner',rematch:'🔄 New Game!',homeBtn:'🏠 Home',
  historyTitle:'Game History',historyEmpty:'No games yet!',clearHistory:'Clear History',
  rulesTitle:'How to Play',optionsTitle:'Game Options',
  optRoundsLbl:'Rounds per match',optTwistsSec:'Random Twists',
  optTwistsLbl:'🎲 Random Twists',optTwistsSub:'Events that change the game',
  optGqLbl:'❓ Game Question',optGqSub:'An extra question from the game',
  optPunishSec:'Punishment type',optSave:'✅ Save',
  punishTitle:'Choose Punishment',
  punishTruth:'Truth — ask them a question they MUST answer',punishDare:'Dare — make them do something in front of everyone',
  punishGuess:'Guess the Word — guess correctly for bonus points',
  guessTitle:'🎯 Guess Challenge',guessQ:(name)=>`${name} — guess: what was the group's word?`,
  guessWin:'Correct! +10 pts 🎉',guessLose:'Wrong! 😅',
  motivStreak:(n)=>`🔥 ${n}-win streak!`,motivComeback:'⚡ Comeback!',
  motivPerfect:'✨ Perfect round!',motivClose:'😅 So close!',motivMvp:(n)=>`⭐ MVP — ${n}!`,motivWins:'wins!',
  twistBtnOk:"👍 Got it — Let's go!",
  storyLbl:'Your Story',playersLbl:'Players',optionsBtnLbl:'Options',
  punishAny:'Random Wheel 🎰',punishAlwaysTruth:'Always Truth',punishAlwaysDare:'Always Dare',punishAlwaysGuess:'Always Guess the Word',
  punishHeader:'⚡ Punishment',punishPickLabel:'The group picks the punishment:',
  punishTruthResult:'The group asks them any question — they must answer truthfully!',
  punishDareResult:'The group assigns a dare of their choice — they must do it!',
  twistLabel:'Surprise Twist 🎲',
  gqLabel:'⚡ Game Question',gqYes:'✅ Yes',gqNo:'❌ No',gqRecorded:'✅ Recorded',
  guessWordQ:"What was the group's word?",
  matchOverLabel:'🏆 Match Over',endMatchBtn:'🏆 End of Match!',
  finalScoresLbl:'Final Scores',roundLblShort:'Round',outsiderLbl:'Outsider',
  groupWonShort:'Group won',outsiderWonShort:'Outsider won',
  caughtShort:'caught',escapedShort:'escaped',ptsLbl:'pts',
  clearHistoryConfirm:'Clear all history?',groupStoryLbl:'Group Story',outsiderStoryLbl:'Outsider Story',
  mustVoteForcedLabel:'Must vote for',playersCountLbl:'players',knewOutsider:'(Knew they were out)',
  genres:{
   food:{label:'🍕 Food',cc:'#ff7a30'},sweets:{label:'🍰 Sweets',cc:'#ff5e99'},
   drinks:{label:'☕ Drinks',cc:'#9b5de5'},countries:{label:'🌍 Countries',cc:'#3b8fff'},
   cities:{label:'🏙️ Cities',cc:'#00bfa5'},animals:{label:'🦁 Animals',cc:'#f5c800'},
   sports:{label:'⚽ Sports',cc:'#2dcc6f'},jobs:{label:'👨‍⚕️ Jobs',cc:'#9b5de5'},
   nature:{label:'🌋 Nature',cc:'#ff3b5c'},tech:{label:'💻 Tech',cc:'#3b8fff'},
   story:{label:'📖 Stories 🔥',cc:'#9b5de5',isStory:true},
  },
  dares:['Make an animal sound — everyone guesses 🐸','Hum a song quietly — everyone names it 🎵','Say your name backwards as fast as possible 🔄','Hold an extreme face for 10 seconds without laughing 😤','Imitate someone in the room 🎭','Do a 5-second dance move 💃',"Say \"I'm innocent\" as convincingly as possible 🕵️",'Talk nonstop for 30 seconds 🗣️'],
  truths:['What is the most embarrassing thing that happened to you?','Who in the room do you like the most?','Last lie you told someone in this room?','What are you honestly thinking right now?','Who do you think is best at this game?'],
 },
};
// Minimal stubs for other languages (inherit from en)
['zh','hi','es','fr'].forEach(lc=>{
 LANGS[lc]={...LANGS.en,dir:'ltr'};
 if(lc==='ar') LANGS[lc].dir='rtl';
});

// ════════════════════════════════════════════════════════════════
// CONSTANTS + STATE
// ════════════════════════════════════════════════════════════════
const AVATARS=['😎','🤠','🥸','🧐','😝','🤩','😏','🫡','🤯','😤'];
const CHIP_COLORS=['#ff5e99','#ff7a30','#f5c800','#2dcc6f','#3b8fff','#9b5de5','#00bfa5'];

let lang='ar', T=LANGS.ar;
let gameMode='normal';

// Match state
let matchRoundCount=3, currentMatchRound=0;
let matchScores={}, matchRoundHistory=[], matchActive=false;

// Round state
let players=[], outsiderIdx=-1, topic=null, outsiderWord=null, currentIdx=0;
let storyIdx=-1, questions=[], currentQIdx=0;
let votes={}, currentOpenVoter=0, openVoteOrder=[];
let genreMode='random', selectedGenre=null, outsiderMode='standard';

// Twist state
let activeTwist=null;
let twistForcedVoterIdx=-1, twistForcedTargetIdx=-1;
let twistWordSwapped=false, twistSwappedList=[];
let twistReverseVote=false;
let insiderSpyIdx=-1; // insider_spy twist: this player sees everything on their word screen
let pendingPrivateLetter=null; // shown privately on receiver's word screen

// Twist/GameQ mid-round firing state
let twistFireAtQ=-1, gameQFireAtQ=-1, twistFired=false, gameQFired=false;
let twistFireAtQ2=-1, twist2Fired=false; // second twist slot (reverse_vote at 50%)

// Twist budget: max events per round based on player count
// Twist budget: max events per round based on player count
let roundEventCount=0; // how many twist/event slots fired this round
let targetTwistsCount=0;
window.currentTwistSchedule = [];
function getRoundEventBudget(){ return targetTwistsCount; }
function canFireEvent(){ return roundEventCount < getRoundEventBudget(); }
function consumeEvent(){ roundEventCount++; }

// Options
let twistsOn=true, gameQOn=true, selectedPunishment='any'; // 'any'|'truth'|'dare'|'guess'

// No-repeat tracking
let lastTopicIdx=-1, lastStoryIdx=-1;
let homeMenuNavLock=false;
const HOME_MENU_PRESS_DELAY=0;
let voteCastLocked=false;
let homeMenuPressedEl=null;
let uiPressTarget=null;
let lastUiPressAt=0;
let lastUiPressPointer='mouse';
let pendingShowTimer=null;
const UI_PRESS_DELAY_TOUCH=0;
const UI_PRESS_DELAY_MOUSE=0;
let uiPressClearTimer=null;
let uiPressHoldUntil=0;
let questionAdvanceLocked=false;
let questionAdvanceLockTimer=null;
let questionAdvanceLockedAt=0;
let lastQuestionAdvanceAt=0;
let questionAdvanceRetryTimer=null;

function releaseQuestionAdvanceLock(){
 questionAdvanceLocked=false;
 questionAdvanceLockedAt=0;
 if(questionAdvanceLockTimer){ clearTimeout(questionAdvanceLockTimer); questionAdvanceLockTimer=null; }
}
function scheduleQuestionAdvanceRetry(){
 if(questionAdvanceRetryTimer) return;
 // If we just advanced, ignore rapid duplicate click noise.
 if(Date.now()-lastQuestionAdvanceAt<=220) return;
 questionAdvanceRetryTimer=setTimeout(()=>{
  questionAdvanceRetryTimer=null;
  advanceQ();
 },110);
}

function markHomeMenuPressed(el){
 if(!el) return;
 if(homeMenuPressedEl&&homeMenuPressedEl!==el) homeMenuPressedEl.classList.remove('menu-pressing');
 homeMenuPressedEl=el;
 homeMenuPressedEl.classList.add('menu-pressing');
}
function clearHomeMenuPressed(){
 if(!homeMenuPressedEl) return;
 homeMenuPressedEl.classList.remove('menu-pressing');
 homeMenuPressedEl=null;
}

function markUiPress(el,pointerType){
 if(!el) return;
 if(uiPressTarget&&uiPressTarget!==el) uiPressTarget.classList.remove('ui-pressing');
 uiPressTarget=el;
 uiPressTarget.classList.add('ui-pressing');
 lastUiPressAt=Date.now();
 lastUiPressPointer=pointerType||'mouse';
 const minVisible=(pointerType==='touch'||pointerType==='pen')?220:130;
 uiPressHoldUntil=Date.now()+minVisible;
 if(uiPressClearTimer) clearTimeout(uiPressClearTimer);
 uiPressClearTimer=setTimeout(()=>{
  clearUiPress();
  uiPressClearTimer=null;
 }, pointerType==='touch'||pointerType==='pen' ? 480 : 320);
}
function clearUiPress(){
 if(!uiPressTarget) return;
 uiPressTarget.classList.remove('ui-pressing');
 uiPressTarget=null;
}
function clearUiPressAfterMin(){
 const wait=Math.max(0,uiPressHoldUntil-Date.now());
 if(uiPressClearTimer) clearTimeout(uiPressClearTimer);
 uiPressClearTimer=setTimeout(()=>{
  clearUiPress();
  uiPressClearTimer=null;
 }, wait);
}
function getUiPressDelay(){
 if(lastUiPressPointer==='touch'||lastUiPressPointer==='pen') return UI_PRESS_DELAY_TOUCH;
 return UI_PRESS_DELAY_MOUSE;
}

// Cache selector strings — avoids re-parsing the CSS selector on every single touch event
const _SEL_HOME_CARD='#s-home .menu-grid > div';
const _SEL_PRESSABLE='button,.menu-grid > div,.vote-option,.genre-card,.btn-add-player,.tgl,.gq-choice,.punish-opt,.guess-opt';
document.addEventListener('pointerdown',function(e){
 const card=e.target.closest(_SEL_HOME_CARD);
 if(card) markHomeMenuPressed(card);
 const pressable=e.target.closest(_SEL_PRESSABLE);
 if(pressable) markUiPress(pressable,e.pointerType);
});
document.addEventListener('pointerup',()=>{ clearUiPressAfterMin(); });
document.addEventListener('pointercancel',()=>{ clearUiPressAfterMin(); });
document.addEventListener('pointerleave',()=>{ clearUiPressAfterMin(); });
window.addEventListener('blur',()=>{ clearUiPress(); });
document.addEventListener('visibilitychange',()=>{ if(document.hidden) clearUiPress(); });

// Per-round scores
let roundScores={};

// ════════════════════════════════════════════════════════════════
// STORIES (20)
// ════════════════════════════════════════════════════════════════
const STORIES=[
 {e:'🏫',cc:'#9b5de5',insider:{ar:'كان في ولد اسمه خالد، طالب جديد في المدرسة، ما عنده أصحاب. يوم من الأيام أحد ما قبل يجلس جنبه في الفصل.',en:'There was a boy named Khalid, a new student with no friends. One day, no one would sit next to him in class.'},outsider:{ar:'كان في ولد اسمه سالم، طالب جديد في المدرسة، خجول بس ذكي. يوم من الأيام ما عرف يجاوب على سؤال المعلم.',en:"There was a boy named Salem, new and shy but smart. One day he couldn't answer the teacher's question."}},
 {e:'🌴',cc:'#2dcc6f',insider:{ar:'رحلة مدرسية في الغابة — المجموعة اتهت. فرح كانت تمشي بثقة لأنها حافظة الخارطة.',en:'School trip in the forest — the group got lost. Farah walked confidently because she memorized the map.'},outsider:{ar:'رحلة مدرسية في الغابة — المجموعة اتهت. نورة كانت خايفة بس ما قالت لأحد.',en:'School trip in the forest — the group got lost. Noura was scared but told nobody.'}},
 {e:'🎂',cc:'#ff5e99',insider:{ar:'يوم عيد ميلاد ليلى — كل أصحابها نسوا. هي قعدت البيت تنتظر وفي الآخر جاوها رسالة واحدة بس.',en:"Layla's birthday — all her friends forgot. She sat home waiting and got only one message."},outsider:{ar:'يوم عيد ميلاد سارة — هي اللي نسيت عيد ميلادها الخاص وطلعت مع أصحابها كأن ما صار شي.',en:"Sara's birthday — she herself forgot her own birthday and went out as if nothing happened."}},
 {e:'🏀',cc:'#ff7a30',insider:{ar:'مباراة كرة السلة النهائية — الفريق متأخر بنقطتين. أحمد الأخير يكرة لكنه اللي يجيب الفوز.',en:'Final basketball game — team down by two. Ahmad is last to play but scores the winning basket.'},outsider:{ar:'مباراة كرة السلة النهائية — الفريق متأخر بنقطتين. يوسف ضيّع رمية حرة في آخر ثانية.',en:'Final basketball game — team down by two. Yousef missed a free throw in the last second.'}},
 {e:'🔑',cc:'#00bfa5',insider:{ar:'رجع ياسر البيت ولقى باب مقفل. دور في جيوبه — المفتاح مو معه.',en:'Yasser got home and found the door locked. He checked his pockets — no key.'},outsider:{ar:'رجع محمد البيت ولقى باب مفتوح. حس إن في شي غريب — ما أحد كان في البيت.',en:'Mohammed got home and found the door open. He felt something was off — nobody was home.'}},
 {e:'✈️',cc:'#3b8fff',insider:{ar:'في المطار — الرحلة على وشك الإقلاع. ريم ركضت بكل قوتها لأنها ما تبي تفوتها.',en:'At the airport — the flight about to depart. Reem ran with all her strength to not miss it.'},outsider:{ar:'في المطار — الرحلة على وشك الإقلاع. هنا فجأة لقت شنطتها مع شخص ثاني.',en:'At the airport — the flight about to depart. Hana suddenly found her bag with another person.'}},
 {e:'🌊',cc:'#00bfa5',insider:{ar:'في الشاطئ — بدر تعلم السباحة. وقع في الماء الكبير وصرخ بس ما أحد سمعه.',en:'At the beach — Badr was learning to swim. He fell into deep water and yelled but nobody heard.'},outsider:{ar:'في الشاطئ — طارق شاف شخص يغرق. طرش نفسه وإنقذه بدون ما يفكر.',en:'At the beach — Tariq saw someone drowning. He threw himself in and saved them without thinking.'}},
 {e:'📱',cc:'#9b5de5',insider:{ar:'الجوال وقع في البحر. سلمى شافت بس ما قدرت توقف — وبعدين جاء بيها.',en:'The phone fell into the sea. Salma watched but could not stop it — then it washed back.'},outsider:{ar:'الجوال وقع على الأرض. غانم التقطه وكان فيه رقم غريب جديد ما يعرفه.',en:'The phone fell on the ground. Ghanem picked it up and found a new unknown number on it.'}},
 {e:'🐕',cc:'#ff7a30',insider:{ar:'كلب ضال تبع عمر للبيت. كل يوم يجي عند الباب ويقعد ينتظر.',en:"A stray dog followed Omar home. Every day it came to the door and waited."},outsider:{ar:'كلب ضال دخل حديقة البيت. عبدالله خافه في الأول لكنه كان جريح.',en:'A stray dog entered the garden. Abdullah was scared at first but it was injured.'}},
 {e:'🎤',cc:'#ff5e99',insider:{ar:'مسابقة غناء — نور وقفت على المسرح وفجأة طار الصوت منها.',en:'A singing contest — Nour stood on stage and suddenly her voice vanished.'},outsider:{ar:'مسابقة غناء — لجين ما كانت تبي تشارك بس دفعوها. غنت وكان صوتها جميل.',en:'A singing contest — Lujain did not want to join but was pushed. She sang and her voice was beautiful.'}},
 {e:'🌙',cc:'#9b5de5',insider:{ar:'في ليلة مطر — فيصل صحى على صوت عجيب من تحت السرير.',en:'On a rainy night — Faisal woke up to a strange sound from under the bed.'},outsider:{ar:'في ليلة مطر — أنس شاف ضوء في الغرفة المقابلة وهي كانت مفروض فاضية.',en:'On a rainy night — Anas saw a light in the room across the way that was supposed to be empty.'}},
 {e:'🏆',cc:'#f5c800',insider:{ar:'مسابقة رياضية — آخر ثانية والفريق خسران. نوف قررت تلعب بطريقة ما اتفق عليها.',en:'A sports competition — last second, team losing. Nouf decided to play in an unplanned way.'},outsider:{ar:'مسابقة رياضية — الفريق فاز بالفعل. مشاري ما صدق لأنه ما لعب.',en:"A sports competition — the team already won. Meshari couldn't believe it because he hadn't played."}},
 {e:'📚',cc:'#3b8fff',insider:{ar:'ليلة الاختبار — ماجد لقى إن نوتاته كلها اختفت.',en:'The night before exams — Majid found all his notes had disappeared.'},outsider:{ar:'ليلة الاختبار — هاجر ذاكرت كل الليل لكنها نامت وهي تكتب.',en:'The night before exams — Hajar studied all night but fell asleep while writing.'}},
 {e:'🍕',cc:'#ff7a30',insider:{ar:'طلبوا بيتزا للحفلة — البيتزا وصلت بس للعنوان الغلط.',en:'They ordered pizza for the party — it arrived at the wrong address.'},outsider:{ar:'طلبوا بيتزا للحفلة — البيتزا وصلت بدون إضافات بسبب خطأ في الطلب.',en:'They ordered pizza for the party — it arrived with no toppings because of an ordering mistake.'}},
 {e:'🌋',cc:'#ff3b5c',insider:{ar:'رحلة لرؤية بركان — المرشد قال ممنوع تقترب. كريم اقترب.',en:'A trip to see a volcano — the guide said do not approach. Kareem approached anyway.'},outsider:{ar:'رحلة لرؤية بركان — البركان فجأة بدأ يتحرك والكل ركض إلا شخص واحد.',en:'A trip to see a volcano — it suddenly rumbled and everyone ran except one person.'}},
 {e:'🎮',cc:'#9b5de5',insider:{ar:'بطولة ألعاب — ظافر شاف إن غريمه يغش بس ما قال شي.',en:'A gaming tournament — Thafir saw his rival cheating but said nothing.'},outsider:{ar:'بطولة ألعاب — العب الجديد فاز على البطل القديم بدون أي خبرة.',en:'A gaming tournament — the new player beat the old champion with no experience.'}},
 {e:'🏠',cc:'#00bfa5',insider:{ar:'أثناء نقل البيت — علي لقى صندوق قديم مقفل ما يعرف وش فيه.',en:'While moving houses — Ali found an old locked box he did not know what was inside.'},outsider:{ar:'أثناء نقل البيت — وجدوا باباً مخفياً في الحائط ما أحد علم فيه من قبل.',en:'While moving houses — they found a hidden door in the wall nobody had known about.'}},
 {e:'🌈',cc:'#ff5e99',insider:{ar:'بعد العاصفة — سعد لقى شيء لامع في الوادي وما أخبر أحد.',en:'After the storm — Saad found something shiny in the valley and told no one.'},outsider:{ar:'بعد العاصفة — سلوى عادت للبيت وكل أثاثها كان في مكان مختلف.',en:'After the storm — Salwa came home and all her furniture was in different places.'}},
 {e:'🚂',cc:'#3b8fff',insider:{ar:'في القطار — شريف فجأة حس إن الراكب اللي جنبه هو اللي سرق شنطته.',en:'On the train — Shareef suddenly felt that the passenger next to him had stolen his bag.'},outsider:{ar:'في القطار — أمل ركبت الخط الغلط وما عرفت إلا لما القطار وقف في محطة غريبة.',en:'On the train — Amal boarded the wrong line and only realized when it stopped at a strange station.'}},
 {e:'🎭',cc:'#ff5e99',insider:{ar:'مسرحية المدرسة — ريان حفظ دوره غلط وقاله على المسرح بكل ثقة.',en:'School play — Ryan memorized the wrong lines and delivered them on stage with full confidence.'},outsider:{ar:'مسرحية المدرسة — دانة نسيت كلامها على المسرح فبدأت تتكلم من عندها.',en:'School play — Dana forgot her lines on stage so she started making them up.'}},,
 {e:'🛒',cc:'#ff7a30',sameStory:true,insider:{ar:'في السوق — كان في زحمة كبيرة ورحت تشتري شي معين. لما وصلت لقيت الرف فاضي.',en:'At the market — it was crowded and you went to buy something specific. When you got there, the shelf was empty.'},outsider:{ar:'في السوق — كان في زحمة كبيرة ورحت تشتري شي معين. لما وصلت لقيت الرف فاضي.',en:'At the market — it was crowded and you went to buy something specific. When you got there, the shelf was empty.'}},
 {e:'🎬',cc:'#9b5de5',sameStory:true,insider:{ar:'في السينما — الفيلم بدأ. الشخص اللي جنبك أكل بصوت عالي طول الفيلم.',en:'At the cinema — the movie started. The person next to you ate loudly the whole film.'},outsider:{ar:'في السينما — الفيلم بدأ. الشخص اللي جنبك أكل بصوت عالي طول الفيلم.',en:'At the cinema — the movie started. The person next to you ate loudly the whole film.'}},
 {e:'🚗',cc:'#3b8fff',sameStory:true,insider:{ar:'كنت في السيارة وانقطع البنزين في الطريق. ما كان فيه أحد في المنطقة.',en:'You were in the car and ran out of gas on the road. There was nobody around.'},outsider:{ar:'كنت في السيارة وانقطع البنزين في الطريق. ما كان فيه أحد في المنطقة.',en:'You were in the car and ran out of gas on the road. There was nobody around.'}},
 {e:'🏥',cc:'#2dcc6f',sameStory:true,insider:{ar:'في المستشفى — الدكتور قالك نتائجك جاهزة. انتظرت ساعة كاملة قبل ما يجي.',en:'At the hospital — the doctor said your results are ready. You waited a full hour before he came.'},outsider:{ar:'في المستشفى — الدكتور قالك نتائجك جاهزة. انتظرت ساعة كاملة قبل ما يجي.',en:'At the hospital — the doctor said your results are ready. You waited a full hour before he came.'}},
 {e:'✉️',cc:'#ff5e99',sameStory:true,insider:{ar:'وصلتك رسالة من شخص ما تعرفه. الرسالة تقول إنه يعرفك.',en:"You received a message from someone you don't know. The message says they know you."},outsider:{ar:'وصلتك رسالة من شخص ما تعرفه. الرسالة تقول إنه يعرفك.',en:"You received a message from someone you don't know. The message says they know you."}},
 {e:'🌅',cc:'#f5c800',sameStory:true,insider:{ar:'صحيت مبكر وخرجت تمشي. لقيت شخص واقف على الجسر يتأمل ويبدو عليه القلق.',en:'You woke up early and went for a walk. You found someone standing on the bridge, staring and looking worried.'},outsider:{ar:'صحيت مبكر وخرجت تمشي. لقيت شخص واقف على الجسر يتأمل ويبدو عليه القلق.',en:'You woke up early and went for a walk. You found someone standing on the bridge, staring and looking worried.'}},
 {e:'🎁',cc:'#ff5e99',sameStory:true,insider:{ar:'جالك هدية بالبريد — ما في اسم المرسل. فتحتها ولقيت شي غريب جداً بداخلها.',en:'A gift arrived by mail — no sender name. You opened it and found something very strange inside.'},outsider:{ar:'جالك هدية بالبريد — ما في اسم المرسل. فتحتها ولقيت شي غريب جداً بداخلها.',en:'A gift arrived by mail — no sender name. You opened it and found something very strange inside.'}},
 {e:'🗝️',cc:'#00bfa5',sameStory:true,insider:{ar:'لقيت مفتاح على الأرض في الشارع. جربته على باب بيتك فانفتح.',en:'You found a key on the street. You tried it on your door and it opened.'},outsider:{ar:'لقيت مفتاح على الأرض في الشارع. جربته على باب بيتك فانفتح.',en:'You found a key on the street. You tried it on your door and it opened.'}}
];

// ════════════════════════════════════════════════════════════════
// TOPICS (all genres, 6 languages)
// ════════════════════════════════════════════════════════════════
const TOPICS=[
 {cat:'اكل',catKey:'food',e:'🍕',cc:'#ff7a30',ar:['بيتزا','فطيرة'],en:['Pizza','Pie'],zh:['',''],hi:['',''],es:['Pizza','Avin de papel'],fr:['Pizza','Avion en papier']},
 {cat:'اكل',catKey:'food',e:'🍔',cc:'#ff7a30',ar:['برغر','هوت دوج'],en:['Burger','Hot Dog'],zh:['',''],hi:['',''],es:['Hamburguesa','Paraguas'],fr:['Burger','Parapluie']},
 {cat:'اكل',catKey:'food',e:'🍣',cc:'#3b8fff',ar:['سوشي','رامن'],en:['Sushi','Ramen'],zh:['',''],hi:['',''],es:['Sushi','Tiburn'],fr:['Sushi','Requin']},
 {cat:'اكل',catKey:'food',e:'🧆',cc:'#ff7a30',ar:['فلافل','كرة قدم'],en:['Falafel','Soccer Ball'],zh:['',''],hi:['',''],es:['Falafel','Baln de ftbol'],fr:['Falafel','Ballon de foot']},
 {cat:'اكل',catKey:'food',e:'🍗',cc:'#ff7a30',ar:['دجاج مشوي','دراجة هوائية'],en:['Grilled Chicken','Bicycle'],zh:['',''],hi:[' ',''],es:['Pollo asado','Bicicleta'],fr:['Poulet grill','Vlo']},
 {cat:'اكل',catKey:'food',e:'🌮',cc:'#ff7a30',ar:['تاكو','زرافة'],en:['Taco','Giraffe'],zh:['',''],hi:['',''],es:['Taco','Jirafa'],fr:['Taco','Girafe']},
 {cat:'اكل',catKey:'food',e:'🍝',cc:'#ff7a30',ar:['باستا','ثعبان'],en:['Pasta','Snake'],zh:['',''],hi:['',''],es:['Pasta','Serpiente'],fr:['Ptes','Serpent']},
 {cat:'اكل',catKey:'food',e:'🥩',cc:'#ff7a30',ar:['ستيك','بركان'],en:['Steak','Volcano'],zh:['',''],hi:['',''],es:['Filete','Volcn'],fr:['Steak','Volcan']},
 {cat:'اكل',catKey:'food',e:'🫔',cc:'#ff7a30',ar:['شاورما','كباب'],en:['Shawarma','Kebab'],zh:['',''],hi:['',' '],es:['Shawarma','Gato espacial'],fr:['Chawarma','Chat spatial']},
 {cat:'اكل',catKey:'food',e:'🍛',cc:'#ff7a30',ar:['كاري','حصان'],en:['Curry','Horse'],zh:['',''],hi:['',''],es:['Curry','Caballo'],fr:['Curry','Cheval']},
 {cat:'حلويات',catKey:'sweets',e:'🎂',cc:'#ff5e99',ar:['تيراميسو','بروفيترول'],en:['Tiramisu','Profiterole'],zh:['',''],hi:['',''],es:['Tiramis','Tanque'],fr:['Tiramisu','Tank']},
 {cat:'حلويات',catKey:'sweets',e:'🧁',cc:'#ff5e99',ar:['كب كيك','مافن'],en:['Cupcake','Muffin'],zh:['',''],hi:['',''],es:['Cupcake','Inundacin'],fr:['Cupcake','Inondation']},
 {cat:'حلويات',catKey:'sweets',e:'🍩',cc:'#ff5e99',ar:['دونات','كوكب زحل'],en:['Donut','Saturn'],zh:['',''],hi:['',''],es:['Dona','Saturno'],fr:['Beignet','Saturne']},
 {cat:'حلويات',catKey:'sweets',e:'🍫',cc:'#ff5e99',ar:['شوكولاتة','كراميل'],en:['Chocolate','Caramel'],zh:['',''],hi:['',''],es:['Chocolate','Bala'],fr:['Chocolat','Balle']},
 {cat:'حلويات',catKey:'sweets',e:'🍦',cc:'#ff5e99',ar:['آيس كريم','جيلاتو'],en:['Ice Cream','Gelato'],zh:['',''],hi:['',''],es:['Helado','Medusa'],fr:['Glace','Mduse']},
 {cat:'حلويات',catKey:'sweets',e:'🧇',cc:'#ff5e99',ar:['وافل','بانكيك'],en:['Waffle','Pancake'],zh:['',''],hi:['',''],es:['Gofre','Fnix'],fr:['Gaufre','Phnix']},
 {cat:'حلويات',catKey:'sweets',e:'🍰',cc:'#ff5e99',ar:['كيك بالفراولة','غواصة'],en:['Strawberry Cake','Submarine'],zh:['',''],hi:[' ',''],es:['Tarta de fresa','Submarino'],fr:['Gteau fraise','Sous-marin']},
 {cat:'حلويات',catKey:'sweets',e:'🍭',cc:'#ff5e99',ar:['مصاصة','أعصار'],en:['Lollipop','Tornado'],zh:['',''],hi:['',''],es:['Piruleta','Tornado'],fr:['Sucette','Tornade']},
 {cat:'حلويات',catKey:'sweets',e:'🥧',cc:'#ff5e99',ar:['كنافة','مركبة فضائية'],en:['Kunafa','Spacecraft'],zh:['',''],hi:['',' '],es:['Kunafa','Nave espacial'],fr:['Kanaf','Vaisseau spatial']},
 {cat:'حلويات',catKey:'sweets',e:'🍯',cc:'#ff5e99',ar:['بقلاوة','لقيمات'],en:['Baklava','Luqaimat'],zh:['',''],hi:['','  '],es:['Baklava','Dragn de hielo'],fr:['Baklava','Dragon de glace']},
 {cat:'مشروبات',catKey:'drinks',e:'☕',cc:'#9b5de5',ar:['كابتشينو','لاتيه'],en:['Cappuccino','Latte'],zh:['',''],hi:['',''],es:['Capuchino','Lombriz'],fr:['Cappuccino','Ver de terre']},
 {cat:'مشروبات',catKey:'drinks',e:'🧋',cc:'#9b5de5',ar:['باب تي','شاي بالحليب'],en:['Bubble Tea','Milk Tea'],zh:['',''],hi:[' ',' '],es:['Bubble Tea','Polo Norte'],fr:['Bubble Tea','Ple Nord']},
 {cat:'مشروبات',catKey:'drinks',e:'🍵',cc:'#9b5de5',ar:['شاي أخضر','شاي أسود'],en:['Green Tea','Black Tea'],zh:['',''],hi:[' ',''],es:['T verde','Dragn'],fr:['Th vert','Dragon']},
 {cat:'مشروبات',catKey:'drinks',e:'🥤',cc:'#9b5de5',ar:['سموذي','وحيد القرن'],en:['Smoothie','Unicorn'],zh:['',''],hi:['',''],es:['Batido','Unicornio'],fr:['Smoothie','Licorne']},
 {cat:'مشروبات',catKey:'drinks',e:'🍋',cc:'#9b5de5',ar:['ليموناضة','بركان'],en:['Lemonade','Volcano'],zh:['',''],hi:[' ',''],es:['Limonada','Volcn'],fr:['Limonade','Volcan']},
 {cat:'مشروبات',catKey:'drinks',e:'🍹',cc:'#9b5de5',ar:['عصير بطيخ','روبوت'],en:['Watermelon Juice','Robot'],zh:['',''],hi:['  ',''],es:['Jugo de sanda','Robot'],fr:['Jus de pastque','Robot']},
 {cat:'مشروبات',catKey:'drinks',e:'🫖',cc:'#9b5de5',ar:['شاي بالحليب','نمر'],en:['Milk Tea','Tiger'],zh:['',''],hi:['  ',''],es:['T con leche','Tigre'],fr:['Th au lait','Tigre']},
 {cat:'بلدان',catKey:'countries',e:'🗾',cc:'#3b8fff',ar:['اليابان','بيانو'],en:['Japan','Piano'],zh:['',''],hi:['',''],es:['Japn','Piano'],fr:['Japon','Piano']},
 {cat:'بلدان',catKey:'countries',e:'🌍',cc:'#3b8fff',ar:['أستراليا','نيوزيلندا'],en:['Australia','New Zealand'],zh:['',''],hi:['',' '],es:['Australia','Hongo mgico'],fr:['Australie','Champignon magique']},
 {cat:'بلدان',catKey:'countries',e:'🌎',cc:'#3b8fff',ar:['البرازيل','الأرجنتين'],en:['Brazil','Argentina'],zh:['',''],hi:['','  '],es:['Brasil','Camin de hielo'],fr:['Brsil','Camion de glace']},
 {cat:'بلدان',catKey:'countries',e:'🌏',cc:'#3b8fff',ar:['الصين','اليابان'],en:['China','Japan'],zh:['',''],hi:['',''],es:['China','Bola de nieve'],fr:['Chine','Boule de neige']},
 {cat:'بلدان',catKey:'countries',e:'🇰🇷',cc:'#3b8fff',ar:['كوريا الجنوبية','تايوان'],en:['South Korea','Taiwan'],zh:['',''],hi:[' ','- '],es:['Corea del Sur','Loro hip-hop'],fr:['Core du Sud','Perroquet hip-hop']},
 {cat:'بلدان',catKey:'countries',e:'🇮🇳',cc:'#3b8fff',ar:['الهند','باكستان'],en:['India','Pakistan'],zh:['',''],hi:['',' '],es:['India','Elefante bailarn'],fr:['Inde','lphant dansant']},
 {cat:'بلدان',catKey:'countries',e:'🇹🇷',cc:'#3b8fff',ar:['تركيا','اليونان'],en:['Turkey','Greece'],zh:['',''],hi:['',' '],es:['Turqua','Gato marinero'],fr:['Turquie','Chat marin']},
 {cat:'بلدان',catKey:'countries',e:'🇸🇦',cc:'#3b8fff',ar:['السعودية','الإمارات'],en:['Saudi Arabia','UAE'],zh:['',''],hi:[' ',' '],es:['Arabia Saud','Camello bailarn'],fr:['Arabie Saoudite','Chameau dansant']},
 {cat:'مدن',catKey:'cities',e:'🗽',cc:'#00bfa5',ar:['نيويورك','لوس أنجلوس'],en:['New York','Los Angeles'],zh:['',''],hi:['',' '],es:['Nueva York','Lubina'],fr:['New York','Perche']},
 {cat:'مدن',catKey:'cities',e:'🗼',cc:'#00bfa5',ar:['باريس','برلين'],en:['Paris','Berlin'],zh:['',''],hi:['','  '],es:['Pars','Ratn bailarn'],fr:['Paris','Souris danseuse']},
 {cat:'مدن',catKey:'cities',e:'🏯',cc:'#00bfa5',ar:['طوكيو','سيول'],en:['Tokyo','Seoul'],zh:['',''],hi:['',' '],es:['Tokio','Campana gigante'],fr:['Tokyo','Cloche gante']},
 {cat:'مدن',catKey:'cities',e:'🌆',cc:'#00bfa5',ar:['دبي','أبوظبي'],en:['Dubai','Abu Dhabi'],zh:['',''],hi:['',''],es:['Dubi','Pavo'],fr:['Duba','Dinde']},
 {cat:'مدن',catKey:'cities',e:'🎡',cc:'#00bfa5',ar:['لندن','مانشستر'],en:['London','Manchester'],zh:['',''],hi:['',' '],es:['Londres','Oso detective'],fr:['Londres','Ours dtective']},
 {cat:'مدن',catKey:'cities',e:'🏛️',cc:'#00bfa5',ar:['روما','أثينا'],en:['Rome','Athens'],zh:['',''],hi:['',' '],es:['Roma','Gato imperial'],fr:['Rome','Chat imprial']},
 {cat:'مدن',catKey:'cities',e:'🌴',cc:'#00bfa5',ar:['الرياض','جدة'],en:['Riyadh','Jeddah'],zh:['',''],hi:['',' رم'],es:['Riad','Avestruz de carreras'],fr:['Riyad','Autruche de course']},
 {cat:'مدن',catKey:'cities',e:'🌃',cc:'#00bfa5',ar:['سيول','طوكيو'],en:['Seoul','Tokyo'],zh:['','K-Pop'],hi:['','K- '],es:['Sel','Robot K-Pop'],fr:['Soul','Robot K-Pop']},

 {cat:'اكل',catKey:'food',e:'🥗',cc:'#ff7a30',ar:['سلطة','كيك'],en:['Salad','Cake'],zh:['',''],hi:['',''],es:['Ensalada','Torta'],fr:['Salade','Gteau']},
 {cat:'اكل',catKey:'food',e:'🥪',cc:'#ff7a30',ar:['ساندويتش','شوكة'],en:['Sandwich','Fork'],zh:['',''],hi:['',''],es:['Sndwich','Tenedor'],fr:['Sandwich','Fourchette']},
 {cat:'اكل',catKey:'food',e:'🥙',cc:'#ff7a30',ar:['لحم مشوي','فطر'],en:['Grilled Meat','Mushroom'],zh:['',''],hi:[' ',''],es:['Carne asada','Champin'],fr:['Viande grille','Champignon']},
 {cat:'حلويات',catKey:'sweets',e:'🍬',cc:'#ff5e99',ar:['حلوى','فستق'],en:['Candy','Pistachio'],zh:['',''],hi:['',''],es:['Caramelo','Pistacho'],fr:['Bonbon','Pistache']},
 {cat:'حلويات',catKey:'sweets',e:'🥐',cc:'#ff5e99',ar:['كرواسان','بسكويت'],en:['Croissant','Cookie'],zh:['',''],hi:['',''],es:['Croissant','Galleta'],fr:['Croissant','Biscuit']},
 {cat:'مشروبات',catKey:'drinks',e:'🥛',cc:'#9b5de5',ar:['حليب','قهوة عربية'],en:['Milk','Arabic Coffee'],zh:['',''],hi:['',' '],es:['Leche','Caf rabe'],fr:['Lait','Caf arabe']},
 {cat:'مشروبات',catKey:'drinks',e:'🧃',cc:'#9b5de5',ar:['عصير برتقال','شاي أحمر'],en:['Orange Juice','Red Tea'],zh:['',''],hi:['  ',' '],es:['Jugo de naranja','T rojo'],fr:["Jus d'orange",'Th rouge']},
 {cat:'رياضة',catKey:'sports',e:'🏊',cc:'#2dcc6f',ar:['تنس الطاولة','بولينج'],en:['Table Tennis','Bowling'],zh:['',''],hi:[' ',''],es:['Tenis de mesa','Boliche'],fr:['Tennis de table','Bowling']},
 {cat:'رياضة',catKey:'sports',e:'🤺',cc:'#2dcc6f',ar:['المبارزة','كاراتيه'],en:['Fencing','Karate'],zh:['',''],hi:['',''],es:['Esgrima','Karate'],fr:['Escrime','Karat']},
 {cat:'مهن',catKey:'jobs',e:'✈️',cc:'#9b5de5',ar:['مهندس','معلم'],en:['Engineer','Teacher'],zh:['',''],hi:['',''],es:['Ingeniero','Maestro'],fr:['Ingnieur','Professeur']},
 {cat:'مهن',catKey:'jobs',e:'🎬',cc:'#9b5de5',ar:['ممثل','مخرج أفلام'],en:['Actor','Film Director'],zh:['',''],hi:['',' '],es:['Actor','Director de cine'],fr:['Acteur','Ralisateur']},
 {cat:'حيوانات',catKey:'animals',e:'🐺',cc:'#f5c800',ar:['ذئب','ثعلب القطب'],en:['Wolf','Arctic Fox'],zh:['',''],hi:['',' '],es:['Lobo','Zorro rtico'],fr:['Loup','Renard arctique']},
 {cat:'حيوانات',catKey:'animals',e:'🦅',cc:'#f5c800',ar:['نسر','صقر'],en:['Eagle','Falcon'],zh:['',''],hi:['',''],es:['guila','Halcn'],fr:['Aigle','Faucon']},
 {cat:'تقنية',catKey:'tech',e:'🖨️',cc:'#3b8fff',ar:['طابعة','ماسح ضوئي'],en:['Printer','Scanner'],zh:['',''],hi:['',''],es:['Impresora','Escner'],fr:['Imprimante','Scanner']},
 {cat:'تقنية',catKey:'tech',e:'📡',cc:'#3b8fff',ar:['قمر صناعي','رادار'],en:['Satellite','Radar'],zh:['',''],hi:['',''],es:['Satlite','Radar'],fr:['Satellite','Radar']},
 {cat:'طبيعة',catKey:'nature',e:'🌊',cc:'#3b8fff',ar:['نهر','بحيرة'],en:['River','Lake'],zh:['',''],hi:['',''],es:['Ro','Lago'],fr:['Rivire','Lac']},
 {cat:'طبيعة',catKey:'nature',e:'🏔️',cc:'#3b8fff',ar:['جبل','وادي'],en:['Mountain','Valley'],zh:['',''],hi:['',''],es:['Montaa','Valle'],fr:['Montagne','Valle']},
 {cat:'بلدان',catKey:'countries',e:'🇮🇹',cc:'#3b8fff',ar:['إيطاليا','إسبانيا'],en:['Italy','Spain'],zh:['',''],hi:['',''],es:['Italia','Espaa'],fr:['Italie','Espagne']},
 {cat:'بلدان',catKey:'countries',e:'🇫🇷',cc:'#3b8fff',ar:['فرنسا','ألمانيا'],en:['France','Germany'],zh:['',''],hi:['',''],es:['Francia','Alemania'],fr:['France','Allemagne']},
 {cat:'مدن',catKey:'cities',e:'🌆',cc:'#00bfa5',ar:['إسطنبول','أنقرة'],en:['Istanbul','Ankara'],zh:['',''],hi:['',''],es:['Estambul','Ankara'],fr:['Istanbul','Ankara']},
 {cat:'مدن',catKey:'cities',e:'🏙️',cc:'#00bfa5',ar:['سنغافورة','كوالالمبور'],en:['Singapore','Kuala Lumpur'],zh:['',''],hi:['',''],es:['Singapur','Kuala Lumpur'],fr:['Singapour','Kuala Lumpur']},
 // ── Extra topics (added by patch) ──
 {cat:'اكل',catKey:'food',e:'🥚',cc:'#ff7a30',ar:['بيض مقلي','عجة'],en:['Fried Egg','Omelette'],zh:['',''],hi:['',''],es:['Huevo frito','Tortilla'],fr:['Œuf au plat','Omelette']},
 {cat:'اكل',catKey:'food',e:'🫕',cc:'#ff7a30',ar:['مرق','يخني'],en:['Broth','Stew'],zh:['',''],hi:['',''],es:['Caldo','Estofado'],fr:['Bouillon','Ragoût']},
 {cat:'اكل',catKey:'food',e:'🧀',cc:'#ff7a30',ar:['جبن','زبدة'],en:['Cheese','Butter'],zh:['',''],hi:['',''],es:['Queso','Mantequilla'],fr:['Fromage','Beurre']},
 {cat:'حلويات',catKey:'sweets',e:'🍮',cc:'#ff5e99',ar:['كريم برولي','بودينج'],en:['Crème Brûlée','Pudding'],zh:['',''],hi:['',''],es:['Crème brûlée','Budín'],fr:['Crème brûlée','Pudding']},
 {cat:'مشروبات',catKey:'drinks',e:'🧉',cc:'#9b5de5',ar:['ماتي','كومبوتشا'],en:['Mate','Kombucha'],zh:['',''],hi:['',''],es:['Mate','Kombucha'],fr:['Maté','Kombucha']},
 {cat:'مشروبات',catKey:'drinks',e:'🫗',cc:'#9b5de5',ar:['شيك بالشوكولاتة','عصير ليمون بالنعناع'],en:['Chocolate Milkshake','Mint Lemonade'],zh:['',''],hi:['',''],es:['Batido de chocolate','Limonada de menta'],fr:['Milkshake chocolat','Citronnade menthe']},
 {cat:'حيوانات',catKey:'animals',e:'🦥',cc:'#f5c800',ar:['كسلان','قرد الشمبانزي'],en:['Sloth','Chimpanzee'],zh:['',''],hi:['',''],es:['Perezoso','Chimpancé'],fr:['Paresseux','Chimpanzé']},
 {cat:'حيوانات',catKey:'animals',e:'🦩',cc:'#f5c800',ar:['فلامينغو','طاووس'],en:['Flamingo','Peacock'],zh:['',''],hi:['',''],es:['Flamenco','Pavo real'],fr:['Flamant rose','Paon']},
 {cat:'حيوانات',catKey:'animals',e:'🐊',cc:'#f5c800',ar:['تمساح','سحلية'],en:['Crocodile','Lizard'],zh:['',''],hi:['',''],es:['Cocodrilo','Lagarto'],fr:['Crocodile','Lézard']},
 {cat:'رياضة',catKey:'sports',e:'🏄',cc:'#2dcc6f',ar:['ركوب الأمواج','تزلج على الماء'],en:['Surfing','Waterskiing'],zh:['',''],hi:['',''],es:['Surf','Esquí acuático'],fr:['Surf','Ski nautique']},
 {cat:'رياضة',catKey:'sports',e:'🧗',cc:'#2dcc6f',ar:['تسلق الجبال','صخرة'],en:['Mountain Climbing','Bouldering'],zh:['',''],hi:['',''],es:['Alpinismo','Boulder'],fr:['Alpinisme','Escalade bloc']},
 {cat:'مهن',catKey:'jobs',e:'🧑‍🚒',cc:'#9b5de5',ar:['إطفائي','رجل إنقاذ'],en:['Firefighter','Lifeguard'],zh:['',''],hi:['',''],es:['Bombero','Socorrista'],fr:['Pompier','Maître nageur']},
 {cat:'مهن',catKey:'jobs',e:'🧑‍🏫',cc:'#9b5de5',ar:['أستاذ جامعي','مرشد طلابي'],en:['Professor','Counselor'],zh:['',''],hi:['',''],es:['Profesor universitario','Consejero'],fr:['Professeur universitaire','Conseiller']},
 {cat:'تقنية',catKey:'tech',e:'🖥️',cc:'#3b8fff',ar:['كمبيوتر مكتبي','شاشة عرض'],en:['Desktop Computer','Monitor'],zh:['',''],hi:['',''],es:['Computadora de escritorio','Monitor'],fr:['Ordinateur de bureau','Écran']},
 {cat:'تقنية',catKey:'tech',e:'⌨️',cc:'#3b8fff',ar:['لوحة مفاتيح','ماوس'],en:['Keyboard','Mouse'],zh:['',''],hi:['',''],es:['Teclado','Ratón'],fr:['Clavier','Souris']},
 {cat:'طبيعة',catKey:'nature',e:'🌿',cc:'#ff3b5c',ar:['غابة مطيرة','أدغال'],en:['Rainforest','Jungle'],zh:['',''],hi:['',''],es:['Selva tropical','Jungla'],fr:['Forêt tropicale','Jungle']},
 {cat:'طبيعة',catKey:'nature',e:'🪨',cc:'#ff3b5c',ar:['صخرة','كهف'],en:['Rock','Cave'],zh:['',''],hi:['',''],es:['Roca','Cueva'],fr:['Rocher','Grotte']},
 {cat:'بلدان',catKey:'countries',e:'🇲🇽',cc:'#3b8fff',ar:['المكسيك','كولومبيا'],en:['Mexico','Colombia'],zh:['',''],hi:['',''],es:['México','Colombia'],fr:['Mexique','Colombie']},
 {cat:'بلدان',catKey:'countries',e:'🇪🇬',cc:'#3b8fff',ar:['مصر','المغرب'],en:['Egypt','Morocco'],zh:['',''],hi:['',''],es:['Egipto','Marruecos'],fr:['Égypte','Maroc']},
 {cat:'مدن',catKey:'cities',e:'🌆',cc:'#00bfa5',ar:['بيروت','عمّان'],en:['Beirut','Amman'],zh:['',''],hi:['',''],es:['Beirut','Amán'],fr:['Beyrouth','Amman']},
 {cat:'حيوانات',catKey:'animals',e:'🦁',cc:'#f5c800',ar:['أسد','نمر'],en:['Lion','Tiger'],zh:['',''],hi:['',''],es:['Len','Plancha'],fr:['Lion','Fer  repasser']},
 {cat:'حيوانات',catKey:'animals',e:'🐘',cc:'#f5c800',ar:['فيل','فرس النهر'],en:['Elephant','Hippopotamus'],zh:['',''],hi:['',''],es:['Elefante','Brjula'],fr:['lphant','Boussole']},
 {cat:'حيوانات',catKey:'animals',e:'🦒',cc:'#f5c800',ar:['زرافة','جاموس'],en:['Giraffe','Buffalo'],zh:['',''],hi:['',' '],es:['Jirafa','Torre de radio'],fr:['Girafe','Tour radio']},
 {cat:'حيوانات',catKey:'animals',e:'🐧',cc:'#f5c800',ar:['بطريق','فقمة'],en:['Penguin','Seal'],zh:['',''],hi:['','  '],es:['Pingino','Reloj de arena'],fr:['Pingouin','Sablier']},
 {cat:'حيوانات',catKey:'animals',e:'🦊',cc:'#f5c800',ar:['ثعلب','ذئب'],en:['Fox','Wolf'],zh:['',''],hi:['',' '],es:['Zorro','Fbrica de chocolate'],fr:['Renard','Usine  chocolat']},
 {cat:'حيوانات',catKey:'animals',e:'🐬',cc:'#f5c800',ar:['دولفين','حوت'],en:['Dolphin','Whale'],zh:['',''],hi:['',''],es:['Delfn','Impresora'],fr:['Dauphin','Imprimante']},
 {cat:'حيوانات',catKey:'animals',e:'🦜',cc:'#f5c800',ar:['ببغاء','طوقان'],en:['Parrot','Toucan'],zh:['',''],hi:['',' '],es:['Loro','Espada lser'],fr:['Perroquet','pe laser']},
 {cat:'حيوانات',catKey:'animals',e:'🦈',cc:'#f5c800',ar:['قرش','سمكة المنشار'],en:['Shark','Sawfish'],zh:['',''],hi:['',''],es:['Tiburn','Paracadas'],fr:['Requin','Parachute']},
 {cat:'رياضة',catKey:'sports',e:'⚽',cc:'#2dcc6f',ar:['كرة القدم','رغبي'],en:['Soccer','Rugby'],zh:['',''],hi:['',' '],es:['Ftbol','Elefante musical'],fr:['Football','lphant musical']},
 {cat:'رياضة',catKey:'sports',e:'🏀',cc:'#2dcc6f',ar:['كرة السلة','كرة الطائرة'],en:['Basketball','Volleyball'],zh:['',''],hi:['',''],es:['Baloncesto','Camalen'],fr:['Basketball','Camlon']},
 {cat:'رياضة',catKey:'sports',e:'🎾',cc:'#2dcc6f',ar:['التنس','بادمنتون'],en:['Tennis','Badminton'],zh:['',''],hi:['',' '],es:['Tenis','Cohete espacial'],fr:['Tennis','Fuse spatiale']},
 {cat:'رياضة',catKey:'sports',e:'🏊',cc:'#2dcc6f',ar:['السباحة','غوص'],en:['Swimming','Diving'],zh:['',''],hi:['',' '],es:['Natacin','Oveja bailarina'],fr:['Natation','Mouton dansant']},
 {cat:'رياضة',catKey:'sports',e:'🥊',cc:'#2dcc6f',ar:['الملاكمة','المصارعة الحرة'],en:['Boxing','MMA'],zh:['',''],hi:['',' '],es:['Boxeo','Diccionario gigante'],fr:['Boxe','Dictionnaire gant']},
 {cat:'رياضة',catKey:'sports',e:'🏋️',cc:'#2dcc6f',ar:['رفع الأثقال','الجودو'],en:['Weightlifting','Judo'],zh:['',''],hi:['',' '],es:['Halterofilia','Ballena cantante'],fr:['Haltrophilie','Baleine chanteuse']},
 {cat:'رياضة',catKey:'sports',e:'🤸',cc:'#2dcc6f',ar:['الجمناستك','الباليه الرياضي'],en:['Gymnastics','Rhythmic Gymnastics'],zh:['',''],hi:['',''],es:['Gimnasia','Fnix'],fr:['Gymnastique','Phnix']},
 {cat:'مهن',catKey:'jobs',e:'👨‍⚕️',cc:'#9b5de5',ar:['طبيب','صيدلاني'],en:['Doctor','Pharmacist'],zh:['',''],hi:['',' '],es:['Mdico','Cocodrilo entrenado'],fr:['Mdecin','Crocodile entran']},
 {cat:'مهن',catKey:'jobs',e:'👨‍💻',cc:'#9b5de5',ar:['مبرمج','مصمم جرافيك'],en:['Programmer','Graphic Designer'],zh:['',''],hi:['',' '],es:['Programador','Tiburn bailarn'],fr:['Programmeur','Requin dansant']},
 {cat:'مهن',catKey:'jobs',e:'👨‍🍳',cc:'#9b5de5',ar:['طباخ','خباز'],en:['Chef','Baker'],zh:['',''],hi:['','  '],es:['Chef','Robot bailarn'],fr:['Chef','Robot dansant']},
 {cat:'مهن',catKey:'jobs',e:'🚀',cc:'#9b5de5',ar:['رائد فضاء','طيار'],en:['Astronaut','Pilot'],zh:['',''],hi:[' ',' '],es:['Astronauta','Tortuga sabia'],fr:['Astronaute','Tortue sage']},
 {cat:'مهن',catKey:'jobs',e:'🔍',cc:'#9b5de5',ar:['محقق','محامي'],en:['Detective','Lawyer'],zh:['',''],hi:['',' '],es:['Detective','Hongo gigante'],fr:['Dtective','Champignon gant']},
 {cat:'مهن',catKey:'jobs',e:'🎨',cc:'#9b5de5',ar:['فنان','موسيقي'],en:['Artist','Musician'],zh:['',''],hi:['',' '],es:['Artista','Pulpo sinfnico'],fr:['Artiste','Pieuvre symphonique']},
 {cat:'طبيعة',catKey:'nature',e:'🌋',cc:'#ff3b5c',ar:['بركان','زلزال'],en:['Volcano','Earthquake'],zh:['',''],hi:['',' '],es:['Volcn','Pollo superhroe'],fr:['Volcan','Poulet super-hros']},
 {cat:'طبيعة',catKey:'nature',e:'🌊',cc:'#3b8fff',ar:['موجة تسونامي','إعصار'],en:['Tsunami Wave','Hurricane'],zh:['',''],hi:[' ',' '],es:['Ola de tsunami','Gato bailarn'],fr:['Vague de tsunami','Chat ballerine']},
 {cat:'طبيعة',catKey:'nature',e:'🌈',cc:'#ff5e99',ar:['قوس قزح','شفق قطبي'],en:['Rainbow','Northern Lights'],zh:['',''],hi:['','  '],es:['Arcoris','Tambor de fuego'],fr:['Arc-en-ciel','Tambour de feu']},
 {cat:'طبيعة',catKey:'nature',e:'⚡',cc:'#f5c800',ar:['البرق','رعد'],en:['Lightning','Thunder'],zh:['',''],hi:['',' '],es:['Rayo','Mono filsofo'],fr:['Foudre','Singe philosophe']},
 {cat:'طبيعة',catKey:'nature',e:'🏜️',cc:'#ff3b5c',ar:['صحراء','واحة'],en:['Desert','Oasis'],zh:['',''],hi:['',' '],es:['Desierto','Lobo musical'],fr:['Dsert','Loup musical']},
 {cat:'طبيعة',catKey:'nature',e:'🌙',cc:'#f5c800',ar:['القمر','الشمس'],en:['Moon','Sun'],zh:['',''],hi:['',' '],es:['Luna','Conejo atleta'],fr:['Lune','Lapin athlte']},
 {cat:'تقنية',catKey:'tech',e:'📱',cc:'#3b8fff',ar:['آيفون','آندرويد'],en:['iPhone','Android'],zh:['',''],hi:['',' '],es:['iPhone','Oso esquiador'],fr:['iPhone','Ours skieur']},
 {cat:'تقنية',catKey:'tech',e:'🎮',cc:'#3b8fff',ar:['بلاي ستيشن','إكس بوكس'],en:['PlayStation','Xbox'],zh:['PlayStation',''],hi:['PlayStation',' '],es:['PlayStation','Pingino musical'],fr:['PlayStation','Pingouin musical']},
 {cat:'تقنية',catKey:'tech',e:'🤖',cc:'#3b8fff',ar:['روبوت','ذكاء اصطناعي'],en:['Robot','Artificial Intelligence'],zh:['',''],hi:['',' '],es:['Robot','Cobra atltica'],fr:['Robot','Cobra athltique']},
 {cat:'تقنية',catKey:'tech',e:'💻',cc:'#3b8fff',ar:['لابتوب','تابلت'],en:['Laptop','Tablet'],zh:['',''],hi:['',' '],es:['Porttil','Araa ninja'],fr:['Ordinateur portable','Araigne ninja']},
 {cat:'تقنية',catKey:'tech',e:'🚁',cc:'#3b8fff',ar:['طائرة مسيّرة','هليكوبتر'],en:['Drone','Helicopter'],zh:['',''],hi:['',' '],es:['Drone','Tiburn cantante'],fr:['Drone','Requin chantant']},
 {cat:'تقنية',catKey:'tech',e:'🧠',cc:'#3b8fff',ar:['ذكاء اصطناعي','روبوت'],en:['Artificial Intelligence','Robot'],zh:['',''],hi:[' ',' '],es:['Inteligencia Artificial','Rata filsofa'],fr:['Intelligence Artificielle','Rat philosophe']},
 {cat:'تقنية',catKey:'tech',e:'🎧',cc:'#3b8fff',ar:['سماعات','مكبر صوت'],en:['Headphones','Speaker'],zh:['','DJ'],hi:['','DJ '],es:['Auriculares','Oso DJ'],fr:['Casque','Ours DJ']},
];

// ════════════════════════════════════════════════════════════════
// GAME QUESTIONS (15 — fired by twists)
// ════════════════════════════════════════════════════════════════
// Game questions: open-ended, purposeful, help group identify the outsider
// The player must answer out loud — their answer reveals clues to everyone
const GQ_POOLS_AR={
 physical:[
  ()=>'وش لون كلمتك في الغالب؟',
  ()=>'كلمتك — أكبر من كف اليد ولا أصغر؟',
  ()=>'كلمتك — ناعمة ولا خشنة لما تلمسها؟',
  ()=>'كلمتك — ثقيلة ولا خفيفة؟',
  ()=>'هل كلمتك تصدر صوت؟ كيف يكون؟',
  ()=>'كلمتك — تلقاها داخل البيت ولا برا في الغالب؟',
  ()=>'كلمتك — حية ولا جماد؟',
  ()=>'هل كلمتك يُؤكل أو يُشرب؟',
  ()=>'كلمتك — فيها حركة أو نشاط؟',
  ()=>'وش شكل كلمتك؟ مستدير؟ مربع؟',
  ()=>'كلمتك — مصنوعة من شيء طبيعي ولا صناعي؟',
  ()=>'كلمتك — قديمة ولا حديثة؟',
  ()=>'هل كلمتك نادرة أو شائعة؟',
  ()=>'كلمتك — لها ريحة؟ وصفها',
  ()=>'قول كلمة واحدة تخطر في بالك لما تفكر في كلمتك',
  ()=>'كلمتك — يمكن تحملها باليد؟',
  ()=>'هل كلمتك تحتاج ماء أو ضوء؟',
 ],
 place:[
  ()=>'كلمتك — كبيرة ولا صغيرة مقارنة بالسعودية؟',
  ()=>'كلمتك — جو حارّ ولا بارد في الغالب؟',
  ()=>'وش اللغة الأكثر في كلمتك؟',
  ()=>'كلمتك — على البحر ولا داخل البر؟',
  ()=>'هل كلمتك فيها برج أو معلم مشهور؟',
  ()=>'كلمتك — قديمة تاريخياً ولا حديثة؟',
  ()=>'كلمتك — قريبة من آسيا ولا من أوروبا؟',
  ()=>'وش أول أكلة تخطر في بالك مرتبطة بكلمتك؟',
  ()=>'كلمتك — شعبها كثير ولا قليل؟',
  ()=>'هل كلمتك مشهورة بالسياحة؟',
  ()=>'كلمتك — تحتاج تأشيرة للسعودي يزورها؟',
  ()=>'هل كلمتك فيها صحراء؟',
  ()=>'كلمتك — في نصف الكرة الشمالي ولا الجنوبي؟',
  ()=>'وش أول لون تتخيله لما تفكر في كلمتك؟',
  ()=>'قول كلمة واحدة تخطر في بالك لما تفكر في كلمتك',
 ],
 role:[
  ()=>'كلمتك — تتطلب تعليم عالي ولا ممكن بدونه؟',
  ()=>'كلمتك — تشتغل داخل ولا برا في الغالب؟',
  ()=>'هل كلمتك تستخدم اليدين أكثر ولا العقل؟',
  ()=>'كلمتك — فيها منافسة مع أشخاص ثانيين مباشرة؟',
  ()=>'وش أهم أداة تحتاجها كلمتك؟',
  ()=>'كلمتك — فردية ولا جماعية؟',
  ()=>'هل كلمتك تلبس زي خاص؟',
  ()=>'كلمتك — يمارسها كبار أو صغار في الغالب؟',
  ()=>'كلمتك — فيها خطر جسدي؟',
  ()=>'هل كلمتك مشهورة في العالم كله؟',
  ()=>'كلمتك — تحتاج بدني ولا ذهني أكثر؟',
  ()=>'كلمتك — لها موسم أو وقت محدد في السنة؟',
  ()=>'هل كلمتك تحتاج ملعب أو مكان مخصص؟',
  ()=>'قول كلمة واحدة تخطر في بالك لما تفكر في كلمتك',
 ],
 general:[
  ()=>'وش أول شيء يخطر في بالك لما تفكر في كلمتك؟',
  ()=>'كلمتك — إيجابية ولا سلبية لك شخصياً؟',
  ()=>'هل كلمتك معروفة عند الكل؟',
  ()=>'كلمتك — قديمة ولا حديثة؟',
  ()=>'قول كلمة واحدة تخطر في بالك لما تفكر في كلمتك',
  ()=>'كلمتك — بتحبها ولا بتكرهها؟ ليش؟',
  ()=>'لو كلمتك حيوان، وش يكون؟',
  ()=>'كلمتك — فيها خطر ولا آمنة تماماً؟',
  ()=>'كلمتك — ممكن تلقاها في بيتك؟',
  ()=>'لو كلمتك شخص، مزاجه كيف؟ هادي ولا صاخب؟',
 ],
};
const GQ_POOLS_EN={
 physical:[
  ()=>'What color is your word, usually?',
  ()=>'Is your word bigger or smaller than your hand?',
  ()=>'Is your word smooth or rough to the touch?',
  ()=>'Is your word heavy or light?',
  ()=>'Does your word make a sound? What kind?',
  ()=>'Is your word usually found indoors or outdoors?',
  ()=>'Is your word alive or a non-living thing?',
  ()=>'Can you eat or drink your word?',
  ()=>'Is there movement or activity associated with your word?',
  ()=>'What shape is your word? Round, square, other?',
  ()=>'Is your word made of something natural or man-made?',
  ()=>'Is your word considered old or modern?',
  ()=>'Is your word rare or common?',
  ()=>'Does your word have a smell? Describe it',
  ()=>'Say one word that comes to mind when you think of your word',
  ()=>'Can you hold your word in one hand?',
  ()=>'Does your word need water or sunlight to survive?',
 ],
 place:[
  ()=>'Is your word bigger or smaller than Saudi Arabia?',
  ()=>'Is the climate of your word mostly hot or cold?',
  ()=>'What language is most spoken in your word?',
  ()=>'Is your word on the coast or landlocked?',
  ()=>'Does your word have a famous landmark or tower?',
  ()=>'Is your word historically old or relatively new?',
  ()=>'Is your word closer to Asia or Europe?',
  ()=>'What food first comes to mind when you think of your word?',
  ()=>'Does your word have a large or small population?',
  ()=>'Is your word famous for tourism?',
  ()=>'Does a Saudi citizen need a visa to visit your word?',
  ()=>'Does your word have a desert?',
  ()=>'Is your word in the northern or southern hemisphere?',
  ()=>'What color do you picture first when you think of your word?',
  ()=>'Say one word that comes to mind when you think of your word',
 ],
 role:[
  ()=>'Does your word require a university degree?',
  ()=>'Does your word happen mostly indoors or outdoors?',
  ()=>'Does your word use hands more or brain more?',
  ()=>'Does your word involve direct competition against other people?',
  ()=>'What is the most important tool your word needs?',
  ()=>'Is your word done solo or as a team?',
  ()=>'Does your word require a special uniform or outfit?',
  ()=>'Is your word mostly associated with adults or younger people?',
  ()=>'Does your word involve physical risk?',
  ()=>'Is your word famous worldwide?',
  ()=>'Does your word require more physical or mental effort?',
  ()=>'Does your word have a specific season or time of year?',
  ()=>'Does your word need a special venue or field?',
  ()=>'Say one word that comes to mind when you think of your word',
 ],
 general:[
  ()=>'What is the very first thing that comes to mind about your word?',
  ()=>'Is your word positive or negative to you personally?',
  ()=>'Is your word something everyone knows?',
  ()=>'Is your word considered old or modern?',
  ()=>'Say one word that comes to mind when you think of your word',
  ()=>'Do you love or hate your word personally? Why?',
  ()=>'If your word were an animal, what would it be?',
  ()=>'Is your word dangerous or completely safe?',
  ()=>'Could you find your word in a typical home?',
  ()=>'If your word were a person, what kind of mood would it have — calm or loud?',
 ],
};
const GQ_GENRE_BUCKET={
 food:'physical',sweets:'physical',drinks:'physical',
 animals:'physical',nature:'physical',tech:'physical',
 countries:'place',cities:'place',
 jobs:'role',sports:'role',
 story:'general',
};
function pickGameQuestion(langCode){
 const pools=langCode==='ar'?GQ_POOLS_AR:GQ_POOLS_EN;
 let bucket='general';
 if(gameMode!=='story'&&topic){
  bucket=GQ_GENRE_BUCKET[topic.catKey||'']||'physical';
 }
 const pool=Math.random()<0.20?pools.general:(pools[bucket]||pools.general);
 return pool[Math.floor(Math.random()*pool.length)]();
}
// Legacy aliases so nothing else breaks
const GAME_QUESTIONS_AR=GQ_POOLS_AR.general;
const GAME_QUESTIONS_EN=GQ_POOLS_EN.general;

// ════════════════════════════════════════════════════════════════
// TWISTS
// ════════════════════════════════════════════════════════════════
const TWISTS=[
 {id:'word_swap',emoji:'🔄',title:{ar:'تبادل الكلمات!',en:'Word Swap!'},desc:{ar:'لاعبان من الجماعة يتبادلون كلمتهم — حاولوا تخدعوا بعض!',en:'Two insiders swap words — try to bluff each other!'}},
 {id:'forced_vote',emoji:'🗳️',title:{ar:'تصويت إجباري!',en:'Forced Vote!'},desc:{ar:'لازم تصوت على شخص معين هاللعبة، ما عندك خيار!',en:'You MUST vote for a specific person this round!'}},
 {id:'silent_round',emoji:'🤫',title:{ar:'جولة صمت!',en:'Silent Round!'},desc:{ar:'كل الأجوبة لازم تكون بالهمس أو مكتوبة!',en:'All answers must be whispered or written!'}},
 {id:'insider_spy',emoji:'🕵️',title:{ar:'جاسوس سري!',en:'Secret Spy!'},desc:{ar:'لاعب عشوائي يشوف كل معلومات الجولة في شاشة كلمته — بسرية تامة!',en:'A random player sees all round info privately on their word screen!'}},
 {id:'reverse_vote',emoji:'🔃',title:{ar:'التصويت العكسي!',en:'Reverse Vote!'},desc:{ar:'هاللعبة — الأكثر أصوات هو الفايز مو الخاسر!',en:'Most voted player WINS instead of loses this round!'}},
 {id:'time_pressure',emoji:'⏱️',title:{ar:'ضغط الوقت!',en:'Time Pressure!'},desc:{ar:'كل شخص عنده 10 ثواني فقط يجاوب على أي سؤال!',en:'Each person has only 10 seconds to answer any question!'}},
 {id:'whisper_round',emoji:'🗣️',title:{ar:'جولة الهمس!',en:'Whisper Round!'},desc:{ar:'الجولة هذي — كل الأجوبة لازم تكون بالهمس!',en:'All answers must be in a WHISPER this round!'}},
 {id:'game_question',emoji:'❓',title:{ar:'سؤال اللعبة!',en:'Game Question!'},desc:{ar:'اللعبة رح تسأل لاعب سؤال إضافي الحين!',en:'The game asks a player an extra question right now!'}},
 {id:'double_outsider',emoji:'👥',title:{ar:'خارجان!',en:'Double Outsiders!'},desc:{ar:'في هالجولة لاعبان بعرفون كلمة مختلفة — اثنان ضد الجماعة!',en:'Two players share a different word this round — two Outsiders vs the group!'}},
 {id:'amnesia',emoji:'🤯',title:{ar:'نسيان!',en:'Amnesia!'},desc:{ar:'لاعب عشوائي ينسى كلمته — يجيب له إشارة واحدة فقط من الجماعة بالهمس!',en:'A random player "forgets" their word — the group gives them exactly one whispered hint!'}},
 {id:'copycat',emoji:'🦜',title:{ar:'ببغاء!',en:'Copycat!'},desc:{ar:'الجولة هذي — كل لاعب لازم يبدأ إجابته بنفس الكلمة اللي قالها اللي قبله!',en:'This round — every player must start their answer with the last word the previous player said!'}}
];
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
// NAVIGATION + UI UTILITIES
// ════════════════════════════════════════════════════════════════
// Static Array (not live NodeList) — safe to iterate while modifying classes
const _allScreens=Array.from(document.querySelectorAll('.screen'));
function show(id,instant){
 const el=document.getElementById(id);
 if(!el){console.error('Missing screen:',id);return;}
 const doShow=()=>{
  requestAnimationFrame(()=>{
   _allScreens.forEach(s=>s.classList.remove('active'));
   el.classList.add('active');
   el.scrollTop=0;
  });
 };
 if(instant){
  if(pendingShowTimer){ clearTimeout(pendingShowTimer); pendingShowTimer=null; }
  clearUiPress();
  doShow();
  return;
 }
 const recentPress=(Date.now()-lastUiPressAt)<=260;
 if(recentPress){
  if(pendingShowTimer) clearTimeout(pendingShowTimer);
  pendingShowTimer=setTimeout(()=>{
   pendingShowTimer=null;
   clearUiPress();
   doShow();
  }, getUiPressDelay());
  return;
 }
 clearUiPress();
 doShow();
}
function closeModal(id,e){if(e.target===document.getElementById(id))closeModalDirect(id);}
function closeModalDirect(id){const el=document.getElementById(id);if(el)el.classList.add('hidden');}
function openSettings(){getAudio();playSound('settings');document.getElementById('settings-modal').classList.remove('hidden');}
function openOptions(){playSound('tap');haptic('light');renderOptionsModal();document.getElementById('options-modal').classList.remove('hidden');}
function openRulesModal(){
 playSound('tap'); haptic('light');
 if(homeMenuNavLock) return;
 homeMenuNavLock=true;
 if(!homeMenuPressedEl){
  markHomeMenuPressed(document.querySelector('#s-home .menu-grid > div[onclick*="openRulesModal"]'));
 }
 setTimeout(()=>{
  clearUiPress();
  clearHomeMenuPressed();
  renderRulesModal();
  document.getElementById('rules-modal').classList.remove('hidden');
  homeMenuNavLock=false;
 }, HOME_MENU_PRESS_DELAY);
}
function showHistory(){
 haptic('light');
 if(homeMenuNavLock) return;
 homeMenuNavLock=true;
 if(!homeMenuPressedEl){
  markHomeMenuPressed(document.querySelector('#s-home .menu-grid > div[onclick*="showHistory"]'));
 }
 setTimeout(()=>{
  clearUiPress();
  clearHomeMenuPressed();
  show('s-history');
  requestAnimationFrame(()=>renderHistory());
  homeMenuNavLock=false;
 }, HOME_MENU_PRESS_DELAY);
}
function goToPlayerSetup(mode){
 haptic('light'); playSound('tap');
 if(homeMenuNavLock) return;
 homeMenuNavLock=true;
 if(!homeMenuPressedEl){
  const sel=mode==='story'
   ? "#s-home .menu-grid > div[onclick*=\"goToPlayerSetup('story')\"]"
   : "#s-home .menu-grid > div[onclick*=\"goToPlayerSetup('normal')\"]";
  markHomeMenuPressed(document.querySelector(sel));
 }
 setTimeout(()=>{
  clearUiPress();
  clearHomeMenuPressed();
  gameMode=mode||'normal';
  // If story mode, pre-select story genre for when they get to setup
  if(mode==='story'){
   selectedGenre='story';
   genreMode='pick';
  }
  show('s-players');
  requestAnimationFrame(()=>rebuildPlayerGrid(false));
  homeMenuNavLock=false;
 }, HOME_MENU_PRESS_DELAY);
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
 currentIdx=0; votes={}; currentOpenVoter=0; openVoteOrder=[];
 twistReverseVote=false; twistForcedVoterIdx=-1; twistForcedTargetIdx=-1;
 twistWordSwapped=false; twistSwappedList=[];
 insiderSpyIdx=-1;
 pendingPrivateLetter=null;
 lockedEarlyVotes={};
 trustVoteLocks={};
 activeTwist=null;
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
  const wordA=(a===outsiderIdx?(outsiderWord||'—'):(getGroupWord()||'—'));
  const wordB=(b===outsiderIdx?(outsiderWord||'—'):(getGroupWord()||'—'));
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
  const insiders=players.map((_,i)=>i).filter(i=>i!==outsiderIdx);
  if(!insiders.length){ activeTwist=null; showCover(); return; }
  insiderSpyIdx=insiders[Math.floor(Math.random()*insiders.length)];
  showTwistScreen(
   '🕵️',
   ar?'عميل سري':'Secret Agent',
   ar?`${players[insiderSpyIdx]} يحصل على معلومات سرية عند رؤية كلمته.`
     :`${players[insiderSpyIdx]} will get secret intel on their private word screen.`,
   `<div style="background:rgba(155,93,229,.1);border:2px solid var(--purple);border-radius:12px;padding:14px;margin-top:12px;text-align:center;font-size:14px;font-weight:700;color:var(--purple);">
    🕵️ ${ar?'هذه المعلومة خاصة جداً':'This intel is private to one player'}
   </div>`,
   ar
  );
  return;
 }

 if(id==='private_letter'){
  const receiver=Math.floor(Math.random()*players.length);
  let target=receiver;
  while(target===receiver) target=Math.floor(Math.random()*players.length);
  const word=target===outsiderIdx?(outsiderWord||'-'):(getGroupWord()||'-');
  pendingPrivateLetter={receiver,target,letter:(word[0]||'?'),shown:false};
  activeTwist.id='private_letter_preword';
  showTwistScreen(
   '🤫',
   ar?'حرف سري خاص':'Private Secret Letter',
   ar?`${players[receiver]} سيستلم حرفاً سرياً خلال شاشة كلمته الخاصة.`
     :`${players[receiver]} will receive a private letter during their word reveal.`,
   `<div style="background:rgba(59,143,255,.1);border:2px solid var(--blue);border-radius:12px;padding:14px;margin-top:12px;text-align:center;font-size:14px;font-weight:700;color:var(--blue);">
    🤫 ${ar?`المعلومة ستظهر فقط لـ ${players[receiver]}`:`Only ${players[receiver]} will see this info`}
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
 const midAvail=[
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
 const id=midAvail[Math.floor(Math.random()*midAvail.length)];
 activeTwist={id};

 // reverse_vote fires at 50% — if we're not there yet, defer without consuming budget
 if(id==='reverse_vote'){
  twistFireAtQ=Math.max(twistFireAtQ, Math.floor(questions.length*0.5));
  if(currentQIdx<twistFireAtQ){ activeTwist=null; twistFired=false; renderSpotlightQ(); return; }
 }

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
  const word=pIdx===outsiderIdx?outsiderWord||'—':getGroupWord()||'—';
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
  const word=target===outsiderIdx?outsiderWord||'-':getGroupWord()||'-';
  pendingPrivateLetter={receiver,target,letter:(word[0]||'?'),shown:false};
  activeTwist.id='private_letter_preword';
  showTwistScreen(
   '????',
   ar?'??? ??? ?????!':'Scheduled Secret Letter!',
   ar?`${players[receiver]} ?????? ???? ???? ????? ??? ????? ???? ???.`:`${players[receiver]} will receive a secret letter during their private word reveal.`,
   `<div style="background:rgba(59,143,255,.1);border:2px solid var(--blue);border-radius:12px;padding:14px;margin-top:12px;text-align:center;font-size:14px;font-weight:700;color:var(--blue);">
    ?? ${ar?`???????? ?????? ?? ${players[receiver]} ??? ??? ????`:`Private info goes to ${players[receiver]} only on their turn`}
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

 // Keep the continue button visible as a safety fallback
 const okBtn=document.getElementById('btn-twist-ok');
 if(okBtn){
  const _ar=T.dir==='rtl';
  okBtn.textContent=_ar?'⏭ تخطي التصويت':'⏭ Skip vote';
  okBtn.style.display='flex';
  okBtn.style.opacity='0.55';
  // If player presses it without voting, just resume questions
  okBtn._earlyVoteSkip=true;
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
 const isOutsider=currentIdx===outsiderIdx;
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

function renderSpotlightQ(){
 releaseQuestionAdvanceLock();
 if(questionAdvanceRetryTimer){ clearTimeout(questionAdvanceRetryTimer); questionAdvanceRetryTimer=null; }
 if(_timePressureInterval){ clearInterval(_timePressureInterval); _timePressureInterval=null; }

 const spot=document.getElementById('q-spotlight');
 if(currentQIdx>=questions.length){
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
  _timerSecsLeft=10;
  startTimerCountdown();
 }
}

function startTimerCountdown(){
 const circ=2*Math.PI*28;
 let secs=_timerSecsLeft;
 const arc=document.getElementById('timer-arc');
 const num=document.getElementById('timer-num');
 if(num){num.textContent=secs;num.classList.remove('timer-urgent');}
 _timePressureInterval=setInterval(()=>{
  secs--;
  _timerSecsLeft=secs;
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
   <div class="tally-bg"><div class="tally-bar" style="width:${pct}%;background:${c};"></div></div>
  </div>`;
 }).join('');
 show('s-tally');
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
 const counts=buildVoteCounts();
 const maxV=Math.max(...Object.values(counts));
 const topVoted=Object.keys(counts).filter(k=>counts[k]===maxV).map(Number);

 // Reverse vote twist flips who wins
 let groupWon=topVoted.includes(outsiderIdx);
 if(twistReverseVote) groupWon=!groupWon;

 setTimeout(()=>playSound(groupWon?'win':'lose'),480);
 applyRoundScores(groupWon,counts);
 updateScoreBar();

 // Outsider name + words
 document.getElementById('reveal-name').textContent=players[outsiderIdx]||'?';
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
  ?`<div class="result-verdict verdict-win">🎉 ${T.groupWon(players[outsiderIdx],counts[outsiderIdx])}</div>`
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
   const correct=earlyVoteResult===outsiderIdx;
   earlyHtml+=`<div class="micro-reward ${correct?'mr-perfect':'mr-comeback'}" style="width:100%;justify-content:center;margin-bottom:4px;">
    🗳️ ${players[earlyVotePlayerIdx]} ${ar2?'صوّت مبكر على':'voted early for'} ${players[earlyVoteResult]} ${correct?'✅':'❌'}
   </div>`;
  }
  if(reverseVoteResult>=0&&reverseVotePlayerIdx>=0){
   const ar2=T.dir==='rtl';
   const correct=reverseVoteResult!==outsiderIdx;
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
  if(i!==outsiderIdx&&v>bestCount){ best=i; bestCount=v; }
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
  const loserName=players[outsiderIdx];
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
 const wrap=document.getElementById('micro-rewards-wrap');
 const rewards=[];
 const sorted=Object.entries(roundScores).sort((a,b)=>b[1]-a[1]);
 const leader=sorted[0];
 const second=sorted[1];

 // Streak: someone won 2+ rounds in a row
 if(matchRoundHistory.length>=2){
  const last2=matchRoundHistory.slice(-2);
  // find if same player won both rounds
  const wins={};
  last2.forEach(r=>{ r.roundWinner&&(wins[r.roundWinner]=(wins[r.roundWinner]||0)+1); });
  Object.entries(wins).forEach(([name,n])=>{
   if(n>=2) rewards.push({cls:'mr-streak',text:T.motivStreak(n)});
  });
 }
 // Comeback: last round leader is not this round's leader
 if(matchRoundHistory.length>=1){
  const prev=matchRoundHistory[matchRoundHistory.length-1];
  if(prev.roundWinner&&leader&&prev.roundWinner!==leader[0]){
   rewards.push({cls:'mr-comeback',text:T.motivComeback});
  }
 }
 // MVP: highest scorer this round
 if(leader&&leader[1]>0){
  rewards.push({cls:'mr-mvp',text:T.motivMvp(leader[0])});
 }
 // Close call: top 2 within 5 pts
 if(second&&leader&&Math.abs(leader[1]-second[1])<=5&&second[1]>0){
  rewards.push({cls:'mr-close',text:T.motivClose});
 }

 wrap.innerHTML=rewards.map(r=>`<div class="micro-reward ${r.cls}">${r.text}</div>`).join('');
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
   // Group caught the outsider: each insider +10, outsider +5 (tried)
   pts=i!==outsiderIdx?10:5;
  } else {
   // Outsider escaped: outsider +10, insiders +0
   pts=i===outsiderIdx?10:0;
  }
  roundScores[name]=(roundScores[name]||0)+pts;
  matchScores[name]=(matchScores[name]||0)+pts;
 });
 // reverse_vote trust bonus: +5 if the trusting player picked correctly
 if(reverseVotePlayerIdx>=0&&reverseVoteResult>=0){
  const _trusted=reverseVoteResult;
  const _truster=reverseVotePlayerIdx;
  const _correctTrust=_trusted!==outsiderIdx; // trusted a real insider
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
  outsider:players[outsiderIdx],
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
 storyIdx=-1; activeTwist=null; gameQuestionActive=false;
 if(_timePressureInterval){clearInterval(_timePressureInterval);_timePressureInterval=null;} _timerPaused=false; _timerSecsLeft=10;
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
 matchActive=false; matchScores={}; matchRoundHistory=[];
 currentMatchRound=0;
 outsiderIdx=-1; topic=null; outsiderWord=null; currentIdx=0;
 votes={}; currentOpenVoter=0; openVoteOrder=[]; questions=[]; currentQIdx=0;
 storyIdx=-1; roundScores={};
 twistFireAtQ=-1; twistFireAtQ2=-1; gameQFireAtQ=-1; twistFired=false; twist2Fired=false; gameQFired=false;
 if(_timePressureInterval){clearInterval(_timePressureInterval);_timePressureInterval=null;} _timerPaused=false; _timerSecsLeft=10;
 earlyVotePlayerIdx=-1; earlyVoteResult=-1; reverseVotePlayerIdx=-1; reverseVoteResult=-1;
 lockedEarlyVotes={}; trustVoteLocks={};
 insiderSpyIdx=-1; twistWordSwapped=false; twistSwappedList=[];
 pendingPrivateLetter=null;
 lastTopicIdx=-1; lastStoryIdx=-1;
 const bar=document.getElementById('score-bar');
 bar.classList.remove('visible'); document.body.classList.remove('has-scorebar');
 renderSetupScreen();
 show('s-setup');
}

function goHome(){
 playSound('back'); haptic('light');
 matchActive=false; matchScores={}; matchRoundHistory=[];
 currentMatchRound=0;
 outsiderIdx=-1; topic=null; outsiderWord=null; currentIdx=0;
 votes={}; currentOpenVoter=0; openVoteOrder=[]; questions=[]; currentQIdx=0;
 storyIdx=-1; roundScores={};
 lastTopicIdx=-1; lastStoryIdx=-1;
 activeTwist=null; twistFireAtQ=-1; gameQFireAtQ=-1; twistFired=false; gameQFired=false;
 twistReverseVote=false; twistForcedVoterIdx=-1;
 twistForcedTargetIdx=-1;
 twistWordSwapped=false; twistSwappedList=[];
 insiderSpyIdx=-1;
 pendingPrivateLetter=null;
 earlyVotePlayerIdx=-1; earlyVoteResult=-1; reverseVotePlayerIdx=-1; reverseVoteResult=-1;
 lockedEarlyVotes={}; trustVoteLocks={};
 genreMode='random'; selectedGenre=null; outsiderMode='standard';
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
