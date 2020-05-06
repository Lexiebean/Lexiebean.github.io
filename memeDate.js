Date.prototype.getNextMeme = function(d,h) {
  if (d) {
    var next = this;
    next.setDate(this.getDate() - this.getDay() + 7 + d);
    next.setUTCHours(h,0,0);
    return next;
  }
}

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var now = new Date();
var nextMemeStart = now.getNextMeme(-1,10);
nextMemeStart = days[nextMemeStart.getDay()] + " " + nextMemeStart.toLocaleString(navigator.languages[0]);
document.getElementById("memeStart").innerHTML = nextMemeStart;

var now = new Date();
var nextMemeEnd = now.getNextMeme(1,2);
nextMemeEnd = days[nextMemeEnd.getDay()] + " " + nextMemeEnd.toLocaleString(navigator.languages[0]);
document.getElementById("memeEnd").innerHTML = nextMemeEnd;