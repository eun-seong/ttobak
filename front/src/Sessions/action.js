export const USER_REGISTER = 'USER_REGISTER';
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

export const USER_SIGNIN = 'USER_SIGNIN';
export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST';
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
export const USER_SIGNIN_FAILURE = 'USER_SIGNIN_FAILURE';

export const USER_MODIFY = 'USER_MODIFY';
export const USER_MODIFY_REQUEST = 'USER_MODIFY_REQUEST';
export const USER_MODIFY_SUCCESS = 'USER_MODIFY_SUCCESS';
export const USER_MODIFY_FAILURE = 'USER_MODIFY_FAILURE';

export const USER_DELETE = 'USER_DELETE';
export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST';
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS';
export const USER_DELETE_FAILURE = 'USER_DELETE_FAILURE';

export const USER_GET = 'USER_GET';
export const USER_GET_REQUEST = 'USER_GET_REQUEST';
export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
export const USER_GET_FAILURE = 'USER_GET_FAILURE';

export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';

export const USER_AUTOLOGIN = 'USER_AUTOLOGIN';
export const USER_AUTOLOGIN_SUCCESS = 'USER_AUTOLOGIN_SUCCESS';
export const USER_AUTOLOGIN_FAILURE = 'USER_AUTOLOGIN_FAILURE';

export const STUDENT_ADD = 'STUDENT_ADD';
export const STUDENT_ADD_REQUEST = 'STUDENT_ADD_REQUEST';
export const STUDENT_ADD_SUCCESS = 'STUDENT_ADD_SUCCESS';
export const STUDENT_ADD_FAILURE = 'STUDENT_ADD_FAILURE';

export const STUDENT_MODIFY = 'STUDENT_MODIFY';
export const STUDENT_MODIFY_REQUEST = 'STUDENT_MODIFY_REQUEST';
export const STUDENT_MODIFY_SUCCESS = 'STUDENT_MODIFY_SUCCESS';
export const STUDENT_MODIFY_FAILURE = 'STUDENT_MODIFY_FAILURE';

export const STUDENT_DELETE = 'STUDENT_DELETE';
export const STUDENT_DELETE_REQUEST = 'STUDENT_DELETE_REQUEST';
export const STUDENT_DELETE_SUCCESS = 'STUDENT_DELETE_SUCCESS';
export const STUDENT_DELETE_FAILURE = 'STUDENT_DELETE_FAILURE';

export const STUDENT_GET = 'STUDENT_GET';
export const STUDENT_GET_REQUEST = 'STUDENT_GET_REQUEST';
export const STUDENT_GET_SUCCESS = 'STUDENT_GET_SUCCESS';
export const STUDENT_GET_FAILURE = 'STUDENT_GET_FAILURE';

export const STUDENT_CHANGE = 'STUDENT_CHANGE';
export const STUDENT_CHANGE_SUCCESS = 'STUDENT_CHANGE_SUCCESS';

export const RESPONSE_CLEAR = 'RESPONSE_CLEAR';
export const RESPONSE_CLEAR_SUCCESS = 'RESPONSE_CLEAR_SUCCESS';


export const user_register = (email, pw, name) => {
  return {
    type: USER_REGISTER,
    promise: { method: 'post', url: 'user/register', data: { email, pw, name } }
  };
};

export const user_signin = (email, pw) => {
  return {
    type: USER_SIGNIN,
    promise: { method: 'post', url: 'user/sign_in', data: { email, pw } }
  };
};

export const user_modify = (email, pw, name, u_id) => {
  return {
    type: USER_MODIFY,
    promise: { method: 'post', url: 'user/modify', data: { email, pw, name, u_id } }
  };
};

export const user_delete = (u_id) => {
  window.localStorage.removeItem('u_id');

  return {
    type: USER_DELETE,
    promise: { method: 'post', url: 'user/delete', data: { u_id } }
  };
};

export const user_get = (u_id) => {
  return {
    type: USER_GET,
    promise: { method: 'post', url: 'user/get', data: { u_id } }
  };
};

export const user_autologin = () => {
  const u_id = window.localStorage.getItem('u_id');

  return {
    type: USER_AUTOLOGIN, 
    data: (u_id ? {u_id} : {})
  };
}

export const user_logout = (u_id) => {
  window.localStorage.removeItem('u_id');

  return {
    type: USER_LOGOUT, 
    data: {}
  }
}

export const student_add = (name, birth, gender, ic_id, u_id) => {
  return {
    type: STUDENT_ADD,
    promise: { method: 'post', url: 'student/add', data: { name, birth, gender, ic_id, u_id } }
  };
};

export const student_modify = (name, birth, gender, ic_id, s_id, u_id) => {
  return {
    type: STUDENT_MODIFY,
    promise: { method: 'post', url: 'student/modify', data: { name, birth, gender, ic_id, s_id, u_id } }
  };
};

export const student_delete = (s_id, u_id) => {
  return {
    type: STUDENT_DELETE,
    promise: { method: 'post', url: 'student/delete', data: { s_id, u_id } }
  };
};

export const student_get = (s_id, u_id) => {
  return {
    type: STUDENT_GET,
    promise: { method: 'post', url: 'student/get', data: { s_id, u_id } }
  };
};

export const student_change = (s_id) => {
  return {
    type: STUDENT_CHANGE, 
    data: {'s_id': s_id}
  };
}

export const response_clear = () => {
  return {
    type: RESPONSE_CLEAR, 
    data: {}
  }
}
