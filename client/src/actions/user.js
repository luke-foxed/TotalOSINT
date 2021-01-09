import axios from 'axios';
import { setAlert } from './alert';
import { loadUser, logout } from './auth';

export const saveResults = (results) => async (dispatch) => {
  try {
    await axios.put('/api/users/save-search', results);

    dispatch(setAlert('Results Saved!', 'success'));

    dispatch(loadUser());
  } catch (err) {
    console.error(err);
    dispatch(setAlert(err.response.data.msg, 'error'));
  }
};

export const deleteResult = (id) => async (dispatch) => {
  try {
    let res = await axios.put('/api/users/delete-search', { searchID: id });
    dispatch(setAlert(res.data.msg, 'success'));
    dispatch(loadUser());
  } catch (err) {
    console.error(err);
    dispatch(setAlert(err.response.data.msg, 'error'));
  }
};

export const deleteAllResults = () => async (dispatch) => {
  try {
    let res = await axios.put('/api/users/delete-all-searches');
    dispatch(setAlert(res.data.msg, 'success'));
    dispatch(loadUser());
  } catch (err) {
    console.error(err);
    dispatch(setAlert(err.response.data.msg, 'error'));
  }
};

export const deleteUser = () => async (dispatch) => {
  try {
    const res = await axios.delete('/api/users/delete');
    if (res.status === 200) {
      dispatch(setAlert(res.data.msg, 'success'));
      dispatch(logout());
    }
  } catch (err) {
    console.error(err.response);
    dispatch(setAlert(err.response.data.msg, 'error'));
  }
};

export const updateAvatar = (url) => async (dispatch) => {
  try {
    const res = await axios.put('/api/users/update-avatar', { newAvatar: url });
    dispatch(setAlert(res.data.msg, 'success'));
    dispatch(loadUser());
  } catch (err) {
    console.error(err);
    dispatch(setAlert(err.response.data.msg, 'error'));
  }
};
