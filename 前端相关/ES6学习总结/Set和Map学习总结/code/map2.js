const person = new Map();
person.set('lisi', 20);
person.set('wangwu', 21);
person.set('xiaohua', 22);

// Map { 'lisi' => 20, 'wangwu' => 21, 'xiaohua' => 22 }
console.log(person);
person.forEach((value, key, ownMap) => {
    console.log(value, key, ownMap);
});
for (let item of person) {
    const [key, value] = item;
    console.log(key, value);
}