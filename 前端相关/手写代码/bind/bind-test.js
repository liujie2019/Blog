function list() {
    console.log(arguments); // { '0': 1, '1': 2, '2': 3 }
    return Array.prototype.slice.call(arguments);
}

console.log(list(1, 2, 3)); // [ 1, 2, 3 ]