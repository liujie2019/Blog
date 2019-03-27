const obj = {
    name: "lisi",
    age: 22
};

const obj2 = {
    ...obj
};

console.log(obj === obj2);