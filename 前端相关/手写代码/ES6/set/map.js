let map = new Map();

map.set('a', 1);
map.set('b', 2);
map.set('c', 3);

console.log(map);

for (let [key, value] of map) {
    console.log(key, value);
}