import imgTest from './assets/images/test.jpg';
import './style/index.css';

document.querySelector('#root').innerHTML = `
    <img src="${imgTest}" />
`;