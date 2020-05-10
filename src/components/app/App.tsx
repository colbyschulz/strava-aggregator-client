import React, { FC } from 'react';

import { Switch, Route } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import LoginPage from '../authorizationPage';
import { navigation } from '../../navigation';

const App: FC = () => {
  return (
    <Switch>
      <Route exact path={navigation.dashboard}>
        <Dashboard />
      </Route>
      <Route path={navigation.auth}>
        <LoginPage />
      </Route>
    </Switch>
  );
};

export default App;
