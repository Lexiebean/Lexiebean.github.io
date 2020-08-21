// ==UserScript==
// @name        Kong Chatroom Switcher
// @namespace   Alexiea
// @match       https://www.kongregate.com/games/*
// @grant       none
// @version     1.0
// @author      @Alexiea#6630
// @downloadURL https://github.com/BrkIt/BrkIt.github.io/raw/master/KongChatroomSwitcher.user.js
// @updateURL   https://github.com/BrkIt/BrkIt.github.io/raw/master/KongChatroomSwitcher.user.js
// @description Basic filter to remove messages sent by the recent chat bots.
// ==/UserScript==

var li_pin = document.createElement("li");
li_pin.onclick = function() { holodeck.selectRoom({"name":"Pincremental - Room #01","xmpp_name":"321971-pincremental-1","type":"game"}) };
li_pin.innerHTML = "Pincremental";
li_pin.setAttribute("id", "KCS");

var li_itrtg = document.createElement("li");
li_itrtg.onclick = function() { holodeck.selectRoom({"name":"Idling to Rule the Gods - Room #01","xmpp_name":"218178-idling-to-become-god-1","type":"game"}) };
li_itrtg.innerHTML = "ItRtG";

function KCSHook() {
 
  var KCS = document.getElementById('KCS'); 
  var hook = document.getElementsByClassName('chat_actions_list')[0];

  if (!KCS) {
    if (hook) { 
      hook.appendChild(li_pin);
      hook.appendChild(li_itrtg);
      console.log('[Kong Chatroom Switcher] Links Added!')
    }
  }
}

var initialise = setInterval(KCSHook, 10000);
