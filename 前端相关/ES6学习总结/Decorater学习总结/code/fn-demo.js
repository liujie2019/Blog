var counter = 0;

var add = function () {
  counter++;
};

@add
function foo() {
}
foo();
console.log(counter);