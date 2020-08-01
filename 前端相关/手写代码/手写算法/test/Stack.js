class Stack {
    constructor() {
        this.list = [];
    }
    push(item) { // 入栈
        this.list.push(item);
    }
    pop() {
        this.list.pop(); // 删除栈顶元素
    }
    clear() {
        this.list = [];
    }
    isEmpty() {
        return this.list.length === 0;
    }
    peek() { // 返回栈顶元素
        return this.list[this.length - 1];
    }
    size() {
        return this.list.length;
    }
}