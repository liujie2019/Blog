/**
 *
*/
// function bar() {
//     console.log(5);
// }
// console.log(2);
// async function fn() {
//     console.log(1);
//     // await会把下面的代码变成微任务，是异步的
//     await bar();
//     console.log(3);
// }
// fn();
// console.log(4);

// function bar() {
//     return new Promise((resolve, reject) => {
//         console.log(5);
//         resolve();
//         // reject();
//     });
// }
// console.log(2);
// async function fn() {
//     console.log(1);
//     // await会把下面的代码变成微任务，是异步的
//     await bar();
//     console.log(3);
// }
// fn();
// console.log(4);

// function bar() {
//     return new Promise((resolve, reject) => {
//         console.log(5);
//         setTimeout(() => {
//             resolve();
//         }, 1000);
//     });
// }
// console.log(2);
// async function fn() {
//     console.log(1);
//     // await会把下面的代码变成微任务，是异步的
//     await bar();
//     // 如果bar函数执行中有异步，那么await下面的代码会等到函数中的异步执行完毕后，才会执行这个微任务
//     console.log(3);
// }
// fn();
// console.log(4);

function bar(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
console.log(2);
async function fn() {
    console.log(1);
    // await会把下面的代码变成微任务，是异步的
    await bar(1000);
    await bar(3000);
    // 如果bar函数执行中有异步，那么await下面的代码会等到函数中的异步执行完毕后，才会执行这个微任务
    console.log(3);
}
fn();
console.log(4);
