import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';

import withReduxSaga from 'next-redux-saga';

import wrapper from '../store/configureStore';

import '../global-styles/main.scss';


const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>왓더제주</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap"/>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(App));
