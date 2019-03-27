/**
 * Created by liujie
 */
//设置数字出现的动画
function showNumberWithAnimation( i , j , randNumber ){
    var numberCell = $('#number-cell-' + i + "-" + j );
    numberCell.css({
        'background-color': getNumberBackgroundColor(randNumber),
        'color': getNumberColor(randNumber)
    }).text(randNumber);
    //动画采用jQuery的animate函数来实现
    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop( i , j ),
        left:getPosLeft( i , j )
    },50);
}
//小格子移动动画
function showMoveAnimation( fromx , fromy , tox, toy ){
    var numberCell = $('#number-cell-' + fromx + '-' + fromy );
    numberCell.animate({
        top:getPosTop( tox , toy ),
        left:getPosLeft( tox , toy )
    },200);
}
//更新分数
function updateScore( score ){
    $('#score').text( score );
}

