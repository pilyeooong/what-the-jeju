import React, { useEffect } from 'react';

import styles from './AppLayout.module.scss';
import { useSelector } from 'react-redux';

const AppLayout = ({ children }) => {
  const me = null;
  // const { me } = useSelector((state) => state.user);

  return (
    <div className={styles.wrapper}>
      <nav className={styles.navbar}>
        <div className={styles.navbar__links}>
          <a className={styles.logo} href="#">
            왓더제주
          </a>
          {me ? (
            <a className={styles.authenticate} onClick>
              로그아웃
            </a>
          ) : (
            <>
              <a className={styles.authenticate}>회원가입</a>
              <a className={`${styles.authenticate} ${styles.login}`}>
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
