var express = require('express');
var router = express.Router();

var comments = {};

function html_encode(str){
	var s = '';
	if(str.length == 0)return "";
	s = str.replace(/&/g,"&gt;");
	s = s.replace(/</g,"&lt");
	s = s.replace(/>/,"&gt");
	s = s.replace(/\s/g,"&nbsp;");
	s = s.replace(/\'/g,"&#39;");
	s = s.replace(/\"/g,"&quot;");
	s = s.replace(/\n/g,"<br>");
	return s;
}

// function html_encode(str) {
//   var s = '';
//   if(str.length == 0) {
//     return '';
//   }
//   console.log(str);
//   s = str.replace(/&/g, '&gt;');
//   s = s.replace(/</g, '&lt;');
//   s = s.replace(/>/g, '&gt;');
//   s = s.replace(/\s/g, '&nbsp;');
//   s = s.replace(/\'/g, '&#39;');
//   s = s.replace(/\"/g, '&quot;');
//   s = s.replace(/\n/g, '<br>');
//   return s;
// }

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

//输入评论
router.get('/comment', function(req, res, next) {
  //对用户的输入进行编码
  res.set('X-XSS-Protection',0);
  comments.v = html_encode(req.query.comment);
});
//获取评论
router.get('/getComment', function(req, res, next) {
  res.set('X-XSS-Protection',0);
  res.json({
    comment: comments.v
  });
});

module.exports = router;
