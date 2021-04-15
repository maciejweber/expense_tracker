import axios from 'axios';
import { returnAlerts } from '../actions/alerts';
import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS
} from './types';

export const loadUser = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    });

    axios
    .get('http://127.0.0.1:8000/api/auth/user/', tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    })
    .catch((err) => {
        dispatch({
            type: AUTH_ERROR
        });
    });
};

export const login = (username, password) => (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const body = JSON.stringify({ username, password });
  
    axios
      .post('http://127.0.0.1:8000/api/auth/login/', body, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnAlerts(err.response.data.non_field_errors, "error", err.response.status));
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

export const register = ({username, password}) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({username, password});

    axios
    .post('http://127.0.0.1:8000/api/auth/register/', body, config)
    .then((res) => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(returnAlerts("Your account has been created", "success", res.status));
    })
    .catch((err) => {
        dispatch(returnAlerts(err.response.data.username, "error", err.response.status));
        dispatch({
          type: REGISTER_FAIL,
        });
      });
};

export const logout = () => (dispatch, getState) => {
    axios
    .post('http://127.0.0.1:8000/api/auth/logout/', null, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: LOGOUT_SUCCESS,
            payload: res.data
        });
    });
};

export const tokenConfig = (getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};