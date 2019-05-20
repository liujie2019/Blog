fis.config.set('namespace', 'fis-receiver');

fis.media('qa').match('*', {
    deploy: fis.plugin('http-push', {
      receiver: '服务器接收地址',
      to: '服务器接收目录' // 注意这个是指的是测试机器的路径，而非本地机器
    })
});