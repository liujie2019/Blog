const fruitBasket = {
    apple: 27,
    banana: 12,
    pear: 14
};

// 使用setTimeout模拟从服务器获取数据
const sleep = time => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

const getNumFruit = fruit => {
    return sleep(1000).then(() => fruitBasket[fruit]);
}

const fn = async () => {
    console.log('start');
    const numApples = await getNumFruit('apple'); // 每间隔一秒输出
    console.log(numApples);
    const numBananas = await getNumFruit('banana'); // 每间隔一秒输出
    console.log(numBananas);
    const numPears = await getNumFruit('pear'); // 每间隔一秒输出
    console.log(numPears);
    console.log('end');
}
fn();