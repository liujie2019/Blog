function add(...values) {
    console.log(values); // [ 1, 2, 3 ]
    let sum = 0;
    for (let val of values) {
        sum += val;
    }
    return sum;
}

console.log(add(1, 2, 3));