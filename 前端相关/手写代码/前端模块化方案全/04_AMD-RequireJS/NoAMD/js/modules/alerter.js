;(function(window, dataService){
    let b = 'work';
    function showMsg() {
        console.log(`${dataService.foo()}-${b}`);
    }
    window.alerter = {showMsg};
})(window, dataService)