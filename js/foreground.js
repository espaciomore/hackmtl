(function(){
  var messenger = MESSENGER || {};
  chrome.runtime.onMessage.addListener( messenger.getMessage );
  messenger.sendMessage( {"heelo":":O"} );
})();