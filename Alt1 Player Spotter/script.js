// bootstrap qw from runeappslib.js since minimap.js uses it
qw = function(){};

var playerDot = null;
ImageData.fromBase64(function (result) { 
    playerDot = result; 
}, "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAXSURBVBhXY/j///+fP38Ynj97/ub1GwBRiAtpG5iqmAAAAABJRU5ErkJggg==\n");
var minimapReader = new MinimapReader();
var minimap = null;

var minimapRefreshInterval = 5000;
var playerFinderInterval = 1000;

var Status = {
    STARTING: {
        id: "STARTING",
        text: "Starting...",
        class: "paused"
    },
    PAUSED: {
        id: "PAUSED",
        text: "Paused",
        class: "paused"
    },
    RUNNING: {
        id: "RUNNING",
        text: "OK",
        class: "ok"
    },
    ALERT: {
        id: "ALERT",
        text: "PLAYERS DETECTED!",
        class: "alert"
    }
};

var status = Status.PAUSED.id;

var statusText = null;
var container = null;
var stateButton = null;
var triggered = 0;

function start() {
    statusText = document.getElementById("status");

    if (!window.alt1) {
        statusText.innerText = "Alt1 not detected!";
        return false;
    }
    
    container = document.getElementById("container");
    stateButton = document.getElementById("state-button");
    
    setStatus(Status.STARTING);

    findMinimap();
    setInterval(function() {
        findMinimap();
    }, minimapRefreshInterval);

    setInterval(function() {
        if (!minimap || status == Status.PAUSED.id) {
            return;
        }

        var minimapRegion = a1lib.getregion(minimap.x, minimap.y, minimap.w, minimap.h);
        var players = findPlayers(minimapRegion);
        setStatus(players > 0 ? Status.ALERT : Status.RUNNING);
		if (players > 0) {
			if (triggered == 0) {
				triggered = 1;
				Alert();
			}
		}
		else {
			triggered = 0;
		}
    }, playerFinderInterval);
}

function changeState() {
    if (window.status != Status.PAUSED.id) {
        setStatus(Status.PAUSED);
    } else {
        setStatus(Status.RUNNING);
    }
}

function setStatus(status) {
    if (statusText) {
        statusText.innerText = status.text;
    }
    if (container) {
        container.className = status.class;
    }

    if (stateButton) {
        var stateButtonText = status.id == Status.PAUSED.id ? "Start" : "Pause";
        stateButton.innerText = stateButtonText;
    }

    window.status = status.id;
}

function findPlayers(minimapRegion) {
    if (!minimap) {
        return 0;
    }
    return a1lib.findsubimg(minimapRegion, playerDot).length;
}

function findMinimap() {
    minimap = minimapReader.find();
}

function Alert() {
	var audio = new Audio('sounds/alarm2.wav');
	audio.play();
}
