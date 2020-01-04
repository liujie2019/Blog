import axios from 'axios';
import {Toast} from 'vant';
import service from './contactApi';

// service 循环遍历输出不同的请求方法

const instance = axios.create({
    baseURL: 'http://localhost:9000/api',
    timeout: 1000
});
// 包裹请求方法的容器
const HttpClient = {};
for (const key in service) {
    if (service.hasOwnProperty(key)) {
        const api = service[key];
        // async:避免进入回调地狱
        HttpClient[key] = async function (
            params, // 请求参数 get/delete请求放到url中，put/post/patch放到请求体中
            isFormData=false, // 标识是否是form-data请求
            config={} // 配置参数，headers等
        ) {
            let newParams = {};
            if (params && isFormData) {
                newParams = new FormData();
                for (const key in params) {
                    if (params.hasOwnProperty(key)) {
                        newParams.append(key, params[key]);
                    }
                }
            } else {
                newParams = params;
            }
            // 不同请求判断
            let response = {}; // 请求的返回值
            if (api.method === 'post' || api.method === 'patch' || api.method === 'put') {
                try {
                    response = await instance[api.method](api.url, newParams, config);
                } catch (error) {
                    response = error;
                }
             } else if (api.method === 'get' || api.method === 'delete') {
                config.params = newParams;
                try {
                    response = await instance[api.method](api.url, config);
                } catch (error) {
                    response = error;
                }
             }
             return response;
        }
    }
}

// 拦截器的添加
instance.interceptors.request.use(config => {
    // 发送请求前做些事情
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0 // 提示一直存在
    });
    return config;
}, () => {
    Toast.clear(); // 清除加载中的提示
    Toast.fail('请求失败，请稍后重试');
});
// 响应拦截器
instance.interceptors.response.use(res => {
    Toast.clear();
    return res.data;
}, () => {
    Toast.clear(); // 清除加载中的提示
    Toast.fail('请求失败，请稍后重试');
});

export default HttpClient;