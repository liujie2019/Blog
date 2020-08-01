/**
 * add(1,2,3)(4)()
*/

function sum() {
    let _args = [];
    return function() {
        if (arguments.length === 0) {
            return _args.reduce((prev, cur) => {
                return prev + cur;
            });
        }
        _args = [..._args, ...arguments];
        return arguments.callee;
    }
}

const add = sum();
console.log(add(1,2,3)(4)(5)());
