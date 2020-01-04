const makeIterator = arr => {
    let nextIndex = 0;
    return {
        next() {
            const done = nextIndex >= arr.length;
            const value = done ? undefined : arr[nextIndex++];
            return {
                value,
                done
            }
        }
    };
};

const arr = [1, 2, 3];
const it = makeIterator(arr);
let res;
do {
    res = it.next();
    console.log(res);
} while (!res.done);