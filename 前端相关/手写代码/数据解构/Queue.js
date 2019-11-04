class Queue {
    constructor() {
        this.queue = [];
    }
    enqueue(item) {
        this.queue.push(item);
    }
    dequeue() {
        return this.queue.shift();
    }
    clear() {
        return this.queue = [];
    }
    get isEmpty() {
        return !this.queue.length;
    }
    get size() {
        return this.queue.length;
    }
    print() {
        console.log(this.queue);
    }
}
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.size); // 3
queue.dequeue();
queue.print(); // [ 2, 3 ]