// "use strict";
var name = 'wangwu';
const obj = {
    name: 'lisi',
    sayName: function() {
        console.log(this); // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
        console.log([...arguments]); // [ 1, 2, 3 ]
        console.log(this.name); // wangwu
    }
};

obj.sayName.apply(null, [1, 2]);
