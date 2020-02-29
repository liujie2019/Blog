const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost/test2', { useMongoClient: true });

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true // 必须的，没有的话数据存不进去
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    // 注意：这里不要写Date.now() 因为会即刻调用
    // 这里直接给了一个方法：Date.now
    // 当你去new Model的时候，如果你没有传递 create_time ，则 mongoose 就会调用 default 指定的Date.now 方法，使用其返回值作为默认值
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/img/avatar-default.png'
  },
  bio: { // 个人简介
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1], // 设置可选值
    default: -1 // -1表示性别保密
  },
  birthday: {
    type: Date
  },
  status: {
    type: Number,
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录
    enum: [0, 1, 2],
    default: 0
  }
});

module.exports = mongoose.model('User', userSchema);
