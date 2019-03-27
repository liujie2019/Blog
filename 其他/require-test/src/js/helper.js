define('helper', ['lodash'], (_) => {
    console.log('helper');
    return {
        reverse: (param) => {
            return _.reverse(param);
        }
    }
});