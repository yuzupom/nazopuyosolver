// 2手で1秒
// 3手で20秒
// 4手で122秒?
// 5手で----秒
var gol_str = gol[0].split(",")
var tsumo_num = gol_str.length
var gogen = []
for (var i = 0;i < tsumo_num;i++){
	gogen.push(String(gol_str[i]).substr(0,2))
}
var current_puyofu = new Array(tsumo_num);
var TSUMO_PATTERN = ["10","11","12","20","21","22","23","30","31","32","33","40","41","42","43","50","51","52","53","60","62","63"]
var test_go = new Array(tsumo_num)
var time = Date.now()
recursive_search(0);
alert(Date.now() - time)




function recursive_search(n){
	for (var i = 0;i < TSUMO_PATTERN.length;i++){
		if(n == tsumo_num){
			faqm(n)
			chkstr = lbI.innerHTML.toUpperCase()
			if( chkstr.indexOf('<B><FONT COLOR="#FF0000">') != -1){
				fcol(go)
				return true;
			}else{
				return false;
			}
		}
		go[n] = gogen[n] + TSUMO_PATTERN[i]
		faqm(n)
		if(is_achievable()){
			if(recursive_search(n + 1)){
				return true;
			}
		}else{
			return false;
		}
	}
	return false;
}

function is_achievable(){
	var total_str = gf.join() + gogen.slice(goi).join()
	var color_num = new Array(5)
	var r,g,b,y,p;
	var t;
	var cnt = 0;
	var c = gqc[1],n = gqc[2]
	switch (gqc[0]){
		// cぷよ全て消す
		case 2:
			//ぷよ,色ぷよ
			if (c == 0 || c == 7){
				for(i = 1;i <= 5;i++){
					t = total_str.split(i + '').length - 1;
					if(t > 0 && t < 4 && !erasable(i)){
						return false;
					}
				}
				return true;
			//r,g,b,y,pぷよ
			}else if(c > 0 && c < 6){
				t = total_str.split(c + '').length - 1;
				return (t >= 4 && erasable(c));
			}

		//n連鎖&cぷよ全て消す
		//色の制約を先に調べてn連鎖できるかを調べる 
		case 32:
			//ぷよ,色ぷよ
			if (c == 0 || c == 7){
				for(i = 1;i <= 5;i++){
					t = total_str.split(i + '').length - 1;
					if(t > 0 && t < 4 && !erasable(i)){
						return false;
					}
				}
			//r,g,b,y,pぷよ
			}else if(c > 0 && c < 6){
				t = total_str.split(c + '').length - 1;
				if (t > 0 && t < 4 && !erasable(c)){
					return false;
				}
			}
		//n連鎖する
		case 30: case 31:
			for(i = 1;i <= 5;i++){
				t = total_str.split(i + '').length - 1;
				cnt += Math.floor(t / 4)
			}
			if(cnt == n && gqc[0] == 32 && (c == 0 || c == 7) ){
				for(i = 1;i <= 5;i++){
					if(!erasable(i)){
						return false;
					}
				}
			}
			return (cnt >= n)
		//n色同時に消す
		case 40: case 41:
			for(i = 1;i <= 5;i++){
				t = total_str.split(i + '').length - 1;
				if(t >= 4 && erasable(i)){
					cnt++;
				}
			}
			return (cnt >= n);
	}
}

function erasable(c){
	var left = gogen.slice(goi).join().split(c+'').length - 1
	var column_arr = [0,0,0,0,0,0]
	var i = 0
	//それぞれの列に何個指定の色ぷよがあるか
	while(true){
		i = gf.indexOf(c,i + 1)
		if(i >= 0){
			column_arr[i%8 - 1]++;
		}else{
			break;
		}
	}
	//[0,1,2,0,0,1] -> [3,0,0,1]に変換
	var old = column_arr
	while(true){
		var connection = [0]
		var n = 0;
		for(i = 0;i < old.length; i++){
			if(old[i] == 0 && connection[0] != 0){
				connection.push(0)
				n++
			}else{
				connection[n] += old[i]
			}
		}

		while(connection[connection.length-1] == 0){
			connection = connection.slice(0,-1);
		}
		//[4,0,1,0,1]
		// ->[4,0,3]
		//[4,0,1]
		// ->[6]
		if(left > 0){
			if(connection[0] < 4){
				connection[1]++
			}else{
				for(i = 1; i < connection.length; i++){
					if(connection[i] != 0){
						if(i == connection.length - 1){
							connection[i - 1]++
						}else{
							connection[i + 1]++
							connection = connection.slice(1)
						}
					}
				}
			}
			left--
			old = connection
		}else{
			for(i = 0;i < connection.length;i++){
				if(connection[i] < 4 && connection[i] > 0){
					return false
				}
			}
			return true
		}
	}
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
		faqm(tsumo_num)
		chkstr = lbI.innerHTML.toUpperCase()
		if( chkstr.indexOf('<B><FONT COLOR="#FF0000">') != -1){
			break;
		}

		current_puyofu = next_puyofu(current_puyofu)
	}
	alert(Date.now() - time)
	fcol(go)
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