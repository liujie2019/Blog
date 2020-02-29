// const getFullName = (obj:{firstName:string, lastName:string}) => {
//     return `${obj.firstName} ${obj.lastName}`;
// }
// getFullName({
//     firstName: 'li',
//     lastName: 'si'
// });
interface NameInfo {
    firstName:string,
    lastName:string
}
const getFullName = ({firstName, lastName}:NameInfo) => {
    return `${firstName} ${lastName}`;
}
getFullName({
    firstName: 'li',
    lastName: 'si'
});

// interface Vegetable {
//     color?:string,
//     type:string
// }

// const getVegetables = ({color, type}:Vegetable) => {
//     return `A ${color ? (color + ' ') : ''}${type}`;
// }

// console.log(getVegetables({
//     type: 'tomato',
//     color: 'red',
//     size: 123
// } as Vegetable));

// interface Vegetable {
//     color?:string,
//     type:string,
//     [prop:string]:any
// }

// const getVegetables = ({color, type}:Vegetable) => {
//     return `A ${color ? (color + ' ') : ''}${type}`;
// }

// console.log(getVegetables({
//     type: 'tomato',
//     color: 'red',
//     size: 123
// }));

interface Vegetable {
    color?:string,
    readonly type:string
}

const getVegetables = ({color, type}:Vegetable) => {
    return `A ${color ? (color + ' ') : ''}${type}`;
}

const vegetableInfo = {
    type: 'tomato',
    color: 'red',
    size: 123
};

const vegetableObj:Vegetable = {
    type: 'tomato'
}

// vegetableObj.type = 'apple';

console.log(getVegetables(vegetableInfo));

// 数组只读
interface ArrInter {
    0: number,
    readonly 1: string
}
const arrInter: ArrInter = [1, 'a'];
// arrInter[1] = 'we';

interface addFn {
    (num1: number, num2: number): number
}

interface Vegetables {
    color: string
}

interface Tomato extends Vegetables {
    size: number
}

interface Carrot {
    length: number
}

const tomato: Tomato = {
    size: 123,
    color: 'red'
}

const carrot: Carrot = {
    length: 123
}

interface Counter { // 定义一个函数接口，该函数有一个count属性
    (): void,
    count: number
}

const getCounter = (): Counter => {
    const c = () => { c.count++ }
    c.count = 0;
    return c;
}
const counter: Counter = getCounter();
counter();
console.log(counter.count); // 1
counter();
console.log(counter.count); // 2
counter();
console.log(counter.count); // 3