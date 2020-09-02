// function arrToTree(arr) {
//     let res = [];
//     let obj = {};
//     // 遍历数组
//     for (let i = 0; i < arr.length; i++) {
//         // 遍历行
//         for (let j = 0; j < arr[i].length; j++) {
//             let el = arr[i][j]; // 获取对应元素
//             if (obj[el] === undefined) {
//                 obj[el] = {
//                     name: el,
//                     child: []
//                 };
//             }
//             // 每一行第二个元素开始判断
//             if (j > 0) {
//                 // 获取到其对应的父元素
//                 let parent = obj[arr[i][j - 1]];
//                 if (parent) { // 如果父元素存在
//                     if (parent.child.indexOf(obj[el]) === -1) {
//                         parent.child.push(obj[el]);
//                     }
//                 }
//             } else {
//                 if (res.indexOf(obj[el]) === -1) {
//                     res.push(obj[el]);
//                 }
//             }
//         }
//     }
//     return res;
// }

function arrToTree(arr) {
    let res = []; // 结果数组
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let el = arr[i][j];
            if (obj[el] === undefined) {
                obj[el] = {
                    name: el,
                    child: []
                }
            }
            if (j > 0) {
                // 找到父级
                let parent = obj[arr[i][j-1]];
                if (parent && parent.child.indexOf(obj[el]) === -1) {
                    parent.child.push(obj[el]);
                }
            } else {
                if (res.indexOf(obj[el]) === -1) {
                    res.push(obj[el]);
                }
            }
        }
    }
    return res;
}

let arr = [
    ["a", "aa", "aaa", "aaaa"],
    ["b", "bb", "bbb"],
    ["a", "ab", "aba"],
    ["a", "aa", "aab"]
];

console.log(JSON.stringify(arrToTree(arr)));

function traverse(arr) {
    let res = [];
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let el = arr[i][j];
            if (obj[el] === undefined) {
                obj[el] = {
                    name: el,
                    child: []
                };
            }
            if (j > 0) {
                let parent = obj[arr[i][j - 1]];
                if (parent) {
                    if (parent.child.indexOf(obj[el]) === -1) {
                        parent.child.push(obj[el]);
                    }
                }
            } else {
                if (res.indexOf(obj[el]) === -1) {
                    res.push(obj[el]);
                }
            }
        }
    }
    return res;
}

let arr = [
    ["a", "aa", "aaa", "aaaa"],
    ["b", "bb", "bbb"],
    ["a", "ab", "aba"],
    ["a", "aa", "aab"]
];