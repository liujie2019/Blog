const arr = [1, 2, 3];
const it = arr[Symbol.iterator]();

let res;
do {
    res = it.next();
    console.log(res);
} while (!res.done);

/*
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: undefined, done: true }
*/