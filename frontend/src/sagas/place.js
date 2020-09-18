import { all, fork, call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_PLACES_REQUEST,
  LOAD_PLACES_SUCCESS,
  LOAD_PLACES_FAILURE,
  LOAD_PLACE_REQUEST,
  LOAD_PLACE_SUCCESS,
  LOAD_PLACE_FAILURE,
  UPLOAD_PLACE_REQUEST,
  UPLOAD_PLACE_SUCCESS,
  UPLOAD_PLACE_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  GEOCODE_PLACE_REQUEST,
  GEOCODE_PLACE_SUCCESS,
  GEOCODE_PLACE_FAILURE,
} from '../reducers/place';

function loadPlacesAPI() {
  return axios.get('/places');
}

function* loadPlaces(action) {
  try {
    const result = yield call(loadPlacesAPI);
    yield put({
      type: LOAD_PLACES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PLACES_FAILURE,
      error: err,
    });
  }
}

function* watchLoadPlaces() {
  yield takeLatest(LOAD_PLACES_REQUEST, loadPlaces);
}

// 단일 Place Detail
function loadPlaceAPI(data) {
  return axios.get(`/place/${data}`);
}

function* loadPlace(action) {
  try {
    const result = yield call(loadPlaceAPI, action.data);
    yield put({
      type: LOAD_PLACE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PLACE_FAILURE,
      error: err,
    });
  }
}

function* watchLoadPlace() {
  yield takeLatest(LOAD_PLACE_REQUEST, loadPlace);
}

function uploadPlaceAPI(data) {
  return axios.post('/place', data);
}

function* uploadPlace(action) {
  try {
    const result = yield call(uploadPlaceAPI, action.data);
    yield put({
      type: UPLOAD_PLACE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_PLACE_FAILURE,
      error: err,
    });
  }
}

function* watchUploadPlace() {
  yield takeLatest(UPLOAD_PLACE_REQUEST, uploadPlace);
}

function uploadImagesAPI(data) {
  return axios.post('/place/images', data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

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
  yield all([
    fork(watchGeocode),
    fork(watchLoadPlaces),
    fork(watchUploadPlace),
    fork(watchUploadImages),
    fork(watchLoadPlace),
  ]);
}
