const str = 'My name is ${name}, I am from ${city}';
const info = {
    name: 'AaDerBrane',
    city: 'GungZhou'
};
console.log(printf(str, info));
// My name is AaDerBrane, I am from GuangZhou
function printf(str, info) {
    str = str.replace(/\$\{([a-z]+)\}/g, function(word) {
        console.log(word); // ${name}或者${city}
        console.log(arguments);
        return info[arguments[1]];
    });
    return str;
}