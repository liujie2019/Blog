var documentWidth = window.screen.availWidth;//当前屏幕的宽度
var gridContainerWidth = 0.92*documentWidth;
var cellSideLength = 0.18*documentWidth;// 格子的大小
var cellSpace = 0.04*documentWidth;// 格子之间的间隔

// 获取相应格子距离顶部的距离
function getPosTop(i, j) {
    return cellSpace + i * (cellSpace + cellSideLength);
}
// 获取相应格子距离左边的距离
function getPosLeft(i, j) {
    return cellSpace + j * (cellSpace + cellSideLength);
}
//给对应的数字格设置背景颜色
function getNumberBackgroundColor( number ){
    switch( number ){
        case 2:
        return "#eee4da";
        break;
        case 4:
        return "#ede0c8";
        break;
        case 8:
        return "#f2b179";
        break;
        case 16:
        return "#f59563";
        break;
        case 32:
        return "#f67c5f";
        break;
        case 64:
        return "#f65e3b";
        break;
        case 128:
        return "#edcf72";
        break;
        case 256:
        return "#edcc61";
        break;
        case 512:
        return "#9c0";
        break;
        case 1024:
        return "#33b5e5";
        break;
        case 2048:
        return "#09c";
        break;
    }
    return "#000";
}
//获取数字的颜色
function getNumberColor( number ){
    if( number <= 4 )
        return "#776e65";
    return "#fff";
}
//私人订制2048设置
function getNumberText( number ){
    switch( number ){
        case 2:
        return "菜鸟";
        break;
        case 4:
        return "实习生";
        break;
        case 8:
        return "程序员";
        break;
        case 16:
        return "项目经理";
        break;
        case 32:
        return "架构师";
        break;
        case 64:
        return "技术经理";
        break;
        case 128:
        return "高级经理";
        break;
        case 256:
        return "技术总监";
        break;
        case 512:
        return "总经理";
        break;
        case 1024:
        return "副总裁";
        break;
        case 2048:
        return "总裁";
        break;
    }
    return "#000";
}
//判断棋盘是否还存在空格
function noSpace( board ){
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ )
            if(board[i][j] == 0)
                return false;
    return true;
}
//判断能否向左移动
function canMoveLeft( board ){
    for( var i = 0 ; i < 4 ; i ++ )//行
        for( var j = 1; j < 4 ; j ++ )//列
            if( board[i][j] != 0 )
                if( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
                    return true;
    return false;
}
//判断能否向右移动
function canMoveRight( board ){
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2; j >= 0 ; j -- )
            if( board[i][j] != 0 )
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j] )
                    return true;
    return false;
}
//判断能否向上移动
function canMoveUp( board ){
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ )
            if( board[i][j] != 0 )
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )
                    return true;
    return false;
}
//判断能否向下移动
function canMoveDown( board ){
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- )
            if( board[i][j] != 0 )
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                    return true;
    return false;
}
//判断水平方向是否有障碍物
function noBlockHorizontal( row , col1 , col2 , board ){
    for( var i = col1 + 1 ; i < col2 ; i ++ )
        if( board[row][i] != 0 )
            return false;
    return true;
}
//判断垂直方向是否有障碍物
function noBlockVertical( col , row1 , row2 , board ){
    for( var i = row1 + 1 ; i < row2 ; i ++ )
        if( board[i][col] != 0 )
            return false;
    return true;
}
//在上下左右都不能移动的时候返回true
function noMove( board ){
    if( canMoveLeft( board ) ||
        canMoveRight( board ) ||
        canMoveUp( board ) ||
        canMoveDown( board ) )
        return false;
    return true;
}
