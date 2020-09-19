import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';

import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment className='App'>
        <Navbar />
        <Route exact path='/' component={Home} />
        <Switch></Switch>
      </Fragment>
    </Router>
  );
};

export default App;
