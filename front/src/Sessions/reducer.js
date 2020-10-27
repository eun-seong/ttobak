import { combineReducers } from 'redux';
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE } from './action.js';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE } from './action.js';
import { USER_MODIFY_REQUEST, USER_MODIFY_SUCCESS, USER_MODIFY_FAILURE } from './action.js';
import { USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAILURE } from './action.js';
import { USER_GET_REQUEST, USER_GET_SUCCESS, USER_GET_FAILURE } from './action.js';
import { USER_LOGOUT } from './action.js';
import { STUDENT_ADD_REQUEST, STUDENT_ADD_SUCCESS, STUDENT_ADD_FAILURE } from './action.js';
import { STUDENT_MODIFY_REQUEST, STUDENT_MODIFY_SUCCESS, STUDENT_MODIFY_FAILURE } from './action.js';
import { STUDENT_DELETE_REQUEST, STUDENT_DELETE_SUCCESS, STUDENT_DELETE_FAILURE } from './action.js';
import { STUDENT_GET_REQUEST, STUDENT_GET_SUCCESS, STUDENT_GET_FAILURE } from './action.js';


const defaultState = {
  isLoggedIn: false,
  fetchingUpdate: false,
  user: {}, 
  student: {},
  response: {}
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        fetchingUpdate: true
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        fetchingUpdate: false,
        isLoggedIn: true,
        user: {'u_id': action.result.data.usr_id}, 
        response: action.error || action.result
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        fetchingUpdate: false, 
        user: {}, 
        response: action.error || action.result
      };
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        fetchingUpdate: true
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        fetchingUpdate: false,
        isLoggedIn: true,
        user: {'u_id': action.result.data.usr_id},
        response: action.error || action.result
      };
    case USER_SIGNIN_FAILURE:
      return {
        ...state,
        fetchingUpdate: false,
        response: action.error || action.result
      };
    case USER_MODIFY_REQUEST:
      return {
        ...state,
        fetchingUpdate: true
      };
    case USER_MODIFY_SUCCESS:
      return {
        ...state,
        fetchingUpdate: false,
        isLoggedIn: false,
        user: {}, 
        response: action.error || action.result
      };
    case USER_MODIFY_FAILURE:
      return {
        ...state,
        fetchingUpdate: false, 
        response: action.error || action.result
      };
    case USER_DELETE_REQUEST:
      return {
        ...state,
        fetchingUpdate: true
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        fetchingUpdate: false,
        isLoggedIn: false,
        user: {}, 
        response: action.error || action.result
      };
    case USER_DELETE_FAILURE:
      return {
        ...state,
        fetchingUpdate: false, 
        response: action.error || action.result
      };
    case USER_GET_REQUEST:
      return {
        ...state,
        fetchingUpdate: true
      };
    case USER_GET_SUCCESS:
      return {
        ...state,
        fetchingUpdate: false,
        isLoggedIn: true,
        user: { 'u_id': action.result.data.u_id, 'name': action.result.data.name, 'email': action.result.data.email, 'students': action.result.data.students.map(
          el => {return {'s_id': el.stu_id, 'name': el.stu_name, 'gender': el.stu_gender, 'birth': el.stu_birth, 'ic_id': el.ic_id};}
        )}, 
        response: action.error || action.result
      };
    case USER_GET_FAILURE:
      return {
        ...state,
        fetchingUpdate: false, 
        response: action.error || action.result
      };
    case STUDENT_ADD_REQUEST:
      return {
        ...state,
        fetchingUpdate: true
      };
    case STUDENT_ADD_SUCCESS:
      return {
        ...state,
        fetchingUpdate: false,
        isLoggedIn: true,
        student: {'s_id': action.result.data.stu_id}, 
        response: action.error || action.result
      };
    case STUDENT_ADD_FAILURE:
      return {
        ...state,
        fetchingUpdate: false, 
        response: action.error || action.result
      };
    case STUDENT_MODIFY_REQUEST:
      return {
        ...state,
        fetchingUpdate: true
      };
    case STUDENT_MODIFY_SUCCESS:
      return {
        ...state,
        fetchingUpdate: false,
        isLoggedIn: true,
        student: {}, 
        response: action.error || action.result
      };
    case STUDENT_MODIFY_FAILURE:
      return {
        ...state,
        fetchingUpdate: false, 
        response: action.error || action.result
      };
    case STUDENT_DELETE_REQUEST:
      return {
        ...state,
        fetchingUpdate: true
      };
    case STUDENT_DELETE_SUCCESS:
      return {
        ...state,
        fetchingUpdate: false,
        isLoggedIn: true,
        student: {}, 
        response: action.error || action.result
      };
    case STUDENT_DELETE_FAILURE:
      return {
        ...state,
        fetchingUpdate: false, 
        response: action.error || action.result
      };
    case STUDENT_GET_REQUEST:
      return {
        ...state,
        fetchingUpdate: true
      };
    case STUDENT_GET_SUCCESS:
      return {
        ...state,
        fetchingUpdate: false,
        isLoggedIn: true,
        student: { 's_id': action.result.data.stu_id, 'name': action.result.data.name, 'birth': action.result.data.birth, 'gender': action.result.data.gender, 'ic_id': action.result.data.ic_id }, 
        response: action.error || action.result
      };
    case STUDENT_GET_FAILURE:
      return {
        ...state,
        fetchingUpdate: false, 
        response: action.error || action.result
      };
    case USER_LOGOUT:
      return {
        ...state, 
        isLoggedIn: false, 
        fetchingUpdate: false,
        user: {}, 
        student: {}
      }
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer
});