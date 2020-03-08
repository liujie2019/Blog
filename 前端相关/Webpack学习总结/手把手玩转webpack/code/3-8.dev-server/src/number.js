function number() {
    const box = document.createElement('div');
    box.setAttribute('id', 'number');
    box.innerText = 2000;
    document.body.appendChild(box);
}

export default number;