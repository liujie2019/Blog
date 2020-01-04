console.log('script start'); // 1

async function async1() {
  await async2();
  console.log('async1 end'); // 5
}
async function async2() {
  console.log('async2 end'); // 2
}
async1();

setTimeout(function() {
  console.log('setTimeout'); // 8
}, 0);

new Promise(resolve => {
  console.log('Promise'); // 3
  resolve();
}).then(function() {
   console.log('promise1'); // 6
}).then(function() {
   console.log('promise2'); // 7
})

console.log('script end'); // 4