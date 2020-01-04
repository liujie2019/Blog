function* gen() {
    let [pre, cur] = [0, 1];
    for(;;) {
        [pre, cur] = [cur, pre + cur];
        yield cur;
    }
}

for (let i of gen()) {
    if (i > 1000) break;
    console.log(i);
}