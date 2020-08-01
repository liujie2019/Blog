/**
 * 每隔2秒红灯、3秒黄灯、1秒绿灯
*/

function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

async function say(str, time) {
    await sleep(time);
    console.log(str);
}

async function run() {
    await say('红灯', 2000);
    await say('黄灯', 3000);
    await say('绿灯', 1000);
    run();
}

run();