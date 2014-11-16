var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },
	renderHomeView: function() {
    var html = "";
           
    $('body').html(html);
    $('.search-key').on('keyup', $.proxy(this.findByName, this));
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
        
    },
    saveLang:function(lang){
        window.localStorage.setItem("lang", lang);
    }
    ,
    saveIsToNotify:function(Notify){
        window.localStorage.setItem("notify", Notify);
    }
    

};
function onDeviceReady()
{     
    alert('device ready');
   
}
function onBodyLoad()
{    
    document.addEventListener("deviceready",onDeviceReady,false); 
    app.initialize();
}

function onRefresh()
{
    document.getElementById('02wsframe').src = document.getElementById('02wsframe').src;
}

function onNotificationsCheck(value)
{
    alert('notify: ' + value);
    app.saveIsToNotify(value);
}

function onLanguageChoose(value)
{
    app.saveLang(value);
    var url = "http://www.02ws.co.il/small.php?lang=" + value;
    $('#02wsframe').attr('src', url);
    $('#langpanel').hide();
}

$(document).ready(function() {

$("[name='radio-choice-lang']").live('change mousedown',function(event) { 
   
    onLanguageChoose(this.value);
}); 

$("[name='checkbox_notifications']").live('change',function(event) { 
   
    onNotificationsCheck(this.checked);
}); 
});



