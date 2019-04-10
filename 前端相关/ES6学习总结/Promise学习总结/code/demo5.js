window.process = {
    nextTick: function (f) {
      new Promise(function(resolve) {
        resolve();
      })
      .then(f);
    }
}

console.log('1'); // 1,2,4,3,5

setTimeout(function() {
    console.log('2');
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5');
    });
    process.nextTick(function() {
        console.log('3');
    })
});
