// ==UserScript==
// @name        Kong Chatroom Switcher
// @namespace   Alexiea
// @match       https://www.kongregate.com/games/*
// @match       http://www.kongregate.com/games/*
// @grant       none
// @version     1.1.2
// @author      @Lexie#4024
// @downloadURL https://github.com/BrkIt/BrkIt.github.io/raw/master/KongChatroomSwitcher.user.js
// @updateURL   https://github.com/BrkIt/BrkIt.github.io/raw/master/KongChatroomSwitcher.user.js
// @description Adds a list of games that still have chatrooms on Kong and lets you switch between them.
// ==/UserScript==

var savedchat

function initialise() {

  //Gets stored default chat
  defaultChat = 321971;
  if (localStorage.getItem("KCSDefault")) {
    defaultChat = localStorage.getItem("KCSDefault");
  }
 

  var hook = document.getElementById("chat_connected_indicator").innerHTML;

  if (hook == "Connected") { 
    
    var hook = document.getElementById('main_tab_set');
    //Add the tab
    var switcher = document.createElement("li");
    switcher.setAttribute("class", "tab");
    switcher.setAttribute("style","float: right; cursor: pointer;");
    switcher.addEventListener('click', function() { var x = document.getElementById("chat_switcher"); if (x.style.display === "none") { x.style.display = "block"; } else { x.style.display = "none"; } }, true);
    hook.appendChild(switcher);

    var tab = document.createElement("a");
    tab.innerHTML = "Chat Switcher";
    switcher.appendChild(tab);

    //Add ul for chats
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

    //CSS for <li>
    var style = document.createElement('style');
    style.innerHTML = `
#chat_switcher li {cursor: pointer;display:block;text-align:left;color:#900;text-decoration: underline;padding: 1px 0;}
#chat_switcher li:nth-child(even) { background: #e3e3e3; }
#chat_switcher li:nth-child(odd) { background: white; }
#chat_switcher input { margin-right: 3px; cursor:help !important; }
.activeChat { background: #99f !important; }`;

    var ref = document.querySelector('script');
    ref.parentNode.insertBefore(style, ref);

    //The list of games
    var game_list = {
      1: { title:"Animation Throwdown", game:"animation-throwdown", id:"271381" },
      2: { title:"BattleHand", game:"battlehand-web", id:"261051" },
      3: { title:"Bit Heroes", game:"bit-heroes", id:"266462" },
      4: { title:"Clicker Heroes", game:"clicker-heroes", id:"216826" },
      5: { title:"Cosmos Quest: The Origin", game:"cosmos-quest", id:"276144" },
      6: { title:"Crusaders of the Lost Idols", game:"crusaders-of-the-lost-idols", id:"243503" },
      7: { title:"Crush Crush", game:"crush-crush", id:"256923" },
      8: { title:"DPS IDLE", game:"dps-idle", id:"316416" },
      9: { title:"Dungeon Crusher: Soul Hunters", game:"dungeon-crusher-soul-hunters", id:"283352" },
      10: { title:"Firestone Idle RPG", game:"firestone", id:"299519" },
      11: { title:"Idle Champions of the Forgotten Realms", game:"idle-champions-of-the-forgotten-realms", id:"303551" },
      12: { title:"Idle Grindia: Dungeon Quest", game:"idle-grindia-dungeon-quest", id:"317742" },
      13: { title:"Idle Monster TD", game:"idle-monster-td", id:"315606" },
      14: { title:"Idling to Rule the Gods", game:"idling-to-become-god", id:"218178" },
      15: { title:"Incremental Epic Hero", game:"incremental-epic-hero", id:"317607" },
      16: { title:"Iron Rage", game:"iron-rage", id:"296562" },
      17: { title:"Mighty Party", game:"mighty-party", id:"272366" },
      18: { title:"Mob Wars: La Cosa Nostra", game:"mob-wars-la-cosa-nostra", id:"161320" },
      19: { title:"Mutilate-a-Doll 2", game:"mutilate-a-doll-2", id:"190329" },
      20: { title:"Naruto Online", game:"naruto-online", id:"269125" },
      21: { title:"NGU IDLE", game:"ngu-idle", id:"287709" },
      22: { title:"Pincremental", game:"pincremental", id:"321971" },
      23: { title:"Realm Grinder", game:"realm-grinder", id:"239558" },
      24: { title:"Realm of the Mad God", game:"realm-of-the-mad-god", id:"127641" },
      25: { title:"Spellstone", game:"spellstone", id:"248326" },
      26: { title:"Supermechs", game:"supermechs", id:"171560" },								
      27: { title:"Synergism", game:"synergism", id:"320578" },
      28: { title:"The Perfect Tower", game:"the-perfect-tower", id:"258553" },
      29: { title:"Tyrant Unleashed", game:"tyrant-unleashed-web", id:"208033" },
      30: { title:"Wartune", game:"wartune", id:"303599" }
    };
    
    //Generate the list
    var x;
    for (x in game_list) {
      var li = document.createElement("li");
      li.setAttribute("title",game_list[x].title);
      li.setAttribute("game",game_list[x].game);
      li.setAttribute("id",game_list[x].id);
	    li.onclick = function(e) { holodeck.activeDialogue().displayMessage("Joined", this.getAttribute("title") + " - Room #01", { "class": "error" }, { non_user: true }); savedchat = document.getElementsByClassName("chat_message_window")[1]; active = document.querySelectorAll(".activeChat");for(var i=0;i<active.length;i++) { active[i].className = ""; }; this.className = "activeChat"; holodeck.selectRoom({"name": this.getAttribute("title") + "- Room #01","xmpp_name": this.getAttribute("id") + "-" + this.getAttribute("game") + "-1","type":"game"}); setTimeout( function() { document.getElementsByClassName("chat_message_window")[1].innerHTML = savedchat.innerHTML; }, 1000); };    //li.onclick = function(e) { savedchat = document.getElementsByClassName("chat_message_window")[1]; active = document.querySelectorAll(".activeChat");for(var i=0;i<active.length;i++) { active[i].className = ""; }; this.className = "activeChat"; holodeck.selectRoom({"name": this.getAttribute("title") + "- Room #01","xmpp_name": this.getAttribute("id") + "-" + this.getAttribute("game") + "-1","type":"game"}); var title = this.getAttribute("title"); };
	    ul.appendChild(li);
      
      //Add radio buttons to select default
      var input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("title","Default Chat Room");
      input.setAttribute("name","Default");
      li.appendChild(input);
      
      li.innerHTML = li.innerHTML + game_list[x].title;
    }
    
    //Checks default radio button
    document.getElementById(defaultChat).children[0].checked = true;
    
    //Saves default chat
    var x = document.querySelectorAll('[name="Default"]')
    for(var i=0; i<x.length; i++) {
      x[i].onclick = function (e) {
        e.stopPropagation();
        localStorage.setItem("KCSDefault", this.parentNode.id);
        var div = document.createElement("div");
        div.className = "chat-message";
        div.innerHTML = "Default Chat: " + this.parentNode.title;
        div.style.textAlign = "center";
        div.style.background = "#666";
        div.style.color = "white";
        document.getElementsByClassName("chat_message_window")[1].appendChild(div);
      };
    }
    
    //Sets background colour for active room if it's one on the list.
    var current = document.getElementById(active_user._game_id);    
    if (current) {
      current.className = "activeChat";
    }
    
    //Join default chat
    if (document.querySelector("#chat_default_content > p").innerHTML == "No Chat Rooms found!") {
      var d = document.getElementById(defaultChat);
      holodeck.selectRoom({"name": d.getAttribute("title") + "- Room #01","xmpp_name": d.getAttribute("id") + "-" + d.getAttribute("game") + "-1","type":"game"});
      d.className = "activeChat";
    }

    console.log('[Kong Chatroom Switcher] Links Added!');
    clearInterval(initialise);
  }
}

var initialise = setInterval(initialise, 5000);

//console.log('{ title:"' + document.querySelectorAll('[itemprop="name"]')[0].innerHTML + '", game:"' + active_user._game_attributes._object.game_permalink + '", id:"' + kong_ads._targetingParams.game_id + '" },')
