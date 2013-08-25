(function(){
  
  var watched_e = [];

  var messenger = MESSENGER || {};
  messenger.register = function( message,tag ){
    chrome.runtime.sendMessage( message,function( response ) { 
      $(tag).data( 'letMeKnowID',response['id'] );
    });
  };
  function register( _this ){
    if ( $(_this).closest('#lmk-toolbar').length == 0 ){ 
      var id = _this.id ? '#'+_this.id:'';
      var klass = _this.className ? '.'+_this.className:'';
      var notification = {
        'selector': _this.localName+id+klass,
        'url': document.URL 
      };
      if ( watched_e.indexOf( _this ) < 0 ){
        watched_e.push( _this );
        messenger.register({
          "put": true,
          "register": notification
        }, _this );
      }
    }    
  }
  messenger.getTemplate = function( message ){
    chrome.runtime.sendMessage( message,function( response ) { 
      if ( response ){
        var main = document.evaluate( '/html/body',document,null,XPathResult.ANY_TYPE,null);
        main = main.iterateNext();
        var template = $( response.template );
        $( main ).prepend( template ); 
        activate_controls();
      }
    });
  };

  function activate_change_monitor( notification ){
    $(notification).on('change DOMSubtreeModified',function(){
      event.preventDefault();
      if ( $(this).closest($(event.target)).length != 0 || this == event.target ){
        messenger.sendMessage({
          'put': true,
          'notice': { 'id': $(this).data('letMeKnowID') } 
        });
      }
    });
  }
  function activate_selection(){
    $(document).on('click',function(){
      event.preventDefault();
      event.stopPropagation();
      event.cancelBubble=true;
      register ( event.target );
      return false;
    });
  }
  function load_watch(){
    var list = {
      "https://www.facebook.com": [ 
        "#jewelContainer.notifCentered"
      ]
    };
    for( var url in list)
      if( document.URL.indexOf( list[ url ]>=0 ) )
        for( var i in list[ url ])
          register( list[ url ][ i ] );
  }
  function activate_controls(){
    // START selecting button
    $('button.start-selecting').on('click',function(){
      $(this).attr('disabled',true);
      $('button.stop-selecting').removeAttr('disabled');
      activate_selection();
      return false;
    });
    // STOP selecting button
    $('button.stop-selecting').on('click',function(){
      $(this).attr('disabled',true);
      $('button.start-selecting').removeAttr('disabled');    
      $(document).off('click');
      $.each(watched_e,function(){
        activate_change_monitor( this );
      });
      return false;
    });  
  }

  messenger.getTemplate({
    "get": true,
    "template": "control-bar.html",
    "url": document.URL
  });
  load_watch();

})();
