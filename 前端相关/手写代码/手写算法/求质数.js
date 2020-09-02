function check(num) {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function find(num) {
    if (num === 1) return [];
    let res = [];
    for (let i = 2; i <= num; i++) {
        if (i <= 2) {
            res.push(i);
            continue;
        }
        if (check(i)) {
            res.push(i);
        }
    }
    return res;
}

console.log(find(100));
