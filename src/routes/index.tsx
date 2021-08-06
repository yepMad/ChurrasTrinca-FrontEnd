import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import PartiesList from '../pages/PartiesList';
import Party from '../pages/Party';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/churrascos" isPrivate component={PartiesList} />
    <Route path="/churrasco/:partyId" isPrivate component={Party} />
  </Switch>
);

export default Routes;
