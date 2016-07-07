<!DOCTYPE html>
<head>
<meta charset="UTF-8">
<title>History API使用示例</title>
<style type ="text/css">
body {
    margin-left: 0px;
    margin-top: 0px;
}
ul{
    width:100%;
    display: -moz-box;
    display: -webkit-box;
    -moz-box-orient: vertical;
    -webkit-box-orient:vertical;
    margin:0px;
    padding:0px;
}
li{
    list-style:none;
}
ul li ul{
    display: -moz-box;
    display: -webkit-box;
    -moz-box-orient: horizontal;
    -webkit-box-orient:horizontal;
}
h1{
    font-size: 14px;
    font-weight: bold;
    color:white;
    background-color:#7088AD;
    text-align:left;
    padding-left:10px;
    display:block;
    margin:0px;
}
li[id^=title]{
    font-size: 12px;
    color: #333333;
    background-color:#E6E6E6;
    text-align:right;
    padding-right:5px;
    width:110px;
}
li[id^=content]{
    height:22;
    background-color:#FAFAFA;
    text-align:left;
    padding-left:2px;
    width:210px;
}
span{
    color: #ff0000;
}
input{
    width: 95%;
    border:1px solid #0066cc;
    height: 18px;
}
select{
    width: 95%;
    border:1px solid #0066cc;
    height: 18px;
}
div{
    text-align:right;
}
div#buttonDiv{
    width:100%;
}
input[type="button"]{
    font-size: 12px;
    width: 68px;
    height: 20px;
    cursor: pointer;
    border:none;
    font-family:宋体;
    background-color:White;
    color: #000;
}
div#infoTable{
    overflow:auto;
    width:100%;
    height:100%;
}
div#infoTable table{
    width:100%;
    background-color:white;
    cellpadding:1;
    cellspacing:1;
    font-size: 12px;
    text-align: center;
}
div#infoTable  table th{
    height:22;
    background-color:#7088AD;
    color: #FFFFFF;
}
div#infoTable  table tr:nth-child(odd){
    background-color:#E6E6E6;
    color: #333333;
}
div#infoTable  table tr:nth-child(even){
    background-color:#fafafa;
    color: black;
}
div#infoTable  table tr:nth-child(1){
    background-color:#7088AD;
    color: #FFFFFF;
}
</style>
</head>
<body>
<section>
<h1>用户信息一览表</h1>
<div id="infoTable">
    <table id="datatable">
        <tr>
            <th>用户ID</th>
            <th>用户类型</th>
            <th>用户姓名</th>
            <th width="50px">&nbsp;</th>
        </tr>
        <?php
        $link=mysql_connect("localhost","root","root");
        mysql_query("SET NAMES UTF8");
        mysql_select_db("mysql");
        $result = mysql_query('SELECT * FROM users',$link);
        if ($result&&mysql_num_rows($result) > 0) {
            while($obj = mysql_fetch_object($result)){
        ?>
        <tr>
            <td><?php echo $obj->id;?></td>
            <?php if($obj->UserType == "0"){?>
            <td>管理员</td>
            <?php }
            else{?>
            <td>普通用户</td>
            <?php }?>
            <td><?php echo $obj->UserName;?></td>
            <td  width="50px">
            <input type="button" value="详细" id="btnDetail" onclick="btnDetail_onclick(this,<?php echo $obj->id;?>)">
            </td>
        </tr>
        <?php }?>
    </table>
    <?php }?>
    </div>
</section>
<section id="sectionDetail">
</section>
<script>
/*
popstate事件，当用户单击浏览器的后退或前进按钮时触发该事件
在事件处理函数中读取触发事件的事件对象的state属性值，该属性值即为执行pushState()方法时所使用的第一个参数值，其中保存了在向浏览器历史记录中添加记录时同步保存的对象，可以读取该对象并根据该对象值设置当前页面中所需显示的数据
*/
window.addEventListener("popstate", function(e) {
    if(e.state){
    //这里通过state属性值读取用户的用户类型与用户id，并将其作为loadPage函数的两个参数值
    loadPage(e.state.userType,e.state.id);
}
});
function btnDetail_onclick(btn,id)
{
    var userType = btn.parentElement.parentElement.children[1].innerHTML;
    if(loadPage(userType,id))
    {
        var state = new Object();
        state.userType = userType;
        state.id = id;
        if(userType == "普通用户")
            history.pushState(state, null,"edit.php?id="+id);
        else
            history.pushState(state, null,"readOnly.php?id="+id);
    }
}
function loadPage(userType,id){
    if(userType == "普通用户")
    {
        var req = new XMLHttpRequest();
        req.open("GET","edit.php?id="+id,false);
        req.send(null);
        if (req.status == 200) {
            document.getElementById("sectionDetail").innerHTML = req.responseText;
            return true;
        }
        return false;
    }
    else
    {
        var req = new XMLHttpRequest();
        req.open("GET","readOnly.php?id="+id,false);
        req.send(null);
        if (req.status == 200) {
            document.getElementById("sectionDetail").innerHTML = req.responseText;
            return true;
        }
        return false;
    }
}
</script>
</body>
</html>
