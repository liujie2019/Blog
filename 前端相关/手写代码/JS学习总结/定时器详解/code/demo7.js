var x = 1;

var obj = {
  x: 2,
  y: () => {
    console.log(this.x);
  }
};

setTimeout(() => {
  console.log(this);
  obj.y();
}, 1000);