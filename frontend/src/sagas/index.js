import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import placeSaga from './place';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:4000/api/';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(placeSaga),
    fork(userSaga),
  ]);
}