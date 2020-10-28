import { api } from '../api.js';

export default () => {
  return next => action => {
    if(!action.promise) {
      const {type, ...rest} = action;
      return next({...rest, type: `${type}_SUCCESS`});
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