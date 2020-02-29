// ES Module模块引入方式
// 在index.js文件中引入其需要的文件，使得项目文件间的依赖关系更加明确
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import Content from './Content.js';

// 采用面向对象的思路改造：把不同的内容分到不同的文件中书写
// 这样将内容进行分离后更容易维护，哪里出错了直接找到对应的文件修改即可
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