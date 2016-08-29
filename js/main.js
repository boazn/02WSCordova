var pushNotification;
var pictureSource;   // picture source
var destinationType;
var imageData;
var imageURI;// sets the format of returned value
var x;
var y;
var retries = 0;
var viewport;
var app = {
        // Application Constructor
    initialize: function() {
        app.bindEvents();
        var self = this;
        app.startup();
     },
    startup:function(){
        
        var lang = window.localStorage.getItem("lang");
        if (lang == undefined)
        {
            lang = 1;
            this.saveLang(lang);
            
        } 
       $('[name="radio-choice-lang"][value="' + lang + '"]').prop('checked',true); 
        //ini notifications
        var isToNotify = window.localStorage.getItem("notify");
        if ((isToNotify == "null")||(isToNotify == undefined))
        {
            isToNotify = true;
        }
        if (isToNotify)
        $('#checkbox_notifications').attr('checked', isToNotify);
        //ini shortnotifications
        var isToShortNotify = window.localStorage.getItem("shortnotify");
        if ((isToShortNotify == "null")||(isToShortNotify == undefined)){isToShortNotify = true;};
        window.localStorage.setItem("shortnotify", isToShortNotify);
        if (isToShortNotify === "true")
        $('#checkbox_shortnotifications').attr('checked', isToShortNotify);
        
        //ini tipsnotifications
        var isToTipsNotify = window.localStorage.getItem("tipsnotify");
        if ((isToTipsNotify == "null")||(isToTipsNotify == undefined)){isToTipsNotify = true;};
        window.localStorage.setItem("tipsnotify", isToTipsNotify);
        if (isToTipsNotify === "true")
        $('#checkbox_tipsnotifications').attr('checked', isToTipsNotify);
        
        //ini cloth
        var iscloth = window.localStorage.getItem("cloth");
        if ((iscloth == "null")||(iscloth == undefined)) {iscloth = true;};
        window.localStorage.setItem("cloth", iscloth);
        if (iscloth === "true")
            $('#checkbox_cloth').attr('checked', 'checked');
        
        //ini fulltext
        var isfulltext = window.localStorage.getItem("fulltext");
        if ((isfulltext == "null")||(isfulltext == undefined)){isfulltext = false;};
        window.localStorage.setItem("fulltext", isfulltext);
        if (isfulltext === "true")
            $('#checkbox_fulltext').attr('checked', 'checked');
        
        //ini sound
        var issound = window.localStorage.getItem("sound");
        if ((issound == "null")||(issound == undefined)){issound = true;};
        window.localStorage.setItem("sound", issound);
        if (issound === "true")
            $('#checkbox_sound').attr('checked', 'checked');
        console.log("startup finished");
        onLanguageChoose(lang, window.localStorage.getItem("cloth")=== "true", window.localStorage.getItem("fulltext")=== "true", window.localStorage.getItem("sound")=== "true");
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
             window.localStorage.getItem("sound");
             onLanguageChoose(window.localStorage.getItem("lang"), window.localStorage.getItem("cloth")=== "true", window.localStorage.getItem("fulltext")=== "true", window.localStorage.getItem("sound")=== "true");
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
          }, 3000);
        
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        pushNotification = window.plugins.pushNotification;
        //console.log('file plugin: ' + cordova.file.applicationDirectory);
        var token = window.localStorage.getItem("token");
        console.log("token from storage:" + token);
        setTimeout(function() {
	 alert("token from storage:" + token);
	}, 0);
        if (token == undefined)
        {
            try {
                registerDevice();
            
            }
            catch (e)
            {
                console.log("register device:" + e);
            }
        }else{
            
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
        window.localStorage.setItem("lang", lang);
    }
    ,
    saveIsToNotify:function(longNotify, shortNotify, tipsNotify){
        window.localStorage.setItem("notify", longNotify);
        window.localStorage.setItem("shortnotify", shortNotify);
        window.localStorage.setItem("tipsnotify", tipsNotify);
        var token = window.localStorage.getItem("token");
        
        if (token == undefined)
        {
            console.log(" saveIsToNotify: token undefined");
            //registerDevice();
       }
        else
        {
            alert(" posting:" + token + " " + longNotify + " " + shortNotify + " " + tipsNotify);
            postNewTokenToServer(token, longNotify === "true", shortNotify=== "true", tipsNotify=== "true");
            
        }
        
    }
};


