const x = 1;

const obj = {
  x: 2,
  y: () => {
    console.log(this);
    console.log(this.x);
  }
};

setTimeout(obj.y, 1000);