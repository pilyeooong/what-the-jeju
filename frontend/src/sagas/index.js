import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import { API_HOST } from '../utils/Constants';
import placeSaga from './place';
import userSaga from './user';

axios.defaults.baseURL = `${API_HOST}/api/`;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(placeSaga),
    fork(userSaga),
  ]);
}