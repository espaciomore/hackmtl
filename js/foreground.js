(function(){
  var messenger = MESSENGER || {};

  var watched_e = [];
  var user_e = $();

  function activate_change_monitor( element ){
    $(element).on('DOMSubtreeModified',function(){
      event.preventDefault();
      user_e = $(this);
      if ( user_e.has($(event.target)).length != 0 )
        messenger.sendMessage({
          "put": true,
          "element": { 
            "name": user_e.attr('class')!='' ? (user_e[0].tagName+'.'+user_e.attr('class')):user_e[0].tagName,
          } 
        });
    });
  }
  function activate_selection(){
    $(document).on('click',function(){
      event.preventDefault();
      event.stopPropagation();
      event.cancelBubble=true;
      user_e = $(event.target);
      if ( $('#lmk-toolbar').has($(event.target)).length == 0 )
        if ( watched_e.indexOf(user_e) < 0 ){
          watched_e.push( user_e );
          activate_change_monitor( user_e );
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
        var main = document.evaluate( '/html/body',document,null,XPathResult.ANY_TYPE,null);
        main = main.iterateNext();
        $( main ).prepend( $(response.template) ); 
        activate_controls();
    });
  };
  
  if ( window.parent.document.html == undefined )
    if ( document.URL == window.parent.location.href )
      messenger.getTemplate({
        "get": true,
        "template": "control-bar.html"
      });

})();
