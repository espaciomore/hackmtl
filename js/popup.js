(function(){
  var messenger = MESSENGER || {};
  messenger.sendMessage = function( message ){
    chrome.runtime.sendMessage( message,function( response ) {
      for( var i in response.notifications ){
        var notif_item = $('<li></li>').text( response.notifications[i] );
        $('.notifications').append( notif_item );
      }    
      console.log( response );
    });
  };
  
  messenger.sendMessage({"get":true});
})();