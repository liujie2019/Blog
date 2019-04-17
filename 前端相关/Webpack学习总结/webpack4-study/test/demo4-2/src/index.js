document.querySelector('#btn').onclick = function() {
    import('./module.js').then(module => console.log(module.Count));
    // require.ensure([], function(require) {
    //     var module = require('./src/module.js');
    //     console.log(module);
    // });
}