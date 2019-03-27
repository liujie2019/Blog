import ajax from './ajax'; //引入axios的封装方法

export const getUserInfo = (params = {}) => {
    return ajax('get', '/api/userInfo', params);
};

export const register = (params) => {
    return ajax('post', '/api/v1.0/admin/register', params); //添加管理员
};

export const deleteAdmin = (id, params) => {
    return ajax('delete', `/api/v1.0/admin/${id}`, params); //更新管理员信息
};