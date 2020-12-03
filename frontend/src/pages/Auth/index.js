import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

import Login from './Login';
import Signup from './Signup';

import './Auth.scss'

const AuthRouter = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  useEffect(() => {
    if(me) {
      history.replace('/');
    }
  }, [me]);
  
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path={match.url + '/login'} component={Login} />
        <Route exact path={match.url + '/signup'} component={Signup} />
      </Switch>
    </div>
  );
};

export default AuthRouter;
