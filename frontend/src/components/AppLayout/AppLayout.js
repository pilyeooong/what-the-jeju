import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './AppLayout.scss';
import { LOG_OUT_REQUEST, LOAD_MY_INFO_REQUEST } from '../../reducers/user';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);

  const loginBtn = useRef();

  useEffect(() => {
    if (modal) {
      loginBtn.current.style.display = 'block';
    } else {
      loginBtn.current.style.display = 'none';
    }
  }, [modal]);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  const onBackgroundClicked = useCallback(() => {
    setModal(false);
  }, [modal]);

  const onToggleLoginModal = useCallback(() => {
    if (!modal) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [modal]);

  const onClickLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  const onClickKakaoLogin = useCallback(() => {
    document.location.href = "/api/auth/kakao";
  }, []);

  return (
    <div className="wrapper">
      <header>
        <nav className="navbar">
          <div className="navbar__links">
            <Link className="logo" to="/">
              왓더제주
            </Link>
            <Link to="/place/add">업로드</Link>
            {me ? (
              <>
                <Link to="/profile">프로필</Link>
                <a className="authenticate" onClick={onClickLogOut}>
                  로그아웃
                </a>
              </>
            ) : (
              <>
                <a className="authenticate login" onClick={onToggleLoginModal}>
                  로그인
                </a>
              </>
            )}
          </div>
        </nav>
        <nav className="categories">
          <div className="category__links">
            <a href="">전체</a>
            <a href="">바다</a>
            <a href="">박물관</a>
            <a href="">카페</a>
          </div>
        </nav>
      </header>
      <section>{children}</section>
      <div className="loginModal" ref={loginBtn}>
        <div
          className="loginModal__background"
          onClick={onBackgroundClicked}
        ></div>
        <div className="loginModal__box">
          <div className="loginModal__header">
            <span>왓더제주 로그인하기</span>
            <button onClick={onToggleLoginModal}><i className="fas fa-times"></i></button>
          </div>
          <div className="loginModal__links">
            <button className="kakaoLogin__link" onClick={onClickKakaoLogin}>
              <i className="fas fa-comment"></i>
              <a>카카오로 시작하기</a>
            </button>
            <Link to="/auth/login"><span>이메일로 시작하기</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
