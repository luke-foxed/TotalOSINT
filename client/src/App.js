import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';

import './App.css';
import Register from './components/auth/Register';

const App = () => {
  return (
    <Router>
      <Fragment className='App'>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
