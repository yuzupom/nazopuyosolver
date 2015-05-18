// 2手で1秒
// 3手で57秒
// 4手で4571秒
var gol_str = gol[0].split(",")
var tsumo_num = gol_str.length
var gogen = []
for (var i = 0;i < tsumo_num;i++){
	gogen.push(String(gol_str[i]).substr(0,2))
}

var TSUMO_PATTERN = ["10","11","12","20","21","22","23","30","31","32","33","40","41","42","43","50","51","52","53","60","62","63"]
var test_go = new Array(tsumo_num)
bruteforce_search()
var current_puyofu = new Array(tsumo_num);

function recursive_search(n){
	var time = Date.now()
	for (var i = 0;i < TSUMO_PATTERN.length;i++){
		go[n] = gogen[n] + TSUMO_PATTERN[i]
		make_field(n)
	}
	alert(Date.now() - time)
	alert(test_go)
}

function make_field(n){
	goi = n
	faqmn()
	faqmp()
}
function bruteforce_search(){
	var time = Date.now()
	var current_puyofu = new Array(tsumo_num);
	var chkstr;
	past_field_str = null,new_field_str = null;
	for(var i = 0;i < tsumo_num; i++){
		current_puyofu[i] = 0;
	}
	while(current_puyofu != null){
		for (var i = 0; i < tsumo_num; i++){
			test_go[i] = gogen[i] + TSUMO_PATTERN[current_puyofu[i]]
		}
		go = test_go
		make_field(tsumo_num - 1)
		new_field_str = gf.toString()
		do {
			past_field_str = new_field_str
			faqmn()
			new_field_str = gf.toString()
		}while(gok == true && past_field_str != new_field_str);
		chkstr = lbI.innerHTML.toUpperCase()
		if( chkstr.indexOf('<B><FONT COLOR="#FF0000">') != -1){
			//break;
		}

		current_puyofu = next_puyofu(current_puyofu)
	}
	alert(Date.now() - time)
	alert(go)
}

function next_puyofu(puyofu){
	for(var i = 0 ;i < tsumo_num; i++){
		puyofu[i] ++;
		if(puyofu[i] >= TSUMO_PATTERN.length){
			if(i == tsumo_num - 1){
				return null;
			}
			puyofu[i] = 0;
		}else{
			break;
		}
	}
	return puyofu;
}