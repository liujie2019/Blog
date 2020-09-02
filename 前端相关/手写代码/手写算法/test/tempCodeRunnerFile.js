
function printf(str, info) {
    return str.replace(/\$\{(\w+)\}/g, function(word) {
        return info[arguments[1]];
    });
}

const str = 'My name is ${name}, I am from ${city}';
const info = {
    name: 'AaDerBrane',
    city: 'GungZhou'
};
console.log(printf(str, info));