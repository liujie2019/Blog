export function ui() { // 自定义一个ui库
    $('body').css('background', 'red');
    _map([1, 2], item => console.log(item));
}