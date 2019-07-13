const colors = new Set(['red', 'blue', 'green']);

console.log(colors.values()); // SetIterator { 'red', 'blue', 'green' }
const setIterator = colors.values();
console.log(setIterator.next()); // { value: 'red', done: false }
console.log(setIterator.next()); // { value: 'blue', done: false }
console.log(setIterator.next()); // { value: 'green', done: false }
console.log(setIterator.next()); // { value: undefined, done: true }

for (let item of colors) {
    console.log(item);
}

colors.forEach((item, key, ownSet) => {
    console.log(item, key, ownSet);
});
/*
red red Set { 'red', 'blue', 'green' }
blue blue Set { 'red', 'blue', 'green' }
green green Set { 'red', 'blue', 'green' }
 */