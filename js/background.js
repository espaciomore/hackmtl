(function(){
  var alerts = [];

  var messenger = MESSENGER || {};
  messenger.getForegroundMessage = function( request,sender,sendMessage ) {
    if ( request.get ) {
      if ( request.template!=undefined ){
        $.get( "../html/"+request.template,function(data){
          //
        }).done(function(data){
          sendMessage({ "template": data });
        });
      } else {
        sendMessage({ "notifications": alerts });
      }
    } else if ( request.put ) {
      if ( alerts.indexOf( sender.tab.title ) < 0 ){
        alerts.push( sender.tab.title );
      }
      sendMessage( request );
    }
    return true;
  };

  chrome.runtime.onMessage.addListener( messenger.getForegroundMessage );
  
})();