import b, {a} from './testES6Exports2';
console.log(a); // 123
setTimeout(() => {
    console.log(a); // 123456
}, 3000);
console.log(b); // 456