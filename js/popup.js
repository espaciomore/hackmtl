(function(){
  var notifications = [];
  function bind_notification( id ){
    $('#'+id).on('click',function(){
      var _caption = $(this).text();
      messenger.sendMessage({ "delete":true, "id": id });
      delete notifications[ id ];
      $(this).remove();
    });
  }

  var messenger = MESSENGER || {};
  messenger.sendMessage = function( message ){
    chrome.runtime.sendMessage( message,function( response ) {
      for( var i in response.notifications ){
        var notif_item = $('<li></li>',{ "id":response.notifications[i]['id'] });
        notif_item.html( '<pre>'+response.notifications[i]['url']+' ('+response.notifications[i]['count']+')'+'</pre>' );
        notifications.push( notif_item );
        $('#list').append( notif_item );
        bind_notification( response.notifications[i]['id'] );
      }    
    });
  };

  $(document).ready(function(){
    messenger.sendMessage({"get":true});
  });

})();