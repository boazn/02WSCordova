var pushNotification;
var pictureSource;   // picture source
var destinationType;
var imageData;
var imageURI;// sets the format of returned value
var app = {
        // Application Constructor
    initialize: function() {
        $('#loading').show();
        this.bindEvents();
        var self = this;
        var lang = window.localStorage.getItem("lang");
        if (lang == undefined)
        {
            lang = 1;
            this.saveLang(lang);
            
        }
        $('[name="radio-choice-lang"][value="' + lang + '"]').prop('checked',true); 
        //ini notifications
        var isToNotify = window.localStorage.getItem("notify");
        if (isToNotify == "null")
        {
            isToNotify = true;
            this.saveIsToNotify(true, true, true);
        }
        if (isToNotify)
        $('#checkbox_notifications').attr('checked', isToNotify);
        //ini shortnotifications
        var isToShortNotify = window.localStorage.getItem("shortnotify");
        if (isToShortNotify == "null"){isToShortNotify = true;};
        window.localStorage.setItem("shortnotify", isToShortNotify);
        if (isToShortNotify == "true")
        $('#checkbox_shortnotifications').attr('checked', isToShortNotify);
        
        //ini tipsnotifications
        var isToTipsNotify = window.localStorage.getItem("tipsnotify");
        if (isToTipsNotify == "null"){isToTipsNotify = true;};
        window.localStorage.setItem("tipsnotify", isToTipsNotify);
        if (isToTipsNotify == "true")
        $('#checkbox_tipsnotifications').attr('checked', isToTipsNotify);
        
        //ini cloth
        var iscloth = window.localStorage.getItem("cloth");
        if (iscloth == "null") {iscloth = true;};
        window.localStorage.setItem("cloth", iscloth);
        if (iscloth == "true")
        $('#checkbox_cloth').attr('checked', iscloth);
        
        //ini fulltext
        var isfulltext = window.localStorage.getItem("fulltext");
        if (isfulltext == "null"){isfulltext = false;};
        window.localStorage.setItem("fulltext", isfulltext);
        if (isfulltext == "true")
        $('#checkbox_fulltext').attr('checked', isfulltext);
        
        //ini sound
        var issound = window.localStorage.getItem("sound");
        if (issound == "null"){issound = true;};
        window.localStorage.setItem("sound", issound);
        if (issound == "true")
        $('#checkbox_sound').attr('checked', issound);
        
        
        onLanguageChoose(lang, iscloth, isfulltext, issound);
        
        
        
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
             onLanguageChoose(window.localStorage.getItem("lang"), window.localStorage.getItem("cloth"), window.localStorage.getItem("fulltext"), window.localStorage.getItem("sound"));
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
          bindStrings();
        pushNotification = window.plugins.pushNotification;
        var token = window.localStorage.getItem("token");
        if (token == undefined)
        {
            try {
                registerDevice();
            
            }
            catch (e)
            {
                console.log(e);
            }
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
            registerDevice();
            
        }
        else
        {
            postNewTokenToServer(token, longNotify, shortNotify, tipsNotify);
        }
        
    }
};


function registerDevice()
{
    //console.log('registering ' + device.platform);
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
    function onPhotoDataSuccess(imageData) {
       imageData = imageData;
       $('#imagepreviewContainer').show();
       console.log(imageData);
      var smallImage = document.getElementById('smallImage');
      smallImage.style.display = 'block';
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      imageURI = imageURI;
      $('#imagepreviewContainer').show();
      console.log(imageURI);
      var largeImage = document.getElementById('largeImage');
      largeImage.style.display = 'block';
      largeImage.src = imageURI;
    }

    
    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 90,
      destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 90,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }
