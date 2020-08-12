// ==UserScript==
// @name        Basic KongChat Filter
// @namespace   Alexiea
// @match       https://www.kongregate.com/games/makopaz/pincremental
// @match       https://www.kongregate.com/games/Makopaz/pincremental
// @grant       none
// @version     1.1
// @downloadURL https://github.com/BrkIt/BrkIt.github.io/raw/master/BasicKongChatFilter.user.js
// @updateURL   https://github.com/BrkIt/BrkIt.github.io/raw/master/BasicKongChatFilter.user.js
// @author      Alexiea
// @description Basic filter to remove messages sent by the recent chat bots.
// ==/UserScript==

// *********** This script will stop working as soon as the bots update their message. DM me on discord and I'll update it. @Alexiea#6630 ***********

console.log('[Basic KongChat Filter] Starting');
            
function KongFilter() {
  var els = document.getElementsByClassName("chat-message");
  var searchValue = "freegirls.today";

  for(var i = els.length-5; i < els.length ; i++){
    if(els[i]) {
      if(els[i].innerHTML.indexOf(searchValue) > -1){
        spamRemoved++;
        localStorage.setItem("BKCFspamRemoved", spamRemoved);
        console.log('[Basic KongChat Filter] (' + spamRemoved + ') Removing > ' + els[i].getElementsByTagName("span")[1].getAttribute('username') + ': ' + els[i].getElementsByTagName("span")[3].innerHTML);
        els[i].remove();
      }
    }
  }
}

setInterval(KongFilter, 1000);

spamRemoved = 0;
if (localStorage.getItem("BKCFspamRemoved")) {
  spamRemoved = localStorage.getItem("BKCFspamRemoved");
}
console.log('[Basic KongChat Filter] Loaded');
console.log('[Basic KongChat Filter] Removed: ' + spamRemoved);
