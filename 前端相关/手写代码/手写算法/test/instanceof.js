
function myInstanceof(left, right) {
    let prototype = right.prototype;
    let proto = Object.getPrototypeOf(left);
    while (true) {
        if (proto === null) {
            return false;
        }
        if (prototype === proto) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
}

function Person() {

}

const p = new Person();

console.log(myInstanceof(p, Person));
console.log(myInstanceof(p, Object));