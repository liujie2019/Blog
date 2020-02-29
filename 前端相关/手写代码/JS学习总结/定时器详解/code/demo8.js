var x = 1;

var obj = {
  x: 2,
  y: function () {
    console.log(this.x);
  }
};

setTimeout(function () {
  console.log(this); // window
  obj.y(); // 2
}, 1000);