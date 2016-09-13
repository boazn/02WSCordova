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
    share:'share this...',
    temppage:'temp page',
    humpage:'hum page',
    radar:'radar',
    home:'home',
    sharesubject:'Weather now',
    sharemessage:'From 02WS App',
    feelslike:'feels like',
    sendpic:'Send Pic',
    name:'name',
    cancel:'cancel',
    dailypic:'pic of the day'
    
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
    sentsuccess:'התמונה נשלחה בהצלחה. תודה',
    share:'שיתוף',
    temppage:'גרף טמפ',
    humpage:'גרף לחות',
    radar:'מכ"ם גשם',
    home:'עמוד ראשי',
    sharesubject:'מזג-אוויר עכשיו',
    sharemessage:'מתוך אפליקציית ירושמיים',
    feelslike:'מרגיש כמו',
    sendpic:'שליחת תמונה',
    name:'כינוי',
    cancel:'דווקא לא בא לי',
    dailypic:'תמונת היום'
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
     $("#btn_takepic").html(currentLocale.takepic);
     $('#btn_choosepic').html(currentLocale.chooselib);
     $('#btn_radar').html(currentLocale.radar);
     $('#btn_temp').html(currentLocale.temppage);
     $('#btn_hum').html(currentLocale.humpage);
     $('#btn_home').html(currentLocale.home);
     $('#btn_sendpic').html(currentLocale.sendpic);
     $('#btn_cancel').html(currentLocale.cancel);
     $('#btn_dailypic').html(currentLocale.dailypic);
     $('#nameonpic').attr('placeholder',currentLocale.name);
     $('#commentonpic').attr('placeholder',currentLocale.feelslike);
     $('checkbox_notifications').slider('refresh');
     
 }

 



