(function(){
  var messenger = MESSENGER || {};

  var watched_e = [];
  var user_e = $();

  function activate_change_monitor(){
   $(document).on('change',user_e,function(){
    messenger.sendMessage({"put":true});
   });
  }
  
  $(document).on('click',function(){
    event.preventDefault();
    user_e = $(event.target);
    if ( watched_e.indexOf(user_e) < 0 ){
      watched_e.push(user_e);
      activate_change_monitor();
    }
  });

})();