
const person = {
    name: 'lisi',
    sayName: function() {
        console.log(this.name); // lisi
    }
};

person.sayName();
// 将this对象指向当前对象
person.sayName.call(person);