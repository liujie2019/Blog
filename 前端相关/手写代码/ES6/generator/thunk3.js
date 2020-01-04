const fs = require('fs');

function thunk(fn) {
    return function() {
        const args = Array.prototype.slice.call(arguments);
        return function(callback) {
            args.push(callback);
            return fn.apply(null, args);
        }
    }
}

// const thunk = fn => (...args) => {
//     return callback => fn.call(null, ...args, callback);
// }

// const thunk = fn => (...args) => {
//     return callback => fn.apply(null, args.concat(callback));
// }

// fs.readFile('./name.txt', 'utf8', (err, data) => {
//     console.log(data.toString());
// });

const thunkReadfile = thunk(fs.readFile);
thunkReadfile('./name.txt', 'utf8')((err, data) => {
    console.log(data.toString());
});