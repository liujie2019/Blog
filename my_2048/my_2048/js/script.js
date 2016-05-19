var row = 4, col = 4; //棋盘格的行列
var board = [];//格子数组
var score = 0;
var time = 0;
var timer = null;
var hasConflicted = [];
//获取元素
function getId(id){
	return document.getElementById(id);
}
//获取音乐元素
var audio = document.getElementsByTagName("audio")[0];
var music = getId("music");
music.addEventListener("click",function(event){
	if(audio.paused){
		audio.play();
		this.src = "images/music_note_big.png";
		this.setAttribute("class","play");
	}else{
		audio.pause();
		this.src = "images/music_note_big2.png";
		this.setAttribute("class","");
	}
},false);
//页面加载完毕后执行
$(function () {
    prepareForMobile();
    newGame();//开始一个新游戏
    $('#newGameBtn').click(function () {
       newGame();
    });
});
//移动端设置
function prepareForMobile() {
    if (documentWidth > 500) {//如果当前设备的宽度大于500，则采用自适应
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid_container').css({
        'width': gridContainerWidth - 2 * cellSpace,
        'height': gridContainerWidth - 2 * cellSpace,
        'padding': cellSpace,
        'border-radius': 0.02 * gridContainerWidth
    });

    $('.grid-cell').css({
        'width': cellSideLength,
        'height': cellSideLength,
        'border-radius': 0.02 * cellSideLength
    });
}
//开始新游戏
function newGame() {
    //初始化棋盘格
    init();
    //随机选择2个格子生成数字
    generateOneNumber();
    generateOneNumber();
    time = 0;
    clearInterval(timer);
    timer = setInterval(function(){
        time++;
        $("#time").text(time+'s');
    },1000);
}
//初始化
function init() {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            // 取得每一个单元格，并为其设置正确的位置（left和top）
            var $grid_cell = $('#grid_cell_' + i + '_' + j);
            $grid_cell.css('top', getPosTop(i, j));
            $grid_cell.css('left', getPosLeft(i, j));
        }
    }
    for( var i = 0 ; i < row ; i ++ ){
        board[i] = [];
        hasConflicted[i] = [];
        for( var j = 0 ; j < col ; j ++ ){
            board[i][j] = 0;
            hasConflicted[i][j] = false;//初始化的时候每个格子都没有进行过合并
        }
    }
    updateBoardView();
    score = 0;//初始化分数为0
    $('#score').text( score );
    time = 0;
    $("#time").text(time+'s');
}
//更新棋盘格
function updateBoardView(){
    $(".number-cell").remove();//删除所有的格子
    //重新生成新的格子
    for( var i = 0 ; i < 4 ; i ++ ){
        for( var j = 0 ; j < 4 ; j ++ ){
            $("#grid_container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
            var theNumberCell = $('#number-cell-'+i+'-'+j);//获取到相应的格子

            if( board[i][j] == 0 ){//如果当前格子是0
            	   theNumberCell.css({//设置数字的样式
                    'width': '0',
                    'height': '0',
                    //将number-cell放在grid-cell中间
                    'top': getPosTop(i, j) + cellSideLength/2,
                    'left': getPosLeft(i, j) + cellSideLength/2
                });
            }
            else{
            	   theNumberCell.css({
                    'width': cellSideLength+'px',
                    'height': cellSideLength+'px',
                    'top': getPosTop(i, j),
                    'left': getPosLeft(i, j),
                    'background-color': getNumberBackgroundColor(board[i][j]),
                    'color': getNumberColor(board[i][j])
                }).text(board[i][j]);
                if (board[i][j] >= 1024) {
                    theNumberCell.css('font-size','40px');
                }
            }
            hasConflicted[i][j] = false;//更新之后，将每个格子是否进行了合并重新设置为false，表示新的一轮开始了
        }
        //为了手机端的适配
        $('.number-cell').css('line-height', cellSideLength + 'px');
        $('.number-cell').css('font-size', 0.6 * cellSideLength + 'px');
    }
}
//随机选择一个空格并随机生成一个数字
function generateOneNumber(){
    if(noSpace(board))
        return false;
    //随机一个位置
    var randx = parseInt( Math.floor( Math.random()  * 4 ) );
    var randy = parseInt( Math.floor( Math.random()  * 4 ) );

    var times = 0;
    //随机的机会是50次，如果50次还没有找到空格，则手动找到一个空格
    while( times < 50 ){
        if( board[randx][randy] == 0 )
            break;
        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );
        times ++;
    }
    //手动找到一个空格
    if( times == 50 ){
        for( var i = 0 ; i < 4 ; i ++ ){
            for( var j = 0 ; j < 4 ; j ++ ){
                if( board[i][j] == 0 ){
                    randx = i;
                    randy = j;
                }
            }
        }
    }
    //随机一个数字,80%的概率生成2
    var randNumber = Math.random() < 0.8 ? 2 : 4;
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx , randy , randNumber);
    return true;
}
//绑定上下左右键事件
$(document).keydown( function(e){
    switch(e.keyCode){
        case 37: //left
        case 65:
        e.preventDefault();//阻止默认事件，防止滚动条滚动
            if(moveLeft()){
                setTimeout(generateOneNumber,210);
                setTimeout(isGameOver,300);
            }
            break;
        case 38: //up
        case 87:
        e.preventDefault();//阻止默认事件，防止滚动条滚动
            if(moveUp()){
                setTimeout(generateOneNumber,210);
                setTimeout(isGameOver,300);
            }
            break;
        case 39: //right
        case 68:
        e.preventDefault();//阻止默认事件，防止滚动条滚动
            if(moveRight()){
                setTimeout(generateOneNumber,210);
                setTimeout(isGameOver,300);
            }
            break;
        case 40: //down
        case 83:
        e.preventDefault();//阻止默认事件，防止滚动条滚动
            if(moveDown()){
                setTimeout(generateOneNumber,210);
                setTimeout(isGameOver,300);
            }
            break;
    }
});
//移动端触摸事件的设置
document.addEventListener('touchstart',function(e){
    startx = e.touches[0].pageX;//touches是一个数组
    starty = e.touches[0].pageY;//获取到触摸点的坐标
});

