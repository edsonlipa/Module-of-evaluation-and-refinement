
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import RatePage from '../pages/RatingPage';

function Routes() {
  return (
    <BrowserRouter>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/ratingpage' component={RatePage} />
        <Route exact path='/editpage' component={App} />
        <Route component={NotFound} />
        
    </Switch>
    </BrowserRouter>
  );
}

export default Routes;
