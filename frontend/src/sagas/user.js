import { all, fork, call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE
} from '../reducers/user';

function loadMyInfoAPI(){
  return axios.get('/user');
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err
    })
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function loginAPI(data){
  return axios.post('/user/login', data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    console.log(result);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err
    })
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}


function logOutAPI(){
  return axios.post('/user/logout');
}

function* logOut(action) {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: result.data
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err
    })
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
  yield all([fork(watchLoadMyInfo), fork(watchLogin), fork(watchLogOut)]);
}
