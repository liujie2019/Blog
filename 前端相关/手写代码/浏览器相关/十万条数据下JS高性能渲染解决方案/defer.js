// 如果非要放到这里的话可以用defer，defer会延迟js脚本的执行，等到dom树构建完成后，DOMContentLoaded事件前执行
// defer属性仅仅对于外链的js脚本有效，表示立即下载脚本，但是延迟执行
const div = document.querySelector('div');
console.log(div, 'defer'); // <div></div>