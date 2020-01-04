import avatar from './avatar.jpg';

function createAvatar() {
    const img = new Image();
    img.src = avatar;
    img.classList.add('avatar');
    document.body.appendChild(img);
}

export default createAvatar;