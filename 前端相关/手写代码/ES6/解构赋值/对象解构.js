const obj = {
    name: 'lisi',
    age: 12
}

const {name: n, age, hobbies = 'have no hobby'} = obj;
console.log(n); // lisi
console.log(hobbies); // undefined
console.log(name); // ReferenceError: name is not defined