function registerDevice()
{
    console.log('registering ' + device.platform);
        try
        {
        if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
            pushNotification.register(
            regsuccessHandler,
            errorHandler,
            {
                "senderID":"761995000479",
                "ecb":"onNotificationGCM"
            });
        } else if ( device.platform == 'blackberry10'){
            pushNotification.register(
            regsuccessHandler,
            errorHandler,
            {
                invokeTargetId : "replace_with_invoke_target_id",
                appId: "replace_with_app_id",
                ppgUrl:"replace_with_ppg_url", //remove for BES pushes
                ecb: "pushNotificationHandler",
                simChangeCallback: replace_with_simChange_callback,
                pushTransportReadyCallback: replace_with_pushTransportReady_callback,
                launchApplicationOnPush: true
            });
        } else {
            pushNotification.register(
            tokenHandler,
            errorHandler,
            {
                "badge":"true",
                "sound":"true",
                "alert":"true",
                "ecb":"onNotificationAPN"
            });
        }
        }
        catch (e){
            console.log('error registering: ' + e);
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
        setTimeout(function() {
	 //alert(result);
	}, 0);
      
   	var thisResult = JSON.parse(result);
   	var metadata = JSON.parse(thisResult.json_metadata);
	//navigator.notification.alert('Lat: '+metadata.GPS.Latitude+' Lon: '+metadata.GPS.Longitude);
	y = metadata.GPS.Latitude;
	x = metadata.GPS.Longitude
        var largeImage = document.getElementById('largeImage');
        largeImage.style.display = 'block';
        largeImage.src = thisResult.filename;
        imageURI = thisResult.filename;
        $('#campanel').panel('close');
      	$('#imagepreviewContainer').show();
        
    
    }

    function clearCache() {
        navigator.camera.cleanup();
    }
    // A button will call this function
    //
    function capturePhotoEdit() {
     clearCache();
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 60, allowEdit: true,
        destinationType: destinationType.FILE_URI,saveToPhotoAlbum:true });
    }

    // A button will call this function
    //
    function getPhoto(source) {
     clearCache();
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 60,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
        setTimeout(function() {
            alert('Image not taken because: ' + message);
        }, 0);
     
    }
