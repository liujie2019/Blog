//获取可视区域的宽和高
var vWidth = document.documentElement.clientWidth;
var vHeight = document.documentElement.clientHeight;

//获取画布和绘图上下文环境
var canvas = document.getElementById("canvas");
canvas.width = vWidth;
canvas.height = vHeight;
var cxt = canvas.getContext("2d");
var r = 8;//设置小球半径
//设置时钟外边距
var mTop = Math.round(vWidth /10);
var mLeft = Math.round(vHeight /5);
//设置倒计时时间
var endTime = new Date();
endTime.setTime(endTime.getTime()+3600*1000);//设置倒计时一小时
var curShowTimeSeconds = 0;//当前时间到截止时间的间隔

var balls = [];//存放动画小圆数组
var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900",
"#FFBB33","#FF8800","#FF4444","#CC0000"];

//计算目前到截止的时间间隔（秒）
function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	var res = endTime.getTime()-curTime.getTime();//获取间隔的时间毫秒数
	res = Math.floor(res/1000);//转化为秒数
	return res >=0?res:0;
}
//刷新
function update(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();//秒数
	//获取下一帧时间
	var nextHours = parseInt(nextShowTimeSeconds / 3600);
	var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600) / 60);
	var nextSeconds = nextShowTimeSeconds % 60;
	//获取当前时间
	var curHours = parseInt(curShowTimeSeconds / 3600);
	var curMinutes = parseInt((curShowTimeSeconds-curHours*3600) / 60);
	var curSeconds = curShowTimeSeconds % 60;
	if(nextSeconds != curSeconds){
		if(parseInt(nextHours/10) != parseInt(curHours/10)){
			addBalls(mLeft,mTop,parseInt(nextHours/10));
		}
		if(parseInt(nextHours%10) != parseInt(curHours%10)){
			addBalls(mLeft+15*(r+1),mTop,parseInt(nextHours%10));
		}
		if(parseInt(nextMinutes/10) != parseInt(curMinutes/10)){
			addBalls(mLeft+39*(r+1),mTop,parseInt(nextMinutes/10));
		}
		if(parseInt(nextMinutes%10) != parseInt(curMinutes%10)){
			addBalls(mLeft+54*(r+1),mTop,parseInt(nextMinutes%10));
		}
		if(parseInt(nextSeconds/10) != parseInt(curSeconds/10)){
			addBalls(mLeft+78*(r+1),mTop,parseInt(nextSeconds/10));
		}
		if(parseInt(nextSeconds%10) != parseInt(curSeconds%10)){
			addBalls(mLeft+93*(r+1),mTop,parseInt(nextSeconds%10));
		}
		curShowTimeSeconds = nextShowTimeSeconds;
	}
	updateBalls();
}
//创建动画小球
function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				var aBall = {//创建每个数字的小球
					x:x+j*2*(r+1)+(r+1),//小球圆心坐标值
					y:y+i*2*(r+1)+(r+1),
					g:1.5+Math.random(),
					vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,//-4或4
					vy:-5,//垂直方向速度设置为负数，表示小球会先向上运动，然后再向下运动
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}
//创建倒计时动画
function render(cxt){
	cxt.clearRect(0,0,vWidth, vHeight);//每次调用清空画布
	var hours = parseInt(curShowTimeSeconds / 3600);
	var minutes = parseInt((curShowTimeSeconds-hours*3600) / 60);
	var seconds = curShowTimeSeconds % 60;
	// console.log(parseInt(hours/10));
	//绘制计时钟本体
	renderDigit(mLeft,mTop,parseInt(hours/10),cxt);//parseInt(hours/10)这样写是为了防止小数的出现
	renderDigit(mLeft+15*(r+1),mTop,hours%10,cxt);
	renderDigit(mLeft+30*(r+1),mTop,10,cxt);
	renderDigit(mLeft+39*(r+1),mTop,parseInt(minutes/10),cxt);
	renderDigit(mLeft+54*(r+1),mTop,minutes%10,cxt);
	renderDigit(mLeft+69*(r+1),mTop,10,cxt);
	renderDigit(mLeft+78*(r+1),mTop,parseInt(seconds/10),cxt);
	renderDigit(mLeft+93*(r+1),mTop,seconds%10,cxt);
	//绘制动画小球
	for(var i=0,len=balls.length;i<len;i++){
		cxt.fillStyle = balls[i].color;
        	cxt.beginPath();
        	cxt.arc( balls[i].x , balls[i].y , r , 0 , 2*Math.PI);
        	cxt.closePath();
       	cxt.fill();
	}
}
function renderDigit(x,y,num,cxt){//num是时间对应的数字
	cxt.fillStyle = "rgb(0,102,153)";
	for(var i=0;i<digit[num].length;i++){//代表行
		for(var j=0;j<digit[num][i].length;j++){//代表列
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x+j*2*(r+1)+(r+1),y+i*2*(r+1)+(r+1),r,0,Math.PI*2);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}
//小球运动效果
function updateBalls(){
    for( var i = 0,len=balls.length;i<len;i ++ ){
    balls[i].x += balls[i].vx;//小球的横坐标等于其加上其在水平方向的速度值
    balls[i].y += balls[i].vy;
    balls[i].vy +=  balls[i].g;//y的速度减少
        if( balls[i].y >= vHeight-r ){//碰撞检测
        //如果小球的竖直方向的坐标值大于等于屏幕可视区的高度减去小球的半径，则将其重新赋值
            balls[i].y = vHeight-r;
            balls[i].vy = - Math.abs(balls[i].vy)*0.75;
        }
    }
    //性能优化
    var cnt = 0;
    for(var i = 0,len=balls.length;i<len;i++){
        if(balls[i].x+r > 0 && balls[i].x -r < vWidth){
            balls[cnt++] = balls[i];//将仍在画面中的小球排在数组前面
        }
    }
    //console.log(len+"--"+cnt);
    while(balls.length>cnt){
        balls.pop(); //将索引大于cnt的小球删除
    }
  }

curShowTimeSeconds = getCurrentShowTimeSeconds(); //当前时间到截止时间的间隔
setInterval(
        function(){
            render(cxt); //创建计时钟动画
            update();//刷新
 } ,50);

/*
数字绘制
由一个二维数组表示，为1表示应该为一个实心圆，为0表示应该为一片空白
*/
