import axios from 'axios';
import { setAlert } from './alert';

export const performSearch = (searchValue, searchType) => async (dispatch) => {
  try {
    let response = await axios.post('/api/scrape/scrape-all', {
      value: searchValue,
      type: searchType,
    });

    dispatch(setAlert('Search Complete!', 'success'));
    return response.data;
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'error'));
    return;
  }
};
