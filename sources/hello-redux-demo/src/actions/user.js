import * as Types from '../constants';

export const fetch_user_failure = (error) => {
    return {
      type: Types.FETCH_USER_FAILURE,
      error
    };
  };

export const fetch_user = (user) => {
    return {
      type: Types.FETCH_USER_SUCCESS,
      user
    }
};

export const fetch_user_request = () => {
    return {
      type: Types.FETCH_USER_REQUEST
    }
};