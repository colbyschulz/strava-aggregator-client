import React, { FC } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'}>
          <Dashboard />
        </Route>
        <Route path={'/login'}>
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
