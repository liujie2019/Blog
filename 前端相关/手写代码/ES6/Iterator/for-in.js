Array.prototype.age = 12;

const hobbies = ['🏀', '⚽️', '🏉'];

hobbies.name = 'test';
// for (const key in hobbies) {
//     // console.log(key); // 0 1 2
//     // console.log(typeof key); // string
//     console.log(hobbies[key]); // '🏀' '⚽️' '🏉'
// }

for (const key of hobbies) {
    console.log(key); // '🏀' '⚽️' '🏉'
}