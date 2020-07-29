var push;
var pictureSource;   // picture source
var destinationType;
var imageData;
var imageURI;// sets the format of returned value
var x;
var y;
var retries = 0;
var viewport;
var LOC_LANG = 'lang';
var LOC_NOTIFICATIONS = 'notify';
var LOC_SHORT_NOTIFICATIONS = 'shortnotify';
var LOC_TIPS_NOTIFICATIONS = 'tipsnotify';
var LOC_CLOTH = 'cloth';
var LOC_FULLTEXT = 'FULLTEXT';
var LOC_ADFREE = 'adfree';
var LOC_SOUND = 'sound';
var LOC_TOKEN = 'token';
var LOC_DAILYFORECAST = 'dailyforecast';
var LOC_DAILYFORECAST_HOUR = "dailyforecasthour";
var LOC_APPROVED = "approved";
var LOC_ACTIVE_SUB = "active_sub";
var SUB_DAILYFORECAST_MONTHLY = 'Daily_forecast_monthly';
var SUB_DAILYFORECAST_YEARLY = 'Daily_forecast_yearly';
var SUB_SHORTTERM_MONTHLY = 'short_term_monthly';
var SUB_SHORTTERM_YEARLY = 'Short_term_alerts_yearly';
var SUB_ADFREE_MONTHLY = 'Ad_free_monthly';
var SUB_ADFREE_YEARLY = 'Ad_free_yearly';
var PACKAGE_NAME = 'il.co.jws'
var app = {
        // Application Constructor
    initialize: function() {
        app.bindEvents();
        var self = this;
        onLanguageChoose(window.localStorage.getItem(LOC_LANG), window.localStorage.getItem(LOC_CLOTH)=== "true", window.localStorage.getItem(LOC_FULLTEXT)=== "true", window.localStorage.getItem(LOC_SOUND)=== "true");
     },
    startup:function(){
        
        var lang = window.localStorage.getItem(LOC_LANG);
        if (lang == null ){lang = 1;}
        var tempunits = window.localStorage.getItem("tempunits");
        if ((tempunits == null)||(tempunits == undefined)) {tempunits = '°C'; window.localStorage.setItem("tempunits", tempunits);}
       //ini notifications
        var isToNotify = window.localStorage.getItem(LOC_NOTIFICATIONS);
        if ((isToNotify == null)||(isToNotify == undefined)){isToNotify = true;}
       //ini shortnotifications
        var isToShortNotify = window.localStorage.getItem(LOC_SHORT_NOTIFICATIONS);
        if ((isToShortNotify == null)||(isToShortNotify == undefined)){isToShortNotify = false;};
        window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, isToShortNotify);
        var isToShortNotifymonthly = window.localStorage.getItem(SUB_SHORTTERM_MONTHLY);
        if ((isToShortNotifymonthly == null)||(isToShortNotifymonthly == undefined)){isToShortNotifymonthly = false;};
        window.localStorage.setItem(SUB_SHORTTERM_MONTHLY, isToShortNotifymonthly);
        var isToShortNotifyyearly = window.localStorage.getItem(SUB_SHORTTERM_YEARLY);
        if ((isToShortNotifyyearly == null)||(isToShortNotifyyearly == undefined)){isToShortNotifyyearly = false;};
        window.localStorage.setItem(SUB_SHORTTERM_YEARLY, isToShortNotifyyearly);
        //ini tipsnotifications
        var isToTipsNotify = window.localStorage.getItem(LOC_TIPS_NOTIFICATIONS);
        if ((isToTipsNotify == null)||(isToTipsNotify == undefined)){isToTipsNotify = true;};
        window.localStorage.setItem(LOC_TIPS_NOTIFICATIONS, isToTipsNotify);
         //ini cloth
        var iscloth = window.localStorage.getItem(LOC_CLOTH);
        if ((iscloth == null)||(iscloth == undefined)) {iscloth = false;};
        window.localStorage.setItem(LOC_CLOTH, iscloth);
       //ini fulltext
        var isfulltext = window.localStorage.getItem(LOC_FULLTEXT);
        if ((isfulltext == null)||(isfulltext == undefined)){isfulltext = false;};
        window.localStorage.setItem(LOC_FULLTEXT, isfulltext);
        //ini sound
        var issound = window.localStorage.getItem(LOC_SOUND);
        if ((issound == null)||(issound == undefined)){issound = true;};
        window.localStorage.setItem(LOC_SOUND, issound);
        //ini dailyforecast
        var isdailyforecast = window.localStorage.getItem(LOC_DAILYFORECAST);
        if ((isdailyforecast == null)||(isdailyforecast == undefined)){isdailyforecast = false;};
        window.localStorage.setItem(LOC_DAILYFORECAST, isdailyforecast);
        var isdailyforecastmonthly = window.localStorage.getItem(SUB_DAILYFORECAST_MONTHLY);
        if ((isdailyforecastmonthly == null)||(isdailyforecastmonthly == undefined)){isdailyforecastmonthly = false;};
        window.localStorage.setItem(SUB_DAILYFORECAST_MONTHLY, isdailyforecastmonthly);
        var isdailyforecastyearly = window.localStorage.getItem(SUB_DAILYFORECAST_YEARLY);
        if ((isdailyforecastyearly == null)||(isdailyforecastyearly == undefined)){isdailyforecastyearly = false;};
        window.localStorage.setItem(SUB_DAILYFORECAST_YEARLY, isdailyforecast);
        //ini isadfree
        var isadfree = window.localStorage.getItem(LOC_ADFREE);
        if ((isadfree == null)||(isadfree == undefined)){isadfree = false;};
        window.localStorage.setItem(LOC_ADFREE, isadfree);
        var isadfreemonthly = window.localStorage.getItem(SUB_ADFREE_MONTHLY);
        if ((isadfreemonthly == null)||(isadfreemonthly == undefined)){isadfreemonthly = false;};
        window.localStorage.setItem(SUB_ADFREE_MONTHLY, isadfreemonthly);
        var isadfreeyearly = window.localStorage.getItem(SUB_ADFREE_YEARLY);
        if ((isadfreeyearly == null)||(isadfreeyearly == undefined)){isadfreeyearly = false;};
        window.localStorage.setItem(SUB_ADFREE_YEARLY, isadfreeyearly);
        
        $('#checkbox_notifications').prop('checked', isToNotify);
        $('#checkbox_shortnotifications').prop('checked', isToShortNotify);
        $('#checkbox_tipsnotifications').prop('checked', isToTipsNotify);
        $('#checkbox_cloth').prop('checked', iscloth);
        $('#checkbox_fulltext').prop('checked', isfulltext);
        $('#checkbox_sound').prop('checked', issound);
        $('#checkbox_dailyforecast').prop('checked', isdailyforecast);
        $('#checkbox_adfree').prop('checked', isadfree);
        $('[name="radio-choice-lang"][value="' + lang + '"]').prop('checked',true); 
        $('[name="radio-choice-temp"][value="' + tempunits + '"]').prop('checked',true); 
        
        //log("startup: isToNotify=" + isToNotify + " isToShortNotify=" + isToShortNotify + " isToTipsNotify=" + isToTipsNotify + " iscloth=" + iscloth + " isfulltext=" + isfulltext + " issound=" + issound + " isdailyforecast=" + isdailyforecast + " isadfree=" + isadfree);
        //alert(window.localStorage.getItem(LOC_CLOTH)+' '+window.localStorage.getItem(LOC_FULLTEXT)+' '+window.localStorage.getItem(LOC_SOUND));
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("pause", this.onPause, false);
        document.addEventListener("resume", this.onResume, false);
   },
     onPause: function(){
    },
    onResume: function(){
        setTimeout(function() {
             $('#loading').show();
             window.localStorage.getItem(LOC_SOUND);
             onLanguageChoose(window.localStorage.getItem(LOC_LANG), window.localStorage.getItem(LOC_CLOTH)=== "true", window.localStorage.getItem(LOC_FULLTEXT)=== "true", window.localStorage.getItem(LOC_SOUND)=== "true");
             $('#loading').hide();
            
        }, 0);
        
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
         console.log('device ready: ' + device.platform + ' ' +  device.uuid);
          setTimeout(function() {
                navigator.splashscreen.hide();
          }, 1000);
        
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        //console.log('file plugin: ' + cordova.file.applicationDirectory);
        bindStrings();
        app.startup();
        StatusBar.overlaysWebView(false);
        StatusBar.styleDefault();
        var token = window.localStorage.getItem(LOC_TOKEN);
        console.log("token from storage:" + token);
        
        try {
           registerDevice();
        }
        catch (e)
        {
            //navigator.notification.alert("register device:" + e);
        }
        
        
       
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
   renderHomeView: function() {
         var html = "";
           $('body').html(html);
    
    },
    showAlert: function (message, title) {
            if (navigator.notification) {
                navigator.notification.alert(title ? (title + ": " + message) : message);
                navigator.notification.console.log(message, null, title, 'OK');
            } else {
                console.log(title ? (title + ": " + message) : message);
            }
	},
   
    saveLang:function(lang){
        console.log('saved lang=' + lang);
        window.localStorage.setItem(LOC_LANG, lang);
    }
    ,
    updateUserParams:function(){

        
        var isdailyforecast = window.localStorage.getItem(LOC_DAILYFORECAST);
        var dailyforecasthour = window.localStorage.getItem(LOC_DAILYFORECAST_HOUR);
        var token = window.localStorage.getItem(LOC_TOKEN);
        var isToShortNotify = window.localStorage.getItem(LOC_SHORT_NOTIFICATIONS);
        var isToTipsNotify = window.localStorage.getItem(LOC_TIPS_NOTIFICATIONS);
        var isToNotify = window.localStorage.getItem(LOC_NOTIFICATIONS);
        var approved = window.localStorage.getItem(LOC_APPROVED);
        //log("updateUserParams: isToNotify:" + isToNotify +" isToShortNotify:" + isToShortNotify+ " isToTipsNotify:" + isToTipsNotify +  " isdailyforecast:" + isdailyforecast+ " dailyforecasthour:" + dailyforecasthour);
        postNewTokenToServer(token, isToNotify, isToShortNotify, isToTipsNotify, isdailyforecast, dailyforecasthour, approved);
    },
    saveIsToNotify:function(longNotify, shortNotify, tipsNotify){
        window.localStorage.setItem(LOC_NOTIFICATIONS, longNotify);
        window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, shortNotify);
        window.localStorage.setItem(LOC_TIPS_NOTIFICATIONS, tipsNotify);
        var isdailyforecast = window.localStorage.getItem(LOC_DAILYFORECAST);
        var dailyforecasthour = window.localStorage.getItem(LOC_DAILYFORECAST_HOUR);
        var token = window.localStorage.getItem(LOC_TOKEN);
        var approved = window.localStorage.getItem(LOC_APPROVED);
        
        if ((token == undefined) || (token == null))
        {
            console.log(" saveIsToNotify: token undefined");
            registerDevice();
       }
        else
        {
            //alert(" posting:" + token + " " + longNotify + " " + shortNotify + " " + tipsNotify);
            postNewTokenToServer(token, longNotify, shortNotify, tipsNotify, isdailyforecast, dailyforecasthour, approved);
            
            
        }
        
    },
    // initialize the purchase plugin if available
    initStore:function() {

     // Setup the receipt validator service.
     store.validator = 'https://validator.fovea.cc/v1/validate?appName=il.co.02ws&apiKey=c45cd8ce-a2cb-46df-b200-441b6c68d652';
     
    app.platform = device.platform.toLowerCase();
    
    store.verbosity = store.DEBUG;
    store.register([{
        id:    SUB_SHORTTERM_MONTHLY,
        alias: SUB_SHORTTERM_MONTHLY,
        type:   store.PAID_SUBSCRIPTION,
    }, {
        id:    SUB_SHORTTERM_YEARLY,
        alias: SUB_SHORTTERM_YEARLY,
        type:   store.PAID_SUBSCRIPTION,
    }, {
        id:     SUB_ADFREE_MONTHLY,
        alias: SUB_ADFREE_MONTHLY,
        type:   store.PAID_SUBSCRIPTION,
    }, {
        id:     SUB_ADFREE_YEARLY,
        alias: SUB_ADFREE_YEARLY,
        type:   store.PAID_SUBSCRIPTION,
    }, {
        id:     SUB_DAILYFORECAST_MONTHLY,
        alias: SUB_DAILYFORECAST_MONTHLY,
        type:   store.PAID_SUBSCRIPTION,
    }, {
        id:    SUB_DAILYFORECAST_YEARLY,
        alias: SUB_DAILYFORECAST_YEARLY,
        type:   store.PAID_SUBSCRIPTION,
    }]);
    store.when(SUB_SHORTTERM_MONTHLY).approved(function(p) {
        //log(SUB_SHORTTERM_MONTHLY + " approved");
        
        window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, true);
        window.localStorage.setItem(LOC_APPROVED, true);
        p.verify();
        //app.updateUserParams();
    });
    store.when(SUB_SHORTTERM_YEARLY).approved(function(p) {
        //log(SUB_SHORTTERM_YEARLY + " approved");
        
        window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, true);
        window.localStorage.setItem(LOC_APPROVED, true);
        p.verify();
        //app.updateUserParams();
    });
    store.when(SUB_ADFREE_MONTHLY).approved(function(p) {
        //log(SUB_ADFREE_MONTHLY + " approved");
        
        window.localStorage.setItem(LOC_ADFREE, true);
        window.localStorage.setItem(LOC_APPROVED, true);
        p.verify();
        //putAdFreeCode(1);
        //app.updateUserParams();
    });
    store.when(SUB_ADFREE_YEARLY).approved(function(p) {
        //log(SUB_ADFREE_YEARLY + " approved");
       
        window.localStorage.setItem(LOC_ADFREE, true);
        window.localStorage.setItem(LOC_APPROVED, true);
        p.verify();
        //putAdFreeCode(1);
        //app.updateUserParams();
    });
    store.when(SUB_DAILYFORECAST_MONTHLY).approved(function(p) {
        //log(SUB_DAILYFORECAST_MONTHLY + " approved");
      
        window.localStorage.setItem(LOC_DAILYFORECAST, true);
        window.localStorage.setItem(LOC_APPROVED, true);
        p.verify();
        //app.updateUserParams();
    });
    store.when(SUB_DAILYFORECAST_YEARLY).approved(function(p) {
        //log(SUB_DAILYFORECAST_YEARLY + " approved");
       
        window.localStorage.setItem(LOC_DAILYFORECAST, true);
        window.localStorage.setItem(LOC_APPROVED, true);
        p.verify();
        //app.updateUserParams();
    });
    store.when('subscription').verified(function(p) {
        
        
        if ((p.id == SUB_DAILYFORECAST_MONTHLY) || (p.id == SUB_DAILYFORECAST_YEARLY))
        {   
            window.localStorage.setItem(LOC_DAILYFORECAST_HOUR, $("[name='radio-choice-df']:checked").val());
            window.localStorage.setItem(LOC_DAILYFORECAST, true);
            app.updateUserParams();
        }
        if ((p.id == SUB_SHORTTERM_MONTHLY) || (p.id == SUB_SHORTTERM_YEARLY))
        {
            window.localStorage.setItem(LOC_APPROVED, true);
            window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, true);
            app.updateUserParams();
        }
        if ((p.id == SUB_ADFREE_YEARLY) || (p.id == SUB_ADFREE_MONTHLY))
            putAdFreeCode(1);
        //log("subscription " + p.id + " verified");
        p.finish();
       
    });
    store.when('subscription').unverified(function(p) {
        //log("subscription " + p.id + "unverified");
    });
    store.when('subscription').expired(function(p) {
        
        if ((p.id == SUB_ADFREE_YEARLY) || (p.id == SUB_ADFREE_MONTHLY))
            putAdFreeCode(0);
        if ((p.id == SUB_DAILYFORECAST_MONTHLY) || (p.id == SUB_DAILYFORECAST_YEARLY))
        {
            window.localStorage.setItem(LOC_DAILYFORECAST, false);
            window.localStorage.setItem(LOC_DAILYFORECAST_HOUR, null);
            app.updateUserParams();
        }
        if ((p.id == SUB_DAILYFORECAST_MONTHLY) || (p.id == SUB_DAILYFORECAST_YEARLY))
        {
            window.localStorage.setItem(LOC_APPROVED, false);
            app.updateUserParams();
        }
        //log("subscription " + p.id + "expired");    
    });
    store.when('subscription').cancelled(function(p) {
        
        if ((p.id == SUB_ADFREE_YEARLY) || (p.id == SUB_ADFREE_MONTHLY))
            putAdFreeCode(0);
        if ((p.id == SUB_DAILYFORECAST_MONTHLY) || (p.id == SUB_DAILYFORECAST_YEARLY))
        {
            window.localStorage.setItem(LOC_DAILYFORECAST, false);
            window.localStorage.setItem(LOC_DAILYFORECAST_HOUR, null);
            app.updateUserParams();
        }
        if ((p.id == SUB_DAILYFORECAST_MONTHLY) || (p.id == SUB_DAILYFORECAST_YEARLY))
        {
            window.localStorage.setItem(LOC_APPROVED, false);
            app.updateUserParams();
        }
        //log("subscription " + p.id + "expired");    
    });
    store.when('subscription').updated(function(p) {
        //log(p.id + ' owned:' + p.owned);

        var owned = "";
        if (p.id == SUB_SHORTTERM_MONTHLY) {
            if (p.owned){
                window.localStorage.setItem(SUB_SHORTTERM_MONTHLY, true);
                window.localStorage.setItem(SUB_SHORTTERM_YEARLY, false);
                window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, true);
                window.localStorage.setItem(LOC_APPROVED, true);
                owned = owned.concat(SUB_SHORTTERM_MONTHLY);
                //log("updated: owned->" + owned);
            }
            else{
                window.localStorage.setItem(SUB_SHORTTERM_MONTHLY, false);
                if (window.localStorage.getItem(SUB_SHORTTERM_YEARLY) == "false")
                {
                    window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, false);
                    window.localStorage.setItem(LOC_APPROVED, false);
                }
            }
                        
        }
        if (p.id == SUB_SHORTTERM_YEARLY) {
            if (p.owned){
                window.localStorage.setItem(SUB_SHORTTERM_MONTHLY, false);
                window.localStorage.setItem(SUB_SHORTTERM_YEARLY, true);
                window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, true);
                window.localStorage.setItem(LOC_APPROVED, true);
                owned = owned.concat(SUB_SHORTTERM_YEARLY);
                //log("updated: owned->" + owned);
            }
            else{
                window.localStorage.setItem(SUB_SHORTTERM_YEARLY, false);
                if (window.localStorage.getItem(SUB_SHORTTERM_MONTHLY) == "false")
                {
                    window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, false);
                    window.localStorage.setItem(LOC_APPROVED, false);
                }
                
            }
            
        }
        
        if (p.id == SUB_ADFREE_MONTHLY) {
            if (p.owned){
                window.localStorage.setItem(SUB_ADFREE_MONTHLY, true);
                window.localStorage.setItem(SUB_ADFREE_YEARLY, false);
                window.localStorage.setItem(LOC_ADFREE, true);
                window.localStorage.setItem(LOC_APPROVED, true);
                owned = owned.concat(SUB_ADFREE_MONTHLY);
                //log("updated: owned->" + owned);
            }
            else{
                window.localStorage.setItem(SUB_ADFREE_MONTHLY, false);
                if (window.localStorage.getItem(SUB_ADFREE_YEARLY) == "false")
                    window.localStorage.setItem(LOC_ADFREE, false);
            }
        }
        if (p.id == SUB_ADFREE_YEARLY) {
            if (p.owned){
                window.localStorage.setItem(SUB_ADFREE_MONTHLY, false);
                window.localStorage.setItem(SUB_ADFREE_YEARLY, true);
                window.localStorage.setItem(LOC_ADFREE, true);
                window.localStorage.setItem(LOC_APPROVED, true);
                owned = owned.concat(SUB_ADFREE_YEARLY);
            }
            else{
                window.localStorage.setItem(SUB_ADFREE_YEARLY, false);
                if (window.localStorage.getItem(SUB_ADFREE_MONTHLY) == "false")
                    window.localStorage.setItem(LOC_ADFREE, false);
            }
            
        }
       
        if (p.id == SUB_DAILYFORECAST_MONTHLY) {
            if (p.owned){
                window.localStorage.setItem(SUB_DAILYFORECAST_MONTHLY, true);
                window.localStorage.setItem(SUB_DAILYFORECAST_YEARLY, false);
                window.localStorage.setItem(LOC_DAILYFORECAST, true);
                owned = owned.concat(SUB_DAILYFORECAST_MONTHLY);
            }
            else {
                window.localStorage.setItem(SUB_DAILYFORECAST_MONTHLY, false);
                if (window.localStorage.getItem(SUB_DAILYFORECAST_YEARLY) == "false"){
                    window.localStorage.setItem(LOC_DAILYFORECAST, false);
                    window.localStorage.setItem(LOC_DAILYFORECAST_HOUR, null);
                }
            }
            
        }
        if (p.id == SUB_DAILYFORECAST_YEARLY) {
            if (p.owned){
                window.localStorage.setItem(SUB_DAILYFORECAST_MONTHLY, false);
                window.localStorage.setItem(SUB_DAILYFORECAST_YEARLY, true);
                window.localStorage.setItem(LOC_DAILYFORECAST, true);
                owned = owned.concat(SUB_DAILYFORECAST_YEARLY);
            }
            else{
                window.localStorage.setItem(SUB_DAILYFORECAST_YEARLY, false);
                if (window.localStorage.getItem(SUB_DAILYFORECAST_MONTHLY) == "false"){
                    window.localStorage.setItem(LOC_DAILYFORECAST, false);
                    window.localStorage.setItem(LOC_DAILYFORECAST_HOUR, null);
                }
                    
            }
            
        }
        
        //app.updateUserParams();
        
        app.startup();
        
   
    });
   
    store.error(function(error) {
        //log('error:' + error.message);
    });
    store.refresh();
    store.ready(function() {
        
    });
    
    
    }
};


