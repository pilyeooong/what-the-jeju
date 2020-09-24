import React, { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginForm from '../../components/Auth/LoginForm';

const Login = () => {
  const location = useLocation();
  const history = useHistory();

  const { from: loginRedirectUrl } = location.state || { from: { pathname: "/" }};
  const { me } = useSelector(state => state.user);

  return <LoginForm />
}

export default Login;
