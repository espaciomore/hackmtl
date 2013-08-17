(function(){
  var alerts = [];

  var messenger = MESSENGER || {};
  messenger.getForegroundMessage = function( request,sender,sendMessage ) {
    if ( request.get ) {
      sendMessage({ "notifications": alerts });
    } else if ( request.put ) {
      if ( alerts.indexOf( sender.tab.title ) >= 0 ){
        alerts.push( sender.tab.title );
      }
      sendMessage( request );
    }
  };

  chrome.runtime.onMessage.addListener( messenger.getForegroundMessage );
  
})();