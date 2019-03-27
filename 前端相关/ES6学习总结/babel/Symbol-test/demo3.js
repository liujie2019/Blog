const mySymbol = Symbol();
const obj = {
    [mySymbol]: arg => {
        console.log(arg); // hello
    }
};
obj[mySymbol]('hello');