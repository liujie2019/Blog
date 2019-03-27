import axios from 'axios';

// axios 请求拦截器处理请求数据
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers.common['Authorization'] = 'Bearer ' + token;
    return config;
});
// axios 响应拦截器处理响应数据
// axios.interceptors.response.use(
//     response => response,
//     error => Promise.resolve(error.response)
// );

// export default {
//     post(url, data, auth) {
//         return axios({
//             method: 'post',
//             url,
//             data: data,
//             headers: getBmHeaders(auth)
//         }).then(checkStatus).then(checkCode);
//     },
//     get(url, params, auth) {
//         return axios({
//             method: 'get',
//             url,
//             params,
//             headers: getBmHeaders(auth)
//         }).then(checkStatus).then(checkCode);
//     },
//     delete(url, data, auth) {
//         return axios({
//             method: 'delete',
//             url,
//             data: data,
//             headers: getBmHeaders(auth)
//         }).then(checkStatus).then(checkCode);
//     },
//     put(url, data, auth) {
//         return axios({
//             method: 'put',
//             url,
//             data: data,
//             headers: getBmHeaders(auth)
//         }).then(checkStatus).then(checkCode);
//     }
// };