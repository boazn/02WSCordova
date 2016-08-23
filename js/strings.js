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
    share:'share this...'
    
  },
  he: {
    hello: 'שלום',
    LongTermsNotifications:'התראות לטווח ארוך',
    ShortTermsNotifications:'התראות לטווח קצר',
    Tips:'התראות טיפים',
    cloth:'הצג ביגוד',
    fulltext:'תחזית מלל מלא',
    sound:'סאונד',
    takepic:'צילום תמונה',
    chooselib:'בחירת תמונה מספריה',
    choosealbum:'בחירת תמונה מאלבום',
    sentsuccess:'התמונה נשלחה בהצלחה. תודה',
    share:'שיתוף'
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
     $('#btn_choosepicalbum').html(currentLocale.choosealbum);
 }

 



