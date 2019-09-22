// 箭头函数 this
var name = 'windowName';
const obj = {
    name: 'lisi',
    say: function() {
        setTimeout(function() {
            console.log(this); // setTimeout中this默认指向window
            console.log('name:', this.name);
        }, 100);
    },
    sayWithThis: function() { // sayWithThis这里this指向obj
        let that = this; // setTimeout回调取的是sayWithThis里的this指向
        setTimeout(function() {
            console.log('this id:', that.name);
        }, 1000);
    },
    sayWithArrow: function() { // sayWithArrow这里this指向obj
        setTimeout(() => { // setTimeout箭头函数回调的this取最近一层非箭头函数的this指向
            console.log('array:', this.name);
        }, 1500);
    },
    sayWithGlobalArrow: () => { // 第一层箭头函数的this指向window
        setTimeout(() => {
            console.log('global array:', this.name);
        }, 2000);
    }
};
obj.say(); // name: windowName
obj.sayWithThis(); // this id: lisi
obj.sayWithArrow(); // array: lisi
obj.sayWithGlobalArrow(); // global array: windowName