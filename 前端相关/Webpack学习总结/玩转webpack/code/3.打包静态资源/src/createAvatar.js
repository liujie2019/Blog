import avatar from './avatar.jpg';

function createAvatar() {
    const img = new Image();
    img.src = avatar;
    // 给image标签添加一个avatar的类
    img.classList.add('avatar');
    document.body.appendChild(img);
}

export default createAvatar;