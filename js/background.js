(function(){
  
  var alerts = [];
  function getAlerts(){
    var list = [];
    for( var i in alerts )
      if ( alerts[i]['count']>0 )
        list.push( alerts[i] );   
    return list; 
  }

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
        sendMessage({ "notifications": getAlerts() });
      }
    } else if ( request.put ) {
      if ( request.notice ){
        alerts[ parseInt(request['notice']['id']) ]['count']++;
        chrome.browserAction.setIcon({
          path: "../images/bells/bell_19_red.png"
        });
      } else if ( request.register ){
        alerts.push( request.register );
        var id = alerts.indexOf( request.register );
        alerts[id]['id'] = id; 
        alerts[id]['count'] = 0;
        sendMessage( alerts[id] );
      }
    } else if ( request['delete'] ) {
      if ( request['id']!=undefined ){
        delete alerts[ parseInt(request['id']) ];
        if ( getAlerts().length == 0 ) {
          chrome.browserAction.setIcon({
            path: "../images/bells/bell_19_green.png"
          });
        }
      }
    }
    return true;
  };

  chrome.runtime.onMessage.addListener( messenger.getForegroundMessage );
  
})();