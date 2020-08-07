import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api/'

import placeSaga from './place';

export default function* rootSaga() {
  yield all([
    fork(placeSaga),
  ]);
}