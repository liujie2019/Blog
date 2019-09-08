function say(name) {
    console.log(this); // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
    console.log(name); // lisi
}

say('lisi');
// 函数在执行的时候，自动将this指向了window这个全局对象
// 严格模式下，自动将this指向undefined
say.call(window, 'lisi');