import axios from 'axios';

/**
 * Set custom header containing JWT. If token exists, assign, else delete the header
 * @param {string} token - JWT value
 */

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
