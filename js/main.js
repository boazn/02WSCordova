var app = {
        // Application Constructor
    initialize: function() {
        this.bindEvents();
        var self = this;
         
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
            //this.saveIsToNotify(isToNotify);
        }
        if (isToNotify)
        $('#checkbox_notifications').attr('checked', isToNotify);
        var url = "http://www.02ws.co.il/small.php?lang=" + lang;
        $('#02wsframe').attr('src', url);
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
        if (token != "")
        {
            try {
                this.register();
            postNewTokenToServer(token, 1);
            }
            catch (e)
            {
                alert(e);
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
                navigator.notification.alert(message, null, title, 'OK');
            } else {
                alert(title ? (title + ": " + message) : message);
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
            app.register();
            
        }
        postNewTokenToServer(token, Notify);
    },
    register:function(){
        console.log('registering ' + device.platform);
        if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
            pushNotification.register(
            successHandler,
            errorHandler,
            {
                "senderID":"761995000479",
                "ecb":"onNotification"
            });
        } else if ( device.platform == 'blackberry10'){
            pushNotification.register(
            successHandler,
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
    

};



function postNewTokenToServer(token, isactive)
{
    $.ajax({
              
              url:'http://www.02ws.co.il/apn_register.php',
              type:'POST',
              data:{name:'boazn', email:device.uuid, regId: token, lang: 1, active:isactive},
              crossDomain:true,
              success: function(data){
              console.log('device sent token successfully');
              }
             });
          
}
function tokenHandler(result)
{
    alert('device token = ' + result);
    window.localStorage.setItem("token", result);
    console.log('device token = ' + result);
}   
function errorHandler(error)
{
    console.log('error in registering: ' + error);
}
function successHandler (result) {
    alert('result = ' + result);
}
function onDeviceReady()
{    
   
   app.onDeviceReady();
   
}


function onRefresh()
{
    document.getElementById('02wsframe').src = document.getElementById('02wsframe').src;
}

function onNotificationsCheck(value)
{
    try {
        app.saveIsToNotify(value);
    $('#navpanel').panel('close');
    }
    catch (e) {
        alert(e);
    }
    
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
        alert(e);
    }
    
}

// iOS
function onNotificationAPN (event) {
    try {
        if ( event.alert )
    {
        navigator.notification.alert(event.alert);
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
        alert(e);
    }
    
}

$(document).ready(function() {
document.addEventListener("deviceready", onDeviceReady, false);
$("[name='radio-choice-lang']").live('change mousedown',function(event) { 
   
    onLanguageChoose(this.value);
}); 

$("[name='checkbox_notifications']").live('change',function(event) { 
   
    onNotificationsCheck(this.checked);
}); 
});



