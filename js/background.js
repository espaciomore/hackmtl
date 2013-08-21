(function(){
  var alerts = {};

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
        list = [];
        for( var title in alerts ){
          for( var element in alerts[ title ] )
            list.push( title+' : '+element);
        }
        sendMessage({ "notifications": list });
      }
    } else if ( request.put ) {
      if ( !( sender.tab.title in alerts ) ){
        alerts[ sender.tab.title ] = {};
        if ( !( request.element.name in alerts[sender.tab.title] ) ){
          alerts[ sender.tab.title ][ request.element.name ] = {};
          chrome.browserAction.setIcon({
            path: "../images/bells/bell_19_red.png"
          });
        }
      }
      sendMessage( request );
    }
    return true;
  };

  chrome.runtime.onMessage.addListener( messenger.getForegroundMessage );
  
})();