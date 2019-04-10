String.prototype.repeatify = function(n) {
   var str = '';
   for(var i = 0; i < n; i++) {
       str += this;
   }
   return str;
}
console.log('hello'.repeatify(3));