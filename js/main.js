var pushNotification;
var app = {
        // Application Constructor
    initialize: function() {
        this.bindEvents();
        var self = this;
        var Embeddedurl =  window.localStorage.getItem("url");
        var lang = window.localStorage.getItem("lang");
        if (lang == undefined)
        {
            lang = 1;
            this.saveLang(lang);
            
        }
        $('[name="radio-choice-lang"][value="' + lang + '"]').prop('checked',true); 
        var isToNotify = window.localStorage.getItem("notify");
        if (isToNotify == undefined)
        {
            isToNotify = true;
            this.saveIsToNotify(true);
        }
        if (isToNotify)
        $('#checkbox_notifications').attr('checked', isToNotify);
        var url = "http://www.02ws.co.il/small.php?lang=" + lang;
        if ((Embeddedurl != undefined)&&(Embeddedurl))
            url = Embeddedurl + "?lang=" + lang;
        $('#02wsframe').attr('src', url);
        window.localStorage.removeitem("url");
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
         console.log('device ready: ' + device.platform + ' ' +  device.uuid);
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
    saveIsToNotify:function(Notify){
        window.localStorage.setItem("notify", Notify);
        var token = window.localStorage.getItem("token");
        if (token == undefined)
        {
            registerDevice();
            
        }
        else
        {
            postNewTokenToServer(token, Notify);
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
function postNewTokenToServer(token, isactive)
{
    $.ajax({
              
              url:'http://www.02ws.co.il/apn_register.php',
              type:'POST',
              data:{name:device.model, email:device.uuid, regId: token, lang: window.localStorage.getItem("lang"), active:(isactive ? 1 : 0)},
              crossDomain:true,
              success: function(data){
              console.log('device sent token successfully');
              }
             });
          
}
function tokenHandler(result)
{
    console.log('device token = ' + result);
    window.localStorage.setItem("token", result);
    console.log('device token = ' + result);
    postNewTokenToServer(result, window.localStorage.getItem("notify"));
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

function onNotificationsCheck(value)
{
          
    app.saveIsToNotify(value);
    $('#navpanel').panel('close');
   
}

function onLanguageChoose(value)
{
     try {
         app.saveLang(value);
    var url = "http://www.02ws.co.il/small.php?lang=" + value;
    $('#02wsframe').attr('src', url);
    $('#navpanel').panel('close');
     }
     catch (e) {
        console.log(e);
    }
    
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
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
    }
    catch (e) {
        console.log(e);
    }
     if (event.EmbeddedUrl)
     {
         alert(event.EmbeddedUrl);
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
            postNewTokenToServer(e.regid, window.localStorage.getItem("notify"));
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
   
    onLanguageChoose(this.value);
}); 

$("[name='checkbox_notifications']").live('change',function(event) { 
   
    onNotificationsCheck(this.checked);
}); 
});



