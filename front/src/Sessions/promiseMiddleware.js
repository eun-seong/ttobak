import { api } from '../api.js';
import { USER_AUTOLOGIN } from './action';

export default () => {
  return next => action => {
    if(!action.promise) {
      const {type, data, ...rest} = action;
      if(type === USER_AUTOLOGIN) {
        if(data.u_id) {
          return next({...rest, data, type: `${type}_SUCCESS`});
        } else {
          return next({...rest, data, type: `${type}_FAILURE`});
        }
      } 

      return next({...rest, data, type: `${type}_SUCCESS`});
    }

    const { promise, type, ...rest } = action;

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