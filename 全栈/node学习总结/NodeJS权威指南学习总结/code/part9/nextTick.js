function foo() {
    console.log('foo-nextTick');
}

// setTimeout(foo, 0);
process.nextTick(foo);
console.log('bar');
