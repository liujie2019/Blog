const domEle = document.querySelector('#root');

// 采用面向对象的思路改造：把不同的内容分到不同的文件中书写
// 这样将内容进行分离后更容易维护，哪里出错了直接找到对应的文件修改即可
// 这样分开来写也有一定的缺点：
// 1. 原来只需要加载index.js，现在多了3个文件，增加了3个http请求，加载会变慢
// 2. 无法直接看出Header对应的类是哪个文件里的
// 3. 当文件加载顺序混乱的时候，也不容易排查错误
new Header();
new Sidebar();
new Content();


// 面向过程的编程思想，所有内容混合在一起，导致一个文件内容太多了，且不利于代码的维护
// const header = document.createElement('div');
// header.innerText = '这里是头部';
// domEle.append(header);

// const sidebar = document.createElement('div');
// sidebar.innerText = '这里是侧边栏';
// domEle.append(sidebar);

// const content = document.createElement('div');
// content.innerText = '这里是内容';
// domEle.append(content);