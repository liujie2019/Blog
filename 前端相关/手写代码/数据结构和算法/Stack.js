class Stack { // 后进先出
    constructor() {
        this.stack = [];
    }
    // 入栈
    push(item) {
        this.stack.push(item);
    }
    // 出栈
    pop() {
        return this.stack.pop();
    }
    // 清空栈
    clear() {
        return this.stack = [];
    }
    print() {
        console.log(this.stack);
    }
    // 判断是否为空栈
    get isEmpty() {
        return !this.stack.length;
    }
    // 获取栈长度
    get size() {
        return this.stack.length;
    }
    // 获取末位
    get peek() {
        return this.stack[this.stack.length - 1];
    }
}

const stack = new Stack();
console.log(stack.isEmpty); // true
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.size); // 3
stack.pop();
console.log(stack.size); // 2
stack.print(); // [ 1, 2 ]