function registerDevice()
{
    //navigator.notification.alert('registering ' + device.platform);
        try
        {
            var push = PushNotification.init({
                android: {
                    senderID: "12345679"
                },
                browser: {
                    pushServiceURL: 'http://push.api.phonegap.com/v1/push'
                },
                ios: {
                    alert: true,
                    badge: true,
                    sound: true,
                    clearBadge: true,
                    "categories": {
                    "share": {
                        "yes": {
                            "callback": "onShareNotification",
                            "title": currentLocale.share,
                            "foreground": true,
                            "destructive": false
                        },
                        "maybe": {
                            "callback": "onReplyNotification",
                            "title": currentLocale.reply,
                            "foreground": false,
                            "destructive": false
                        }
                        
                     }
                    }
                },
                windows: {}
            });

            push.on('registration', function(data) {
                // data.registrationId
                //navigator.notification.alert(data.registrationId);
                tokenHandler(data.registrationId);
            });

            push.on('notification', function(data) {
                // data.message,
                // data.title,
                // data.count,
                // data.sound,
                // data.image,
                // data.additionalData
                navigator.notification.confirm(data.message,         // message
                    function(buttonIndex){
                        onConfirm(buttonIndex, data.message);
                    },                 // callback
                    data.title,           // title
                    [currentLocale.ok, currentLocale.reply, currentLocale.share]                  // buttonName
                    );
                onUrlClicked('alerts.php');
            });

            push.on('error', function(e) {
                // e.message
                //navigator.notification.alert('error on push: ' + e.message);
            });
        }
        catch (e){
            //navigator.notification.alert('error registering: ' + e);
        }
}

    function onConfirm(buttonIndex, msg) {
        //log('You selected button ' + buttonIndex);
        if (buttonIndex == 1)
        {
            onUrlClicked('alerts.php');
        }
        if (buttonIndex == 2)
        {
            onUrlClicked('contact.php');
        }
        if (buttonIndex == 3)
        {
            window.plugins.socialsharing.share(currentLocale.sharemessage + " " + msg);
        }
    }
    function cancelPic(){
        console.log("pic canceled");
        $('#imagepreviewContainer').hide();
    }
    function onPhotoDataSuccess(Data) {
        $('#campanel').panel('close');
       $('#imagepreviewContainer').show();
       console.log(Data);
       var largeImage = document.getElementById('largeImage');
        largeImage.style.display = 'block';
        largeImage.src = "data:image/jpeg;base64," + Data;
        imageData = largeImage.src;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(result) {
        var fname;
        setTimeout(function() {
	 //alert(result);
	}, 0);
        try{
            var thisResult = JSON.parse(result);
            var metadata = JSON.parse(thisResult.json_metadata);
            fname = thisResult.filename;
            
            try{
                y = metadata.GPS.Latitude;
                x = metadata.GPS.Longitude;
                //navigator.notification.alert('Lat: '+metadata.GPS.Latitude+' Lon: '+metadata.GPS.Longitude);
            }catch(e){
                console.log('no GPS data')
            }
        }
        catch(e){
            fname = result;
        }
        var largeImage = document.getElementById('largeImage');
   	largeImage.style.display = 'block';
        largeImage.src = fname;
        imageURI = fname;
        $('#campanel').panel('close');
      	$('#imagepreviewContainer').show();
        
    
    }

    function clearCache() {
        //navigator.camera.cleanup();
    }
    // A button will call this function
    //
    function capturePhotoEdit() {
     clearCache();
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 95, allowEdit: true,
        destinationType: destinationType.FILE_URI,saveToPhotoAlbum:true });
    }

    // A button will call this function
    //
    function getPhoto(source) {
     clearCache();
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 95,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
        setTimeout(function() {
            console.log('Image not taken because: ' + message);
        }, 0);
     
    }
