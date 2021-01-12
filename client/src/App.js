import React, { Fragment, useEffect } from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
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
import SavedResult from './components/profile/ResultView';
import Footer from './components/layout/Footer';
import About from './components/about/About';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

require('dotenv').config();

const trackingId = process.env.REACT_APP_TRACKING_ID;
ReactGA.initialize(trackingId);

const App = () => {
  const history = createBrowserHistory();

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  history.listen((location) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [history]);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <Navbar />
          <Alerter />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/search/:value' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/about' component={About} />
            <PrivateRoute path='/saved/:value' component={SavedResult} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <Route path='/*' render={() => <Redirect to='/' />} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
