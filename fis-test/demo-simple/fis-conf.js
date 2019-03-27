// 加 md5
fis.match('*.{js,css,png}', {
    useHash: true
});

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
    spriter: fis.plugin('csssprites')
});

// 对 CSS 进行图片合并
fis.match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
});

fis.match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});

// 开发测试使用
const debug = fis.media('debug');
// 开发的时候不需要压缩、合并图片、也不需要 hash
// fis3 release debug 启用 media debug 的配置，覆盖上面的配置，把诸多功能关掉
debug.match('*.{js,css,png}', {
    useHash: false,
    useSprite: false,
    optimizer: null
});