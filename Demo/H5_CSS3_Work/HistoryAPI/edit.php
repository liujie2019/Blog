<?php
$link = mysql_connect("localhost","root","root");
mysql_query("SET NAMES UTF8");
mysql_select_db("mysql");
$result = mysql_query('SELECT * FROM users WHERE id ='.$_REQUEST['id'],$link);
If ($result&&mysql_num_rows($result) > 0) {
    $obj = mysql_fetch_object($result);
}
?>
<header id="div_head_title_big">
<h1>编辑用户信息</h1>
</header>
<form id="form1" >
<ul>
    <li>
        <ul>
    	    <li id="title_1">
    	        <span>*</span><label for="txtUserName">用户姓名</label>
    	    </li>
    	    <li id="content_1">
    	        <input type="text" id="txtUserName" name="UserName" maxlength="8" placeholder="请输入用户姓名" autofocus required value="<?=$obj->UserName;?>"/>
    	    </li>
    	    <li id="title_2">
    	        <span>*</span><label for="txtBirthday">出生年月</label>
    	    </li>
    	    <li id="content_2">
    	        <input type="date" id="txtBirthday" name="Birthday" maxlength="10"  required  value="<?=$obj->Birthday;?>"/>
    	    </li>
    	    <li id="title_3">
    	        <span>*</span><label for="txtPassword">密码</label>
    	    </li>
    	    <li id="content_3">
    	        <input type="text"  id="txtPassword" name="Password" maxlength="12"  placeholder="必须输入密码"  required value="<?=$obj->Password?>"/>
    	    </li>
	    </ul>
    </li>
    <li>
	    <ul>
	        <li id="title_4">
    	        <label for="txtPhone">住宅电话</label>
    	    </li>
	        <li id="content_4">
    	        <input  type="text" id="txtPhone" name="Phone" maxlength="20"   value="<?=$obj->Phone?>"/>
    	    </li>
	        <li id="title_5">
    	        <label for="txtMobile">移动电话</label>
    	    </li>
	        <li id="content_5">
    	        <input  type="text" id="txtMobile" name="Mobile" maxlength="20"   value="<?=$obj->Mobile?>"  />
    	    </li>
	        <li id="title_6">
    	        <label for="txtZip">传真</label>
    	    </li>
	        <li id="content_6">
    	        <input type="text" id="txtZip" name="Zip" maxlength="6"   value="<?=$obj->Zip?>"  >
    	    </li>
	    </ul>
    </li>
    <li>
	    <ul>
	        <li id="title_7">
    	        <label for="txtAddress">住址</label>
    	    </li>
	        <li id="content_7">
    	        <input  type="text" id="txtAddress" name="Address" maxlength="100"   value="<?=$obj->Address?>"/>
    	    </li>
	        <li id="title_8">
    	        <label for="txtEmail">Email</label>
    	    </li>
	        <li id="content_8">
    	        <input type="email" id="txtEmail" name="Email" maxlength="20"    value="<?=$obj->Email?>"/>
    	    </li>
	        <li id="title_9">
    	        <label for="selectUserType">用户类型</label>
    	    </li>
	        <li id="content_9">
                <select id="selectUserType" name="UserType">
                    <option value="0" <?php if($obj->UserType=="0") echo "selected";?>>管理员</option>
                    <option value="1" <?php if($obj->UserType=="1") echo "selected";?>>普通用户</option>
                </select>
            </li>
	    </ul>
    </li>
</ul>
<div id="buttonDiv">
    <input type="button" name="btnSave" id="btnSave" value="保存"  onclick="btnSave_onclick();">
    <input type="button" name="btnClear" id="btnClear" value="清除"  onclick="btnClear_onclick();">
</div>
</form>

