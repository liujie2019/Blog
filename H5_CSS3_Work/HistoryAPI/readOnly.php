<?php
//PHP提供了 mysql_connect() 函数来连接数据库
$link = mysql_connect("localhost","root","root");
//mysql_query() 函数执行一条 MySQL 查询
mysql_query("SET NAMES UTF8");
//PHP提供了函数 mysql_select_db 来选取一个数据库。函数在执行成功后返回TRUE,否则返回 FALSE
mysql_select_db("mysql");
//使用PHP函数的mysql_query()及SQL SELECT命令来获取数据
$result = mysql_query('SELECT * FROM users WHERE id ='.$_REQUEST['id'],$link);
//mysql_num_rows() 函数返回结果集中行的数目
If ($result&&mysql_num_rows($result) > 0) {
	/*
	mysql_fetch_object() 函数从结果集（记录集）中取得一行作为对象。
	若成功的话，本函数从 mysql_query() 获得一行,并返回一个对象。如果失败或没有更多的行,则返回 false。
	 */
    $obj = mysql_fetch_object($result);
}
?>
<header id="div_head_title_big">
<h1>查看用户信息</h1>
</header>
<form id="form1" >
<ul>
    <li>
        <ul>
    	    <li id="title_1"><label>用户姓名</label></li>
	    <li id="content_1"><?php echo $obj->UserName;?></li>
	    <li id="title_2"><label>出生年月</label></li>
	    <li id="content_2"><?php echo $obj->Birthday;?></li>
	    <li id="title_3"><label>密码</label></li>
	    <li id="content_3"><?php echo $obj->Password;?></li>
	</ul>
    </li>
    <li>
	<ul>
	    <li id="title_4"><label>住宅电话</label></li>
	    <li id="content_4"><?php echo $obj->Phone;?></li>
	    <li id="title_5"><label>移动电话</label></li>
	    <li id="content_5"><?php echo $obj->Mobile;?></li>
	    <li id="title_6"><label>传真</label></li>
	    <li id="content_6"><?php echo $obj->Zip;?></li>
	</ul>
    </li>
    <li>
	<ul>
	    <li id="title_7"><label>住址</label></li>
	    <li id="content_7"><?php echo $obj->Address;?></li>
	    <li id="title_8"><label>Email</label></li>
	    <li id="content_8"><?php echo $obj->Email;?></li>
	    <li id="title_9"><label>用户类型</label></li>
	    <li id="content_9"><?php if($obj->UserType=="0") echo "管理员";else if($obj->UserType=="1") echo"普通用户";?></li>
	</ul>
    </li>
</ul>
</form>
