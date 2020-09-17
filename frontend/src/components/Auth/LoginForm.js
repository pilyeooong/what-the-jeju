import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';

import { LOG_IN_REQUEST } from '../../reducers/user';

import Logo from '../Logo/AuthPage';

import './LoginForm.scss';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, onChangePassword] = useInput('');


  const onChangeEmail = useCallback((e) => {
    const { target : { validity : { typeMismatch }}} = e;
    setEmail(e.target.value);
    if (!typeMismatch) {
      document.querySelector('.form-email i').style.color = 'green';
    } else {
      document.querySelector('.form-email i').style.color = 'red';
    }
  },[]);

  const onClickLogin = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          email,
          password,
        },
      });
    },
    [email, password]
  );

  return (
    <>
      <Logo />
      <div className="form-container">
        <form onSubmit={onClickLogin}>
          <div className="form-input form-email">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={onChangeEmail}
            />
            <i id="emailValidation" class="fas fa-check"></i>
          </div>
          <div className="form-input form-password">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
            />
            <i class="fas fa-check"></i>
          </div>
          <div className="form-button">
            <button className="local-button" type="submit">
              로그인하기
            </button>
            <button className="form-kakaoLogin">
              <i class="fas fa-comment"></i>
              <a href="/api/auth/kakao">카카오로 로그인하기</a>
            </button>
          </div>
        </form>
        <div className="form-signup__link">
          <span>왓더제주 계정이 없으신가요?</span>
          <Link to="/auth/signup">
            <a>회원가입</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
