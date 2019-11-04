export function ui() {
    $('body').css('background', 'red');
    _map([1, 2], item => console.log(item));
}