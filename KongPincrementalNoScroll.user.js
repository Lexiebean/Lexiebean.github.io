// ==UserScript==
// @name         KongPincremental NoScroll
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       NDakota
// @match        http*://www.kongregate.com/games/makopaz/pincremental*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    for(var div of [...document.querySelectorAll("body>div:not(#primarywrap),.maincontent>div,.upper_gamepage>div:not(#floating_game_holder),.game_page_wrap,#below_fold_content,.game_details_outer")])if(div!=document.querySelector(".maincontent>div:not(#user_progress_bar_container)"))div.parentNode.removeChild(div);
})();
