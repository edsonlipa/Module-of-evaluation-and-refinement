
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';

function Routes() {
  return (
    <BrowserRouter>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/application' component={App} />
        
    </Switch>
    </BrowserRouter>
  );
}

export default Routes;