function postNewTokenToServer(token, islongactive, isshortactive, istipsactive, isdailyforecast, dailyforecasthour, p_approved)
{
    
    $.ajax({
              
        url:'https://www.02ws.co.il/apn_register.php',
        type:'POST',
        data:{name:device.model, approved:p_approved, dailyforecast:(isdailyforecast?dailyforecasthour:null), email:device.uuid, regId:token, lang:window.localStorage.getItem(LOC_LANG), active:(islongactive ? 1 : 0), active_rain_etc:(isshortactive ? 1 : 0), active_tips:(istipsactive ? 1 : 0)},
        crossDomain:true,
        success: function(data){
        console.log('device sent token successfully: ' + data);
        }
       });
          
}
function postNewAdFreeCodeToServer(token, p_email, p_status)
{
    //log('email='+p_email+ ' code='+p_status,'');
    $.ajax({
              
        url:'https://www.02ws.co.il/subscription_reciever.php',
        type:'POST',
        data:{email:device.uuid, status:p_status, reg_id: token, action:'storeSub'},
        crossDomain:true,
        success: function(data){
        console.log('AdFreeCode sent token successfully: ' + data);
        }
       });
          
}
function putAdFreeCode(status){
    
    var token = window.localStorage.getItem(LOC_TOKEN);
    if (status == 1)
        window.localStorage.setItem(LOC_ACTIVE_SUB, 1);
    else
        window.localStorage.setItem(LOC_ACTIVE_SUB, null);
    postNewAdFreeCodeToServer(token, '', status);
    onUrlClicked('');
    $('#AdFreeContainer').hide();
    
}
function openAdFreeCon(){
    
    if( $('#navpanel').hasClass("ui-panel-open") == true ){
         $('#navpanel').panel('close');
        }
    $('#AdFreeContainer').show();
}
function openShortNotifyCon(){
    
    if( $('#navpanel').hasClass("ui-panel-open") == true ){
         $('#navpanel').panel('close');
        }
    $('#shorttermpanel').show();
}
function opendailyForecastCon(){
    $('#dailyforecastpanel').show();
    if( $('#navpanel').hasClass("ui-panel-open") == true ){
         $('#navpanel').panel('close');
        }
    var dailyforecasthour = window.localStorage.getItem(LOC_DAILYFORECAST_HOUR); 
    if ((dailyforecasthour == null)||(dailyforecasthour == undefined)){dailyforecasthour = 7;};
    //log("set forecasthour radio to " + dailyforecasthour);
    $('[name="radio-choice-df"][value="' + dailyforecasthour + '"]').attr('checked',true); 
    $("input[type='radio']").checkboxradio();
    $("input[type='radio']").checkboxradio("refresh");
    //$("input[type='checkbox']").checkboxradio();
    //$("input[type='checkbox']").checkboxradio("refresh");
}
function sendPic(){
        
    if ($('#nameonpic').val().length == 0)
        $('#missing').show();
    else
    {
        postNewPictureToServer(imageURI, $('#nameonpic').val(), $('#commentonpic').val(), x, y);
        $('#imagepreviewContainer').hide();
        
    }
}
function postNewPictureToServer(fileURI, nameOnPic, comments, x, y)
{
   var win = function (r) {
        clearCache();
        retries = 0;
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        //navigator.notification.alert(currentLocale.sentsuccess);
    }
 
    var fail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                postNewPictureToServer(fileURI, nameOnPic, comments, x, y);
            }, 1000)
        } else {
            retries = 0;
            clearCache();
            navigator.notification.alert('Ups. Something wrong happens! Code = ' + error.code);
        }
    }
    if (nameOnPic == "")
    {
        return false;
    }
    //navigator.notification.alert("postNewPictureToServer: "+fileURI);
    var basename = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    var manipulatedName = basename.substr(0,basename.lastIndexOf('.') - 1) + "_" + (new Date()).getTime() + basename.substr(basename.lastIndexOf('.'));
    var token = window.localStorage.getItem(LOC_TOKEN);
    //navigator.notification.alert(manipulatedName);
    var options = new FileUploadOptions();
    options.fileKey = "pic";
    options.fileName = manipulatedName;
    options.mimeType = "image/jpeg";
    options.chunkedMode = false;
    options.headers = {
    Connection: "close"
    };
    options.params = {name:nameOnPic, comment:comments, x:x, y:y, reg_id:token, picname:options.fileName}; // if we need to send parameters to the server request
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("https://www.02ws.co.il/user_picture_reciever.php"), uploadwin, uploadfail, options);
             
}
function uploadwin(r) {
    log("Code = " + r.responseCode);
    log("Response = " + r.response);
    log("Sent = " + r.bytesSent);
    navigator.notification.alert(currentLocale.sentsuccess, uploadwincallback); 
}
function uploadwincallback(r) {
}
function uploadfail(error) {
    log("An error has occurred: Code = " + error.code);
    log("upload error source " + error.source);
    log("upload error target " + error.target);
    navigator.notification.alert(currentLocale.sentfailed, uploadfailcallback); 
}
function uploadfailcallback(r) {
}
function tokenHandler(result)
{
     if (token != result){
        window.localStorage.setItem(LOC_TOKEN, result);
        app.updateUserParams();
    }
 }   
