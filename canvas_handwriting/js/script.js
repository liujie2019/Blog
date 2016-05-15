var canvasWidth = Math.min(500,$(window).width()-20);//为了适应手机屏幕
var canvasHeight = canvasWidth;
var isMouseDown = false;
var lastLoc = {x:0,y:0};//用于记录鼠标上一次的位置
var lastTimestamp = 0;//用于记录上一次的绘制时间戳
var lastLineWidth = -1;//记录上一次线条的宽度，初始化为-1
var strokeColor = "#000";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;//设置canvas的宽和高
$("#wrap").css("width",canvasWidth+"px");
drawGrid();//绘制书写框

//为清除按钮绑定事件
$("#clear_btn").click(function(){
	ctx.clearRect(0,0,canvasWidth,canvasHeight);
	drawGrid();
});
//切换颜色
$(".color_btn").click(function(){
	$(".color_btn").removeClass("color_btn_selected");
	$(this).addClass("color_btn_selected");
	strokeColor = $(this).css("background-color");
});
//开始绘制
function beginStroke(point){
	isMouseDown = true;
	lastLoc = windowToCanvas(point.x, point.y);
	lastTimestamp = new Date().getTime();
}
//结束绘制
function endStroke(){
	isMouseDown = false;
}
/*
考虑绘制的速度越快，相应的线条应该越细
绘制速度越慢，线条越粗
这里根据绘制的距离和绘制的时间间隔，计算得出线条的宽度
 */
function moveStroke(point){
	var curLoc = windowToCanvas(point.x,point.y);//当前鼠标的位置
	var s = calcDistance(curLoc,lastLoc);
	var curTimestamp = new Date().getTime();
	var t = curTimestamp - lastTimestamp;//获取到时间间隔
	var lineWidth = calcLineWidth(t,s);//计算得出线条的宽度
	//draw
	ctx.beginPath();
	ctx.moveTo(lastLoc.x,lastLoc.y);
	ctx.lineTo(curLoc.x,curLoc.y);
	ctx.strokeStyle = strokeColor;
	ctx.lineWidth = lineWidth;
	ctx.lineCap = "round";//为了线条平滑
	ctx.lineJoin = "round";
	ctx.stroke();
	lastLoc = curLoc;
	lastTimestamp = curTimestamp;//把当前时间戳记录下来
	lastLineWidth = lineWidth;//把新计算出的线条宽度保存起来
}
//给canvas画布绑定事件
canvas.onmousedown = function(e){
	e = e || window.event;
	e.preventDefault();
	beginStroke({x:e.clientX,y:e.clientY});
};
canvas.onmouseup = function(e){
	e = e || window.event;
	e.preventDefault();
	endStroke();
};
canvas.onmousemove = function(e){
	e = e || window.event;
	e.preventDefault();
	if(isMouseDown){//当isMouseDown为true时，鼠标移动才进行绘制
		moveStroke({x:e.clientX,y:e.clientY});
	}
};
canvas.onmouseout = function(e){
	e = e || window.event;
	e.preventDefault();
	endStroke();
};
//移动端事件绑定
canvas.addEventListener("touchstart",function(e){
	e.preventDefault();
	touch = e.touches[0];//获取触摸点的坐标
	beginStroke({x:touch.pageX,y:touch.pageY});
},false);
canvas.addEventListener("touchmove",function(e){
	e.preventDefault();
	if(isMouseDown){
		touch = e.touches[0];//获取触摸点的坐标
		moveStroke({x:touch.pageX,y:touch.pageY});
	}
},false);
canvas.addEventListener("touchend",function(e){
	e.preventDefault();
	endStroke();
},false);
//计算线条的宽度值
var maxLineWidth = 30;//设置最大宽度为30
var minLineWidth = 1;//设置最小宽度为30
var maxStrokeV = 10;//最大的绘制速度为10
var minStrokeV = 0.1;//最小的绘制速度为0.1
function calcLineWidth(t,s){
    var v = s / t;//求出绘制的速度值
    var resultLineWidth;//保存线条宽度
    if( v <= minStrokeV )
    	//如果实际绘制速度小于等于最小的绘制速度，线条宽度设置为最大的线条宽度
        resultLineWidth = maxLineWidth;
    else if ( v >= maxStrokeV )
        resultLineWidth = minLineWidth;
    else{
        resultLineWidth = maxLineWidth - (v-minStrokeV)/(maxStrokeV-minStrokeV)*(maxLineWidth-minLineWidth);
    }
    if( lastLineWidth == -1 )//如果lastLineWidth == -1，说明是我们第一次绘制的线条
        return resultLineWidth;
     /*
     如果lastLineWidth不等于-1,那么说明存在上一次线条宽度，为了实现线条宽度的平滑过渡，
     这里使用上一次线条宽度的2/3和当前线条的1/3来设置线条的宽度
     说明：如果上一次线条宽度占得比例越大，线条越平滑，因为这样跟上一次线条的宽度一致性更高
      */
    return resultLineWidth*1/3 + lastLineWidth*2/3;
}
//获取上一次鼠标位置和当前鼠标位置之前的距离
function calcDistance(loc1,loc2){
	//直接使用两点之间的坐标公式即可
    return Math.sqrt( (loc1.x - loc2.x)*(loc1.x - loc2.x) + (loc1.y - loc2.y)*(loc1.y - loc2.y));
}
//将鼠标在window中的坐标值转化为在canvas中的坐标值
function windowToCanvas(x,y){
       return {
       	x:Math.round(x-canvas.offsetLeft),
       	y:Math.round(y-canvas.offsetTop)
       };
}
//绘制书写框
function drawGrid(){
	ctx.save();
	ctx.strokeStyle = "#f00";
	ctx.beginPath();//开始一个新路径
	ctx.moveTo(3,3);
	ctx.lineTo(canvasWidth-3,3);
	ctx.lineTo(canvasWidth-3,canvasHeight-3);
	ctx.lineTo(3,canvasHeight-3);
	ctx.closePath();//闭合路径
	ctx.lineWidth = 6;
	ctx.stroke();//绘制已经定义的路径

	//context.setLineDash([number1, number2])，参数的数组是虚线的参数，分别单表实线的长度和空格的长度。
	ctx.setLineDash([3,5]);
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(canvasWidth,canvasHeight);

	ctx.moveTo(canvasWidth,0);
	ctx.lineTo(0,canvasHeight);

	ctx.moveTo(canvasWidth/2,0);
	ctx.lineTo(canvasWidth/2,canvasHeight);

	ctx.moveTo(0,canvasHeight/2);
	ctx.lineTo(canvasWidth,canvasHeight/2);

	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.restore();//这里使用save和restore是为了防止drawGrid影响函数外面的绘图环境
}
