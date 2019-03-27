function test(x){
    var sum = x;
    var mod = function(y) {
          sum = sum * y;
          return mod;
    };
    mod.toString = function() {
        return sum;
    };
   return mod;
}

console.log(test(2)(3)(4)(5).toString());