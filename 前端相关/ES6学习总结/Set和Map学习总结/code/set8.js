let s1 = new Set([1, 2, 3]);
let s2 = new Set([2, 3, 4]);

//并集
let union = new Set([...s1, ...s2]);
console.log(union); //Set { 1, 2, 3, 4 }
//实现数组并集
let union2 = new Set([...s1, ...s2]);
console.log([...union2], Array.isArray([...union2])); //[ 1, 2, 3, 4 ] true

//实现交集
let intersect = new Set([...s1].filter(item => s2.has(item)));
console.log(intersect);//Set { 2, 3 }
//实现数组交集
console.log([...intersect]);//[2, 3]

//实现差集
let diff = new Set([...s1].filter(item => !s2.has(item)));
console.log(diff); //Set { 1 }
//实现数组差集
console.log([...diff]);// [1]