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

const forEachLoop = async () => {
    console.log('start');
    const fruits = Object.keys(fruitBasket);
    fruits.forEach(async fruit => {
        const fruitNum = await getNumFruit(fruit);
        console.log(`${fruit}: ${fruitNum}`);
    });
    console.log('end');
}

forEachLoop();