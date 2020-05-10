import React, { FC } from 'react';

import { Switch, Route } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import LoginPage from '../authorizationPage';

const App: FC = () => {
  return (
    <Switch>
      <Route exact path={'/'}>
        <Dashboard />
      </Route>
      <Route path={'/exchange_token'}>
        <LoginPage />
      </Route>
    </Switch>
  );
};

export default App;
