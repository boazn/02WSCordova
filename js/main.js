var app = {

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
    initialize: function() {
	var self = this;
         
        var lang = window.localStorage.getItem("lang");
        if (lang == "")
            lang = 1;
        $('[name="radio-choice-lang"][value="' + lang + '"]').attr('checked',true); 
        var isToNotify = window.localStorage.getItem("notify");
        if (isToNotify == "")
            isToNotify = true;
        $('#checkbox_notifications').prop('checked', isToNotify);
        var url = "http://www.02ws.co.il/small.php?lang=" + lang;
        $('#02wsframe').attr('src', url);
        pushNotification = window.plugins.pushNotification;
        
    },
    saveLang:function(lang){
        window.localStorage.setItem("lang", lang);
    }
    ,
    saveIsToNotify:function(Notify){
        window.localStorage.setItem("notify", Notify);
        var token = window.localStorage.getItem("token");
        if (token != "")
            postNewTokenToServer(token, Notify);
    },
    register:function(){
        console.log('registering ' + device.platform);
        if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
            pushNotification.register(
            successHandler,
            errorHandler,
            {
                "senderID":"replace_with_sender_id",
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
var pushNotification;
document.addEventListener("deviceready", onDeviceReady, false);
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
    alert('device ready');
    app.initialize();
    var token = window.localStorage.getItem("token");
    if (token != "")
    {
        app.register();
        postNewTokenToServer(token, 1);
    }
   
   
}
function onBodyLoad()
{    
    
    document.addEventListener("deviceready", onDeviceReady, false);
    
    
}

function onRefresh()
{
    document.getElementById('02wsframe').src = document.getElementById('02wsframe').src;
}

function onNotificationsCheck(value)
{
    alert('notify: ' + value);
    app.saveIsToNotify(value);
    $('#navpanel').panel('close');
}

function onLanguageChoose(value)
{
    app.saveLang(value);
    var url = "http://www.02ws.co.il/small.php?lang=" + value;
    $('#02wsframe').attr('src', url);
    $('#navpanel').panel('close');
}

// iOS
function onNotificationAPN (event) {
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

$(document).ready(function() {

$("[name='radio-choice-lang']").live('change mousedown',function(event) { 
   
    onLanguageChoose(this.value);
}); 

$("[name='checkbox_notifications']").live('change',function(event) { 
   
    onNotificationsCheck(this.checked);
}); 
});



