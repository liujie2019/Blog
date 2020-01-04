const id = 'abcdefghijklmn';
const name = 'lisi';

function padder(string, length=30) {
    return `${string}${' '.repeat(Math.max(length - string.length, 0))}`;
}

console.log(padder(id));
console.log(padder(name));