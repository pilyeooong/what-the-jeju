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
  SEARCH_ADDRESS_REQUEST,
  SEARCH_ADDRESS_SUCCESS,
  SEARCH_ADDRESS_FAILURE,
  WISH_PLACE_REQUEST,
  WISH_PLACE_SUCCESS,
  WISH_PLACE_FAILURE,
  UNWISH_PLACE_REQUEST,
  UNWISH_PLACE_SUCCESS,
  UNWISH_PLACE_FAILURE,
  LIKE_PLACE_REQUEST,
  LIKE_PLACE_SUCCESS,
  LIKE_PLACE_FAILURE,
  UNLIKE_PLACE_REQUEST,
  UNLIKE_PLACE_SUCCESS,
  UNLIKE_PLACE_FAILURE,
  SEARCH_DIRECTION_REQUEST,
  SEARCH_DIRECTION_SUCCESS,
  SEARCH_DIRECTION_FAILURE,
  LOAD_CATEGORIZED_PLACES_REQUEST,
  LOAD_CATEGORIZED_PLACES_SUCCESS,
  LOAD_CATEGORIZED_PLACES_FAILURE
} from '../reducers/place';
import { ADD_WISH_PLACE_TO_ME, REMOVE_WISH_PLACE_TO_ME, ADD_LIKE_PLACE_TO_ME ,REMOVE_LIKE_PLACE_TO_ME } from '../reducers/user';

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
      error: err.response.data,
    });
  }
}

function* watchLoadPlaces() {
  yield takeLatest(LOAD_PLACES_REQUEST, loadPlaces);
}

function categorizePlacesAPI(data) {
  return axios.get(`/category/${data}`);
}

function* categorizePlaces(action) {
  try {
    const result = yield call(categorizePlacesAPI, action.data);
    yield put({
      type: LOAD_CATEGORIZED_PLACES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_CATEGORIZED_PLACES_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchCategorizePlaces() {
  yield takeLatest(LOAD_CATEGORIZED_PLACES_REQUEST, categorizePlaces);
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
      error: err.response.data,
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
      error: err.response.data,
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
      error: err.response.data,
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
      error: err.response.data,
    });
  }
}

function* watchGeocode() {
  yield takeLatest(GEOCODE_PLACE_REQUEST, geocode);
}

function searchDirectionAPI(data) {
  return axios.post(`/place/directions`, data);
}

function* searchDirection(action) {
  try {
    const result = yield call(searchDirectionAPI, action.data);
    console.log(result.data);
    yield put({
      type: SEARCH_DIRECTION_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCH_DIRECTION_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSearchDirection() {
  yield takeLatest(SEARCH_DIRECTION_REQUEST, searchDirection);
}

function searchAddressAPI(data) {
  return axios.get(`/place/search/address/${encodeURI(data)}`);
}

function searchAddressWithKeywordAPI(data) {
  return axios.get(`/place/search/keyword/${encodeURI(data)}`);
}

function* searchAddress(action) {
  try {
    const { searchType, searchValue } = action.data;
    let result;
    if (searchType === 'address') {
      result = yield call(searchAddressAPI, searchValue);
    } else {
      result = yield call(searchAddressWithKeywordAPI, searchValue);
    }
    yield put({
      type: SEARCH_ADDRESS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCH_ADDRESS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSearchAddress() {
  yield takeLatest(SEARCH_ADDRESS_REQUEST, searchAddress);
}

function wishPlaceAPI(data) {
  return axios.patch(`/place/${data}/wish`);
}

function* wishPlace(action) {
  try {
    const result = yield call(wishPlaceAPI, action.data);
    yield put({
      type: WISH_PLACE_SUCCESS,
      data: result.data.userId
    });
    yield put({
      type: ADD_WISH_PLACE_TO_ME,
      data: result.data.place
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_PLACE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchWishPlace() {
  yield takeLatest(WISH_PLACE_REQUEST, wishPlace);
}

function unWishPlaceAPI(data) {
  return axios.patch(`/place/${data}/unwish`);
}

function* unWishPlace(action) {
  try {
    const result = yield call(unWishPlaceAPI, action.data);
    console.log(result);
    yield put({
      type: UNWISH_PLACE_SUCCESS,
      data: result.data.userId
    });
    yield put({
      type: REMOVE_WISH_PLACE_TO_ME,
      data: result.data.placeId
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: UNWISH_PLACE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUnWishPlace() {
  yield takeLatest(UNWISH_PLACE_REQUEST, unWishPlace);
}

function unLikePlaceAPI(data) {
  return axios.patch(`/place/${data}/unlike`);
}

function* unLikePlace(action) {
  try {
    const result = yield call(unLikePlaceAPI, action.data);
    yield put({
      type: UNLIKE_PLACE_SUCCESS,
      data: result.data.userId
    });
    yield put({
      type: REMOVE_LIKE_PLACE_TO_ME,
      data: result.data.placeId
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_PLACE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUnLikePlace() {
  yield takeLatest(UNLIKE_PLACE_REQUEST, unLikePlace);
}

function likePlaceAPI(data) {
  return axios.patch(`/place/${data}/like`);
}

function* likePlace(action) {
  try {
    const result = yield call(likePlaceAPI, action.data);
    yield put({
      type: LIKE_PLACE_SUCCESS,
      data: result.data.userId
    });
    yield put({
      type: ADD_LIKE_PLACE_TO_ME,
      data: result.data.placeId
    })
  } catch (err) {
    console.error(err);
    yield put({
      type:LIKE_PLACE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLikePlace() {
  yield takeLatest(LIKE_PLACE_REQUEST, likePlace);
}

export default function* placeSaga() {
  yield all([
    fork(watchGeocode),
    fork(watchSearchDirection),
    fork(watchLoadPlaces),
    fork(watchUploadPlace),
    fork(watchUploadImages),
    fork(watchLoadPlace),
    fork(watchSearchAddress),
    fork(watchWishPlace),
    fork(watchUnWishPlace),
    fork(watchLikePlace),
    fork(watchUnLikePlace),
    fork(watchCategorizePlaces)
  ]);
}