function postNewTokenToServer(token, islongactive, isshortactive, istipsactive)
{
    $.ajax({
              
        url:'http://www.02ws.co.il/apn_register.php',
        type:'POST',
        data:{name:device.model, email:device.uuid, regId: token, lang: window.localStorage.getItem("lang"), long_active:(islongactive ? 1 : 0), short_active:(isshortactive ? 1 : 0), tips_active:(istipsactive ? 1 : 0)},
        crossDomain:true,
        success: function(data){
        console.log('device sent token successfully');
        }
       });
          
}
function sendPic(){
        postNewPictureToServer($('#nameonpic').val(), $('#commentonpic').val(), 0, 0, imageURI, imageData);
        $('#imagepreviewContainer').hide();
}
function postNewPictureToServer(nameOnPic, comments, x, y, picname, picdata)
{
    $.ajax({
              
        url:'http://www.02ws.co.il/user_picture_reciever.php',
        type:'POST',
        data:{name:nameOnPic, comments:comments, x: x, y: y, picname:picname, pic: picdata},
        crossDomain:true,
        success: function(data){
        console.log('picture sent token successfully');
        }
       });
          
}
function tokenHandler(result)
{
    console.log('device token = ' + result);
    window.localStorage.setItem("token", result);
    console.log('device token = ' + result);
    postNewTokenToServer(result, window.localStorage.getItem("notify"), window.localStorage.getItem("shortnotify"), window.localStorage.getItem("tipsnotify"));
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
        var url = "http://www.02ws.co.il/small.php?lang=" + value + "&c=" + (iscloth == "true" ? 1 : 0) + "&ft=" + (isfulltext == "true" ? 1 : 0)  + "&s=" + (issound == "true" ? 1 : 0);
        $('#02wsframe').attr('src', url);
        $('#loading').hide();
       // $('#navpanel').panel('close');
   }
     catch (e) {
        console.log(e);
    }
    
}
// this is the complete list of currently supported params you can pass to the plugin (all optional)
var options = {
  message: 'share this', // not supported on some apps (Facebook, Instagram)
  subject: 'שיתוף אפליקציה', // fi. for email
  files: ['http://www.02ws.co.il/02ws_short.png', 'http://www.02ws.co.il/02ws_short_eng.png'], // an array of filenames either locally or remotely
  url: 'https://itunes.apple.com/us/app/yrwsmyym/id925504632?mt=8',
  chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
}

var onShareSuccess = function(result) {
  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
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
            postNewTokenToServer(e.regid, window.localStorage.getItem("notify"), window.localStorage.getItem("shortnotify"), window.localStorage.getItem("tipsnotify"));
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

$(document).ready(function() {
    $("[name='radio-choice-lang']").live('change mousedown',function(event) { 
        onLanguageChoose(this.value, window.localStorage.getItem("cloth") , window.localStorage.getItem("fulltext"), window.localStorage.getItem("sound"));
    }); 
    $("[name='checkbox_notifications']").live('change',function(event) { 
        onNotificationsCheck(this.checked, $("[name='checkbox_shortnotifications']").is(":checked"), $("[name='checkbox_tipsnotifications']").is(":checked"));
    }); 
    $("[name='checkbox_shortnotifications']").live('change',function(event) { 
        onNotificationsCheck($("[name='checkbox_notifications']").is(":checked"), this.checked, $("[name='checkbox_tipsnotifications']").is(":checked"));
    }); 
     $("[name='checkbox_tipsnotifications']").live('change',function(event) { 
        onNotificationsCheck($("[name='checkbox_notifications']").is(":checked"), $("[name='checkbox_shortnotifications']").is(":checked"), this.checked);
    }); 
    $("[name='checkbox_cloth']").live('change',function(event) { 
        onLanguageChoose(window.localStorage.getItem("lang"), this.checked, window.localStorage.getItem("fulltext"), window.localStorage.getItem("sound"));
    });
    $("[name='checkbox_fulltext']").live('change',function(event) { 
        onLanguageChoose(window.localStorage.getItem("lang"), window.localStorage.getItem("cloth"), this.checked, window.localStorage.getItem("sound"));
    });
    $("[name='checkbox_sound']").live('change',function(event) { 
        onLanguageChoose(window.localStorage.getItem("lang"), window.localStorage.getItem("cloth"), window.localStorage.getItem("fulltext"), this.checked);
    });
    $("[id='btn_takepic']").live('click',function(event) { 
        capturePhotoEdit();
    });
    $("[id='btn_choosepic']").live('click',function(event) {
        //getPhoto(pictureSource.SAVEDPHOTOALBUM);
        getPhoto(pictureSource.PHOTOLIBRARY);
    });
    bindStrings();
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
});



