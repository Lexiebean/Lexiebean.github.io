var exp = -1;

$(document).ready(function(){
	$("button").click(function(){
		
		var username = $('#username').val();
		if (!username) { username = 'Sylviebean'; }
		
		$.ajax({
			//url: 'https://cors-anywhere.herokuapp.com/https://apps.runescape.com/runemetrics/profile/profile?user='+ username +'&activities=20',
			url: 'https://corsproxy.io/?' + encodeURIComponent('https://apps.runescape.com/runemetrics/profile/profile?user='+ username +'&activities=20'),
			success: function(result){
				//console.log(result);
				var OP = result;
		
				if(OP.error == "NO_PROFILE") {
					document.getElementById("output").innerHTML ="Couldn't find "+ username + " on the HiScores.";
					return false;
				}
				for(var i=0;i<27;i++) {
					if (OP.skillvalues[i].id == $('#skill').val()) {
						exp = OP.skillvalues[i].xp/10;
					}
				}
				$("#a").val(Math.floor(exp));
		
				JoTCalc.main(null);
			},
			error: function(result){
				document.getElementById("output").innerHTML ="Couldn't find "+ username + " on the Hiscores.";
			}
		});
	});
});


var JoTCalc = (function() {
	function JoTCalc() {}
	JoTCalc.lookupLevelTableByExp = function(x) {
		if ($('#skill').val() == 26) {
			var levels = [0,830,1861,2902,3980,5126,6390,7787,9400,11275,13605,16372,19656,23546,28138,33520,39809,47109,55535,64802,77190,90811,106221,123573,143025,164742,188893,215651,245196,277713,316311,358547,404634,454796,509259,568254,632019,700797,774834,854383,946227,1044569,1149696,1261903,1381488,1508756,1644015,1787581,1939773,2100917,2283490,2476369,2679907,2894505,3120508,3358307,3608290,3870846,4146374,4435275,4758122,5096111,5449685,5819299,6205407,6608473,7028964,7467354,924122,8399751,8925664,9472665,10041285,10632061,11245538,11882262,12542789,13227679,13937496,14672812,15478994,16313404,17176661,18069395,18992239,19945833,20930821,21947856,22997593,24080695,25259906,26475754,27728955,29020233,30350318,31719944,33129852,34580790,36073511,37608773,39270442,40978509,42733789,44537107,46389292,48291180,50243611,52247435,54303504,56412678,58575823,60793812,63067521,65397835,67785643,70231841,72737330,75303019,77929820,80618654];
		}
		else {
			var levels = [0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 4470, 5018, 5624, 6291, 7028, 7824, 8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406, 24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333, 111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368559, 407015, 449428, 496254, 547953, 605032, 668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443, 1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673144, 2951373, 3258594, 3597792, 3972294, 4385776, 4842295, 5346332, 5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431, 14391160,15889109,17542976,19368992,21385073,23611006,26068632,28782069,31777943,35085654,38737661,42769801,47221641,52136869,57563718,63555443,70170840,77474828,85539082,94442737,104273167,115126838];
		}
		for (var i = 1; i < 119; i++) {
			if (x < 83) {
				return 1;
			}
			else if (x >= levels[i] && x <= levels[i + 1]) {
				return i + 1;
			}
		}
		return 120;
	};
	JoTCalc.xpPerBookTable = function(type,x) {
		if (type == 1) { return (3/2)*((x**2)-(2*x)+100) }
		if (type == 2) { return 2*((x**2)-(2*x)+100) }
		if (type == 3) { return 5/2*((x**2)-(2*x)+100) }
		if (type == 4) { return 3*((x**2)-(2*x)+100) }
	};
	JoTCalc.main = function(args) {
		document.getElementById("output").innerHTML = "";
		exp = parseInt(document.getElementById("a").value, 10);
		var type = document.getElementById("type").value;
		var lvl = JoTCalc.lookupLevelTableByExp(exp);
		var r = parseInt(document.getElementById("r").value, 10);
		var strlvl = lvl;
		var j = 0;

		while ((lvl < 120)) {
			j++;
			var temp = lvl;
			for (var h = 0; h < r; h++) {
				var bookexp = JoTCalc.xpPerBookTable(type,lvl);
				exp += bookexp;
				lvl = JoTCalc.lookupLevelTableByExp(exp);
			}
			if ((!/(15|18|19|24|26)/.test($('#skill').val())) && (lvl > 99)) { //Use this when 120 for Farming and Herblore comes out.
				lvl = 120; temp = 300;
			}
			if (lvl > temp) {
				document.getElementById("output").innerHTML += ("You will hit level " + lvl + " on day: " + numberWithCommas(j) + "<br>");
			}
			bookexp = JoTCalc.xpPerBookTable(type,lvl);
		};
		
		if (!/(15|18|19|24|26)/.test($('#skill').val())) {
			var bookexp = JoTCalc.xpPerBookTable(type,99)*r;
		}
		else {
			var bookexp = JoTCalc.xpPerBookTable(type,120)*r;
		}
		
		var exp120 = 104273167-exp;
		var exp200 = 200000000-exp;
		var d120 = Math.ceil((exp120/bookexp)+j);
		var d200 = Math.ceil((exp200/bookexp)+j);

		if (exp) {
			if (!/(15|18|19|24|26)/.test($('#skill').val())) { //Use this when 120 for Farming and Herblore comes out.
				document.getElementById("output").innerHTML += ("You will hit level 120 on day: " + numberWithCommas(d120) + "<br>");
			}
			document.getElementById("output").innerHTML += ("You will hit 200m exp on day: " + numberWithCommas(d200) + "<br>");
		}
	};
	return JoTCalc;
}());
JoTCalc["__class"] = "JoTCalc";

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
