// ES Module模块引入方式
import avatar from './avatar.jpg';
import demo from './demo.txt';

console.log(demo); // 82ae7ce2699716c8b5cf51f58450cab2.txt
console.log(avatar); // 9a70fede6e87c8b8efcd1bc80a382c8b.jpg

// const img = document.createElement('img');
const img = new Image();
img.src = avatar;
document.body.appendChild(img);