//解决touch事件不会触发的bug
document.addEventListener('touchmove',function(e){
    e.preventDefault();//阻止默认事件
});

document.addEventListener('touchend', function(e) {
    endx = e.changedTouches[0].pageX;//changedTouches触摸结束的信息
    endy = e.changedTouches[0].pageY;
    var deltax = endx - startx;//deltax大于0，则向X轴正方向滑动
    var deltay = endy - starty;//deltay大于0，则向Y轴正方向滑动

    if (Math.abs(deltax) < 0.3 * documentWidth && Math.abs(deltay) < 0.3 * documentWidth) {
    //如果deltax和deltay小于一定值后，则判定不是滑动
        return;
    }
    //如果在水平滑动距离大于垂直滑动的距离，则是在水平方向上滑动
    if (Math.abs(deltax) >= Math.abs(deltay)) {
        if (deltax > 0) {//deltax > 0表示向x轴正方向即向右移动
            if (moveRight()) {
                setTimeout(generateOneNumber, 210);
                setTimeout(isGameOver, 300);
            }
        } else {//否则向左移动
            if (moveLeft()) {
                setTimeout(generateOneNumber, 210);
                setTimeout(isGameOver, 300);
            }
        }
    } else {//如果在水平滑动距离小于垂直滑动的距离，则是在垂直方向上滑动
        if (deltay > 0) {
            if (moveDown()) {
                setTimeout(generateOneNumber, 210);
                setTimeout(isGameOver, 300);
            }
        } else {
            if (moveUp()) {
                setTimeout(generateOneNumber, 210);
                setTimeout(isGameOver, 300);
            }
        }
    }
});
//向左移动
function moveLeft(){
    if( !canMoveLeft( board ) )//先判断是否可以向左移动
        return false;
    //moveLeft
    for( var i = 0 ; i < 4 ; i ++ ){
        for( var j = 1 ; j < 4 ; j ++ ){//最左边的那一列不需要判断
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < j ; k ++ ){
                    //2 2 4 8 => 4 4 8
                    //2只能进行一次合并
                    if( board[i][k] == 0 && noBlockHorizontal( i , k , j , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board ) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;//一旦[i][k]这个位置发生了合并，将其设置为true
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView,200);//更新整个棋盘
    return true;
}
//向右移动
function moveRight(){
    if( !canMoveRight( board ) )
        return false;
    //moveRight
    for( var i = 0 ; i < 4 ; i ++ ){
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){
                    if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation( i , j , i , k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView,200);
    return true;
}
//向上移动
function moveUp(){
    if( !canMoveUp( board ) )
        return false;
    //moveUp
    for( var j = 0 ; j < 4 ; j ++ ){
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
}
    setTimeout(updateBoardView,200);
    return true;
}
//向下移动
function moveDown(){
    if( !canMoveDown( board ) )
        return false;
    //moveDown
    for( var j = 0 ; j < 4 ; j ++ ){
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){
                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) && !hasConflicted[k][j] ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView,200);
    return true;
}
//判断游戏是否结束
function isGameOver(){
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (board[i][j] == 2048) {
                alert('挑战成功,看好你少年！');
                return;
            }
        }
    }
    if(noSpace(board) && noMove( board ) ){
        gameOver();
        return false;
    }
}
function gameOver(){
    alert('挑战失败,弱爆了少年!');
}
