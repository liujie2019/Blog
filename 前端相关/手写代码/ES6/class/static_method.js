class Parent {
    static a() {
        // 静态方法中的this指向class本身，因此这里会调用静态方法b
        this.b();
    }
    static b() {
        console.log('静态方法b');
    }
    b() {
        console.log('实例方法b');
    }
}

Parent.a(); // 静态方法b