function errorHandler(error)
{
    log('error in registering: ' + error);
}
function regsuccessHandler (result) {
    log('registration = ' + result);
    
}
function onRefresh()
{
   var successclear = function(status) {
        console.log('successclear: ' + status);
    }

    var errorclear = function(status) {
        console.log('Errorclear: ' + status);
    } 
    //window.cache.clear( successclear, errorclear );
    
    document.getElementById('02wsframe').src = document.getElementById('02wsframe').src + '&' +(new Date()).getTime();
}
function onShareNotification(data)
{
   // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
      message: currentLocale.appTitle + ': ' + data.message,
      subject: currentLocale.sharesubject, // fi. for email
      url: 'https://itunes.apple.com/us/app/yrwsmyym/id925504632?mt=8',
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    }
    window.plugins.socialsharing.shareWithOptions(options, onShareSuccess, onShareError); 
    push.finish();
}
function onReplyNotification(data)
{
      console.log("onReplyNotification:" + data);
        var lang = window.localStorage.getItem(LOC_LANG);
        var url = "https://www.02ws.co.il/small.php?lang=" + lang + "&section=SendEmailForm.php&data="+data;
        console.log(url);    
        $('#02wsframe').attr('src', url);
        setView(320);
}
function onShareClick()
{
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
      message: document.getElementById('02wsframe').src, // not supported on some apps (Facebook, Instagram)
      subject: currentLocale.sharesubject, // fi. for email
      files: ['https://www.02ws.co.il/02ws_short.png'], // an array of filenames either locally or remotely
      url: '',
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    }
    window.plugins.socialsharing.shareWithOptions(options, onShareSuccess, onShareError);
    
}
function isDFSubscribed(){
    return (window.localStorage.getItem(SUB_DAILYFORECAST_MONTHLY)||window.localStorage.getItem(SUB_DAILYFORECAST_YEARLY));
}
function isAdFreeSubscribed(){
    return (window.localStorage.getItem(SUB_ADFREE_MONTHLY)||window.localStorage.getItem(SUB_ADFREE_YEARLY));
}
function isShortTermSubscribed(){
    return (window.localStorage.getItem(SUB_SHORTTERM_MONTHLY)||window.localStorage.getItem(SUB_SHORTTERM_YEARLY));
}
function onNotificationsCheck(longNotifyIsChecked, shortNotifyIsChecked, tipsNotifyIsChecked)
{
    app.saveIsToNotify(longNotifyIsChecked, shortNotifyIsChecked, tipsNotifyIsChecked);
    $('#navpanel').panel('close');
   
}
function onStartPageChoose(value)
{
    lang = window.localStorage.getItem(LOC_LANG);
    iscloth = window.localStorage.getItem(LOC_CLOTH);
    isfulltext = window.localStorage.getItem(LOC_FULLTEXT);
    issound = window.localStorage.getItem(LOC_SOUND);
    var token  = window.localStorage.getItem(LOC_TOKEN);
    var active_sub = window.localStorage.getItem(LOC_ACTIVE_SUB);
    console.log("active_sub="+active_sub+"token="+token); 
    var url = "https://www.02ws.co.il/small.php?lang=" + lang + "&c=" + (iscloth == "true" ? 1 : 0) + "&fullt=" + (isfulltext == "true" ? 1 : 0)  + "&s=" + (issound == "true" ? 1 : 0) + "&startpage=" + (value ? 1 : 0) + (active_sub != null ? "&reg_id=" + token : ''); ;
    $('#02wsframe').attr('src', url);
}
function onLanguageChoose(value, iscloth, isfulltext, issound)
{
    try {
        app.saveLang(value);
        window.localStorage.setItem(LOC_CLOTH, iscloth);
        window.localStorage.setItem(LOC_FULLTEXT, isfulltext);
        window.localStorage.setItem(LOC_SOUND, issound);
        var token  = window.localStorage.getItem(LOC_TOKEN);
        var tempunits = window.localStorage.getItem("tempunits");
        var active_sub = window.localStorage.getItem(LOC_ACTIVE_SUB);
        //log("onLanguageChoose:" + iscloth + isfulltext + issound);
        //alert(value+' '+iscloth+' '+isfulltext+' '+issound+' '+tempunits);
        var url = "https://www.02ws.co.il/small.php?lang=" + value + "&c=" + (iscloth == true ? 1 : 0) + "&fullt=" + (isfulltext == true ? 1 : 0)  + "&s=" + (issound == true ? 1 : 0)+ "&tempunit=" + tempunits + (active_sub != null ? "&reg_id=" + token : ''); 
        //log(url);    
        $('#02wsframe').attr('src', url);
        setView(320);
        if( $('#navpanel').hasClass("ui-panel-open") == true ){
         $('#navpanel').panel('close');
        }
   }
     catch (e) {
        console.log('error on onLanguageChoose: ' + e);
    }
    
}

