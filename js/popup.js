(function(){
  var messenger = MESSENGER || {};
  messenger.sendMessage = function( message ){
    chrome.runtime.sendMessage( message,function( response ) {
      console.log(response);
      for( var i in response.notifications ){
        var notif_item = $('<li></li>').html( '<pre>'+response.notifications[i]+'</pre>' );
        $('.notifications').append( notif_item );
      }    
      console.log( response );
    });
  };
  
  messenger.sendMessage({"get":true});
})();