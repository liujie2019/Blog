import {observable} from 'mobx';
// observable.box

// number,string,boolean采用observable.box进行包装
const num = observable.box(10);
const str = observable.box('test');
const bool = observable.box(true);
// 10 "test" true
// 包装后的对象通过get方法获取相应的原始数据值
console.log(num.get(), str.get(), bool.get());
// 包装后的对象通过set方法修改相应的原始数据值
num.set(20);
str.set('test2');
bool.set(false);
// 20 "test2" false
console.log(num.get(), str.get(), bool.get());

// array object map
// array
const arr = observable(['a', 'b', 'c']);
// Proxy {0: "a", 1: "b", 2: "c", length: 3, Symbol(mobx administration): ObservableArrayAdministration}
console.log(arr);
console.log(Array.isArray(arr)); // true

// object
const obj = observable({name: 'lisi', age: 20});
// Proxy {Symbol(mobx administration): ObservableObjectAdministration$$1}
console.log(obj);
console.log(obj.name); // lisi

// Map
const map = observable(new Map());
// ObservableMap$$1 {enhancer: ƒ, name: "ObservableMap@3", _keysAtom: Atom$$1, _data: Map(0), _hasMap: Map(0), …}
console.log(map);
map.set('x', 1);
console.log(map.has('x')); // true