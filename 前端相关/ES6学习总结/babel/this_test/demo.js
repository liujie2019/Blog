function testArray(arr) {
    if (typeof Array.isArray === 'undefined') {
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        }
    }
    return Array.isArray(arr);
}

console.log(testArray([1, 2, 3]));
console.log([1, 2].constructor === Array);