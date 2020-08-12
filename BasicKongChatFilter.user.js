// ==UserScript==
// @name        Basic KongChat Filter
// @namespace   Alexiea
// @match       https://www.kongregate.com/games/makopaz/pincremental
// @match       https://www.kongregate.com/games/Makopaz/pincremental
// @grant       none
// @version     1.3.3
// @downloadURL https://github.com/BrkIt/BrkIt.github.io/raw/master/BasicKongChatFilter.user.js
// @updateURL   https://github.com/BrkIt/BrkIt.github.io/raw/master/BasicKongChatFilter.user.js
// @author      Alexiea
// @description Basic filter to remove messages sent by the recent chat bots.
// ==/UserScript==

// *********** This script will stop working as soon as the bots update their message. DM me on discord and I'll update it. @Alexiea#6630 ***********

function KongFilter() {
  var els = document.getElementsByClassName("chat-message");
  var searchValue = /yo.*play.*nude.*site.*http/;                 //This is the message that we're looking to remove.

  //Look for spam in the last 5 messages -- Last 5 just incase 5 messages come in on a same second.
  for(var i = els.length-5; i < els.length ; i++){
    if(els[i]) {
      if (searchValue.test(els[i].innerHTML)) { 
        spamRemoved++;
        localStorage.setItem("BKCFspamRemoved", spamRemoved);     //Save spamRemoved
        span.innerHTML = "Spam Removed:" + spamRemoved;           //Update Spam Removed display
        console.log('[Basic KongChat Filter] (' + spamRemoved + ') Removing > ' + els[i].getElementsByTagName("span")[1].getAttribute('username') + ': ' + els[i].getElementsByTagName("span")[3].innerHTML);   //Log the removed message
        els[i].remove();                                          //Remove the message
      }
    }
  }
}


console.log('[Basic KongChat Filter] Initializing...');

spamRemoved = 0;
//Load spamRemoved count
if (localStorage.getItem("BKCFspamRemoved")) {
  spamRemoved = localStorage.getItem("BKCFspamRemoved");
}

//Create <span> to display spamRemoved Count
var span = document.createElement("SPAN");
span.style.float = "right";
span.innerHTML = "Spam Removed:" + spamRemoved;

function initialise() {

  var hook = document.getElementById("chat_window_header").children[0];

  if (hook) { 
    hook.appendChild(span);
    setInterval(KongFilter, 1000);
    console.log('[Basic KongChat Filter] Loaded!');
    console.log('[Basic KongChat Filter] Total Removed: ' + spamRemoved);
    clearInterval(initialise);
  }
}

var initialise = setInterval(initialise, 1000);
