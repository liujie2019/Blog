xxx = "outer xxx";
console.log(xxx); // 运行结果：outer xxx
function testFtn(){
    sss = "inner sss";
    console.log(sss); // 运行结果：inner sss
}
testFtn();
console.log(sss); //运行结果：inner sss
// console.log(window.sss); //运行结果：outer sss
