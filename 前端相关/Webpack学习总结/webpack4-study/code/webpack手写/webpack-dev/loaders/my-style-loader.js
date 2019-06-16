/**
 * 将对应的css代码插入到html的head标签中
 * @param {*} source
 */
const myStyleLoader = source => {
    // JSON.stringify(source) 是将css代码转为一行
    const style = `
        const style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
    `;
    return style;
};

module.exports = myStyleLoader;