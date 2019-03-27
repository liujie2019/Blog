let name = 'aaa bbb ccc';
let uw = name.replace(/\b\w+\b/g, (word) => {
  return word.substring(0,1).toUpperCase() + word.substring(1);
});
console.log(uw);