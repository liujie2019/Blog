var obj1 = {
	name: 'lisi',
	age: 18,
	job: 'worker',
	arr1: [1, 2, 3, 4, 5],
	arr2:[
        {name: 'wangwu', age: 22, job: 'teacher'},
        {name: 'zhaoliu', age: 22, job: 'student'}
	]};
var obj2 = {};
function deepClone(obj1, obj2) {
	var obj2 = obj2 || {}; // 给obj2一个初始值=它自己或者是一个空对象
	for(let key in obj1) {
		if(typeof obj1[key] === 'object') { // 先判断obj1[key]是否是对象
			obj2[key] = (obj1[key].constructor === Array) ? [] : {};
			deepClone(obj1[key], obj2[key]); // 循环调用复制函数
		}
		else {
			obj2[key] = obj1[key]; // obj1[key]不是对象则直接复制
		}
	}
	return obj2;
}

obj2 = deepClone(obj1, obj2);
obj2.arr1.push(6);
obj2.arr2[0].name = 'wangwu66';

console.log(obj2);
console.log(obj1);
