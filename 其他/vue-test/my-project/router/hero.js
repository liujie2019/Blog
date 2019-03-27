//引入express模块
const express = require('express');

//定义路由级中间件
const router = express.Router();

//引入数据模型模块
const Hero = require('../models/hero');

router.get('/', (req, res) => {
    res.send('hello');
});

//查询所有英雄信息路由
router.get('/hero', (req, res) => {
    Hero.find({})
    .sort({update_at: -1})
    .then(heros => {
        res.json(heros);
    })
    .catch(err => {
        res.json(err);
    })
});

module.exports = router;