// 异步loader
function syncLoader(source) {
    const callback = this.async();
    setTimeout(() => {
        const result = source.replace('loader', 'asyncLoader');
        callback(null, result);
    }, 3000);
}

module.exports = syncLoader;