"use strict";
// ts中自定义方法传入参数，对json进行约束
// function sayName(info:{name:string}):string {
//     return info.name;
// }
function ajax(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (config.dataType === 'json') {
                console.log(JSON.parse(xhr.responseText));
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
}
ajax({
    type: 'get',
    data: 'name=lisi',
    url: 'http://www.baidu.com',
    dataType: 'json'
});
