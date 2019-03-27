const events = require('events');
const util = require('util');

const Person = function(name) {
    this.name = name
}

// 让Person继承events.EventEmitter
// 这样继承后，Person的实例就可以绑定相应的事件
util.inherits(Person, events.EventEmitter);

const xiaohong = new Person('xiaohong');
const lisi = new Person('lisi');
const wangwu = new Person('wangwu');

const person = [xiaohong, lisi, wangwu];

person.forEach((person) => {
    // 给每个实例绑定speak事件
    person.on('speak', (message) => {
        console.log(person.name + " said: " + message);
    })
})

xiaohong.emit('speak', 'hello');
lisi.emit('speak', 'I want a apple');