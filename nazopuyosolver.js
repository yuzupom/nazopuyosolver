var gol_str = gol[0].split(",")
var tsumo_num = gol_str.length
var gogen = []
for (var i = 0;i < tsumo_num;i++){
	gogen.push(String(gol_str[i]).substr(0,2))
}

var TSUMO_PATTERN = ["10","11","12","20","21","22","23","30","31","32","33","40","41","42","43","50","51","52","53","60","62","63"]
var test_go = new Array(tsumo_num)
bruteforce_search()

function bruteforce_search(){
	var current_puyofu = new Array(tsumo_num);
	for(var i = 0;i < tsumo_num; i++){
		current_puyofu[i] = 0;
	}
	while(true){
		for (var i = 0; i < tsumo_num; i++){
			test_go[i] = gogen[i] + TSUMO_PATTERN[current_puyofu[i]]
		}
		faqmf()
		go = test_go
		for (var i = 0; i < 60;i++){
			faqmn()
		}
		var chkstr = lbI.innerHTML.toUpperCase()
		if( chkstr.indexOf('<B><FONT COLOR="#FF0000">') != -1){
			alert(test_go)
			break;
		}

		current_puyofu = next_puyofu(current_puyofu)
	}
}

function next_puyofu(puyofu){
	for(var i = 0;i < puyofu.length;i++){
		puyofu[i] ++;
		if(puyofu[i] >= TSUMO_PATTERN.length){
			puyofu[i] = 0;
		}else{
			break;
		}
	}
	return puyofu;
}