
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Menu from './pages/Menu';

function Routes() {
  return (
    <BrowserRouter>
    <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/application' component={App} />
        <Route exact path='/menu' component={Menu} />
        
    </Switch>
    </BrowserRouter>
  );
}

export default Routes;
