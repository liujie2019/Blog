function Header() {
    const root = document.querySelector('#root');
    const span = document.createElement('span');
    span.innerText = 'hahaha';
    span.classList.add('item');
    root.appendChild(span);
}

export default Header;