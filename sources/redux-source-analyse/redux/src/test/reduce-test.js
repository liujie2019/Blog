const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const totalValue = arr.reduce((accumulator, currentValue) => {
    console.log(accumulator, currentValue);
    return accumulator + currentValue;
});

console.log(totalValue); // 55