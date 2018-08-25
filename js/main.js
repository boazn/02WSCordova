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
var app = {
        // Application Constructor
    initialize: function() {
        app.bindEvents();
        var self = this;
        app.startup();
     },
    startup:function(){
        
        var lang = window.localStorage.getItem(LOC_LANG);
        if (lang == null ){lang = 1;}
        var tempunits = window.localStorage.getItem("tempunits");
        if ((tempunits == null)||(tempunits == undefined)) {tempunits = '°C'; window.localStorage.setItem("tempunits", tempunits);}
       //ini notifications
        var isToNotify = window.localStorage.getItem(LOC_NOTIFICATIONS);
        if ((isToNotify == null)||(isToNotify == undefined))
        {
            isToNotify = true;
        }
        //alert(window.localStorage.getItem(LOC_CLOTH)+' '+window.localStorage.getItem(LOC_FULLTEXT)+' '+window.localStorage.getItem(LOC_SOUND));
        
        //ini shortnotifications
        var isToShortNotify = window.localStorage.getItem(LOC_SHORT_NOTIFICATIONS);
        if ((isToShortNotify == null)||(isToShortNotify == undefined)){isToShortNotify = true;};
        window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, isToShortNotify);
        var isToShortNotifymonthly = window.localStorage.getItem(SUB_SHORTTERM_MONTHLY);
        if ((isToShortNotifymonthly == null)||(isToShortNotifymonthly == undefined)){isToShortNotifymonthly = true;};
        window.localStorage.setItem(SUB_SHORTTERM_MONTHLY, isToShortNotifymonthly);
        var isToShortNotifyyearly = window.localStorage.getItem(SUB_SHORTTERM_YEARLY);
        if ((isToShortNotifyyearly == null)||(isToShortNotifyyearly == undefined)){isToShortNotifyyearly = true;};
        window.localStorage.setItem(SUB_SHORTTERM_YEARLY, isToShortNotifyyearly);
        //ini tipsnotifications
        var isToTipsNotify = window.localStorage.getItem(LOC_TIPS_NOTIFICATIONS);
        if ((isToTipsNotify == null)||(isToTipsNotify == undefined)){isToTipsNotify = true;};
        window.localStorage.setItem(LOC_TIPS_NOTIFICATIONS, isToTipsNotify);
         //ini cloth
        var iscloth = window.localStorage.getItem(LOC_CLOTH);
        if ((iscloth == null)||(iscloth == undefined)) {iscloth = true;};
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
        console.log("startup finished");
        //alert(window.localStorage.getItem(LOC_CLOTH)+' '+window.localStorage.getItem(LOC_FULLTEXT)+' '+window.localStorage.getItem(LOC_SOUND));
        onLanguageChoose(lang, window.localStorage.getItem(LOC_CLOTH)=== "true", window.localStorage.getItem(LOC_FULLTEXT)=== "true", window.localStorage.getItem(LOC_SOUND)=== "true");
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
          }, 2500);
        
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        //console.log('file plugin: ' + cordova.file.applicationDirectory);
        bindStrings();
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
        log('updateUserParams:' + ' isToNotify:' + isToNotify+' isToShortNotify:' + isToShortNotify+ ' isToTipsNotify:' + isToTipsNotify +  ' isdailyforecast:' + isdailyforecast+ ' dailyforecasthour:' + dailyforecasthour);
        postNewTokenToServer(token, isToNotify, isToShortNotify, isToTipsNotify, isdailyforecast, dailyforecasthour);
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

    if (!window.store) {
        log('Store not available');
        return;
    }

    app.platform = device.platform.toLowerCase();
    //document.getElementsByTagName('body')[0].className = app.platform;

    // Enable maximum logging level
    store.verbosity = store.DEBUG;

    // Enable remote receipt validation
    store.validator = "https://api.fovea.cc:1982/check-purchase";

    // Inform the store of your products
    log('registerProducts');
    

    store.register({
        id:    SUB_SHORTTERM_MONTHLY, // id without package name!
        alias: SUB_SHORTTERM_MONTHLY,
        type:  store.PAID_SUBSCRIPTION
    });

    store.register({
        id:    SUB_SHORTTERM_YEARLY, 
        alias: SUB_SHORTTERM_YEARLY,
        type:  store.PAID_SUBSCRIPTION
    });

    store.register({
        id:    SUB_ADFREE_MONTHLY, 
        alias: SUB_ADFREE_MONTHLY,
        type:  store.PAID_SUBSCRIPTION
    });

    store.register({
        id:    SUB_ADFREE_YEARLY, 
        alias: SUB_ADFREE_YEARLY,
        type:  store.PAID_SUBSCRIPTION
    });

    store.register({
        id:    SUB_DAILYFORECAST_MONTHLY, 
        alias: SUB_DAILYFORECAST_MONTHLY,
        type:  store.PAID_SUBSCRIPTION
    });

    store.register({
        id:    SUB_DAILYFORECAST_YEARLYY, 
        alias: SUB_DAILYFORECAST_YEARLYY,
        type:  store.PAID_SUBSCRIPTION
    });
   
    // When any product gets updated, refresh the HTML.
    store.when("product").updated(function (p) {
        //app.renderIAP(p);
    });

    store.when(SUB_SHORTTERM_MONTHLY).approved(function(p) {
        log("verify subscription");
        p.verify();
    });
    store.when(SUB_SHORTTERM_MONTHLY).verified(function(p) {
        log("subscription verified");
        p.finish();
        window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, true);
        window.localStorage.setItem(LOC_APPROVED, true);
        app.updateUserParams();
    });
    store.when(SUB_SHORTTERM_MONTHLY).unverified(function(p) {
        log("subscription unverified");
    });
    store.when(SUB_SHORTTERM_MONTHLY).updated(function(p) {
        if (p.owned) {
            window.localStorage.setItem(SUB_SHORTTERM_MONTHLY, true);
            window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, true);
            window.localStorage.setItem(LOC_APPROVED, true);
            app.updateUserParams();
            app.showAlert('You are a lucky ' + SUB_SHORTTERM_MONTHLY + ' subscriber!');
        }
        else {
            window.localStorage.setItem(SUB_SHORTTERM_MONTHLY, false);
            window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, false);
            window.localStorage.setItem(LOC_APPROVED, false);
            app.updateUserParams();
            app.showAlert('You are not subscribed');
        }
    });

    store.when(SUB_SHORTTERM_YEARLY).approved(function(p) {
        log(SUB_SHORTTERM_YEARLY + ": verify subscription");
        p.verify();
    });
    store.when(SUB_SHORTTERM_YEARLY).verified(function(p) {
        log(SUB_SHORTTERM_YEARLY + ": subscription verified");
        p.finish();
        window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, true);
        window.localStorage.setItem(LOC_APPROVED, true);
        app.updateUserParams();
    });
    store.when(SUB_SHORTTERM_YEARLY).unverified(function(p) {
        log(SUB_SHORTTERM_YEARLY + ": subscription unverified");
    });
    store.when(SUB_SHORTTERM_YEARLY).updated(function(p) {
        if (p.owned) {
            window.localStorage.setItem(SUB_SHORTTERM_YEARLY, true);
            window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, isShortTermSubscribed());
            window.localStorage.setItem(LOC_APPROVED, true);
            app.updateUserParams();
            app.showAlert('You are a lucky ' + SUB_SHORTTERM_YEARLY + ' subscriber!');
        }
        else {
            window.localStorage.setItem(SUB_SHORTTERM_YEARLY, false);
            window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, isShortTermSubscribed());
            window.localStorage.setItem(LOC_APPROVED, false);
            app.updateUserParams();
            app.showAlert('You are not subscribed');
        }
    });

    store.when(SUB_ADFREE_MONTHLY).approved(function(p) {
        log(SUB_ADFREE_MONTHLY + ": verify subscription");
        p.verify();
    });
    store.when(SUB_ADFREE_MONTHLY).verified(function(p) {
        log(SUB_ADFREE_MONTHLY + ": subscription verified");
        p.finish();
        window.localStorage.setItem(LOC_ADFREE, true);
        putCode(1);
    });
    store.when(SUB_ADFREE_MONTHLY).unverified(function(p) {
        log(SUB_ADFREE_MONTHLY + ": subscription unverified");
    });
    store.when(SUB_ADFREE_MONTHLY).updated(function(p) {
        if (p.owned) {
            window.localStorage.setItem(SUB_ADFREE_MONTHLY, true);
            window.localStorage.setItem(LOC_ADFREE, isAdFreeSubscribed());
            putCode(1);
            app.showAlert('You are a lucky ' + SUB_ADFREE_MONTHLY + ' subscriber!');
        }
        else {
            window.localStorage.setItem(SUB_ADFREE_MONTHLY, false);
            window.localStorage.setItem(LOC_ADFREE, isAdFreeSubscribed());
            putCode(0);
            app.showAlert('You are not subscribed');
        }
    });

    store.when(SUB_ADFREE_YEARLY).approved(function(p) {
        log(SUB_ADFREE_YEARLY + ": verify subscription");
        p.verify();
    });
    store.when(SUB_ADFREE_YEARLY).verified(function(p) {
        log(SUB_ADFREE_YEARLY + ": subscription verified");
        p.finish();
        window.localStorage.setItem(LOC_ADFREE, true);
        putCode(1);
    });
    store.when(SUB_ADFREE_YEARLY).unverified(function(p) {
        log(SUB_ADFREE_YEARLY + ": subscription unverified");
    });
    store.when(SUB_ADFREE_YEARLY).updated(function(p) {
        if (p.owned) {
            window.localStorage.setItem(SUB_ADFREE_YEARLY, true);
            window.localStorage.setItem(LOC_ADFREE, isAdFreeSubscribed());
            putCode(1);
            app.showAlert('You are a lucky ' + SUB_ADFREE_YEARLY + ' subscriber!');
        }
        else {
            window.localStorage.setItem(SUB_ADFREE_YEARLY, false);
            window.localStorage.setItem(LOC_ADFREE, isAdFreeSubscribed());
            putCode(0);
            app.showAlert('You are not subscribed');
        }
    });

    store.when(SUB_DAILYFORECAST_MONTHLY).approved(function(p) {
        log(SUB_DAILYFORECAST_MONTHLY + ": verify subscription");
        p.verify();
    });
    store.when(SUB_DAILYFORECAST_MONTHLY).verified(function(p) {
        log(SUB_DAILYFORECAST_MONTHLY + ": subscription verified");
        p.finish();
        window.localStorage.setItem(LOC_DAILYFORECAST, true);
        app.updateUserParams();
    });
    store.when(SUB_DAILYFORECAST_MONTHLY).unverified(function(p) {
        log(SUB_DAILYFORECAST_MONTHLY + ": subscription unverified");
    });
    store.when(SUB_DAILYFORECAST_MONTHLY).updated(function(p) {
        if (p.owned) {
            window.localStorage.setItem(SUB_DAILYFORECAST_MONTHLY, true);
            window.localStorage.setItem(LOC_DAILYFORECAST, isDFSubscribed());
            app.updateUserParams();
            app.showAlert('You are a lucky ' + SUB_DAILYFORECAST_MONTHLY + ' subscriber!');
        }
        else {
            window.localStorage.setItem(SUB_DAILYFORECAST_MONTHLY, false);
            window.localStorage.setItem(LOC_DAILYFORECAST, isDFSubscribed());
            app.updateUserParams();
            app.showAlert('You are not subscribed');
        }
    });

    store.when(SUB_DAILYFORECAST_YEARLY).approved(function(p) {
        log(SUB_DAILYFORECAST_YEARLY + ": verify subscription");
        p.verify();
    });
    store.when(SUB_DAILYFORECAST_YEARLY).verified(function(p) {
        log(SUB_DAILYFORECAST_YEARLY + ": subscription verified");
        p.finish();
        window.localStorage.setItem(LOC_DAILYFORECAST, true);
        app.updateUserParams();
    });
    store.when(SUB_DAILYFORECAST_YEARLY).unverified(function(p) {
        log(SUB_DAILYFORECAST_YEARLY + ": subscription unverified");
    });
    store.when(SUB_DAILYFORECAST_YEARLY).updated(function(p) {
        if (p.owned) {
            window.localStorage.setItem(SUB_DAILYFORECAST_YEARLY, true);
            window.localStorage.setItem(LOC_DAILYFORECAST, isDFSubscribed());
            app.updateUserParams();
            app.showAlert('You are a lucky ' + SUB_DAILYFORECAST_YEARLY + ' subscriber!');
        }
        else {
            window.localStorage.setItem(SUB_DAILYFORECAST_YEARLY, false);
            window.localStorage.setItem(LOC_DAILYFORECAST, isDFSubscribed());
            app.updateUserParams();
            app.showAlert('You are not ' + SUB_DAILYFORECAST_YEARLY + ' subscribed');
        }
    });


    // Log all errors
    store.error(function(error) {
        log('ERROR ' + error.code + ': ' + error.message);
    });
  
    // When the store is ready (i.e. all products are loaded and in their "final"
    // state), we hide the "loading" indicator.
    //
    // Note that the "ready" function will be called immediately if the store
    // is already ready.
    
    // When store is ready, activate the "refresh" button;
    store.ready(function() {
        var el = document.getElementById('refresh-button');
        if (el) {
            el.style.display = 'block';
            el.onclick = function(ev) {
                store.refresh();
            };
        }
        if (store.get(SUB_SHORTTERM_MONTHLY).owned) {
            // access the awesome feature
        }
        else {
            // display an alert
        }
        
    });
  
    // Refresh the store.
    //
    // This will contact the server to check all registered products
    // validity and ownership status.
    //
    // It's fine to do this only at application startup, as it could be
    // pretty expensive.
    log('store refresh ');
    store.refresh();
    log('store refresh DONE');
    },
    renderIAP:function(p) {

        var parts = p.id.split(".");
        var elId = parts[parts.length-1];
    
        var el = document.getElementById(elId + '-purchase');
        if (!el) return;
    
        if (!p.loaded) {
            el.innerHTML = '<h3>...</h3>';
        }
        else if (!p.valid) {
            el.innerHTML = '<h3>' + p.alias + ' Invalid</h3>';
        }
        else if (p.valid) {
            var html = "<h3>" + p.title + "</h3>" + "<p>" + p.description + "</p>";
            if (p.canPurchase) {
                html += "<div class='button' id='buy-" + p.id + "' productId='" + p.id + "' type='button'>" + p.price + "</div>";
            }
            el.innerHTML = html;
            if (p.canPurchase) {
                document.getElementById("buy-" + p.id).onclick = function (event) {
                    var pid = this.getAttribute("productId");
                    store.order(pid);
                };
            }
        }
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
                //navigator.notification.alert(data.title);
                //navigator.notification.alert(data.message);
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
              
        url:'http://www.02ws.co.il/apn_register.php',
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
    
    $.ajax({
              
        url:'http://www.02ws.co.il/subscription_reciever.php',
        type:'POST',
        data:{email:p_email, status:p_status, regId: token, action:'storeSub'},
        crossDomain:true,
        success: function(data){
        console.log('AdFreeCode sent token successfully: ' + data);
        }
       });
          
}
function putCode(status){
    
    var token = window.localStorage.getItem(LOC_TOKEN);
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
    
    if( $('#navpanel').hasClass("ui-panel-open") == true ){
         $('#navpanel').panel('close');
        }
    var dailyforecasthour = window.localStorage.getItem(LOC_DAILYFORECAST_HOUR); 
    if ((dailyforecasthour == null)||(dailyforecasthour == undefined)){dailyforecasthour = 7;};
    log('set forecasthour radio to ' + dailyforecasthour);
    $('[name="radio-choice-df"][value=' + dailyforecasthour + ']').prop('checked',true); 
    $('#dailyforecastpanel').show();
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
    ft.upload(fileURI, encodeURI("http://www.02ws.co.il/user_picture_reciever.php"), win, fail, options);
    navigator.notification.alert(currentLocale.sentsuccess);          
}
function tokenHandler(result)
{
    //alert('device token from registration= ' + result);
    var token = window.localStorage.getItem(LOC_TOKEN);
    var isdailyforecast = window.localStorage.getItem(LOC_DAILYFORECAST);
    var dailyforecasthour = window.localStorage.getItem(LOC_DAILYFORECAST_HOUR);
    if (token != result){
        window.localStorage.setItem(LOC_TOKEN, result);
        postNewTokenToServer(result, true, false, true, isdailyforecast, dailyforecasthour);
    }
 }   
