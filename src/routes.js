import React from 'react';
import { Route } from 'react-router';
import App from './App';
import PageNotFound from './components/page-not-found';
import CreateObjective from './components/objectives/create-objectives';
import MyObjectives from './components/objectives/my-objectives';

export default (
  <Route component={App}>
    <Route path="/" component={MyObjectives} />
    <Route path="/objectives/create" component={CreateObjective} />
    <Route path="*" component={PageNotFound} />
  </Route>
);