// contentTypeCall

// function fn(str) {
//     const res = str.replace(/[A-Z]/g, s => {
//         return '_' + s.toLowerCase();
//     });
//     console.log(res);
// }
// let str = 'contentTypeCall'
// fn(str);

// 下划线转驼峰
function fn(str) {
    const res = str.replace(/_\w/g, s => {
        return s[1].toUpperCase();
    });
    console.log(res); // contentTypeCall
}
let str = 'content_type_call'
fn(str);