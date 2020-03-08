document.addEventListener('click', function() {
    import(
        /* webpackChunkName:"click" */
        /* webpackPrefetch: true */
        './click.js'
    ).then(({default: fn}) => {
        fn();
    });
}, false);