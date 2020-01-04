const converCurrency = (rate, ...amounts) => {
    return amounts.map(item => item * rate);
}

const res = converCurrency(1.2, 100, 200, 300);
console.log(res); // [ 120, 240, 360 ]

const person = ['lisi', 23, '🏀', '⚽️'];
const [name, age, ...hobbies] = person;
console.log(name, age, hobbies); // lisi 23 [ '🏀', '⚽️' ]