function onUrlClicked(section)
{
    navClicked("https://www.02ws.co.il/small.php?section=" + section + "&lang=", 320);
         
}
function onDailyForecastHourChoose(value)
{
    window.localStorage.setItem(LOC_DAILYFORECAST_HOUR, value);
}
function onTempUnitsChoose(value)
{
    try {
        
        window.localStorage.setItem("tempunits", value);
        console.log("onTempUnitsChoose:" + value); 
        onUrlClicked('');
   }
     catch (e) {
        console.log('error on onTempUnitsChoose: ' + e);
    }
    
}


var onShareSuccess = function(result) {
  console.log("Share completed? " + result.completed); 
  console.log("Shared to app: " + result.app);
  
}

var onShareError = function(msg) {
  console.log("Sharing failed with message: " + msg);
  
}

function log(msg){
    console.log(msg);
    app.showAlert(msg, '');
}
function successIconBadgeNumberHandler(){
   console.log("successIconBadgeNumber"); 
}
function handleExternalURLs() {

    $(document).on('click', 'a[href^="http"]', function (e) {
        var url = $(this).attr('href');
         e.preventDefault();
        window.open(url, '_system');
     });
    
}
function setView(width){
    var viewportScale = 1 / window.devicePixelRatio;
    viewport = document.querySelector("meta[name=viewport]");
    if (width == 320)
     viewport.setAttribute('content', 'user-scalable=no, viewport-fit=cover, width=' + width );
       else
    viewport.setAttribute('content', 'initial-scale=0.55, minimum-scale=0.55, maximum-scale=1, viewport-fit=cover,  width=' + width);
}
function navClicked(baseurl, width){
    lang = window.localStorage.getItem(LOC_LANG);
    iscloth = window.localStorage.getItem(LOC_CLOTH);
    isfulltext = window.localStorage.getItem(LOC_FULLTEXT);
    issound = window.localStorage.getItem(LOC_SOUND);
    var token  = window.localStorage.getItem(LOC_TOKEN);
    var active_sub = window.localStorage.getItem(LOC_ACTIVE_SUB);
    console.log("active_sub="+active_sub+"token="+token); 
    var url = baseurl + lang + "&c=" + (iscloth == "true" ? 1 : 0) + "&fullt=" + (isfulltext == "true" ? 1 : 0)  + "&s=" + (issound == "true" ? 1 : 0) + (active_sub != null ? "&reg_id=" + token : ''); ;
    $('#02wsframe').attr('src', url);
    setView(width);
    if( $('#navlinkpanel').hasClass("ui-panel-open") == true ){
         $('#navlinkpanel').panel('close');
    }
    if( $('#navpanel').hasClass("ui-panel-open") == true ){
         $('#navpanel').panel('close');
    }
}
function navlinkCLicked(){
    console.log('navlinkCLicked');
    app.initStore();
    $("input[type='radio']").checkboxradio();
    $("input[type='radio']").checkboxradio("refresh");
}
function adfreeYearlyClicked(checked){
    //log("adfreeYearlyClicked:" + checked);
}
function adfreeMonthyClicked(checked){
    //log("adfreeMonthyClicked:" + checked);
    
}
function shorttermYearlyClicked(checked){
    //log("shorttermYearlyClicked:" + checked);
    
}
function shorttermMonthlyClicked(checked){
    //log("shorttermMonthlyClicked:" + checked);
   
}
function shorttermCombinedClicked(checked){
    //log("shorttermCombinedClicked:" + checked);

}
function okcloseadfreeClicked(){
    $('#AdFreeContainer').hide();
    //log('okcloseadfreeClicked: checkbox_AdFree_monthly=' + $('#checkbox_AdFree_monthly').is(':checked') + ' checkbox_AdFree_yearly='+$('#checkbox_AdFree_yearly').is(':checked'));
    try{
        if ($('#checkbox_AdFree_monthly').is(':checked'))
        {
            store.order(SUB_ADFREE_MONTHLY);
        }
       
        
    if ($('#checkbox_AdFree_yearly').is(':checked'))
        {
            store.order(SUB_ADFREE_YEARLY);
        }
               
    
        $('#checkbox_adfree').prop('checked', isAdFreeSubscribed());
    }
    catch (e)
   {
       log(e);
   }
    
}
function okcloseshorttermClicked(){
    $('#shorttermpanel').hide();
    //log('okcloseshorttermClicked: checkbox_shortterm_monthly=' + $('#checkbox_shortterm_monthly').is(':checked') + ' checkbox_shortterm_yearly='+$('#checkbox_shortterm_yearly').is(':checked'));
    
    try{
    if ($('#checkbox_shortterm_monthly').is(':checked'))
    {
        store.order(SUB_SHORTTERM_MONTHLY);
        
    }
      
    if ($('#checkbox_shortterm_yearly').is(':checked'))
    {
        store.order(SUB_SHORTTERM_YEARLY);
    }
        
    if (!$('#checkbox_shortterm_combined').is(':checked')){
        window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, false);
        apps.updateUserParams();
    }
    $('#checkbox_shortnotifications').prop('checked', isShortTermSubscribed());
    }
    catch (e)
    {
    log(e);
    }
    
}

