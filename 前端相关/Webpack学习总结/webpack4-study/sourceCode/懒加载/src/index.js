import(/* webpackChunkName: 'pageA'*/'./pageA').then(pageA => {
    console.log(pageA);
});

import(/* webpackChunkName: 'pageB'*/'./pageB').then(pageB => {
    console.log(pageB);
});

document.querySelector('#btn').onclick = () => {
    import(/* webpackChunkName: 'jquery'*/'jquery').then($ => {
        console.log($);
        $.default('body').css('background-color', 'red');
    });
}