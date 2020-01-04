const str = 'hello';

function stringToUpper(str) {
    return str.toUpperCase();
}

function stringReverse(str) {
    return str.split('').reverse().join('');
}

function getThreeCharacters(str) {
    return str.slice(0, 3);
}

function stringToArray(str) {
    return str.split('');
}

const compose = (...args) => {
    return function(data) {
        return args.reduceRight((initial, cb) => {
            return cb(initial);
        }, data);
    }
};

// 先将字符串转为大写->再将字符串反转->截取前3个字符
// 可以通过将上述除了compose之外的四个函数任意组合来实现不同的业务需求
const stringToUpperAndReverse = compose(getThreeCharacters, stringReverse, stringToUpper);

console.log(stringToUpperAndReverse(str));