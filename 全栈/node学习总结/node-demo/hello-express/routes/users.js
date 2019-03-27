var express = require('express');

var router = express.Router();
// 注意这里的路径不需要加users
router.get('/', (req, res, next) => {
    res.send('users page');
})

module.exports = router;