function okclosedfpanelClicked(){
    $('#dailyforecastpanel').hide();
    //log('okclosedfpanelClicked: checkbox_dailyforecast_monthly=' + $('#checkbox_dailyforecast_monthly').is(':checked') + ' checkbox_dailyforecast_yearly='+$('#checkbox_dailyforecast_yearly').is(':checked'));
    
    try{
        if ($('#checkbox_dailyforecast_monthly').is(':checked'))
        {
            store.order(SUB_DAILYFORECAST_MONTHLY);
        }
        
        if ($('#checkbox_dailyforecast_yearly').is(':checked'))
        {
            store.order(SUB_DAILYFORECAST_YEARLY);
        }
        if (!isDFSubscribed()) window.localStorage.setItem(LOC_DAILYFORECAST_HOUR, null);
        //$('#navpanel').panel('close');
        $('#checkbox_dailyforecast').prop('checked', isDFSubscribed());
    }
    catch (e){
        log(e);
    }
    
}

function youtubeClicked(){
    navClicked('https://m.youtube.com/channel/UCcFdTuHfckfOsCy7MwbY9vQ', 320);
}
function dailypicClicked(){
    navClicked('https://www.02ws.co.il/small.php?section=picoftheday.php&lang=', 320);
    $('#campanel').panel('close');
}
function radarClicked(){
    navClicked('https://www.02ws.co.il/small.php?section=radar.php&lang=', 570);
}
function userpicsClicked(){
    navClicked('https://www.02ws.co.il/small.php?section=userPics.php&lang=', 320);
}
function contactClicked(){
    navClicked('https://www.02ws.co.il/small.php?section=SendEmailForm.php&lang=', 320);
}
function forumClicked(){
    navClicked('https://www.02ws.co.il/small.php?section=chatmobile.php&lang=', 320);
}
function tempClicked(){
    navClicked('https://www.02ws.co.il/small.php?section=graph.php&graph=temp2.php&profile=1&lang=', 320);
}
function humClicked(){
    navClicked('https://www.02ws.co.il/small.php?section=graph.php&graph=humwind.php&profile=1&lang=', 320);
}
function homeClicked(){
    lang = window.localStorage.getItem(LOC_LANG);
    iscloth = window.localStorage.getItem(LOC_CLOTH);
    isfulltext = window.localStorage.getItem(LOC_FULLTEXT);
    issound = window.localStorage.getItem(LOC_SOUND);
    onLanguageChoose(lang, iscloth, isfulltext, issound);
    $('#navlinkpanel').panel('close');
        
}
function openAllLinksWithBlankTargetInSystemBrowser() {
    /*if ( typeof cordova === "undefined" || !cordova.InAppBrowser ) {
        throw new Error("You are trying to run this code for a non-cordova project, " +
                "or did not install the cordova InAppBrowser plugin");
    }*/
    
    // Currently (for retrocompatibility reasons) the plugin automagically wrap window.open
    // We don't want the plugin to always be run: we want to call it explicitly when needed
    // See https://issues.apache.org/jira/browse/CB-9573
    delete window.open; // scary, but it just sets back to the default window.open behavior
    var windowOpen = window.open; // Yes it is not deleted !

    // Note it does not take a target!
    var systemOpen = function(url, options) {
        // Do not use window.open becaus the InAppBrowser open will not proxy window.open
        // in the future versions of the plugin (see doc) so it is safer to call InAppBrowser.open directly
        //cordova.InAppBrowser.open(url,"_system",options);
        window.open(url,"_system",options);
    };


    // Handle direct calls like window.open("url","_blank")
    window.open = function(url,target,options) {
        if ( target == "_blank" ) systemOpen(url,options);
        else windowOpen(url,target,options);
    };

    // Handle html links like <a href="url" target="_blank">
    // See https://issues.apache.org/jira/browse/CB-6747
    $(document).on('click', 'a[target=_top]', function(event) {
        event.preventDefault();
        console.log('a[target=_top]');
        systemOpen($(this).attr('href'), 'location=no');
    });
    $(document).on('click', 'a[href^=http], a[href^=https]', function (e) {
        e.preventDefault();
        console.log('a[href^=http]');
        var $this = $(this),
            target = $this.data('inAppBrowser') || '_system'; // system open the device browser. _blank open inappbrowser
        systemOpen($(this).attr('href'), 'location=no');
    });
 }
