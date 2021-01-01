import axios from 'axios';
import { setAlert } from './alert';

export const saveResults = (results) => async (dispatch) => {
  try {
    await axios.put('/api/users/save-search', results);

    dispatch(setAlert('Results Saved!', 'success'));
  } catch (err) {
    console.error(err);
    dispatch(setAlert(err.response.data.msg, 'error'));
  }
};