function errorHandler(error)
{
    //alert('error in registering: ' + error);
}
function regsuccessHandler (result) {
    console.log('registration = ' + result);
    
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
        var url = "http://www.02ws.co.il/small.php?lang=" + lang + "&section=SendEmailForm.php&data="+data;
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
      files: ['http://www.02ws.co.il/02ws_short.png'], // an array of filenames either locally or remotely
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
        console.log("onLanguageChoose:" + iscloth + isfulltext + issound);
        //alert(value+' '+iscloth+' '+isfulltext+' '+issound+' '+tempunits);
        var url = "http://www.02ws.co.il/small.php?lang=" + value + "&c=" + (iscloth == true ? 1 : 0) + "&fullt=" + (isfulltext == true ? 1 : 0)  + "&s=" + (issound == true ? 1 : 0)+ "&tempunit=" + tempunits + (active_sub != "" ? "&reg_id=" + token : ''); 
        console.log(url);    
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
    navClicked("http://www.02ws.co.il/small.php?section=" + section + "&lang=", 320);
         
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
    //console.log(msg);
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
    var url = baseurl + lang + "&c=" + (iscloth == "true" ? 1 : 0) + "&fullt=" + (isfulltext == "true" ? 1 : 0)  + "&s=" + (issound == "true" ? 1 : 0) + (active_sub != "" ? "&reg_id=" + token : ''); ;
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
}
function adfreeYearlyClicked(checked){
    
}
function adfreeMonthyClicked(checked){
    
}
function shorttermYearlyClicked(checked){
    
}
function shorttermMonthlyClicked(checked){
   
}
function okcloseadfreeClicked(){
    log('okcloseadfreeClicked: checkbox_AdFree_monthly=' + $('#checkbox_AdFree_monthly').is(':checked') + ' checkbox_AdFree_yearly='+$('#checkbox_AdFree_yearly').is(':checked'));
    if ($('#checkbox_AdFree_monthly').is(':checked'))
        store.order(SUB_ADFREE_MONTHLY);
    if ($('#checkbox_AdFree_yearly').is(':checked'))
        store.order(SUB_ADFREE_YEARLY);
    $('#AdFreeContainer').hide();
    $('#navpanel').panel('close');
}
function okcloseshorttermClicked(){
    log('okcloseshorttermClicked: checkbox_shortterm_monthly=' + $('#checkbox_shortterm_monthly').is(':checked') + ' checkbox_shortterm_yearly='+$('#checkbox_shortterm_yearly').is(':checked'));
    if ($('#checkbox_shortterm_monthly').is(':checked'))
        store.order(SUB_SHORTTERM_MONTHLY);
    if ($('#checkbox_shortterm_yearly').is(':checked'))
        store.order(SUB_SHORTTERM_YEARLY);
    if (!$('#checkbox_shortterm_combined').is(':checked')){
        window.localStorage.setItem(LOC_SHORT_NOTIFICATIONS, false);
        apps.updateUserParams();
    }
       
    $('#shorttermpanel').hide();
    $('#navpanel').panel('close');
}

