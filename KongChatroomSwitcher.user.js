// ==UserScript==
// @name        Kong Chatroom Switcher
// @namespace   Alexiea
// @match       https://www.kongregate.com/games/*
// @grant       none
// @version     1.0.3
// @author      @Alexiea#6630
// @downloadURL https://github.com/BrkIt/BrkIt.github.io/raw/master/KongChatroomSwitcher.user.js
// @updateURL   https://github.com/BrkIt/BrkIt.github.io/raw/master/KongChatroomSwitcher.user.js
// @description Adds a list of games that still have chatrooms on Kong and lets you switch between them.
// ==/UserScript==

function isOdd(num) { return num % 2;}

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
	    background-color: #e3e3e3;
	    border: solid 1px #666;
	    border-bottom-left-radius: 3px;
	    border-bottom-right-radius: 3px;
	    box-shadow: 0 1px 4px rgba(0,0,0,0.22);
	    min-width: 150px;
	    padding: 8px;
	    position: absolute;
      right: 2px;
      top: 52px;
      z-index: 1;
      display: none;
    `);
    switcher.appendChild(ul);

    var style = document.createElement('style');
    style.innerHTML = 
      `#chat_switcher li {cursor: pointer;display:block;text-align:left;color:#900;text-decoration: underline;padding: 1px 0;}
      #chat_switcher li:nth-child(even) { background: #e3e3e3; }
      #chat_switcher li:nth-child(odd) { background: white; }`;

    var ref = document.querySelector('script');
    ref.parentNode.insertBefore(style, ref);

    var game_list = {
      1: { title:"Animation Throwdown", game:"animation-", id:"271381" },
      2: { title:"BattleHand", game:"battlehand", id:"261051" },
      3: { title:"Bit Heroes", game:"bit-heroes", id:"266462" },
      4: { title:"Clicker Heroes", game:"clicker-he", id:"216826" },
      5: { title:"Cosmos Quest: The Origin", game:"cosmos-que", id:"276144" },
      6: { title:"Crusaders of the Lost Idols", game:"crusaders-", id:"243503" },
      7: { title:"Crush Crush", game:"crush-crus", id:"256923" },
      8: { title:"DPS IDLE", game:"dps-idle", id:"316416" },
      9: { title:"Dungeon Crusher: Soul Hunters", game:"dungeon-cr", id:"283352" },
      10: { title:"Firestone Idle RPG", game:"firestone", id:"299519" },
      11: { title:"Idle Champions of the Forgotten Realms", game:"idle-champ", id:"303551" },
      12: { title:"Idle Grindia: Dungeon Quest", game:"idle-grind", id:"317742" },
      13: { title:"Idle Monster TD", game:"idle-monst", id:"315606" },
      14: { title:"Idling to Rule the Gods", game:"idling-to-become-god", id:"218178" },
      15: { title:"Incremental Epic Hero", game:"ncrementa", id:"317607" },
      16: { title:"Iron Rage", game:"iron-rage", id:"296562" },
      17: { title:"Mighty Party", game:"mighty-par", id:"272366" },
      18: { title:"Mob Wars: La Cosa Nostra", game:"mob-wars-l", id:"161320" },
      19: { title:"Mutilate-a-Doll 2", game:"mutilate-a", id:"190329" },
      20: { title:"Naruto Online", game:"naruto-onl", id:"269125" },
      21: { title:"NGU IDLE", game:"ngu-idle", id:"287709" },
      22: { title:"Pincremental", game:"pincremental", id:"321971" },
      23: { title:"Realm Grinder", game:"realm-grin", id:"239558" },
      24: { title:"Realm of the Mad God", game:"realm-of-t", id:"127641" },
      25: { title:"Spellstone", game:"spellstone", id:"248326" },
      26: { title:"Supermechs", game:"supermechs", id:"171560" },
      27: { title:"Synergism", game:"synergism", id:"320578" },
      28: { title:"The Perfect Tower", game:"the-perfec", id:"258553" },
      29: { title:"Tyrant Unleashed", game:"tyrant-unl", id:"208033" },
      30: { title:"Wartune", game:"wartune", id:"303599" }
    };

    var x;
    for (x in game_list) {
      var li = document.createElement("li");
      li.innerHTML = game_list[x].title;
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

//console.log('{ title:"' + document.querySelectorAll('[itemprop="name"]')[0].innerHTML + '"", game:""' + kong_ads._targetingParams.game + '", id:"' + kong_ads._targetingParams.game_id + '" },')
