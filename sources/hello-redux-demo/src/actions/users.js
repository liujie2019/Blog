import * as Types from '../constants';

import axios from 'axios';

export const get_user = () => {
    return {
      type: Types.LOAD_USER,
      payload: {
        promise: axios.get("https://randomuser.me/api/")
      }
    };
};