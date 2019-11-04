function Content() {
    const domEle = document.querySelector('#root');
    const content = document.createElement('div');
    content.innerText = '这里是内容';
    domEle.append(content);
}

export default Content;