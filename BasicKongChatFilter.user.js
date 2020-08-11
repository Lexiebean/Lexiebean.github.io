// ==UserScript==
// @name        Basic KongChat Filter
// @namespace   Alexiea
// @match       https://www.kongregate.com/games/makopaz/pincremental
// @match       https://www.kongregate.com/games/Makopaz/pincremental
// @grant       none
// @version     1.1
// @updateURL   https://github.com/BrkIt/BrkIt.github.io/raw/master/BasicKongChatFilter.user.js
// @author      Alexiea
// @description Basic filter to remove messages sent by the recent chat bots.
// ==/UserScript==

// *********** This script will stop working as soon as the bots update their message. DM me on discord and I'll update it. @Alexiea#6630 ***********

function KongFilter() {
  var els = document.getElementsByClassName("chat-message");
  var searchValue = "freegirls.today";

  for(var i = els.length-5; i < els.length ; i++){
    if(els[i]) {
      if(els[i].innerHTML.indexOf(searchValue) > -1){
        console.log('[Basic KongChat Filter] Removing > ' + els[i].getElementsByTagName("span")[1].getAttribute('username') + ': ' + els[i].getElementsByTagName("span")[3].innerHTML);
        els[i].remove();
      }
    }
  }
}

setInterval(KongFilter, 1000);
