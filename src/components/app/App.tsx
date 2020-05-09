import React, { FC } from 'react';

import { Switch, Route, useLocation } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import LoginPage from '../authorizationPage';
import { hasValidToken } from '../../api';

const App: FC = () => {
  const location = useLocation();
  React.useEffect(() => {
    if (!hasValidToken() && location.pathname !== '/exchange_token') {
      window.location.assign(
        'http://www.strava.com/oauth/authorize?client_id=47529&response_type=code&redirect_uri=http://localhost:8080/exchange_token&approval_prompt=force&scope=read',
      );
    }
  }, []);

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
