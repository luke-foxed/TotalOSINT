import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';
import store from './store';
import Register from './components/auth/Register';
import setAuthToken from './helpers/tokenHelper';
import { Provider } from 'react-redux';
import Alerter from './components/layout/Alerter';
import { loadUser } from './actions/auth';
import './App.css';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import SavedResult from './components/profile/SavedResult';

const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alerter />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute path='/saved/:value' component={SavedResult} />
            <PrivateRoute exact path='/profile' component={Profile} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
