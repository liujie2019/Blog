Function.prototype.myBind = function(thisValue) {
    if(typeof this !== 'function') {
        throw Error('not a function');
    }
    let that = this;
    let args = [...arguments].slice(1);
    return function() {
        return that.apply(thisValue, args);
    };
}

const obj = {
    name: 'lisi',
    sayName: function() {
        console.log(this);
        console.log([...arguments]); // [ 1, 2, 3 ]
        return this.name;
    }
};
const unboundFn = obj.sayName;
const boundFn = unboundFn.myBind(obj, 1, 2, 3);
console.log(boundFn()); // lisi