function fn (a) {
    console.log(a);
    return function (b) {
        console.log(a + b);
    }
}

fn(1)(2);