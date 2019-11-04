// ES Module模块引入方式
import demo from './demo.txt';
import avatar from './avatar.jpg';
import './index.less';
// import style from './index.less';
// import createAvatar from './createAvatar';

console.log(demo); // 82ae7ce2699716c8b5cf51f58450cab2.txt
console.log(avatar); // 9a70fede6e87c8b8efcd1bc80a382c8b.jpg

// createAvatar();
// const img = document.createElement('img');
// const img = new Image();
// img.src = avatar;
// img.classList.add(style.avatar);
// document.body.appendChild(img);
const root = document.querySelector('#root');
root.innerHTML = `
    <div class="iconfont icon-baomihua"></div>
    <div class="iconfont icon-bingqilin"></div>
    <div class="iconfont icon-chushimao"></div>
`;
