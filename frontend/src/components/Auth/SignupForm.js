import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';

import { SIGN_UP_REQUEST } from '../../reducers/user';
import Logo from '../Logo'

const SignupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { signupDone } = useSelector(state => state.user);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email, password, nickname
      }
    })
  }, [email, password, passwordCheck]);

  useEffect(() => {
    if(signupDone) {
      history.push('/auth/login');
    }
  }, [signupDone]);

  return (
    <div class="wrapper">
      <Logo />
      <form action="">
        <input type="email" placeholder="이메일" value={email} onChange={onChangeEmail} />
        <input type="text" placeholder="닉네임" value={nickname} onChange={onChangeNickname} />
        <input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} />
        <input type="password" placeholder="비밀번호 확인" value={passwordCheck} onChange={onChangePasswordCheck} />
        {passwordError && <span>비밀번호가 일치하지 않습니다.</span>}
        <button type="submit" onClick={onSubmit}>회원가입</button>
      </form>
    </div>
  )
}

export default SignupForm;
