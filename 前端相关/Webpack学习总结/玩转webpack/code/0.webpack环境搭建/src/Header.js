function Header() {
    const domEle = document.querySelector('#root');
    const header = document.createElement('div');
    header.innerText = '这里是头部';
    domEle.append(header);
}

export default Header;