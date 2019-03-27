const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// 监听event事件
myEmitter.on('event', () => {
  console.log('触发了一个事件！');
});

// 手动触发事件
myEmitter.emit('event');