import React from 'react';
import { Route } from 'react-router';
import App from './App';
import PageNotFound from './components/page-not-found';
import CreateObjective from './components/objectives/create-objectives';
import MyObjectives from './components/objectives/my-objectives';
import ViewObjective from './components/objectives/view-objective';
import CheckinHome from './components/objectives/checkin-home';
import Dashboard from './components/charts/dashboard';
import OrgChart from './components/org/org-chart';

export default (
  <Route component={App}>
    <Route path="/" component={Dashboard} />
    <Route path="/org" component={OrgChart} />
    <Route path="/objectives/:id" component={ViewObjective} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/my-objectives/:id" component={MyObjectives} />
    <Route path="/checkin" component={CheckinHome} />
    <Route path="/objective/create" component={CreateObjective} />
    <Route path="*" component={PageNotFound} />
  </Route>
);