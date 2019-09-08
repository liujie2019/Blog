function count() {
    for (let i = 0; i < 10000000000; i++) {
        if (i % 10000 === 0) {
            postMessage(i);
        }
    }
}

count();