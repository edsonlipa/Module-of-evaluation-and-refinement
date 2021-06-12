
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from '../App';
import Acceptance from '../pages/Acceptance';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import RatePage from '../pages/RatingPage';
import FeedBack from '../pages/FeedBack';
import DemogForm from '../pages/DemogForm';

function Routes() {
  return (
    <BrowserRouter>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/ratingpage' component={RatePage} />
        <Route exact path='/demograph-form' component={DemogForm} />
        <Route exact path='/acceptance' component={Acceptance} />
        <Route exact path='/editpage' component={App} />
        <Route exact path='/feedback' component={FeedBack} />
        <Route component={NotFound} />
        
    </Switch>
    </BrowserRouter>
  );
}

export default Routes;
