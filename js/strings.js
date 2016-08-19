var locales = {
  en: {
    hello: 'Hello',
    LongTermsNotifications:'Long term notifications - forecasts, etc',
    ShortTermsNotifications:'Short term notifications - rain, etc',
    Tips:'Tips notifications',
    cloth:'Show cloth',
    fulltext:'Show full text',
    sound:'Sound'
  },
  heb: {
    hello: 'שלום',
    LongTermsNotifications:'התראות לטווח ארוך',
    ShortTermsNotifications:'התראות לטווח קצר',
    Tips:'התראות טיפים',
    cloth:'הצג ביגוד',
    fulltext:'תחזית מלל מלא',
    sound:'סאונד'
  }
};
 function bindStrings(){
     var userLanguage = navigator.language.split('-')[0];
     
     var currentLocale = locales[userLanguage];
     console.log(currentLocale.hello); 
     $('#lbllongterm').text(currentLocale.LongTermsNotifications);
     $('#lblshortterm').text(currentLocale.ShortTermsNotifications);
     $('#lbltips').text(currentLocale.Tips);
     $('#lblcloths').text(currentLocale.cloth);
     $('#lblfulltext').text(currentLocale.fulltext);
 }

 



