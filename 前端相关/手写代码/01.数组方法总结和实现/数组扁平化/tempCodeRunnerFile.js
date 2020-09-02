Function.prototype.a = () => {console.log('a')};
Object.prototype.b = () => {console.log('b')};

function A() {

}

const a = new A();
// a.a();
a.b();