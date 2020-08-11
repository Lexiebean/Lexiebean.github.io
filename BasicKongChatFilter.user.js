// ==UserScript==
// @name        Basic KongChat Filter
// @namespace   Alexiea
// @match       https://www.kongregate.com/games/makopaz/pincremental
// @match       https://www.kongregate.com/games/Makopaz/pincremental
// @grant       none
// @version     1.0
// @author      -
// @description Basic filter to remove messages sent by the recent chat bots.
// ==/UserScript==

// *********** This script will stop working as soon as the bots update their message. DM me on discord and I'll update it. @Alexiea#6630 ***********

function KongFilter() {
  var els = document.getElementsByClassName("chat-message");
  var searchValue = "freegirls.today";

  for(var i = 0; i < els.length; i++){
    if(els[i].innerHTML.indexOf(searchValue) > -1){
      els[i].parentNode.removeChild(div);
    }
  }
}

setTimeout(KongFilter, 1000);