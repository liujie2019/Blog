import axios from 'axios'

// axios 请求拦截器处理请求数据
// config 为请求的一些配置 例如：请求头/请求时间/Token
// 可以根据自己的项目需求个性化配置，参考axios的中文说明手册， 自己多动手
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else {
        delete config.headers.common['Authorization'];
    }
    // 设置请求时间(10秒)
    config.timeout = 10 * 1000;
    return config;
}, error => {
    return Promise.reject(error);
});


// 添加响应拦截器
// axios.interceptors.response.use(
//   response => {
//     if (response.data.code === 0) {   //服务端定义的响应code码为0时请求成功
//       return Promise.resolve(response.data) //使用Promise.resolve 正常响应
//     } else if (response.data.code === 1401) { //服务端定义的响应code码为1401时为未登录
//       store.dispatch('setUserInfo', {})
//       Message({
//         message: '未登录'
//       })
//       // router.push('/login')
//       return Promise.reject(response.data)    //使用Promise.reject 抛出错误和异常
//     } else {
//       return Promise.reject(response.data)
//     }
//   },
//   error => {
//     if (error && error.response) {
//       let res = {}
//       res.code = error.response.status
//       res.msg = throwErr(error.response.status, error.response) //throwErr 捕捉服务端的http状态码 定义在utils工具类的方法
//       return Promise.reject(res)
//     }
//     return Promise.reject(error)
//   }
// );

//暴露 request 给我们好API 管理
export default function request(method, url, data) {
  method = method.toLocaleLowerCase();   //封装RESTful API的各种请求方式 以 post get delete为例
  switch(method) {
    case 'get':
        return axios.get(url, {
            params: data
        });
    case 'post':
        return axios.post(url, data); //axios的post 默认转化为json格式
    case 'put':
        return axios.put(url, data);
    case 'delete':
        return axios.delete(url, {
            params: data
        });
  }
}