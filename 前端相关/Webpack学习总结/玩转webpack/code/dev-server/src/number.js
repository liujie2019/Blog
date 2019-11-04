function number() {
    const box = document.createElement('div');
    box.setAttribute('id', 'number');
    box.innerText = 1000;
    document.body.appendChild(box);
}

export default number;