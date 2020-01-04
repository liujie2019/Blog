import avatar from './avatar.jpg';
import style from './index.less';
import createAvatar from './createAvatar';

createAvatar(); // 每运行一次，就会在页面中添加一张图片
const img = new Image();
img.src = avatar;
img.classList.add(style.avatar);

document.body.appendChild(img);