function okclosedfpanelClicked(){
    log('okclosedfpanelClicked: checkbox_dailyforecast_monthly=' + $('#checkbox_dailyforecast_monthly').is(':checked') + ' checkbox_dailyforecast_yearly='+$('#checkbox_dailyforecast_yearly').is(':checked'));
    try{
        if ($('#checkbox_dailyforecast_monthly').is(':checked'))
        store.order(SUB_DAILYFORECAST_MONTHLY);
        if ($('#checkbox_dailyforecast_yearly').is(':checked'))
            store.order(SUB_DAILYFORECAST_YEARLY);
        $('#dailyforecastpanel').hide();
        //$('#navpanel').panel('close');
        
    }
    catch (e){
        log(e);
    }
    
}

function youtubeClicked(){
    navClicked('https://m.youtube.com/channel/UCcFdTuHfckfOsCy7MwbY9vQ', 320);
}
function dailypicClicked(){
    navClicked('http://www.02ws.co.il/small.php?section=picoftheday.php&lang=', 320);
    $('#campanel').panel('close');
}
function radarClicked(){
    navClicked('http://www.02ws.co.il/small.php?section=radar.php&lang=', 570);
}
function userpicsClicked(){
    navClicked('http://www.02ws.co.il/small.php?section=userPics.php&lang=', 320);
}
function contactClicked(){
    navClicked('http://www.02ws.co.il/small.php?section=SendEmailForm.php&lang=', 320);
}
function forumClicked(){
    navClicked('http://www.02ws.co.il/small.php?section=chatmobile.php&lang=', 320);
}
function tempClicked(){
    navClicked('http://www.02ws.co.il/small.php?section=graph.php&graph=temp2.php&profile=1&lang=', 320);
}
function humClicked(){
    navClicked('http://www.02ws.co.il/small.php?section=graph.php&graph=humwind.php&profile=1&lang=', 320);
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
        openAdFreeCon();
    }); 
    $('#checkbox_AdFree_monthly').on('change', function() {
        log('checkbox_AdFree_monthlyClicked');
       if  ($(this).is(':checked'))
            $('#checkbox_AdFree_yearly').prop('checked', false);
        adfreeMonthyClicked($(this).is(':checked'));
    }); 
    $('#checkbox_AdFree_yearly').on('change', function() {
        log('checkbox_AdFree_yearlyClicked');
        if  ($(this).is(':checked'))
            $('#checkbox_AdFree_monthly').prop('checked', false);
        adfreeYearlyClicked($(this).is(':checked'));
    }); 
    $('#checkbox_dailyforecast_monthly').on('change', function() {
        if  ($(this).is(':checked'))
            $('#checkbox_dailyforecast_yearly').prop('checked', false);
        
    }); 
    $('#checkbox_dailyforecast_yearly').on('change', function() {
        log('checkbox_dailyforecast_yearlyClicked');
        if  ($(this).is(':checked'))
            $('#checkbox_dailyforecast_monthly').prop('checked', false);
        
    });

    $('#checkbox_shortterm_monthly').on('change', function() {
        log('checkbox_shortterm_monthlyClicked');
        if  ($(this).is(':checked'))
            $('#checkbox_shortterm_yearly').prop('checked', false);
        shorttermMonthlyClicked($(this).is(':checked'));
    }); 
    $('#checkbox_shortterm_yearly').on('change', function() {
        log('checkbox_shortterm_yearlyClicked');
        if  ($(this).is(':checked'))
            $('#checkbox_shortterm_monthly').prop('checked', false);
        shorttermYearlyClicked($(this).is(':checked'));
    }); 
    $('#checkbox_shortterm_combined').on('change', function() {
        
    });  
    $('#checkbox_dailyforecast').on('change', function() {
        opendailyForecastCon();
    }); 
    $('#checkbox_notifications').on('change', function() {
        
        onNotificationsCheck($(this).is(':checked'), $("[name='checkbox_shortnotifications']").is(":checked"), $("[name='checkbox_tipsnotifications']").is(":checked"));
    }); 
    $('#checkbox_shortnotifications').on('change', function() {
        openShortNotifyCon();
     }); 
     $('#checkbox_tipsnotifications').on('change', function() { 
         
        onNotificationsCheck($("[name='checkbox_notifications']").is(":checked"), $("[name='checkbox_shortnotifications']").is(":checked"), $(this).is(':checked'));
    }); 
    $("[name='checkbox_cloth']").on('change', function() { 
        onLanguageChoose(window.localStorage.getItem(LOC_LANG), $(this).is(':checked'), window.localStorage.getItem(LOC_FULLTEXT)=== "true", window.localStorage.getItem(LOC_SOUND)=== "true");
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
        console.log('frame has (re)loaded: ' + this.contentWindow.location);
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
    //app.initStore();
    //handleExternalURLs();
    //openAllLinksWithBlankTargetInSystemBrowser();
    
});