function postNewTokenToServer(token, islongactive, isshortactive, istipsactive)
{
    
    $.ajax({
              
        url:'http://www.02ws.co.il/apn_register.php',
        type:'POST',
        data:{name:device.model, email:device.uuid, regId: token, lang: window.localStorage.getItem("lang"), active:(islongactive ? 1 : 0), active_rain_etc:(isshortactive ? 1 : 0), active_tips:(istipsactive ? 1 : 0)},
        crossDomain:true,
        success: function(data){
        console.log('device sent token successfully');
        }
       });
          
}
function sendPic(){
        
        postNewPictureToServer(imageURI, $('#nameonpic').val(), $('#commentonpic').val(), x, y);
        $('#imagepreviewContainer').hide();
}
function postNewPictureToServer(fileURI, nameOnPic, comments, x, y)
{
   var win = function (r) {
        clearCache();
        retries = 0;
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        navigator.notification.alert(currentLocale.sentsuccess);
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
    //navigator.notification.alert("postNewPictureToServer: "+fileURI);
    var options = new FileUploadOptions();
    options.fileKey = "pic";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = false;
    options.headers = {
    Connection: "close"
    };
    options.params = {name:nameOnPic, comment:comments, x:x, y:y, picname:options.fileName}; // if we need to send parameters to the server request
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://www.02ws.co.il/user_picture_reciever.php"), win, fail, options);
          
}
function tokenHandler(result)
{
    console.log('device token = ' + result);
    window.localStorage.setItem("token", result);
    setTimeout(function() {
	  navigator.notification.alert('device token from registration = ' + result);
	}, 0);
    postNewTokenToServer(result, window.localStorage.getItem("notify")=== "true", window.localStorage.getItem("shortnotify")=== "true", window.localStorage.getItem("tipsnotify")=== "true");
 }   
function errorHandler(error)
{
    console.log('error in registering: ' + error);
}
function regsuccessHandler (result) {
    console.log('registration = ' + result);
    
}
function onRefresh()
{
    document.getElementById('02wsframe').src = document.getElementById('02wsframe').src;
}
function onShareClick()
{
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
      message: currentLocale.sharemessage, // not supported on some apps (Facebook, Instagram)
      subject: currentLocale.sharesubject, // fi. for email
      files: ['http://www.02ws.co.il/02ws_short.png'], // an array of filenames either locally or remotely
      url: 'https://itunes.apple.com/us/app/yrwsmyym/id925504632?mt=8',
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    }
    window.plugins.socialsharing.shareWithOptions(options, onShareSuccess, onShareError);
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
        window.localStorage.setItem("cloth", iscloth);
        window.localStorage.setItem("fulltext", isfulltext);
        window.localStorage.setItem("sound", issound);
        console.log("onLanguageChoose:" + iscloth + isfulltext + issound); 
        var url = "http://www.02ws.co.il/small.php?lang=" + value + "&c=" + (iscloth == true ? 1 : 0) + "&fullt=" + (isfulltext == true ? 1 : 0)  + "&s=" + (issound == true ? 1 : 0);
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


var onShareSuccess = function(result) {
  console.log("Share completed? " + result.completed); 
  console.log("Shared to app: " + result.app); 
}

var onShareError = function(msg) {
  console.log("Sharing failed with message: " + msg);
}


function successIconBadgeNumberHandler(){
   console.log("successIconBadgeNumber"); 
}
// iOS
function onNotificationAPN (event) {
      
    
    try {
        if ( event.alert )
    {
        navigator.notification.console.log(event.alert);
    }

    if ( event.sound )
    {
        var snd = new Media(event.sound);
        snd.play();
    }

    if ( event.badge )
    {
        pushNotification.setApplicationIconBadgeNumber(successIconBadgeNumberHandler, errorHandler, event.badge);
    }
    }
    catch (e) {
        console.log(e);
    }
     if (event.EmbeddedUrl)
     {
         window.localStorage.setItem("url", event.EmbeddedUrl);
     }
     
    
}
// android
function onNotificationGCM (e) {
     switch( e.event )
    {
    case 'registered':
        if ( e.regid.length > 0 )
        {
            
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
            console.log("regID = " + e.regid);
            window.localStorage.setItem("token", e.regid);
            postNewTokenToServer(e.regid, window.localStorage.getItem("notify")=== "true", window.localStorage.getItem("shortnotify")=== "true", window.localStorage.getItem("tipsnotify")=== "true");
        }
    break;

    case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if ( e.foreground )
        {
            

            // on Android soundname is outside the payload.
            // On Amazon FireOS all custom attributes are contained within payload
            var soundfile = e.soundname || e.payload.sound;
            // if the notification contains a soundname, play it.
            var my_media = new Media("/android_asset/www/"+ soundfile);
            my_media.play();
        }
        else
        {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {
                console.log('--COLDSTART NOTIFICATION--' + '');
            }
            else
            {
                console.log('--BACKGROUND NOTIFICATION--' + '');
            }
        }

       console.log('MESSAGE -> MSG: ' + e.payload.message + '');
           //Only works for GCM
       console.log('MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '');
       //Only works on Amazon Fire OS
       console.log('MESSAGE -> TIME: ' + e.payload.timeStamp + '');
    break;

    case 'error':
        console.log('ERROR -> MSG:' + e.msg + '');
    break;

    default:
        console.log('EVENT -> Unknown, an event was received and we do not know what it is');
    break;
  }
}
function handleExternalURLs() {

    $(document).on('click', 'a[href^="http"]', function (e) {
        var url = $(this).attr('href');
        window.open(url, '_system');
        e.preventDefault();
    });
    
    
    
    
}
function setView(width){
    viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', 'user-scalable=no,initial-scale=1,width=' + width);
}
function openAllLinksWithBlankTargetInSystemBrowser() {
    if ( typeof cordova === "undefined" || !cordova.InAppBrowser ) {
        throw new Error("You are trying to run this code for a non-cordova project, " +
                "or did not install the cordova InAppBrowser plugin");
    }

    // Currently (for retrocompatibility reasons) the plugin automagically wrap window.open
    // We don't want the plugin to always be run: we want to call it explicitly when needed
    // See https://issues.apache.org/jira/browse/CB-9573
    delete window.open; // scary, but it just sets back to the default window.open behavior
    var windowOpen = window.open; // Yes it is not deleted !

    // Note it does not take a target!
    var systemOpen = function(url, options) {
        // Do not use window.open becaus the InAppBrowser open will not proxy window.open
        // in the future versions of the plugin (see doc) so it is safer to call InAppBrowser.open directly
        cordova.InAppBrowser.open(url,"_system",options);
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
        systemOpen($(this).attr('href'));
    });
}
$(document).ready(function() {
    $("[name='radio-choice-lang']").on('change mousedown',function(event) { 
        onLanguageChoose(this.value, window.localStorage.getItem("cloth")=== "true" , window.localStorage.getItem("fulltext")=== "true", window.localStorage.getItem("sound")=== "true");
    });
    
    
    $('#checkbox_notifications').on('change', function() {
        
        onNotificationsCheck($(this).is(':checked'), $("[name='checkbox_shortnotifications']").is(":checked"), $("[name='checkbox_tipsnotifications']").is(":checked"));
    }); 
    $('#checkbox_shortnotifications').on('change', function() {
        
        onNotificationsCheck($("[name='checkbox_notifications']").is(":checked"), $(this).is(':checked'), $("[name='checkbox_tipsnotifications']").is(":checked"));
    }); 
     $('#checkbox_tipsnotifications').on('change', function() { 
         
        onNotificationsCheck($("[name='checkbox_notifications']").is(":checked"), $("[name='checkbox_shortnotifications']").is(":checked"), $(this).is(':checked'));
    }); 
    $("[name='checkbox_cloth']").on('change', function() { 
        onLanguageChoose(window.localStorage.getItem("lang"), $(this).is(':checked'), window.localStorage.getItem("fulltext")=== "true", window.localStorage.getItem("sound")=== "true");
    });
    $("[name='checkbox_fulltext']").on('change', function() { 
        onLanguageChoose(window.localStorage.getItem("lang"), window.localStorage.getItem("cloth")=== "true", $(this).is(':checked'), window.localStorage.getItem("sound")=== "true");
    });
    $("[name='checkbox_sound']").on('change', function() { 
        onLanguageChoose(window.localStorage.getItem("lang"), window.localStorage.getItem("cloth")=== "true", window.localStorage.getItem("fulltext")=== "true", $(this).is(':checked'));
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
    $("[id='btn_okclosepanel']").on('click',function(event) {
        $('#navpanel').panel('close');
       
    });
    $("[id='btn_radar']").on('click',function(event) {
        lang = window.localStorage.getItem("lang");
        iscloth = window.localStorage.getItem("cloth");
        isfulltext = window.localStorage.getItem("fulltext");
        issound = window.localStorage.getItem("sound");
         var url = "http://www.02ws.co.il/small.php?section=radar.php&lang=" + lang + "&c=" + (iscloth == "true" ? 1 : 0) + "&fullt=" + (isfulltext == "true" ? 1 : 0)  + "&s=" + (issound == "true" ? 1 : 0); ;
        $('#02wsframe').attr('src', url);
        setView(570);
        $('#navlinkpanel').panel('close');
        
       
    });
    $("[id='btn_temp']").on('click',function(event) {
        lang = window.localStorage.getItem("lang");
        iscloth = window.localStorage.getItem("cloth");
        isfulltext = window.localStorage.getItem("fulltext");
        issound = window.localStorage.getItem("sound");
         var url = "http://www.02ws.co.il/small.php?section=graph.php&graph=temp2.php&profile=1&lang=" + lang + "&c=" + (iscloth == "true" ? 1 : 0) + "&fullt=" + (isfulltext == "true" ? 1 : 0)  + "&s=" + (issound == "true" ? 1 : 0); ;
        $('#02wsframe').attr('src', url);
        setView(560);
        $('#navlinkpanel').panel('close');
        
       
    });
    $("[id='btn_hum']").on('click',function(event) {
        setView(560);
        lang = window.localStorage.getItem("lang");
        iscloth = window.localStorage.getItem("cloth");
        isfulltext = window.localStorage.getItem("fulltext");
        issound = window.localStorage.getItem("sound");
         var url = "http://www.02ws.co.il/small.php?section=graph.php&graph=humwind.php&profile=1&lang=" + lang + "&c=" + (iscloth == "true" ? 1 : 0) + "&fullt=" + (isfulltext == "true" ? 1 : 0)  + "&s=" + (issound == "true" ? 1 : 0); ;
        $('#02wsframe').attr('src', url);
        $('#navlinkpanel').panel('close');
        
       
    });
    $("[id='btn_home']").on('click',function(event) {
        lang = window.localStorage.getItem("lang");
        iscloth = window.localStorage.getItem("cloth");
        isfulltext = window.localStorage.getItem("fulltext");
        issound = window.localStorage.getItem("sound");
        onLanguageChoose(lang, iscloth, isfulltext, issound);
        $('#navlinkpanel').panel('close');
        
    });   
    $('#02wsframe').load(function(){
        //alert('frame has (re)loaded: ' + this.contentWindow.location);
        console.log('02wsframe has (re)loaded ');
    });
    $('img').each(function(i, el) {
        $(el).attr('src', $(el).attr('src')+'?pizza='+(new Date()).getTime());
    });
    bindStrings();
    //handleExternalURLs();
    //openAllLinksWithBlankTargetInSystemBrowser();
});

