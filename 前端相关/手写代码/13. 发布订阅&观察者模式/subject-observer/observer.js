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