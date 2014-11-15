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
    var html =
            "<div class='header'><h1>Home</h1></div>" +
            "<div class='search-view'>" +
            "<input class='search-key'/>" +
            "<ul class='employee-list'></ul>" +
            "</div>"
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
        this.store = new MemoryStore(function() {
        //self.showAlert('Store Initialized', 'Info');
		//self.renderHomeView();
                
		});
                //window.open("http://www.02ws.co.il/small.php", "_self");
                //$("#applicationContainer").load("http://www.02ws.co.il/small.php");
                /*$.ajax({
                dataType:'html',
                url:'http://www.02ws.co.il/small.php',
                success:function(data) {
                  $('#applicationContainer').html($(data));   
                }
              });*/
               /* $.get('http://www.02ws.co.il/small.php', function( data ) {
  alert( 'Successful cross-domain AJAX request.' );
});*/
        var url = "http://www.02ws.co.il/small.php";
        $('#02wsframe').attr('src', url);
        
    }

};

app.initialize();
function onDeviceReady()
{     
    alert('device ready');
   
}
function onBodyLoad()
{    
    document.addEventListener("deviceready",onDeviceReady,false); 
    var url = "http://www.02ws.co.il/small.php";
    $('#02wsframe').attr('src', url);
}

