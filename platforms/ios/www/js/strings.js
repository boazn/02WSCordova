var currentLocale;
var locales = {
  en: {
    hello: 'Hello',
    LongTermsNotifications:'Long term notifications - forecasts, etc',
    ShortTermsNotifications:'Short term notifications - rain, etc',
    Tips:'Tips notifications',
    cloth:'Show cloth',
    fulltext:'Show full text',
    sound:'Sound',
    takepic:'take pic',
    chooselib:'choose pic from library',
    choosealbum:'choose pic from album',
    sentsuccess:'picture sent successfully',
    adfreetitle:'Ad Free',
    adfreetitledesc:'choose to remove ads',
    shorttermdesc:'Short term alerts such as rain start-stop',
    dailyforecastdesc:'daily forecast in every morning',
    dailyforecasttitle:'daily forecast',
    share:'share this...',
    clear:'clear',
    temppage:'temp page',
    humpage:'hum page',
    radar:'radar',
    home:'home',
    forum:'forum',
    alerts:'alerts and messages',
    reply:'Reply',
    live:'live',
    picoftheday:'pic of the day',
    userpics:'users pics',
    contact:'contact',
    sharesubject:'Weather now',
    sharemessage:'From 02WS App',
    feelslike:'feels like',
    sendpic:'Send Pic',
    name:'name',
    cancel:'cancel',
    dailypic:'pic of the day',
    missing:'missing name',
    appTitle:'02WS',
    ok:'Ok',
    monthly:'monthly',
    yearly:'yearly',
    combinedwithadfree:'combined with ad free',
    snowinjlm:'snow in Jerusalem',
    worldforecast:'world forecast',
    israelforecast:'Israel forecast',
    youtube02ws:'02WS Youtube'
    
    
  },
  he: {
    hello: 'שלום',
    LongTermsNotifications:'התראה לימים הבאים - תחזית ועוד',
    ShortTermsNotifications:'התראה מיידית - גשם ועוד',
    Tips:'טיפים',
    cloth:'הצג ביגוד',
    fulltext:'תחזית מלל מלא',
    sound:'סאונד',
    takepic:'צילום תמונה',
    chooselib:'בחירת תמונה מספריה',
    choosealbum:'בחירת תמונה מאלבום',
    sentsuccess:'התמונה נשלחה בהצלחה ותבדק לפני עלייה לאוויר. תודה',
    adfreetitle:'הסרת פרסומות',
    adfreetitledesc:'בחרו כדי להוריד פרסומות',
    shorttermdesc:'התראות לטווח קצר כמו גשם בא-הולך או כל דבר לשעות הקרובות',
    dailyforecastdesc:'תחזית יומית מפורטת לנייד בכל בוקר',
    dailyforecasttitle:'תחזית יומית',
    share:'שיתוף...',
    clear:'ניקוי',
    temppage:'גרף טמפ',
    humpage:'גרף לחות',
    radar:'מכ"ם גשם',
    home:'עמוד ראשי',
    forum:'פורום',
    alerts:'הודעות והתראות',
    live:'תמונה חיה',
    reply:'יש לי משהו להגיד על זה',
    picoftheday:'תמונת היום',
    userpics:'תמונות הגולשים',
    contact:'צרו קשר',
    sharesubject:'מזג-אוויר עכשיו',
    sharemessage:'מתוך אפליקציית ירושמיים',
    feelslike:'משהו על התמונה',
    sendpic:'שליחת תמונה',
    name:'כינוי',
    cancel:'דווקא לא בא לי',
    dailypic:'תמונת היום',
    missing:'חסר שם או כינוי או תיאור',
    appTitle:'ירושמים',
    ok:'Ok',
    monthly:'חודשי',
    yearly:'שנתי',
    combinedwithadfree:'משולב עם ניקוי פרסומות',
    snowinjlm:'שלג בירושלים',
    worldforecast:'תחזית לחו"ל',
    israelforecast:'תחזית בארץ',
    youtube02ws:'ירושמיים Youtube'
  }
};
 function bindStrings(){
     console.log('language: '+ navigator.language);
     var userLanguage = navigator.language.split('-')[0];
     
     currentLocale = locales[userLanguage];
     $('#lbllongterm').text(currentLocale.LongTermsNotifications);
     $('#lblshortterm').text(currentLocale.ShortTermsNotifications);
     $('#lbltips').text(currentLocale.Tips);
     $('#lblcloths').text(currentLocale.cloth);
     $('#lblfulltext').text(currentLocale.fulltext);
     $('#lblsound').text(currentLocale.sound);
     $('#lblcombined').text(currentLocale.combinedwithadfree);
     $('#lbladfreetitle').text(currentLocale.adfreetitle);
     $('#lbldailyforecasttitle').text(currentLocale.dailyforecasttitle);
     $('#missing').text(currentLocale.missing);
     $('.monthly').text(currentLocale.monthly);
     $('.yearly').text(currentLocale.yearly);
     $("#btn_takepic").html(currentLocale.takepic);
     $('#btn_choosepic').html(currentLocale.chooselib);
     $('#btn_radar').html(currentLocale.radar);
     $('#btn_forum').html(currentLocale.forum);
     $('#btn_picoftheday').html(currentLocale.picoftheday);
     $('#btn_userpics').html(currentLocale.userpics);
     $('#btn_contact').html(currentLocale.contact);
     $('#btn_snow').html(currentLocale.snowinjlm);
     $('#btn_forecastisr').html(currentLocale.israelforecast);
     $('#btn_forecastabroad').html(currentLocale.worldforecast);
     $('#btn_youtube').html(currentLocale.youtube02ws);
     $('#btn_home').html(currentLocale.home);
     $('#btn_sendpic').html(currentLocale.sendpic);
     $('#btn_cancel').html(currentLocale.cancel);
     $('#btn_dailypic').html(currentLocale.dailypic);
     $('#btn_alerts').html(currentLocale.alerts);
     $('#btn_live').html(currentLocale.live);
     $('#btn_adfree').html(currentLocale.adfreetitle);
     $('#btn_putcode').html(currentLocale.ok);
     $('#nameonpic').attr('placeholder',currentLocale.name);
     $('#commentonpic').attr('placeholder',currentLocale.feelslike);
     $('#adfreecodedesc').text(currentLocale.adfreetitledesc);
     $('#shorttermdesc').text(currentLocale.shorttermdesc);
     $('#dailyforecastdesc').text(currentLocale.shorttermdesc);
     
     if (userLanguage == 'he'){
         $('#nameonpic').css('direction','rtl');
         $('#commentonpic').css('direction','rtl');
     }
     $('checkbox_notifications').slider('refresh');
     
 }

 



