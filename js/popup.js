(function(){
  var notifications = [];

  var messenger = MESSENGER || {};
  messenger.sendMessage = function( message ){
    chrome.runtime.sendMessage( message,function( response ) {
      for( var i in response.notifications ){
        var notif_item = $('<li></li>').html( '<pre>'+response.notifications[i]+'</pre>' );
        notifications.push( notif_item );
        $('#list').append( notif_item );
      }    
      console.log( response );
    });
  };

  $(document).ready(function(){
    messenger.sendMessage({"get":true});
  });

})();