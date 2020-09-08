import { all, fork, call, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
  KAKAO_LOGIN_REQUEST,
  KAKAO_LOGIN_SUCCESS,
  KAKAO_LOGIN_FAILURE,
} from '../reducers/user';

function kakaoLoginAPI(){
  return axios.get('/user/kakao/');
}

function* kakaoLogin(action) {
  try {
    const result = yield call(kakaoLoginAPI);
    yield put({
      type: KAKAO_LOGIN_SUCCESS,
      data: result.data
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: KAKAO_LOGIN_FAILURE,
      error: err
    })
  }
}

function* watchKakaoLogin() {
  yield takeLatest(KAKAO_LOGIN_REQUEST, kakaoLogin);
}

export default function* userSaga() {
  yield all([fork(watchKakaoLogin)]);
}
