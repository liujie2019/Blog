#### Git错误fatal: unable to access 'https://github.com/****.git/': Couldn't resolve host 'github.com'
解决办法重新设置和取消代理：

```
# 设置http代理
git config --global http.proxy http://127.0.0.1:1080
# 设置https代理
git config --global https.proxy https://127.0.0.1:1080
# 取消http代理
git config --global --unset http.proxy
# 取消https代理
git config --global --unset https.proxy


npm config delete proxy

git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
```