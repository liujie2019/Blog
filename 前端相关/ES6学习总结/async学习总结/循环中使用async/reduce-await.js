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

// const reduceLoop = async () => {
//     console.log('start');
//     const fruits = Object.keys(fruitBasket);
//     const sum = await fruits.reduce(async (sum, fruit) => {
//         const fruitNum = await getNumFruit(fruit);
//         return sum + fruitNum; // 这里return的是promise，所以最后返回的一个拼接字符串
//     }, 0);
//     console.log(sum);
//     console.log('end');
// }

const reduceLoop = async () => {
    console.log('start');
    const fruits = Object.keys(fruitBasket);
    const sum = await fruits.reduce(async (promisedSum, fruit) => {
        const sum = await promisedSum;
        const fruitNum = await getNumFruit(fruit);
        return sum + fruitNum;
    }, 0);
    console.log(sum);
    console.log('end');
}


reduceLoop();