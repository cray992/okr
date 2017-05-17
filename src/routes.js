import React from 'react';
import { Route } from 'react-router';
import App from './App';
import PageNotFound from './components/page-not-found';
import CreateObjective from './components/objectives/create-objectives';
import MyObjectives from './components/objectives/my-objectives';
import CheckinHome from './components/objectives/checkin-home';
import Dashboard from './components/charts/dashboard';

export default (
  <Route component={App}>
    <Route path="/" component={Dashboard} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/my-objectives" component={MyObjectives} />
    <Route path="/checkin" component={CheckinHome} />
    <Route path="/objectives/create" component={CreateObjective} />
    <Route path="*" component={PageNotFound} />
  </Route>
);