$(document).ready(function() {
    $("input[type='radio']").checkboxradio();
    $("input[type='radio']").checkboxradio("refresh");
    $("[name='radio-choice-lang']").on('change mousedown',function(event) { 
        onLanguageChoose(this.value, window.localStorage.getItem(LOC_CLOTH)=== "true" , window.localStorage.getItem(LOC_FULLTEXT)=== "true", window.localStorage.getItem(LOC_SOUND)=== "true");
    });
    
    $("[name='radio-choice-temp']").on('change mousedown',function(event) { 
        onTempUnitsChoose(this.value);
    });
    $("[name='radio-choice-df']").on('change mousedown',function(event) { 
        onDailyForecastHourChoose(this.value);
    });
    $('#checkbox_adfree').on('change', function() {
        if  ($(this).is(':checked')){
            $(this).prop("checked", false).checkboxradio("refresh");
        }
        else
        $(this).prop("checked", true).checkboxradio("refresh");
        openAdFreeCon();
    }); 
    $('#checkbox_AdFree_monthly').on('change', function() {
        
       if  ($(this).is(':checked'))
            $('#checkbox_AdFree_yearly').prop('checked', false).checkboxradio("refresh");
        adfreeMonthyClicked($(this).is(':checked'));
    }); 
    $('#checkbox_AdFree_yearly').on('change', function() {
       
        if  ($(this).is(':checked'))
            $('#checkbox_AdFree_monthly').prop('checked', false).checkboxradio("refresh");
        adfreeYearlyClicked($(this).is(':checked'));
    }); 
    $('#checkbox_dailyforecast_monthly').on('change', function() {
        
        if  ($(this).is(':checked')){
            $('#checkbox_dailyforecast_yearly').prop("checked", false).checkboxradio("refresh");
            
            //log('checkbox_dailyforecast_yearly set to ' + $('#checkbox_dailyforecast_yearly').is(':checked'));
        }
       
            
        
    }); 
    $('#checkbox_dailyforecast_yearly').on('change', function() {
        
        if  ($(this).is(':checked')){
            
            $('#checkbox_dailyforecast_monthly').prop("checked", false).checkboxradio("refresh");
        
        }
            
    }); 
    $('#checkbox_shortterm_monthly').on('change', function() {
        
        if  ($(this).is(':checked'))
            $('#checkbox_shortterm_yearly').prop('checked', false).checkboxradio("refresh");
        shorttermMonthlyClicked($(this).is(':checked'));
    }); 
    $('#checkbox_shortterm_yearly').on('change', function() {
        
        if  ($(this).is(':checked'))
            $('#checkbox_shortterm_monthly').prop('checked', false).checkboxradio("refresh");
        shorttermYearlyClicked($(this).is(':checked'));
    }); 
    
    $('#checkbox_dailyforecast').on('change', function() {
        if  ($(this).is(':checked')){
            $(this).prop("checked", false).checkboxradio("refresh");
        }
        else
        $(this).prop("checked", true).checkboxradio("refresh");
        opendailyForecastCon();
    }); 
    $('#checkbox_notifications').on('change', function() {
        
        onNotificationsCheck($(this).is(':checked'), $("[name='checkbox_shortnotifications']").is(":checked"), $("[name='checkbox_tipsnotifications']").is(":checked"));
    }); 
    $('#checkbox_shortnotifications').on('change', function() {
        if  ($(this).is(':checked')){
            $(this).prop("checked", false).checkboxradio("refresh");
        }
        else
        $(this).prop("checked", true).checkboxradio("refresh");
        openShortNotifyCon();
     }); 
     $('#checkbox_tipsnotifications').on('change', function() { 
         
        onNotificationsCheck($("[name='checkbox_notifications']").is(":checked"), $("[name='checkbox_shortnotifications']").is(":checked"), $(this).is(':checked'));
    }); 
    $("[name='checkbox_cloth']").on('change', function() { 
        onLanguageChoose(window.localStorage.getItem(LOC_LANG), $(this).is(':checked'), window.localStorage.getItem(LOC_FULLTEXT)=== "true", window.localStorage.getItem(LOC_SOUND)=== "true");
    });
    $("[name='checkbox_choosestartpage']").on('change', function() { 
        onStartPageChoose($(this).is(':checked'));
    });
    $("[name='checkbox_fulltext']").on('change', function() { 
        onLanguageChoose(window.localStorage.getItem(LOC_LANG), window.localStorage.getItem(LOC_CLOTH)=== "true", $(this).is(':checked'), window.localStorage.getItem(LOC_SOUND)=== "true");
    });
    $("[name='checkbox_sound']").on('change', function() { 
        onLanguageChoose(window.localStorage.getItem(LOC_LANG), window.localStorage.getItem(LOC_CLOTH)=== "true", window.localStorage.getItem(LOC_FULLTEXT)=== "true", $(this).is(':checked'));
    });
    $("[id='btn_okcloseadfree']").on('click',function(event) { 
        okcloseadfreeClicked();
    });
    $("[id='btn_okcloseshortterm']").on('click',function(event) { 
        okcloseshorttermClicked();
    });
    $("[id='btn_takepic']").on('click',function(event) { 
        capturePhotoEdit();
    });
    $("[id='btn_choosepic']").on('click',function(event) {
        getPhoto(pictureSource.PHOTOLIBRARY);
    });
    $("[id='btn_choosepicalbum']").on('click',function(event) {
        getPhoto(pictureSource.SAVEDPHOTOALBUM);
       
    });
     $("[id='btn_dailypic']").on('click',function(event) {
        dailypicClicked(); 
    });
    $("[id='btn_okclosepanel']").on('click',function(event) {
        $('#navpanel').panel('close');
       
    });
    $("[id='btn_okclosedfpanel']").on('click',function(event) {
        okclosedfpanelClicked();
        
    });
    $("[id='btn_radar']").on('click',function(event) {
       radarClicked(); 
     });
    $("[id='btn_temp']").on('click',function(event) {
        tempClicked();
    });
    $("[id='btn_hum']").on('click',function(event) {
        humClicked();
    });
    $("[id='btn_home']").on('click',function(event) {
        homeClicked()();
    });
    
     
   $('#02wsframe').load(function(){
        console.log('frame has (re)loaded: ' + this);
        var allAsBlank = $('#02wsframe').contents().find("a[target=_blank]");
        allAsBlank.on("click",function(e){           
            e.preventDefault();           
            var url = this.href;           
            window.open(url,"_system");       
        });
        var allAsTop = $('#02wsframe').contents().find("a[target=_top]");
        allAsTop.on("click",function(e){           
            e.preventDefault();           
            var url = this.href;           
            window.open(url,"_system");       
        });
        var allAsExternal = $('#02wsframe').contents().find("a[rel=external]");
        allAsExternal.on("click",function(e){           
            e.preventDefault();           
            var url = this.href;           
            window.open(url,"_system");       
        });
        console.log('02wsframe has (re)loaded ');
        
    });
    $('img').each(function(i, el) {
        $(el).attr('src', $(el).attr('src')+'?pizza='+(new Date()).getTime());
    });
    const {HijackWebviewLinkClick} = window.cordova.plugins;
 
    HijackWebviewLinkClick.listen((url) => {
        //log(url);
        if (url.includes("opensettings"))
            navlinkCLicked();
        else if (url.includes("googleads"))
            window.open(url, '_system');
        else 
            console.log(url);
    });
    //handleExternalURLs();
    //openAllLinksWithBlankTargetInSystemBrowser();
    
});

