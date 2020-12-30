import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import { API_HOST } from '../utils/Constants';
import placeSaga from './place';
import userSaga from './user';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = `${API_HOST}/api/`; 
} else {
  axios.defaults.baseURL = `http://hotjeju-env.eba-fzpsip2j.ap-northeast-2.elasticbeanstalk.com/api/`;
}
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(placeSaga),
    fork(userSaga),
  ]);
}