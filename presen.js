//canvasの設定
const canvas = document.getElementById( 'canvas' );
canvas.width = 640;		//canvasの横幅
canvas.height = 640;	//canvasの縦幅
 
//コンテキストを取得
const ctx = canvas.getContext( '2d' );
 
//画像のオブジェクトを作成
const robot = new Object();
robot.img = new Image();
robot.img.src= '12_robot_3d.png';
robot.x = 0;
robot.y = 0;
robot.move = 0;

//キーボードのオブジェクトを作成
const key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = '';

//マップの作成
const map = [
	// [0, 0, 1, 0, 1, 0, 0, 0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0],
	// [0, 1, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0],
	// [0, 0, 1, 1, 0, 0, 0, 1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0],
	// [1, 0, 1, 0, 1, 1, 0, 0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,0 ,1 ,0],
	// [0, 0, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0],
	// [0, 1, 1, 1, 0, 0, 0, 0 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
	// [0, 1, 1, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0],
	// [0, 0, 0, 1, 0, 0, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
	// [1, 1, 0, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1],
	// [1, 0, 0, 0, 0, 0, 1, 1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0],
	// [1, 0, 1, 1, 1, 0, 0, 0 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0],
	// [1, 0, 1, 0, 1, 1, 1, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,1],
	// [0, 0, 1, 0, 0, 1, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,0],
	// [0, 1, 1, 1, 0, 1, 0, 1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,0],
	// [0, 0, 0, 1, 0, 1, 0, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0],
	// [1, 1, 0, 1, 0, 1, 0, 1 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0],
	// [0, 0, 0, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
	// [0, 1, 1, 1, 0, 1, 0, 0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1],
	// [0, 1, 0, 0, 0, 1, 0, 1 ,1 ,1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
	// [0, 0, 0, 1, 0, 0, 0, 1 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,0]
	[0, 0, 0, 1, 1, 1, 1, 0 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ,1],
	[0, 1, 0, 0, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,1 ,0 ,1],
	[0, 1, 1, 0, 1, 0, 1, 1 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,1 ,1 ,1],
	[0, 1, 1, 0, 1, 0, 1, 1 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0],
	[0, 1, 0, 0, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,1 ,1 ,0],
	[0, 0, 0, 1, 1, 1, 1, 0 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
	[0, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
	[0, 0, 0, 0, 1, 1, 0, 1 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0],
	[1, 0, 1, 0, 1, 1, 0, 1 ,0 ,1 ,0 ,1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,1],
	[1, 0, 1, 0, 0, 0, 0, 1 ,0 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,0 ,0 ,1 ,1],
	[1, 0, 1, 0, 1, 1, 0, 1 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0 ,1],
	[1, 0, 1, 0, 1, 1, 0, 0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,1 ,1 ,0],
	[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
	[1, 1, 0, 1, 1, 1, 0, 1 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,1 ,1],
	[1, 1, 1, 0, 1, 0, 1, 1 ,0 ,0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1],
	[1, 1, 1, 1, 0, 1, 1, 0 ,0 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1],
	[1, 1, 1, 1, 0, 1, 1, 1 ,0 ,0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1],
	[1, 1, 1, 1, 0, 1, 1, 1 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,0],
	[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,0],
	[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,0],
]

//左移動の仕方
function moveLeft(){
	let x = robot.x/32;
	let y = robot.y/32;
	x--;
	if ( map[y][x] === 0 ) {
		robot.move = 32;
		key.push = 'left';
	} 
}

//↑移動の仕方
function moveUp(){
	let x = robot.x/32;
	let y = robot.y/32;
	if ( y > 0) {
		y--;
		if ( map[y][x] === 0 ) {
			robot.move = 32;
			key.push = 'up';
		}
	}
}

//右移動の仕方
function moveRight(){
	let x = robot.x/32;
	let y = robot.y/32;
	x++;
	if ( map[y][x] === 0 ) {
		robot.move = 32;
		key.push = 'right';
	}
}

//下移動の仕方
function moveDown(){
	let x = robot.x/32;
	let y = robot.y/32;
	if ( y < 19 ) {
		y++;
		if ( map[y][x] === 0 ) {
			robot.move = 32;
			key.push = 'down';
		}
	}
}

//位置によるアラート
let assessment1Count = 0;
let assessment2Count = 0;
let assessment3Count = 0;
let goalCount = 0;
function positionCheck(){
	if (robot.x/32 === 0 && robot.y/32 === 6 && assessment1Count === 0){
		alert('初日から比べてできることが増えて来ましたね🤗');
		assessment1Count++;
	} else if (robot.x/32 === 10 && robot.y/32 === 12 && assessment2Count === 0){
		alert('伸びしろですねぇ😍');
		assessment2Count++;
	} else if (robot.x/32 === 18 && robot.y/32 === 17 && assessment3Count === 0){
		alert('残すはプレゼンのみ？😋');
		assessment3Count++;
	} else if (robot.x/32 === 19 && robot.y/32 === 19 && goalCount === 0){
		alert('ゴール！無事完走できました😁');
		goalCount++;
	} 
	requestAnimationFrame( main );
}


//メインループ
function main() {
//map ブロック作成
	for (let y=0; y<map.length; y++) {
		for (let x=0; x<map[y].length; x++) {
      if( x === 0 && y === 0){
        ctx.fillStyle = 'blue';
        ctx.fillRect(x*32, y*32, 32, 32); 
      } else if( x === map.length -1 && y === map.length -1){
        ctx.fillStyle = 'red';
        ctx.fillRect(x*32, y*32, 32, 32); 
      } else if ( map[y][x] === 0 ) {
      ctx.fillStyle = 'white';
      ctx.fillRect(x*32, y*32, 32, 32);
      } else if ( map[y][x] === 1 ) {
      ctx.fillStyle = 'black';
      ctx.fillRect(x*32, y*32, 32, 32);
      }
		}
	}

	//画像を表示
	ctx.drawImage( robot.img, robot.x, robot.y );

	addEventListener("keydown", keydownfunc, false);
	addEventListener("keyup", keyupfunc, false);
	
	//方向キーが押されている時は、移動する
	if ( robot.move === 0 ) {
		if ( key.left === true ) {
			moveLeft();
		}	else if ( key.up === true ) {
			moveUp();
		}	else if ( key.right === true ) {
			moveRight();
		}	else if ( key.down === true ) {
			moveDown();
		}
		// ボタンをクリックしたとき
		btnleft.addEventListener("click", moveLeft);
		btnup.addEventListener("click", moveUp);
		btnright.addEventListener("click", moveRight);
		btndown.addEventListener("click", moveDown)
	}


	//robot.moveが0より大きい時は、4pxずつ移動を続ける
	if (robot.move > 0) {
		robot.move -= 4;
		if ( key.push === 'left' ) robot.x -= 4;
		if ( key.push === 'up' ) robot.y -= 4;
		if ( key.push === 'right' ) robot.x += 4;
		if ( key.push === 'down' ) robot.y += 4;
	}


	requestAnimationFrame( positionCheck );

}
//ページと依存している全てのデータが読み込まれたら、メインループ開始
addEventListener('load', main(), false);

//キーボードが押されたときに呼び出される関数
function keydownfunc( event ) {
  let key_code = event.keyCode;
	if( key_code === 37 ) key.left = true;
	if( key_code === 38 ) key.up = true;
	if( key_code === 39 ) key.right = true;
	if( key_code === 40 ) key.down = true;
	event.preventDefault();		//方向キーでブラウザがスクロールしないようにする
}

//キーボードが放されたときに呼び出される関数
function keyupfunc( event ) {
  let key_code = event.keyCode;
	if( key_code === 37 ) key.left = false;
	if( key_code === 38 ) key.up = false;
	if( key_code === 39 ) key.right = false;
	if( key_code === 40 ) key.down = false;
}
