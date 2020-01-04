const arr = [1, 2, 3];
const it = arr[Symbol.iterator]();

let res;
do {
    res = it.next();
    console.log(res);
} while (!res.done);