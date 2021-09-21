import React from 'react';
import Header from './components/Header';
import './styles/global.module.scss'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home';
import Create from './components/Create';
import View from './components/View';
import Edit from './components/Edit';

function App() {
  return (
    <>
      <Router>
          <Header/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/create">
            <Create/>
          </Route>
          <Route path="/view/:id">
            <View/>
          </Route>
          <Route exact path="/edit/:id">
            <Edit/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
