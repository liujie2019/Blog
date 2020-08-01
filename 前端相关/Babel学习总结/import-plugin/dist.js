import indexOf from "lodash/indexOf";
import concat from "lodash/concat";
var array = [1];
var other = concat(array, 2, [3], [[4]]);
console.log(other);
console.log(indexOf(other, 2));
