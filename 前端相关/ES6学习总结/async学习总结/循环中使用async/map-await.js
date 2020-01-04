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

const mapLoop = async () => {
    console.log('start');
    const fruits = Object.keys(fruitBasket);
    const numFruitsPromises = fruits.map(async fruit => {
        const fruitNum = await getNumFruit(fruit);
        return fruitNum; // 这里返回的是一个promise
    });
    // numFruits是一个Promise数组
    // 使用Promise.all来处理Promise数组
    const numFruits = await Promise.all(numFruitsPromises);
    console.log(numFruits);
    console.log('end');
}

mapLoop();