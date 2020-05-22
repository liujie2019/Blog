/**
 * 🚥效果(红绿灯)
 * 红灯2秒，黄灯1秒，绿灯3秒
*/

function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

async function changeColor(color, time) {
    console.log('当前颜色为：', color);
    await sleep(time);
}

async function say() {
    await changeColor('红色', 2000);
    await changeColor('黄色', 1000);
    await changeColor('绿色', 3000);
}

say();