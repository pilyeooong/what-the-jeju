import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login';

const AuthRouter = ({ match }) => {
  return (
    <>
      <Switch>
        <Route exact path={match.url + '/login'} component={Login} />
      </Switch>
    </>
  );
};

export default AuthRouter;
