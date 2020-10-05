import axios from 'axios';
import { setAlert } from './alert';

export const performSearch = (searchValue, searchType) => async (dispatch) => {
  try {
    //     // let { data } = await axios({
    //     //   method: 'post',
    //     //   url: '/api/scrape/scrape-all',
    //     //   data: {
    //     //     value: searchValue,
    //     //     type: searchType,
    //     //   },

    let data = await axios.post('/api/scrape/scrape-all', {
      value: searchValue,
      type: searchType,
    });

    dispatch(setAlert('Search Complete!', 'success'));
    return data;
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'error'));
    return;
  }
};
