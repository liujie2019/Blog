var a = 1;
function fn() {
    console.log(a); // undefined
    var a = 2;
    console.log(a); // 2
}
fn();