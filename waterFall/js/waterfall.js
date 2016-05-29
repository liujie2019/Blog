 window.onload = function(){
        function waterfall(parent,box){
        //将main下的所有class为box的元素取出来
        var oParent = document.getElementById(parent);
        var oBoxs = getByClass(oParent,box);//获取到了所有class为box的div元素
        //console.log(oBoxs.length);   //21
        //计算整个页面显示的列数(页面宽/box的宽)
        var oBoxW = oBoxs[0].offsetWidth;//获取盒子的宽度
        var clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
        var cols = Math.floor(clientWidth/oBoxW);
        //console.log(cols);//6
        //设置main的宽度和居中样式：定宽+自动水平外边距
        oParent.style.cssText = 'width:'+oBoxW*cols+'px;margin:0 auto;';

        var hArr = [];//存放每一列高度的数组
        for(var i=0;i<oBoxs.length;i++){
            var picH = oBoxs[i].offsetHeight;
            if(i<cols){
                hArr[i] = picH;
            }else{
                //apply、call有两种情况需要注意，传null或undefined时，将是JS执行环境的全局变量。浏览器中是window，其它环境（如node）则是global。
                var minH = Math.min.apply(null,hArr);
                //获取最小高度的索引值
                var minHIndex = getminHIndex(hArr,minH);
                //设置绝对定位
                oBoxs[i].style.position = "absolute";
                oBoxs[i].style.top = minH+'px';
                oBoxs[i].style.left = oBoxs[minHIndex].offsetLeft+'px';
                hArr[minHIndex] += oBoxs[i].offsetHeight;//更新添加了块框后的列高
            }
        }

    }
    //通过父级和子元素的class类 获取该同类子元素的数组
    function getByClass(parent,clsName){
        var boxArr = new Array(),//用来存储获取到的所有class为box的元素
        oElements = parent.getElementsByTagName("*");
        for(var i=0;i<oElements.length;i++){
            if(oElements[i].className == clsName){
                boxArr.push(oElements[i]);
            }
        }
        return boxArr;
    }
    /*
    获取数组中最小高度元素的索引值
    获取每一列中最小高度的索引值，下一个的元素放在最小高度列的下方
     */
    function getminHIndex(arr,minH){
        for(var i in arr){
            if(arr[i] == minH){
                return i;
            }
        }
    }
    /*
    判断是否应该加载新图片
    如果可视区的高度加上滚动条滚动的高度大于最后一个盒子距离可视区的高度加上盒子本身高度的一半时就加载下一张图片
     */
    function checkscrollside(){
        var oParent = document.getElementById("main");
        var oBoxs = getByClass(oParent,'box');//获取所有class为box的元素
        var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
        return (lastBoxH<scrollTop+clientHeight) ? true : false;
    }
    waterfall('main','box');
    //json对象，其data属性是一个数组
    var dataInt = {'data':[
                                {'src':"44.jpg"},{'src':"45.jpg"},{'src':"46.jpg"},{'src':"47.jpg"},{'src':"48.jpg"},{'src':"49.jpg"},{'src':"50.jpg"},{'src':"51.jpg"},{'src':"52.jpg"},{'src':"53.jpg"},{'src':"54.jpg"},{'src':"55.jpg"},{'src':"56.jpg"}
                                ],
                    'sentence':[
                   '爱情是世界上最美好的东西，即使它伤了你的心，也要笑着忘却，然后开始下一段旅程。',
                   '长大后，这个社会教会了我，没心没肺，没感觉，不痒不疼，不在乎。',
                   '如果只是相遇，而不能相守，人生最好不相见。',
                   '躲在某一时间，想念一段时光的掌纹；躲在某一地点，想念一个站在来路也站在去路的，让我牵挂的人。',
                   '当你觉得某人很神秘时，才会被吸引；当你觉得某人浪漫时，才会爱上；然而这都转瞬即逝。只有当你觉得某人成为习惯时，生活才开始。',
                   '想你的人自然会来见你，爱你的人会想尽一切办法来到你身边。',
                   '有些人，一旦遇见，便一眼万年；有些心动，一旦开始，便覆水难收。',
                   '每个人，都有一个世界，安静而孤独。',
                   '我站得太久说的太久了我自己都累了，你怎么还是听不懂？我写的太多了写得太久了我自己都累了，你怎么还是看不懂？',
                   '喜欢某人，并不一定要成为恋人，有时候，能做朋友就已足够。朋友是一辈子的事。',
                   '如果回忆象钢铁般坚硬那么我是该微笑还是哭泣，如果钢铁象记忆般腐蚀那这里是欢城还是废墟？',
                   '我们必须接受失望，因为它是有限的，但千万不可失去希望，因为它是无穷的。',
                   '如果我们都是孩子，就可以留在时光的原地，坐在一起一边听那些永不老去的故事一边慢慢皓首。'
                ]};

    window.onscroll = function(){
        if(checkscrollside()){
            var oParent = document.getElementById("main");
            for(var i=0;i<dataInt.data.length;i++){
                var oBox = document.createElement("div");
                oBox.className = "box";
                oParent.appendChild(oBox);
                var oPic = document.createElement("div");
                oPic.className = "pic";
                oBox.appendChild(oPic);
                var oImg = document.createElement("img");
                oImg.src = './img/'+dataInt.data[i].src;
                oPic.appendChild(oImg);
                 var oWrap = document.createElement('div');
                    oWrap.className = 'wrap';
                    oPic.appendChild(oWrap);
                var oLeft = document.createElement('div');
                    oLeft.className = 'mask_left';
                    oWrap.appendChild(oLeft);
               var oRight = document.createElement('div');
                    oRight.className = 'mask_right';
                    oWrap.appendChild(oRight);
                var oP = document.createElement('p');
                    oWrap.appendChild(oP);
                    oP.innerHTML = dataInt.sentence[i];
            }
            waterfall('main','box');
        }
    };
    };
