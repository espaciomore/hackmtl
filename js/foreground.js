(function(){
  var messenger = MESSENGER || {};

  var watched_e = [];
  var user_e = $();

  function activate_change_monitor(){
    $(document).on('change',user_e,function(){
      messenger.sendMessage({
        "put": true,
        "element": { 
          "name": user_e.context.className!='' ? (user_e.context.localName+'.'+user_e.context.className):user_e.context.localName,
        } 
      });
    });
  }
  
  $(document).on('click',function(){
    event.preventDefault();
    user_e = $(event.target);
    if ( event.target.getAttribute('class')=='notify123' ){
      $(this).off('click');
      return false;
    }
    if ( watched_e.indexOf(user_e) < 0 ){
      watched_e.push(user_e);
      activate_change_monitor();
    }
  });

  messenger.getTemplate = function( message ){
    chrome.runtime.sendMessage( message,function( response ) { 
      $('body').prepend( $(response.template) );  
    });
  };
  messenger.getTemplate({
    "get": true,
    "template": "control-bar.html"
  });
  
})();
