/**
 * 批量增加一些数据
 */

var student1 = {
    name: 'lisi',
    age: 10,
    sex: 1,
    hobby: {
        hobbyOne: '篮球',
        hobbyTwo: '足球',
        hobbyThree: '羽毛球'
    },
    skill: ['js', 'css', 'html'],
    createTime: new Date()
};
var student2 = {
    name: 'wangwu',
    age: 12,
    sex: 1,
    hobby: {
        hobbyOne: '游泳',
        hobbyTwo: '健身',
        hobbyThree: '乒乓球'
    },
    skill: ['san', 'vue', 'jquery', 'react', 'html'],
    createTime: new Date()
};
var student3 = {
    name: 'xiaohong',
    age: 13,
    sex: 1,
    hobby: {
        hobbyOne: '瑜伽',
        hobbyTwo: '跳舞',
        hobbyThree: '书法'
    },
    skill: ['vue', 'css', 'html'],
    createTime: new Date()
};
var student4 = {
    name: 'xiaohua',
    age: 12,
    sex: 0,
    hobby: {
        hobbyOne: '体操',
        hobbyTwo: '跳舞',
        hobbyThree: '书法'
    },
    skill: ['webpack', 'node', 'html'],
    createTime: new Date()
};
var student5 = {
    name: 'zhaoliu',
    age: 12,
    sex: 1,
    hobby: {
        hobbyOne: '音乐',
        hobbyTwo: '美术',
        hobbyThree: '书法'
    },
    skill: ['node', 'js', 'webpack'],
    createTime: new Date()
};
var student6 = {
    name: 'xiaoli',
    age: 12,
    sex: 1,
    hobby: {
        hobbyOne: '体操',
        hobbyTwo: '跳舞',
        hobbyThree: '书法'
    },
    skill: ['http', 'npm', 'html5'],
    createTime: new Date()
};
var student7 = {
    name: 'xiaoliu',
    age: 12,
    sex: 1,
    hobby: {
        hobbyOne: '钓鱼',
        hobbyTwo: '跳舞',
        hobbyThree: '书法'
    },
    skill: ['ES6', 'ES7', 'ES8'],
    createTime: new Date()
};
var student8 = {
    name: 'zhangsan',
    age: 12,
    sex: 1,
    hobby: {
        hobbyOne: '足球',
        hobbyTwo: '跳舞',
        hobbyThree: '书法'
    },
    skill: ['react', 'vue', 'css3'],
    createTime: new Date()
};
var student9 = {
    name: 'lihua',
    age: 12,
    sex: 1,
    hobby: {
        hobbyOne: '篮球',
        hobbyTwo: '跳舞',
        hobbyThree: '书法'
    },
    skill: ['san', 'echarts', 'html5'],
    createTime: new Date()
};
var student10 = {
    name: 'xiaozhang',
    age: 12,
    sex: 1,
    hobby: {
        hobbyOne: '乒乓球',
        hobbyTwo: '跳舞',
        hobbyThree: '书法'
    },
    skill: ['ES6', 'css3', 'html5'],
    createTime: new Date()
};
var db = connect('user');
var studentArr = [student1, student2, student3, student4, student5, student6, student7, student8, student9, student10];
db.student.insert(studentArr);
print('The data was inserted successfully');