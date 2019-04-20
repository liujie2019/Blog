/**
 * 修改单条数据的正确写法
 */

var db = connect('user');
var student3 = {
    name: 'xiaohong',
    age: 13,
    sex: 0,
    hobby: {
        hobbyOne: '瑜伽',
        hobbyTwo: '跳舞',
        hobbyThree: '书法'
    },
    createTime: new Date()
};

db.student.update({name: "xiaohong"}, student3);
print('The data was updated successfully');