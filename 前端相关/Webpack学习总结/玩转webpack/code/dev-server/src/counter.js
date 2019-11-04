function counter() {
    const box = document.createElement('div');
    box.setAttribute('id', 'counter');
    box.innerText = 1;
    box.addEventListener('click', function() {
        box.innerText = Number.parseInt(box.innerText, 10) + 1;
    }, false);
    document.body.appendChild(box);
}

export default counter;