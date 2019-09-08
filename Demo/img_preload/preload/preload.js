// 图片预加载
// js中没有块级作用域，一般采用闭包来模拟块级作用域
(function($) {
	function Preload(imgs, options){
		this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
		this.opts = $.extend({},Preload.DEFAULTS,options);
		if(this.opts.order === 'ordered') {
			this._ordered();
		} else {
			this._unordered();
		}
	}
	//默认参数
	Preload.DEFAULTS = {
		order: 'unordered',// 默认是无序预加载
		each: null, // 每一张图片加载完毕后执行
		all: null // 所有图片加载完毕后执行
	};
	Preload.prototype.ordered = function() {//有序加载
		var count = 0;
		load();
		//有序预加载
		function load(){
			var imgObj = new Image();
			$(imgObj).on('load error',function(){
				opts.each && opts.each(count);
				if(count >= len){
					// 所有图片都加载完成
					opts.all && opts.all();
				}else{
					load(); //否则继续调用自身进行加载
				}
				count++;
			});
			imgObj.src = imgs[count];
		}
	};
	Preload.prototype._unordered = function() { //无序加载
		var imgs = this.imgs,
		opts = this.opts,
		count = 0,
		len = imgs.length;
		$.each(imgs, function(i, src) {
			if(typeof src != 'string') return;
			var imgObj = new Image();
			$(imgObj).on('load error',function(){
				opts.each && opts.each(count);
				if(count >= len - 1){
					opts.all && opts.all();
				}
				count++;
			});
			imgObj.src = src;
		});
		$(".btn").on("click",function() {
			if($(this).data("control") === "prev") {//上一张
				index = Math.max(0, --index);
			} else {//下一张
				index = Math.min(len-1, ++index);
			}
			document.title = (index + 1) + '/' +len;
			$('#img').attr('src',imgs[index]);
		});
	};
	// preload方法挂载到jQuery工具方法，不需要获取jQuery对象
	$.extend({
		preload: function(imgs, opts){
			new Preload(imgs,opts);
		}
	});
})(jQuery);
