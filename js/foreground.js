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
  function activate_selection(){
    $(document).on('click',function(){
      event.preventDefault();
      user_e = $(event.target);
      if ( watched_e.indexOf(user_e) < 0 ){
        watched_e.push(user_e);
        activate_change_monitor();
      }
      return false;
    });
  }

  function activate_controls(){
    // START selecting button
    $('button.start-selecting').on('click',function(){
      $(this).attr('disabled',true);
      $('button.stop-selecting').removeAttr('disabled');
      activate_selection();
    });
    // STOP selecting button
    $('button.stop-selecting').on('click',function(){
      $(this).attr('disabled',true);
      $('button.start-selecting').removeAttr('disabled');    
      $(document).off('click');
    });  
  }

  messenger.getTemplate = function( message ){
    chrome.runtime.sendMessage( message,function( response ) { 
      $('body').prepend( $(response.template) );  
      activate_controls();
    });
  };
  messenger.getTemplate({
    "get": true,
    "template": "control-bar.html"
  });

})();
