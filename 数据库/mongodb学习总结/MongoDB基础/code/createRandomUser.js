//生成随机数
function createRandomNum(min, max) {
    let range = max-min;   // 得到随机数区间
    let rand = Math.random(); // 得到随机值
    return (min + Math.round(rand *range)); // 最小值+随机数取整
}

// console.log(createRandomNum(10000, 99999));

// 生成随机用户名
function createRandomUserName(min, max){
    let tempStringArray= "123456789qwertyuiopasdfghjklzxcvbnm".split('');//构造生成时的字母库数组
    let outPutText = ''; //最后输出的变量
    //进行循环，随机生产用户名的长度，这里需要生成随机数方法的配合
    for(let i=1; i < createRandomNum(min, max); i++) {
        //随机抽取字母，拼装成需要的用户名
        outPutText = outPutText + tempStringArray[createRandomNum(0,tempStringArray.length)];
    }
    return outPutText;
}

// console.log(createRandomUserName(7, 16));
// var startTime=(new Date()).getTime();
var db = connect('user');
db.randomInfo.drop();
var tempInfo = [];
for (let i = 0; i < 2000000; i++) {
    tempInfo.push({
        username: createRandomUserName(7, 16),
        regeditTime: new Date(),
        randNum0: createRandomNum(100000,999999),
        randNum1: createRandomNum(100000,999999),
        randNum2: createRandomNum(100000,999999),
        randNum3: createRandomNum(100000,999999),
        randNum4: createRandomNum(100000,999999),
        randNum5: createRandomNum(100000,999999),
        randNum6: createRandomNum(100000,999999),
        randNum7: createRandomNum(100000,999999),
        randNum8: createRandomNum(100000,999999),
        randNum9: createRandomNum(100000,999999),
    })
}

db.randomInfo.insert(tempInfo);