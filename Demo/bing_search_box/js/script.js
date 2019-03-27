$("#search_input").on('keyup',function(){
	var oInput = $(this);
	var searchText = oInput.val();
	$.get('http://api.bing.com/qsonhs.aspx?q='+searchText,function(data){
		//Suggests是一个数组，数组里面都是json对象
		//json对象的Txt属性存放着我们需要的文本信息
		var res = data.AS.Results[0].Suggests;
		var html = "";
		for(var i=0;i<res.length;i++){
			html+='<li>'+res[i].Txt+'</li>';
		}
		$("#search_result").html(html);
		$("#search_suggest").css({
			top:$("#search_form").offset().top+$("#search_form").height()+10,
			left:$("#search_form").offset().left
		}).show();
	},'json');
});
$(document).on('click',function(){
	$("#search_suggest").hide();
});
 $(document).delegate('li','click',function(){
 	var keyword = $(this).text();
 	//页面跳转使用location对象
 	location.href = 'http://cn.bing.com/search?q='+keyword;
 });
