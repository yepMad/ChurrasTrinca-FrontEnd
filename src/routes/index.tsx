import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import PartiesList from '../pages/PartiesList';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/churrascos" component={PartiesList} />
  </Switch>
);

export default Routes;
