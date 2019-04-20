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
    createTime: new Date()
};
var db = connect('user');
var studentArr = [student1, student2, student3];
db.student.insert(studentArr);
print('The data was inserted successfully');