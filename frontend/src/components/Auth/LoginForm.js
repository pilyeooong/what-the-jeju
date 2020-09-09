import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';

import { LOG_IN_REQUEST } from '../../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onClickLogin = useCallback((e) => {
    e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          email,
          password
        }
      });
  }, [email, password]);



  return (
    <div className="wrapper">
      <header className="form__header">
        <div className="form__logo">왓더제주</div>
      </header>
      <form action="">
        <input type="email" placeholder="이메일" value={email} onChange={onChangeEmail} />
        <input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} />
        <button type="submit" onClick={onClickLogin}>로그인하기</button>
        <button><a href="/api/auth/kakao">카카오로 로그인하기</a></button>
      </form>
      
      <span>왓더제주 계정이 없으신가요?</span>
      <Link><a href="">회원가입</a></Link>
    </div>
  )
}

export default LoginForm
