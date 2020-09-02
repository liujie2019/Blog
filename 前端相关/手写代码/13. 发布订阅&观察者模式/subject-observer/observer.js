/**
 * 观察者模式
 */
class Subject {
    constructor(name) {
        this.name = name;
        this.state = '心情非常好';
        this.observers = [];
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    setState(newState) {
        this.state = newState;
        this.emit();
    }
    emit() {
        this.observers.forEach(observer => {
            observer.update(this.name, this.state);
        });
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    update(subject, state) {
        console.log(`${this.name}，${subject}${state}`);
    }
}

const daughter = new Subject('小公主');
const observer = new Observer('爸爸');
const observer2 = new Observer('妈妈');
// 添加观察者
daughter.addObserver(observer);
daughter.addObserver(observer2);
// 改变状态
daughter.setState('心情不好了');



//题目
var a = {num: 2};
var b = Object.create(a);
// 问题,以下顺序执行,值是？
console.log(b.num); // 2
console.log(b.num++); // 2
console.log(b.num); // 3
console.log(a.num); // 2

function create(obj) {
    function Fn() {};
    Fn.prototype = obj;
    return new Fn();
}
