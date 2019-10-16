const express = require('express');
const passport = require('passport');
const router = express.Router();
const Profile = require('../../models/Profile');

/**
 * GET api/profiles/test
 * 返回请求的json数据
*/
router.get('/test', (req, res) => {
    res.json({message: 'profile works'});
});

/**
 * @route POST api/proiles/add
 * @desc 创建信息接口
 * @access private 需要jwt校验
*/
router.post(
    '/add',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
    // console.log(req.body);
    const {type, describtion, income, expend, cash, remark} = req.body;
    const profileFields = Object.assign({}, {
        type,
        describtion,
        income,
        expend,
        cash,
        remark
    });
    new Profile(profileFields).save().then(profile => {
        res.json(profile);
    });
});

/**
 * @route GET api/profiles
 * @desc 获取所有信息
 * @access private 需要jwt校验
*/
router.get(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.find().then(profiles => {
            if (!profiles) return res.status(404).json('暂无数据');
            return res.json(profiles);
        })
        .catch(err => res.status(404).json(err));
});
/**
 * @route GET api/proiles/:id
 * @desc 获取单个信息
 * @access private 需要jwt校验
*/
router.get(
    '/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOne({_id: req.params.id})
            .then(profile => {
                if (!profile) return res.status(404).json('暂无数据');
                return res.json(profile);
            })
            .catch(err => res.status(404).json(err));
});

/**
 * @route PUT api/proiles/edit/:id
 * @desc 编辑信息接口
 * @access private 需要jwt校验
*/
router.put(
    '/edit/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const {type, describtion, income, expend, cash, remark} = req.body;
        const profileFields = Object.assign({}, {
            type,
            describtion,
            income,
            expend,
            cash,
            remark
        });
        Profile.findOneAndUpdate({_id: req.params.id}, {$set: profileFields}, {new: true})
            .then(profile => res.json(profile))
            .catch(err => res.status(500).json(err));
});

/**
 * @route DELETE api/proiles/delete/:id
 * @desc 删除信息接口
 * @access private 需要jwt校验
*/
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOneAndRemove({_id: req.params.id})
            .then(profile => {
                profile.save().then(profile => res.json(profile)); // 将删除的数据返回
            })
            .catch(err => res.status(404).json('删除失败!'));
});

module.exports = router;