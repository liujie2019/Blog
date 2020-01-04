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

const filterLoop = async () => {
    console.log('start');
    const fruits = Object.keys(fruitBasket);
    const moreThan20 = await fruits.filter(async fruit => {
        const fruitNum = getNumFruit(fruit);
        return fruitNum > 12; // 这里return的是promise，所有数组中的所有项都通过filter。
    });
    console.log(moreThan20);
    console.log('end');
}

filterLoop();