const ws = new WeakSet();
const obj = {a:'1', b:'2'};
ws.add(obj);

console.log(ws);
console.log(ws.has(obj)); //true