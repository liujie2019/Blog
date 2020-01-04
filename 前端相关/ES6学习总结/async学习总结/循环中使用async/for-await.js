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

const forLoop = async () => {
    console.log('start');
    const fruits = Object.keys(fruitBasket);
    // 循环依次获取对应水果的数量
    for (let i = 0; i < fruits.length; i++) {
        const fruit = fruits[i];
        const fruitNum = await getNumFruit(fruit);
        console.log(`${fruit}: ${fruitNum}`);
    }
    console.log('end');
}

forLoop();