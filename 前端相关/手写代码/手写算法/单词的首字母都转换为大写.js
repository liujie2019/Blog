const name = 'aaa bbb ccc';
const res = name.replace(/\b\w+\b/g, word => {
    // substring(from, to)
    return word.substring(0, 1).toUpperCase() + word.substring(1);
});

console.log(res); // Aaa Bbb Ccc