var push;
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
        if (lang == undefined) {lang = 1;}
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
        if (isToShortNotify)
        $('#checkbox_shortnotifications').attr('checked', isToShortNotify);
        
        //ini tipsnotifications
        var isToTipsNotify = window.localStorage.getItem("tipsnotify");
        if ((isToTipsNotify == "null")||(isToTipsNotify == undefined)){isToTipsNotify = true;};
        window.localStorage.setItem("tipsnotify", isToTipsNotify);
        if (isToTipsNotify)
        $('#checkbox_tipsnotifications').attr('checked', isToTipsNotify);
        
        //ini cloth
        var iscloth = window.localStorage.getItem("cloth");
        if ((iscloth == "null")||(iscloth == undefined)) {iscloth = true;};
        window.localStorage.setItem("cloth", iscloth);
        if (iscloth)
            $('#checkbox_cloth').attr('checked', 'checked');
        
        //ini fulltext
        var isfulltext = window.localStorage.getItem("fulltext");
        if ((isfulltext == "null")||(isfulltext == undefined)){isfulltext = false;};
        window.localStorage.setItem("fulltext", isfulltext);
        if (isfulltext)
            $('#checkbox_fulltext').attr('checked', 'checked');
        
        //ini sound
        var issound = window.localStorage.getItem("sound");
        if ((issound == "null")||(issound == undefined)){issound = true;};
        window.localStorage.setItem("sound", issound);
        if (issound)
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
        //console.log('file plugin: ' + cordova.file.applicationDirectory);
        bindStrings();
        var token = window.localStorage.getItem("token");
        console.log("token from storage:" + token);
        
        try {
           registerDevice();
        }
        catch (e)
        {
            console.log("register device:" + e);
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
            postNewTokenToServer(token, longNotify, shortNotify, tipsNotify);
            
        }
        
    }
};


function registerDevice()
{
    console.log('registering ' + device.platform);
        try
        {
        push = PushNotification.init({
            android: {
                senderID: "12345679"
            },
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });
        push.on('registration', function(data) {
            console.log('onregistration:' + data);
            tokenHandler(data.registrationId);
        });

        push.on('notification', function(data) {

            console.log(data.message);
            console.log(data.title);
            console.log(data.count);
            console.log(data.sound);
            console.log(data.image);
            console.log(data.additionalData);
        });

        push.on('error', function(e) {
            console.log('error in registering: ' + e.message);
        });
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
        var fname;
        setTimeout(function() {
	 alert(result);
	}, 0);
        try{
            var thisResult = JSON.parse(result);
            var metadata = JSON.parse(thisResult.json_metadata);
            //navigator.notification.alert('Lat: '+metadata.GPS.Latitude+' Lon: '+metadata.GPS.Longitude);
            y = metadata.GPS.Latitude;
            x = metadata.GPS.Longitude
            fname = thisResult.filename;
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
        navigator.camera.cleanup();
    }
    // A button will call this function
    //
    function capturePhotoEdit() {
     clearCache();
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 80, allowEdit: true,
        destinationType: destinationType.FILE_URI,saveToPhotoAlbum:true });
    }

    // A button will call this function
    //
    function getPhoto(source) {
     clearCache();
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 80,
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
        console.log('device sent token successfully: ' + data);
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
    var basename = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    var manipulatedName = basename.substr(0,fileURI.lastIndexOf('.') - 1) + "_" + (new Date()).getTime() + basename.substr(fileURI.lastIndexOf('.'));
    var options = new FileUploadOptions();
    options.fileKey = "pic";
    options.fileName = manipulatedName;
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
    console.log('device token from registration= ' + result);
    window.localStorage.setItem("token", result);
    postNewTokenToServer(result, true, true, true);
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
function handleExternalURLs() {

    $(document).on('click', 'a[href^="http"]', function (e) {
        var url = $(this).attr('href');
        window.open(url, '_system');
        e.preventDefault();
    });
    
}
function setView(width){
    var viewportScale = 1 / window.devicePixelRatio;
    viewport = document.querySelector("meta[name=viewport]");
    if (width == 320)
     viewport.setAttribute('content', 'user-scalable=no, width=' + width);
       else
    viewport.setAttribute('content', 'initial-scale='+viewportScale+', minimum-scale=0.55  , maximum-scale=1, width=' + width);
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
    $(document).on('click', 'a[href^=http], a[href^=https]', function (e) {
        e.preventDefault();
        var $this = $(this),
            target = $this.data('inAppBrowser') || '_system'; // system open the device browser. _blank open inappbrowser
        window.open($this.attr('href'), target, 'location=no');
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
        var allAsBlank = iframe.contents().find("a[target=_blank]");
        allAsBlank.on("click",function(e){           
            e.preventDefault();           
            var url = this.href;           
            window.open(url,"_system");       
        });
        var allAsTop = iframe.contents().find("a[target=_top]");
        allAsTop.on("click",function(e){           
            e.preventDefault();           
            var url = this.href;           
            window.open(url,"_system");       
        });
        var allAsExternal = iframe.contents().find("a[rel=external]");
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
    
    handleExternalURLs();
    openAllLinksWithBlankTargetInSystemBrowser();
});

