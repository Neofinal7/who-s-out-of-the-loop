'use strict';
// ════════════════════════════════════════════════════════════════
// data.js — Static data: translations, avatars, topics, stories,
//            game questions, twists definitions, and constants/state
// ════════════════════════════════════════════════════════════════
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
  historyTitle:'سجل الألعاب',historyEmpty:'ما في ألعاب سابقة بعد!',historyEmptyHint:'العبوا مباراة كاملة بالعدد اللي تختاروه (1 أو 3 أو 5 جولات) حتى يظهر السجل هنا.',
  historyTapHint:'اضغط على أي مباراة للتفاصيل',
  clearHistory:'مسح السجل',
  matchStatsLbl:'إحصائيات المباراة',matchFormatLbl:'صيغة المباراة',roundsPlayedLbl:'جولات المباراة',
  groupWinsLbl:'فوز الجماعة',outsiderWinsLbl:'فوز الخارج',leadLbl:'الفارق',
  rulesTitle:'قواعد اللعبة',optionsTitle:'خيارات اللعبة',
  optRoundsLbl:'عدد الجولات في اللعبة',optTwistsSec:'التحديات العشوائية',
  optTwistsLbl:'🎲 تحديات مفاجئة',optTwistsSub:'أحداث تغير مجرى اللعبة',
  optTwistCountSec:'عدد التحديات',optTwistCountLbl:'🎯 عدد التحديات في الجولة',optTwistCountSub:'اختار كم تحدي يطلع بكل جولة',
  optTwistCountNote:'🔒 1 دائمًا، و2 و3 يفتحوا عند 5+ لاعبين، و5 عند 11+ لاعبين',
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
  mustVoteForcedLabel:'لازم تصوت على',playersCountLbl:'لاعبين',ptsLbl:'نقطة',knewOutsider:'(كان يعرف إنه خارج)',
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
  historyTitle:'Game History',historyEmpty:'No games yet!',historyEmptyHint:'Finish a full match here. You choose 1, 3, or 5 rounds.',
  historyTapHint:'Tap a game for details',
  clearHistory:'Clear History',
  matchStatsLbl:'Match stats',matchFormatLbl:'Match format',roundsPlayedLbl:'Rounds played',
  groupWinsLbl:'Group wins',outsiderWinsLbl:'Outsider wins',leadLbl:'Lead',
  rulesTitle:'How to Play',optionsTitle:'Game Options',
  optRoundsLbl:'Rounds per match',optTwistsSec:'Random Twists',
  optTwistsLbl:'🎲 Random Twists',optTwistsSub:'Events that change the game',
  optTwistCountSec:'Twist count',optTwistCountLbl:'🎯 Twists per round',optTwistCountSub:'Choose how many twists can happen each round',
  optTwistCountNote:'🔒 1 is always available, 2 and 3 unlock at 5+ players, and 5 unlocks at 11+ players',
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
  mustVoteForcedLabel:'Must vote for',playersCountLbl:'players',ptsLbl:'pts',knewOutsider:'(Knew they were out)',
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
let selectedTwistCount=1;

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
 {e:'🏫',cc:'#9b5de5',insider:{ar:'كان في ولد اسمه خالد، طالب جديد في المدرسة، ما عنده أصحاب. يوم من الأيام أحد ما قبل يجلس جنبه في الفصل.',en:'There was a boy named Ethan, a new student with no friends. One day, no one would sit next to him in class.'},outsider:{ar:'كان في ولد اسمه سالم، طالب جديد في المدرسة، خجول بس ذكي. يوم من الأيام ما عرف يجاوب على سؤال المعلم.',en:"There was a boy named Noah, new and shy but smart. One day he couldn't answer the teacher's question."}},
 {e:'🌴',cc:'#2dcc6f',insider:{ar:'رحلة مدرسية في الغابة — المجموعة اتهت. فرح كانت تمشي بثقة لأنها حافظة الخارطة.',en:'School trip in the forest — the group got lost. Mia walked confidently because she memorized the map.'},outsider:{ar:'رحلة مدرسية في الغابة — المجموعة اتهت. نورة كانت خايفة بس ما قالت لأحد.',en:'School trip in the forest — the group got lost. Sophie was scared but told nobody.'}},
 {e:'🎂',cc:'#ff5e99',insider:{ar:'يوم عيد ميلاد ليلى — كل أصحابها نسوا. هي قعدت البيت تنتظر وفي الآخر جاوها رسالة واحدة بس.',en:"Emma's birthday — all her friends forgot. She sat home waiting and got only one message."},outsider:{ar:'يوم عيد ميلاد سارة — هي اللي نسيت عيد ميلادها الخاص وطلعت مع أصحابها كأن ما صار شي.',en:"Olivia's birthday — she herself forgot her own birthday and went out as if nothing happened."}},
 {e:'🏀',cc:'#ff7a30',insider:{ar:'مباراة كرة السلة النهائية — الفريق متأخر بنقطتين. أحمد الأخير يكرة لكنه اللي يجيب الفوز.',en:'Final basketball game — team down by two. Jack is last to play but scores the winning basket.'},outsider:{ar:'مباراة كرة السلة النهائية — الفريق متأخر بنقطتين. يوسف ضيّع رمية حرة في آخر ثانية.',en:'Final basketball game — team down by two. Lucas missed a free throw in the last second.'}},
 {e:'🔑',cc:'#00bfa5',insider:{ar:'رجع ياسر البيت ولقى باب مقفل. دور في جيوبه — المفتاح مو معه.',en:'Liam got home and found the door locked. He checked his pockets — no key.'},outsider:{ar:'رجع محمد البيت ولقى باب مفتوح. حس إن في شي غريب — ما أحد كان في البيت.',en:'Evan got home and found the door open. He felt something was off — nobody was home.'}},
 {e:'✈️',cc:'#3b8fff',insider:{ar:'في المطار — الرحلة على وشك الإقلاع. ريم ركضت بكل قوتها لأنها ما تبي تفوتها.',en:'At the airport — the flight about to depart. Ava ran with all her strength to not miss it.'},outsider:{ar:'في المطار — الرحلة على وشك الإقلاع. هنا فجأة لقت شنطتها مع شخص ثاني.',en:'At the airport — the flight about to depart. Grace suddenly found her bag with another person.'}},
 {e:'🌊',cc:'#00bfa5',insider:{ar:'في الشاطئ — بدر تعلم السباحة. وقع في الماء الكبير وصرخ بس ما أحد سمعه.',en:'At the beach — Ben was learning to swim. He fell into deep water and yelled but nobody heard.'},outsider:{ar:'في الشاطئ — طارق شاف شخص يغرق. طرش نفسه وإنقذه بدون ما يفكر.',en:'At the beach — Alex saw someone drowning. He threw himself in and saved them without thinking.'}},
 {e:'📱',cc:'#9b5de5',insider:{ar:'الجوال وقع في البحر. سلمى شافت بس ما قدرت توقف — وبعدين جاء بيها.',en:'The phone fell into the sea. Maya watched but could not stop it — then it washed back.'},outsider:{ar:'الجوال وقع على الأرض. غانم التقطه وكان فيه رقم غريب جديد ما يعرفه.',en:'The phone fell on the ground. Chris picked it up and found a new unknown number on it.'}},
 {e:'🐕',cc:'#ff7a30',insider:{ar:'كلب ضال تبع عمر للبيت. كل يوم يجي عند الباب ويقعد ينتظر.',en:"A stray dog followed Oliver home. Every day it came to the door and waited."},outsider:{ar:'كلب ضال دخل حديقة البيت. عبدالله خافه في الأول لكنه كان جريح.',en:'A stray dog entered the garden. Ryan was scared at first but it was injured.'}},
 {e:'🎤',cc:'#ff5e99',insider:{ar:'مسابقة غناء — نور وقفت على المسرح وفجأة طار الصوت منها.',en:'A singing contest — Chloe stood on stage and suddenly her voice vanished.'},outsider:{ar:'مسابقة غناء — لجين ما كانت تبي تشارك بس دفعوها. غنت وكان صوتها جميل.',en:'A singing contest — Lily did not want to join but was pushed. She sang and her voice was beautiful.'}},
 {e:'🌙',cc:'#9b5de5',insider:{ar:'في ليلة مطر — فيصل صحى على صوت عجيب من تحت السرير.',en:'On a rainy night — Ethan woke up to a strange sound from under the bed.'},outsider:{ar:'في ليلة مطر — أنس شاف ضوء في الغرفة المقابلة وهي كانت مفروض فاضية.',en:'On a rainy night — Mason saw a light in the room across the way that was supposed to be empty.'}},
 {e:'🏆',cc:'#f5c800',insider:{ar:'مسابقة رياضية — آخر ثانية والفريق خسران. نوف قررت تلعب بطريقة ما اتفق عليها.',en:'A sports competition — last second, team losing. Zoe decided to play in an unplanned way.'},outsider:{ar:'مسابقة رياضية — الفريق فاز بالفعل. مشاري ما صدق لأنه ما لعب.',en:"A sports competition — the team already won. Dylan couldn't believe it because he hadn't played."}},
 {e:'📚',cc:'#3b8fff',insider:{ar:'ليلة الاختبار — ماجد لقى إن نوتاته كلها اختفت.',en:'The night before exams — Noah found all his notes had disappeared.'},outsider:{ar:'ليلة الاختبار — هاجر ذاكرت كل الليل لكنها نامت وهي تكتب.',en:'The night before exams — Emma studied all night but fell asleep while writing.'}},
 {e:'🍕',cc:'#ff7a30',insider:{ar:'طلبوا بيتزا للحفلة — البيتزا وصلت بس للعنوان الغلط.',en:'They ordered pizza for the party — it arrived at the wrong address.'},outsider:{ar:'طلبوا بيتزا للحفلة — البيتزا وصلت بدون إضافات بسبب خطأ في الطلب.',en:'They ordered pizza for the party — it arrived with no toppings because of an ordering mistake.'}},
 {e:'🌋',cc:'#ff3b5c',insider:{ar:'رحلة لرؤية بركان — المرشد قال ممنوع تقترب. كريم اقترب.',en:'A trip to see a volcano — the guide said do not approach. Leo approached anyway.'},outsider:{ar:'رحلة لرؤية بركان — البركان فجأة بدأ يتحرك والكل ركض إلا شخص واحد.',en:'A trip to see a volcano — it suddenly rumbled and everyone ran except one person.'}},
 {e:'🎮',cc:'#9b5de5',insider:{ar:'بطولة ألعاب — ظافر شاف إن غريمه يغش بس ما قال شي.',en:'A gaming tournament — Tyler saw his rival cheating but said nothing.'},outsider:{ar:'بطولة ألعاب — العب الجديد فاز على البطل القديم بدون أي خبرة.',en:'A gaming tournament — the new player beat the old champion with no experience.'}},
 {e:'🏠',cc:'#00bfa5',insider:{ar:'أثناء نقل البيت — علي لقى صندوق قديم مقفل ما يعرف وش فيه.',en:'While moving houses — Noah found an old locked box he did not know what was inside.'},outsider:{ar:'أثناء نقل البيت — وجدوا باباً مخفياً في الحائط ما أحد علم فيه من قبل.',en:'While moving houses — they found a hidden door in the wall nobody had known about.'}},
 {e:'🌈',cc:'#ff5e99',insider:{ar:'بعد العاصفة — سعد لقى شيء لامع في الوادي وما أخبر أحد.',en:'After the storm — Jack found something shiny in the valley and told no one.'},outsider:{ar:'بعد العاصفة — سلوى عادت للبيت وكل أثاثها كان في مكان مختلف.',en:'After the storm — Chloe came home and all her furniture was in different places.'}},
 {e:'🚂',cc:'#3b8fff',insider:{ar:'في القطار — شريف فجأة حس إن الراكب اللي جنبه هو اللي سرق شنطته.',en:'On the train — Henry suddenly felt that the passenger next to him had stolen his bag.'},outsider:{ar:'في القطار — أمل ركبت الخط الغلط وما عرفت إلا لما القطار وقف في محطة غريبة.',en:'On the train — Hannah boarded the wrong line and only realized when it stopped at a strange station.'}},
 {e:'🎭',cc:'#ff5e99',insider:{ar:'مسرحية المدرسة — ريان حفظ دوره غلط وقاله على المسرح بكل ثقة.',en:'School play — Ryan memorized the wrong lines and delivered them on stage with full confidence.'},outsider:{ar:'مسرحية المدرسة — دانة نسيت كلامها على المسرح فبدأت تتكلم من عندها.',en:'School play — Dana forgot her lines on stage so she started making them up.'}},,
 {e:'🛒',cc:'#ff7a30',sameStory:true,insider:{ar:'في السوق — كان في زحمة كبيرة ورحت تشتري شي معين. لما وصلت لقيت الرف فاضي.',en:'At the market — it was crowded and you went to buy something specific. When you got there, the shelf was empty.'},outsider:{ar:'في السوق — كان في زحمة كبيرة ورحت تشتري شي معين. لما وصلت لقيت الرف فاضي.',en:'At the market — it was crowded and you went to buy something specific. When you got there, the shelf was empty.'}},
 {e:'🎬',cc:'#9b5de5',sameStory:true,insider:{ar:'في السينما — الفيلم بدأ. الشخص اللي جنبك أكل بصوت عالي طول الفيلم.',en:'At the cinema — the movie started. The person next to you ate loudly the whole film.'},outsider:{ar:'في السينما — الفيلم بدأ. الشخص اللي جنبك أكل بصوت عالي طول الفيلم.',en:'At the cinema — the movie started. The person next to you ate loudly the whole film.'}},
 {e:'🚗',cc:'#3b8fff',sameStory:true,insider:{ar:'كنت في السيارة وانقطع البنزين في الطريق. ما كان فيه أحد في المنطقة.',en:'You were in the car and ran out of gas on the road. There was nobody around.'},outsider:{ar:'كنت في السيارة وانقطع البنزين في الطريق. ما كان فيه أحد في المنطقة.',en:'You were in the car and ran out of gas on the road. There was nobody around.'}},
 {e:'🏥',cc:'#2dcc6f',sameStory:true,insider:{ar:'في المستشفى — الدكتور قالك نتائجك جاهزة. انتظرت ساعة كاملة قبل ما يجي.',en:'At the hospital — the doctor said your results were ready. You waited a full hour before he came.'},outsider:{ar:'في المستشفى — الدكتور قالك نتائجك جاهزة. انتظرت ساعة كاملة قبل ما يجي.',en:'At the hospital — the doctor said your results were ready. You waited a full hour before he came.'}},
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
 {cat:'اكل',catKey:'food',e:'🫔',cc:'#ff7a30',ar:['شاورما','كباب'],en:['Chicken Wrap','Burger'],zh:['',''],hi:['',' '],es:['Shawarma','Gato espacial'],fr:['Chawarma','Chat spatial']},
 {cat:'اكل',catKey:'food',e:'🍛',cc:'#ff7a30',ar:['كاري','حصان'],en:['Curry','Horse'],zh:['',''],hi:['',''],es:['Curry','Caballo'],fr:['Curry','Cheval']},
 {cat:'حلويات',catKey:'sweets',e:'🎂',cc:'#ff5e99',ar:['تيراميسو','بروفيترول'],en:['Tiramisu','Profiterole'],zh:['',''],hi:['',''],es:['Tiramis','Tanque'],fr:['Tiramisu','Tank']},
 {cat:'حلويات',catKey:'sweets',e:'🧁',cc:'#ff5e99',ar:['كب كيك','مافن'],en:['Cupcake','Muffin'],zh:['',''],hi:['',''],es:['Cupcake','Inundacin'],fr:['Cupcake','Inondation']},
 {cat:'حلويات',catKey:'sweets',e:'🍩',cc:'#ff5e99',ar:['دونات','كوكب زحل'],en:['Donut','Saturn'],zh:['',''],hi:['',''],es:['Dona','Saturno'],fr:['Beignet','Saturne']},
 {cat:'حلويات',catKey:'sweets',e:'🍫',cc:'#ff5e99',ar:['شوكولاتة','كراميل'],en:['Chocolate','Caramel'],zh:['',''],hi:['',''],es:['Chocolate','Bala'],fr:['Chocolat','Balle']},
 {cat:'حلويات',catKey:'sweets',e:'🍦',cc:'#ff5e99',ar:['آيس كريم','جيلاتو'],en:['Ice Cream','Gelato'],zh:['',''],hi:['',''],es:['Helado','Medusa'],fr:['Glace','Mduse']},
 {cat:'حلويات',catKey:'sweets',e:'🧇',cc:'#ff5e99',ar:['وافل','بانكيك'],en:['Waffle','Pancake'],zh:['',''],hi:['',''],es:['Gofre','Fnix'],fr:['Gaufre','Phnix']},
 {cat:'حلويات',catKey:'sweets',e:'🍰',cc:'#ff5e99',ar:['كيك بالفراولة','غواصة'],en:['Strawberry Cake','Submarine'],zh:['',''],hi:[' ',''],es:['Tarta de fresa','Submarino'],fr:['Gteau fraise','Sous-marin']},
 {cat:'حلويات',catKey:'sweets',e:'🍭',cc:'#ff5e99',ar:['مصاصة','أعصار'],en:['Lollipop','Tornado'],zh:['',''],hi:['',''],es:['Piruleta','Tornado'],fr:['Sucette','Tornade']},
 {cat:'حلويات',catKey:'sweets',e:'🥧',cc:'#ff5e99',ar:['كنافة','مركبة فضائية'],en:['Donut','Spacecraft'],zh:['',''],hi:['',' '],es:['Kunafa','Nave espacial'],fr:['Kanaf','Vaisseau spatial']},
 {cat:'حلويات',catKey:'sweets',e:'🍯',cc:'#ff5e99',ar:['بقلاوة','لقيمات'],en:['Brownie','Mini Donuts'],zh:['',''],hi:['','  '],es:['Baklava','Dragn de hielo'],fr:['Baklava','Dragon de glace']},
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
 {cat:'مشروبات',catKey:'drinks',e:'🥛',cc:'#9b5de5',ar:['حليب','قهوة عربية'],en:['Milk','Black Coffee'],zh:['',''],hi:['',' '],es:['Leche','Caf rabe'],fr:['Lait','Caf arabe']},
 {cat:'مشروبات',catKey:'drinks',e:'🧃',cc:'#9b5de5',ar:['عصير برتقال','شاي أحمر'],en:['Orange Juice','Iced Tea'],zh:['',''],hi:['  ',' '],es:['Jugo de naranja','T rojo'],fr:["Jus d'orange",'Th rouge']},
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
const EXTRA_GAME_QUESTIONS_AR=[
 ()=>'كلمتك شيء تقدر تمسكه ولا فكرة أو معنى؟',
 ()=>'تقريبًا كم حرف في كلمتك؟',
 ()=>'لو كلمتك دخلت حفلة، وش بتسوي؟',
];
const EXTRA_GAME_QUESTIONS_EN=[
 ()=>'Is your word something you can hold, or more of an idea?',
 ()=>'About how many letters does your word have?',
 ()=>'If your word walked into a party, what would it do?',
];
function pickGameQuestion(langCode){
 const pools=langCode==='ar'?GQ_POOLS_AR:GQ_POOLS_EN;
 let bucket='general';
 if(gameMode!=='story'&&topic){
  bucket=GQ_GENRE_BUCKET[topic.catKey||'']||'physical';
 }
 const generalPool=(langCode==='ar'?GAME_QUESTIONS_AR:GAME_QUESTIONS_EN)||pools.general;
 const pool=Math.random()<0.20?generalPool:(pools[bucket]||generalPool);
 return pool[Math.floor(Math.random()*pool.length)]();
}
// Legacy aliases so nothing else breaks
const GAME_QUESTIONS_AR=[...GQ_POOLS_AR.general,...EXTRA_GAME_QUESTIONS_AR];
const GAME_QUESTIONS_EN=[...GQ_POOLS_EN.general,...EXTRA_GAME_QUESTIONS_EN];

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

