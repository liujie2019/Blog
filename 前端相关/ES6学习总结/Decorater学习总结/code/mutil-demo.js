// 多个修饰器的情况
function test(num) {
    console.log('evaluated:', num);
    return (target, property, descriptor) => {
        console.log('executed:', num);
    };
}

class Person {
    @test(1)
    @test(2)
    add(a, b) {
        return a + b;
    }
}