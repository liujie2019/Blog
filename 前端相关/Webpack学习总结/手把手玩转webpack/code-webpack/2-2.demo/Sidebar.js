function Sidebar() {
    const domEle = document.querySelector('#root');
    const sidebar = document.createElement('div');
    sidebar.innerText = '这里是侧边栏';
    domEle.append(sidebar);
}

module.exports = Sidebar;