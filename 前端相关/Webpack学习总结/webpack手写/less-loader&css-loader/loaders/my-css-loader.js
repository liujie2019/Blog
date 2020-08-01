
function loader(source) {
    // 匹配url()
    // 匹配分组(.+?)
    // return source;
    const reg = /url\((.+?)\)/g;
    let pos = 0;
    let current;
    let arr = ['let list = []'];
    while(current = reg.exec(source)) {
        const [matchUrl, g] = current;
        // console.log(matchUrl, g);// url('./avatar.jpg') './avatar.jpg'
        // 拿到css从开始到地址链接之前的部分的索引值
        let lastIndex = reg.lastIndex - matchUrl.length;
        arr.push(`list.push(${JSON.stringify(source.slice(pos, lastIndex))})`); // 获取css开始和地址之前的代码
        pos = reg.lastIndex;
        // 把g替换成require的写法
        arr.push(`list.push('url('+ require(${g}) +')')`); // 拼入图片地址
    }
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`); // 拼入地址到结尾的代码
    arr.push(`module.exports = list.join('')`);
    // console.log(arr.join('\r\n'));
    /**
    let list = []
    list.push("body {\n  background-color: green;\n  background: ")
    list.push('url('+ require('./avatar.jpg') +')')
    list.push(";\n}\n")
    module.exports = list.join('')
    */
    return arr.join('\r\n');
}

module.exports = loader;