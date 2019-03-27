function newGame(wraper){
        this.wraper=wraper;
        this.cards=new Array(16);
    }
    newGame.prototype={//原型对象
        //初始化
        init:function(){
            for(var i=0;i<this.cards.length;i++){
                var card=this.creatCard(0);
                this.wraper.appendChild(card);
                this.cards[i]=card;
            }
            this.randomCard();
            this.randomCard();
        },
        //新建一个卡片
        creatCard:function(val){
            var card=document.createElement("div");
            this.setCardVal(card,val);
            return card;
        },
        //设置卡片的值
        setCardVal:function(card,val){
            card.className="card card"+val;
            card.setAttribute("val",val);
            card.innerHTML=val>0?val:"";
        },
        //随机生成一张卡片
        randomCard:function(){
            var zeroCard=[];
            for(var i=0;i<this.cards.length;i++){
                //console.log(this.cards[i].getAttribute("val"));//0
                if(this.cards[i].getAttribute("val")==0){
                    zeroCard.push(this.cards[i]);
                }
            }
            var rdmCard=zeroCard[Math.floor(Math.random()*zeroCard.length)];
            this.setCardVal(rdmCard,Math.random()>0.8?4:2);
        },
        //控制卡片移动
        move:function(m){
            var j;
            switch(m){
                case 38:
                case 87://向上移动
                //alert(1);
                for(var i=4;i<this.cards.length;i++){
                    j=i;
                    while(j>=4){
                        this.merge(this.cards[j-4],this.cards[j]);
                        j-=4;
                    }
                }
                break;
                case 40:
                case 83://向下移动
                for(var i=11;i>=0;i--){
                    j=i;
                    while(j<=11){
                        this.merge(this.cards[j+4],this.cards[j]);
                        j+=4;
                    }
                }
                break;
                case 37:
                case 65://向左移动
                for(var i=1;i<this.cards.length;i++){
                    j=i;
                    while(j%4!=0){
                        this.merge(this.cards[j-1],this.cards[j]);
                        j-=1;
                    }
                }
                break;
                case 39:
                case 68://向右移动
                for(var i=14;i>=0;i--){
                    j=i;
                    while(j%4!=3){
                        this.merge(this.cards[j+1],this.cards[j]);
                        j+=1;
                    }
                }
                break;
            }
            this.randomCard();//每移动一次就随机生成一张卡片
        },
        //合并卡片
        merge:function(preCard,curCard){
            var preVal=preCard.getAttribute("val");
            var curVal=curCard.getAttribute("val");
            if(curVal!=0){
                if(preVal==0){
                    this.setCardVal(preCard,curVal);
                    this.setCardVal(curCard,0);
                }else if(preVal==curVal){
                    this.setCardVal(preCard,curVal*2);
                    this.setCardVal(curCard,0);
                }
            }
        },
        //判断两个相邻卡片是否相等
        equal:function(card1,card2){
            return card1.getAttribute("val")==card2.getAttribute("val");
        },
        //判断是否成功达到2048
        win:function(){
            for(var i=0;i<this.cards.length;i++){
                if(this.cards[i].getAttribute("val")==2048){
                    return true;
                }
            }
        },
        //判断挑战失败
        over:function(){
            for(var i=0;i<this.cards.length;i++){
                if(this.cards[i].getAttribute("val")==0){//只要存在为0的卡片则不失败
                    return false;
                }
                if(i%4!=0){
                    if(this.equal(this.cards[i-1],this.cards[i])){
                        return false;
                    }
                }
                if(i>=4){
                    if(this.equal(this.cards[i-4],this.cards[i])){
                        return false;
                    }
                }
            }
            return true;
        },
        clean:function(){
            for(var i=0;i<this.cards.length;i++){
                this.wraper.removeChild(this.cards[i]);
            }
             this.cards=new Array(16);
        }
    };
    var game;
    var wrap=document.getElementById("wrap");
    var sBtn=document.getElementById("start");
    sBtn.onclick=function(){
        sBtn.style.display="none";
        game=new newGame(wrap);
        game.init();
    };
    document.onkeydown=function(e){
        var oEvent=e||window.event;
        var num=oEvent.keyCode;
        if([37,38,39,40,65,68,83,87].indexOf(num)!=-1){
            if(game.over()){
                game.clean();
                sBtn.style.display="block";
                sBtn.innerHTML="弱爆了，少年，点击再试";
                return;
            }
            if(game.win()){
                sBtn.style.display="block";
                sBtn.innerHTML="看好你，少年，点击继续";
                return;
            }
            game.move(num);
        }
    };
