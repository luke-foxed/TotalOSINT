import axios from 'axios';
import {
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT,
} from './types';
// import { setAlert } from './alert';
import setAuthToken from '../helpers/tokenHelper';

/**
 * Load User via their JWT token
 * @returns {object} User object
 */

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    await dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

/**
 * Register User
 * @param {string} name - First and second name combined
 * @param {string} email - User email
 * @param {string} password - User password
 */

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    await dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log(err);
      // errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

/**
 * Log User in
 * @param {string} username - Username
 * @param {string} password - User password
 */

export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post('/api/auth/login', body, config);

    await dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    await dispatch(loadUser());
    console.log(res);
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      // errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')));
    }
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
