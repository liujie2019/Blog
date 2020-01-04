const a = 1;

function thunk() {
    return a + 5;
}
function fn(thunk) {
    return thunk() * 3;
}

const res = fn(thunk);
console.log(res); // 18