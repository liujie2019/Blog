const str = 'get-element-by-id';

// const reg = /-\w/g;

// -e -> E  -b -> B -i -> I
// const res = str.replace(reg, e => {
//     // console.log(e);
//     // 这里的e即正则匹配到的内容
//     return e.slice(1).toUpperCase();
// });
const reg = /-(\w)/g;
const res = str.replace(reg, ($, $1) => {
    // console.log($); // 正则匹配到的内容
    // console.log($1); // 匹配到的分组
    // 这里的$即正则匹配到的内容
    return $1.toUpperCase();
});
console.log(res); // getElementById

const str2 = 'get-element-by-id';

function trans(arr) {
    let res = arr.reduce((prev, cur, index, arr) => {
        let temp = '';
        prev += cur.substring(0, 1).toUpperCase();
        prev += cur.substring(1, cur.length);
        return temp + prev;
    });
    return res;
}

console.log(trans(str2.split('-')));