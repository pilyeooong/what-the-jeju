import { all, fork, call, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
  GEOCODE_PLACE_REQUEST,
  GEOCODE_PLACE_SUCCESS,
  GEOCODE_PLACE_FAILURE,
} from '../reducers/place';

function geocodeAPI(data) {
  return axios.get(`/place/geocode/${encodeURI(data)}`);
}

function* geocode(action) {
  try {
    const type = action.data.type;
    const result = yield call(geocodeAPI, action.data.place);
    yield put({
      type: GEOCODE_PLACE_SUCCESS,
      data: {
        type,
        lat: result.data.addresses[0].y,
        lng: result.data.addresses[0].x,
      },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GEOCODE_PLACE_FAILURE,
      error: err,
    });
  }
}

function* watchGeocode() {
  yield takeLatest(GEOCODE_PLACE_REQUEST, geocode);
}

export default function* placeSaga() {
  yield all([fork(watchGeocode)]);
}
