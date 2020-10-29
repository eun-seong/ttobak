import { api } from '../api.js';
import { USER_AUTOLOGIN } from './action';
import { USER_LOGOUT } from './action';
import { USER_DELETE } from './action';

export default () => {
  return next => action => {
    if(!action.promise) {
      const {type, ...rest} = action;
      if(type === USER_AUTOLOGIN) {
        const u_id = window.localStorage.getItem('uid');
        console.log(action);
        if(u_id) {
          return next({...rest, data: {u_id}, type: `${type}_SUCCESS`});
        } else {
          return next({...rest, type: `${type}_FAILURE`});
        }
      } else if(type === USER_LOGOUT) {
        window.localStorage.removeItem('uid');
        return next({...rest, type: `${type}_SUCCESS`});
      } else {
        return next({...rest, type: `${type}_SUCCESS`});
      }
    }

    const { promise, type, ...rest } = action;
    if(type === USER_DELETE) {
      window.localStorage.removeItem('uid');
    }

    next({ ...rest, type: `${type}_REQUEST` });
    return api.post(promise.url, promise.data)
      .then(result => {
        if(result.data.code === 1) next({ ...rest, result, type: `${type}_SUCCESS` });
        else next({ ...rest, result, type: `${type}_FAILURE` });
      })
      .catch(error => {
        next({ ...rest, error, type: `${type}_FAILURE` });
      });
  };
};