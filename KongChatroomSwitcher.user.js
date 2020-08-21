// ==UserScript==
// @name        Kong Chatroom Switcher
// @namespace   Alexiea
// @match       https://www.kongregate.com/games/*
// @grant       none
// @version     1.2
// @author      @Alexiea#6630
// @downloadURL https://github.com/BrkIt/BrkIt.github.io/raw/master/KongChatroomSwitcher.user.js
// @updateURL   https://github.com/BrkIt/BrkIt.github.io/raw/master/KongChatroomSwitcher.user.js
// @description Adds a list of games that still have chatrooms on Kong and lets you switch between them.
// ==/UserScript==


function initialise() {
 
  var hook = document.getElementById('main_tab_set');

  if (hook) { 

    var switcher = document.createElement("li");
    switcher.setAttribute("class", "tab");
    switcher.setAttribute("style","float: right; cursor: pointer;");
    switcher.addEventListener('click', function() { var x = document.getElementById("chat_switcher"); if (x.style.display === "none") { x.style.display = "block"; } else { x.style.display = "none"; } }, true);
    hook.appendChild(switcher);

    var tab = document.createElement("a");
    tab.innerHTML = "Chat Switcher";
    switcher.appendChild(tab);

    var ul = document.createElement("ul");
    ul.setAttribute("id", "chat_switcher");
    ul.setAttribute("style",`
	    background-color: #fff;
	    border: solid 1px #666;
	    border-bottom-left-radius: 3px;
	    border-bottom-right-radius: 3px;
	    box-shadow: 0 1px 4px rgba(0,0,0,0.22);
	    min-width: 150px;
	    padding: 8px 0;
	    position: absolute;
      right: 2px;
      top: 52px;
      z-index: 1;
      display: none;
    `);
    switcher.appendChild(ul);

    var game_list = {
      1: { title:"Pincremental", game:"pincremental", id:"321971" },
      2: { title:"Idling to Rule the Gods", game:"idling-to-become-god", id:"218178" },
      3: { title:"Spellstone", game:"spellstone", id:"248326" },
      4: { title:"Incremental Epic Hero", game:"ncrementa", id:"317607" },
      5: { title:"Synergism", game:"synergism", id:"320578" },
      6: { title:"Firestone Idle RPG", game:"firestone", id:"299519" },
      7: { title:"Realm of the Mad God", game:"realm-of-t", id:"127641" },
    };

    var x;
    for (x in game_list) {
      var li = document.createElement("li");
      li.innerHTML = game_list[x].title;
      li.setAttribute("style",`
        cursor: pointer;
        display: block;
        text-align: left;
        padding-left: 8px;
      `);
      li.setAttribute("title",game_list[x].title);
      li.setAttribute("game",game_list[x].game);
      li.setAttribute("id",game_list[x].id);
	    li.onclick = function(li) { holodeck.selectRoom({"name": this.getAttribute("title") + "- Room #01","xmpp_name": this.getAttribute("id") + "-" + this.getAttribute("game") + "-1","type":"game"}) };
	    ul.appendChild(li);
    }
    console.log('[Kong Chatroom Switcher] Links Added!');
    clearInterval(initialise);
  }
}

var initialise = setInterval(initialise, 1000);
