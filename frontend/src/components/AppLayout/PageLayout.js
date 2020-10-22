import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './AppLayout.scss';
import { LOG_OUT_REQUEST, LOAD_MY_INFO_REQUEST } from '../../reducers/user';

const PageLayout = ({ children, menuSize }) => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);
  const [modal, setModal] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);

  const loginBtn = useRef();
  const menuBtn = useRef();

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

  const onClickMenu = useCallback(() => {
    if (menuClicked) {
      if(!me) {
        menuBtn.current.classList.remove(menuSize);
      } else {
        menuBtn.current.classList.remove('pageLayout__menuClicked');
      }
    } else {
      if (!me) {
        menuBtn.current.classList.add(menuSize);
      } else {
        menuBtn.current.classList.add('pageLayout__menuClicked');
      }
    }
    setMenuClicked(!menuClicked);
  }, [me, menuClicked]);

  const onClickLogOut = useCallback(() => {
    menuBtn.current.classList.remove('menuClicked');
    setMenuClicked(!menuClicked);
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, [menuClicked]);

  const onClickKakaoLogin = useCallback(() => {
    document.location.href = '/api/auth/kakao';
  }, []);

  return (
    <div className="wrapper">
      <header>
        <nav className="navbar">
          <div className="navbar__links">
            <Link className="logo" to="/">
              왓더제주
            </Link>
            <i className="navbar__menu fas fa-bars" onClick={onClickMenu}></i>
          </div>
        </nav>
        <nav ref={menuBtn} className="menus">
          {menuClicked && (
            <>
              {me ? (
                <div className="menu__list">
                  {me.jejuNative && <Link to="/place/add">업로드</Link>}
                  <Link to="/place/directions">동선 짜기</Link>
                  <Link to="/profile">프로필</Link>
                  <a className="authenticate" onClick={onClickLogOut}>
                    로그아웃
                  </a>
                </div>
              ) : (
                <div className="menu__list">
                  <a
                    className="authenticate"
                    onClick={onToggleLoginModal}
                  >
                    로그인
                  </a>
                  <Link to="/auth/signup">회원가입</Link>
                </div>
              )}
            </>
          )}
        </nav>
        <nav className="categories pageLayout__categories">
          {!menuClicked && (
            <div className="category__links">
            </div>
          )}
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
            <button onClick={onToggleLoginModal}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="loginModal__links">
            <button className="kakaoLogin__link" onClick={onClickKakaoLogin}>
              <i className="fas fa-comment"></i>
              <a>카카오로 시작하기</a>
            </button>
            <Link to="/auth/login">
              <span>이메일로 시작하기</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
