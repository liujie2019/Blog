const fs = require('fs');

const readFile = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

//async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。

const asyncReadFile = async function () {
    const f1 = await readFile('./test.txt');
    const f2 = await readFile('./test1.txt');
    console.log(f1.toString());
    console.log(f2.toString());
    return f1.toString();
}

//asyncReadFile()函数返回Promise对象，可以用then方法指定下一步操作
//async函数内部return语句返回的值，会成为then方法回调函数的参数

asyncReadFile().then((result) => {
    console.log(`res: ${result}`);
});