import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import PartiesList from '../pages/PartiesList';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/churrascos" isPrivate component={PartiesList} />
  </Switch>
);

export default Routes;
