const obj = {
    name: 'lisi',
    sayName: function() {
        console.log(this);
        console.log([...arguments]); // [ 1, 2, 3 ]
        return this.name;
    }
};

const unboundFn = obj.sayName;
// this指向window
// console.log(unboundFn()); // undefined

const boundFn = unboundFn.bind(obj, 1, 2, 3);
console.log(boundFn()); // lisi