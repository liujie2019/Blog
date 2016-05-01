function $(id){
    return document.getElementById(id);
}
//获取三个可选的图片
var s1=$("select1");//石头
var s2=$("select2");//剪刀
var s3=$("select3");//布
//获取结果区
var myRes=$("mine");
var cpRes=$("cpt");
var res=$("result1");
//取得统计数据
var count=$("count1");
var cnt=0;
//为三个可选图片绑定事件
s1.addEventListener('click',function(){
    myRes.setAttribute("src","shitou.png");
    cpSelect("st");
},false);
s2.addEventListener('click',function(){
    myRes.setAttribute("src","jiandao.png");
    cpSelect("jd");
},false);
s3.addEventListener('click',function(){
    myRes.setAttribute("src","bu.png");
    cpSelect("bu");
},false);
//电脑随机选择
function cpSelect(mySelect){
    var num=Math.round(Math.random()*2);//num取值0,1,2
    if(num==0){
        cpRes.setAttribute("src","shitou.png");
        compare("st",mySelect);
    }
    if(num==1){
        cpRes.setAttribute("src","jiandao.png");
        compare("jd",mySelect);
    }
    if(num==2){
        cpRes.setAttribute("src","bu.png");
        compare("bu",mySelect);
    }
}

function compare(select1,select2){
    if(select1==select2){
        res.innerHTML="平局";
    }else if((select2=="st"&&select1=="jd")||(select2=="jd"&&select1=="bu")||(select2=="bu"&&select1=="st")){
        res.innerHTML="好厉害，你赢了";
        cnt++;
        count.innerHTML=cnt;
    }else if((select2=="st"&&select1=="bu")||(select2=="jd"&&select1=="st")||(select2=="bu"&&select1=="jd")){
        res.innerHTML="对不起，你输了";
    }
}
