import axios from 'axios';

// 用户注册
export const userSignupRequest = userData => {
    return dispatch => {
        return axios.post('/api/signup', userData);
    }
};