var MESSENGER = (function(){
  return {
    sendMessage: function( message ){
      chrome.runtime.sendMessage( message,function( response ) {
          console.log( response );
      });
    },
    getMessage: function( request,sender,sendMessage ) {
      sendMessage( request );
    }
  };
})();