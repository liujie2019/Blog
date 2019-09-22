;(function(window){
    let a = 'test';
    function foo() {
        return a.toUpperCase();
    }
    window.dataService = {foo};
})(window)