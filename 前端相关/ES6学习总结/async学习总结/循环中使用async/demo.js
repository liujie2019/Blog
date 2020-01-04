const fruitBasket = {
    apple: 27,
    banana: 12,
    pear: 14
};

const getNumFruit = fruit => {
    return fruitBasket[fruit];
}

console.log(getNumFruit('pear')); // 14