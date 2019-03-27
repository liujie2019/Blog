import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from '../constants';

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        user
    };
};

// 注销

// 登录
export const login = data => {
    return dispatch => {
        return axios.post('/api/login', data).then(res => {
            const token = res.data.data.token;
            localStorage.setItem('jwtToken', token);
            dispatch(setCurrentUser(jwtDecode(token)));
        });
    };
};