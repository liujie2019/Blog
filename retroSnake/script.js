/*
    思路：
    1.绘制地图
    地图其实就是动态创建一个div元素，设置其宽、高、背景颜色等属性，然后将其添加到页面中
    2.绘制食物
    有一个绘制食物的方法
    3.绘制小蛇
    绘制小蛇的方法
    小蛇移动的方法
     */
    //绘制地图
        function drawMap(){
            //私有成员
            var h=500;
            var w=1000;
            this.showMap=function(){//创建地图，并将其添加到页面中
                var tu=document.createElement("div");
                tu.style.width = w+'px';
                tu.style.height = h+'px';
                tu.style.top = 120 + 'px';
                tu.style.left = 170 + 'px';
                tu.style.position = "absolute";
                tu.style.backgroundColor = 'pink';
                document.body.appendChild(tu);
                // console.log(tu.offsetLeft);
            }
        }

        //绘制食物
        function drawFood(){
            //私有成员，用来设置食物的大小和位置
            var len=20;
            //xFood和yFood定义了食物（权值）
            //把食物（权值）坐标声明为公开的，以便在外部访问
            this.xFood = 0;
            this.yFood = 0;
            this.food = null;//定义食物对象
            this.showFood = function(){
                if(this.food === null){
                    this.food = document.createElement("div");
                    this.food.style.width = len+'px';
                    this.food.style.height = len+'px';
                    this.food.className = 'snake';
                    this.food.style.backgroundColor = "green";

                    this.food.style.position = "absolute";//设置食物绝对定位
                    document.body.appendChild(this.food);
                }
                //这里是用来随机控制食物出现的位置的
                    this.xFood = Math.floor(Math.random()*50);//随机生成一个0-49的随机数
                    this.yFood = Math.floor(Math.random()*25);//随机生成一个0-24的随机数
                    this.food.style.left =170+this.xFood*len+'px';
                    this.food.style.top =120+this.yFood*len+'px';
                }
        }
        //绘制小蛇
        function drawSnake(){
            var len = 20;
            // console.log(oScore);
            this.direct = "right";
            // this.speedX = 0;
            // this.speedY = 0;
            //每个蛇节：[x坐标,y坐标,颜色,蛇节对象]
            //蛇节的坐标都是用权值来设置的
            //数组的最后一个是蛇头
            this.snakebody = [[0,1,"green",null],[1,1,"green",null],[2,1,"green",null],[3,1,"red",null]];
            //绘制小蛇
            this.showSnake = function(){
                for(var i=0;i<this.snakebody.length;i++){
                    if(this.snakebody[i][3] === null){//如果蛇节对象为null，则创建一个新的蛇节对象
                        this.snakebody[i][3] = document.createElement("div");
                        this.snakebody[i][3].style.width = len+'px';
                        this.snakebody[i][3].style.height = len+'px';
                        this.snakebody[i][3].className = 'snake';
                        this.snakebody[i][3].style.backgroundColor = this.snakebody[i][2];
                        this.snakebody[i][3].style.position = "absolute";//蛇节也都是绝对定位的
                        document.body.appendChild(this.snakebody[i][3]);
                    }
                    //根据每个蛇节的坐标权值来设置蛇节的位置
                    this.snakebody[i][3].style.left = 170+this.snakebody[i][0]*len+'px';
                    this.snakebody[i][3].style.top = 120+this.snakebody[i][1]*len+'px';
                }
            };

            //小蛇移动方法
            this.moveSnake = function()
            {
                //非蛇头蛇节(当前蛇节的新坐标是下一个蛇节的旧坐标)
                for(var i=0;i<this.snakebody.length-1;i++){
                    this.snakebody[i][0] = this.snakebody[i+1][0];
                    this.snakebody[i][1] = this.snakebody[i+1][1];
                }
                //设置蛇头的坐标
                if(this.direct == "right"){
                    //如果向右移动，则蛇头横坐标的权值加1
                    this.snakebody[this.snakebody.length-1][0]+=1;
                }
                if(this.direct == "left"){
                    //如果向左移动，则蛇头横坐标的权值减1
                    this.snakebody[this.snakebody.length-1][0]-=1;
                }
                if(this.direct == "up"){
                    //如果向上移动，则蛇头纵坐标的权值减1
                    this.snakebody[this.snakebody.length-1][1]-=1;
                }
                if(this.direct == "down"){
                    //如果向下移动，则蛇头纵坐标的权值加1
                    this.snakebody[this.snakebody.length-1][1]+=1;
                }

            //判断蛇头碰到食物
            //先蛇头坐标的权值
            var xSnake = this.snakebody[this.snakebody.length-1][0];
            var ySnake = this.snakebody[this.snakebody.length-1][1];
            //如果蛇头坐标的权值和食物坐标的权值相等，则蛇头碰到食物
            //如果蛇头碰到食物，则新创建一个蛇节，还要变换食物的位置
            if(xSnake == food.xFood && ySnake == food.yFood)
            {
                score++;
                // console.log(score);
                oScore.innerText = score;
                //如果蛇头碰到食物，则新创建一个蛇节
                //this.snakebody[0][0]、this.snakebody[0][1]分别是最后一个蛇节的横坐标权值和纵坐标权值
                var newjie = [this.snakebody[0][0],this.snakebody[0][1],"green",null];
                //将新蛇节放到数组的最前面
                this.snakebody.unshift(newjie);
                 //原来食物消失，重新生成一个新事物
                //地图上的食物永远只有一个，调用showfood()方法只不过是改变食物的位置而已
                food.showFood();
            }

            //判断游戏是否结束
            //控制小蛇在地图范围内移动
            //当蛇头横坐标的权值小于0时，蛇头碰到地图右边界
            //当蛇头横坐标的权值大于49时，蛇头碰到地图左边界
            //当蛇头纵坐标的权值小于0时，蛇头碰到地图上边界
            //当蛇头纵坐标的权值大于24的时候，蛇头碰到地图的下边界
            if(xSnake<0 || xSnake>49 || ySnake<0 || ySnake>24)
            {
                alert("Game Over");
                clearInterval(timer);
                return false;
            }
            //不能吃到自己(蛇头坐标与其他蛇节坐标一致)
            //利用循环判断，各个蛇节的坐标权值是否与蛇头坐标权值相同，相同则游戏结束
            for(var i=0;i<this.snakebody.length-1;i++){
                if(this.snakebody[i][0] == xSnake&&this.snakebody[i][1] == ySnake){
                    alert("You killed by yourself");
                    clearInterval(timer);
                    return false;
                }
            }
            //根据新坐标重新绘制小蛇
            //每次移动小蛇后，通过重新绘制小蛇来实现小蛇移动
            this.showSnake();
            };
        }
        var oStart = document.getElementById("start");
        var oStop = document.getElementById("stop");
        var oNewGame = document.getElementById("newgame");
        // var oSelect = document.getElementById("select");
        // var oPtions = oSelect.getElementsByTagName("option");
        var score = 0;
        var oScore = document.getElementById("score");
        var timer = null;
        var speed = 0;
        var map = new drawMap();
        map.showMap();
        oStart.onclick = function(){
            timer = setInterval("snake.moveSnake()",200);
        };
        oStop.onclick = function(){
            clearInterval(timer);
        };
        oNewGame.onclick = function(){
            clearInterval(timer);
            var aSnake = document.querySelectorAll(".snake");
            for(var i=0,len=aSnake.length;i<len;i++){
                document.body.removeChild(aSnake[i]);
            }
            food = new drawFood();
            food.showFood();//调用这个方法后，就生成了页面上唯一的食物，以后只是随机改变这个食物的位置
            snake = new drawSnake();
            snake.showSnake();
            score = 0
            oScore.innerText = 0;
            timer = setInterval("snake.moveSnake()",200);
        };
        document.onkeydown = function(ev){
            var ev = ev || window.event;
            var num = ev.keyCode;
            switch(num){
                case 38:
                case 87:
                snake.direct="up";
                break;
                case 40:
                case 83:
                snake.direct="down";
                break;
                case 37:
                case 65:
                snake.direct="left";
                break;
                case 39:
                case 68:
                snake.direct="right";
                break;
            }
        };
