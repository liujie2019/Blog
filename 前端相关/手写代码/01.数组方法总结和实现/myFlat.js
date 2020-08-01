function flat(array, depth = 0) {
    if (depth < 1 || !Array.isArray(array)) {
        return array;
    }

    return array.reduce(
        (result, current) => {
            return result.concat(flat(current, depth - 1));
        }, []);
}

const arr = [1, 2, 3, [4, 5, [6]]];
console.log(flat(arr, 1)); // [ 1, 2, 3, 4, 5, [ 6 ] ]
console.log(arr); // [ 1, 2, 3, [ 4, 5, [ 6 ] ] ]
console.log(flat(arr, 2)); // [ 1, 2, 3, 4, 5, 6 ]