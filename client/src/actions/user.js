import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';

export const saveResults = (results) => async (dispatch) => {
  try {
    results.searchDate = new Date().toLocaleDateString();

    await axios.put('/api/users/save-search', results);

    dispatch(setAlert('Results Saved!', 'success'));

    dispatch(loadUser());
  } catch (err) {
    console.error(err);
    dispatch(setAlert(err.response.data.msg, 'error'));
  }
};
