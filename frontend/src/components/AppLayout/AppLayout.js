import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './AppLayout.scss';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);

  const loginBtn = useRef();

  const onBackgroundClicked = useCallback(() => {
    setModal(false);
  }, [modal]);

  const onToggleLoginModal = useCallback(() => {
    if(!modal){
      setModal(true);
    } else {
      setModal(false);
    }
  }, [modal]);

  useEffect(() => {
    if(modal){
      console.log('block');
      loginBtn.current.style.display = 'block';
    } else {
      console.log('none');
      loginBtn.current.style.display = 'none';
    }
  }, [modal]);

  return (
    <div className="wrapper">
      <div className="loginModal"ref={loginBtn}>
        <div
          className="loginModal__background"
          onClick={onBackgroundClicked}
        ></div>
        <div className="loginModal__box">
          <button onClick={onToggleLoginModal}>닫기</button>
          <a href="/api/auth/kakao/">카카오로그인</a>
        </div>
      </div>
      <nav className="navbar">
        <div className="navbar__links">
          <a className="logo" href="#">
            왓더제주
          </a>
          {me ? (
            <a className="authenticate">로그아웃</a>
          ) : (
            <>
              <a
                className="authenticate login"
                onClick={onToggleLoginModal}
              >
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
      <section>{children}</section>
    </div>
  );
};

export default AppLayout;
