(function(){
  var notifications = [];

  function bind_notification( id ){
    $('#'+id).on('click',function(){
      var _caption = $(event.target).text();
      messenger.sendMessage({ "delete":true, "notification": $.trim( _caption.split(':',2)[0] ) });
      delete notifications[ id ];
      $(this).remove();
    });
  }

  var messenger = MESSENGER || {};
  messenger.sendMessage = function( message ){
    chrome.runtime.sendMessage( message,function( response ) {
      for( var i in response.notifications ){
        var notif_item = $('<li></li>',{ "id":i }).html( '<pre>'+response.notifications[i]+'</pre>' );
        notifications.push( notif_item );
        $('#list').append( notif_item );
        bind_notification( i );
      }    
      console.log( response );
    });
  };

  $(document).ready(function(){
    messenger.sendMessage({"get":true});
  });

})();