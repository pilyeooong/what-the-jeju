import React, { useState, useEffect, useCallback, useRef } from 'react';

import styles from './AppLayout.module.scss';
import { useSelector } from 'react-redux';

const AppLayout = ({ children }) => {
  const me = null;
  // const { me } = useSelector((state) => state.user);
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
    <div className={styles.wrapper} >
      <div className={styles.loginModal} ref={loginBtn}>
        <div className={styles.loginModal__background} onClick={onBackgroundClicked}></div>
        <div className={styles.loginModal__box}>
          <button onClick={onToggleLoginModal}>닫기</button>
        </div>
      </div>
      <nav className={styles.navbar}>
        <div className={styles.navbar__links}>
          <a className={styles.logo} href="#">
            왓더제주
          </a>
          {me ? (
            <a className={styles.authenticate}>
              로그아웃
            </a>
          ) : (
            <>
              <a className={`${styles.authenticate} ${styles.login}`} onClick={onToggleLoginModal}>
                로그인
              </a>
            </>
          )}
        </div>
      </nav>
      <nav className={styles.categories}>
        <div className={styles.category__links}>
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
