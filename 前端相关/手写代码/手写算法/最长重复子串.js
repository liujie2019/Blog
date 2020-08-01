// var lengthOfLongestSubstring = function(s) {
//     var str="" //存放无重复子串
//     var size=0 //当前最长无重复子串的长度
//     for(var i=0,len=s.length;i<len;i++){
//         var char=s.charAt(i)
//         var index=str.indexOf(char)
//         if(index==-1){
//             str+=char
//             size=size<str.length?str.length:size
//         }else{
//             str=str.substr(index+1)+char
//         }
//     }
//     return size
// };
const lengthOfLongestSubstring = function(s) {
    let str = '';
    let size = 0;
    for (let i of s) {
        const index = str.indexOf(i);
        if (index === -1) {
            str += i;
            size = size > str.length ? size : str.length;
        } else {
            str = str.substr(index + 1) + i;
        }
    }
    // console.log(str); // dabc
    return size;
}

// console.log(lengthOfLongestSubstring('abcdabc'));
console.log(lengthOfLongestSubstring('pwwkew'));