import produce from 'immer';

const initialState = {
  places: [],
  imagePaths: [],

  // load places
  loadPlaceLoading: false,
  loadPlaceDone: false,
  loadPlaceError: null,

  // upload Place
  uploadPlaceLoading: false,
  uploadPlaceDone: false,
  uploadPlaceError: null,

  // upload Image
  uploadImageLoading: false,
  uploadImageDone: false,
  uploadImageError: null,

  // direction API
  origin: {
    name: null,
    lat: 0,
    lng: 0,
  },
  destination: {
    name: null,
    lat: 0,
    lng: 0,
  }
}

export const LOAD_PLACES_REQUEST = 'LOAD_PLACES_REQUEST';
export const LOAD_PLACES_SUCCESS = 'LOAD_PLACES_SUCCESS';
export const LOAD_PLACES_FAILURE = 'LOAD_PLACES_FAILURE';

export const UPLOAD_PLACE_REQUEST = 'UPLOAD_PLACE_REQUEST';
export const UPLOAD_PLACE_SUCCESS = 'UPLOAD_PLACE_SUCCESS';
export const UPLOAD_PLACE_FAILURE = 'UPLOAD_PLACE_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const GEOCODE_PLACE_REQUEST = 'GEOCODE_PLACE_REQUEST';
export const GEOCODE_PLACE_SUCCESS = 'GEOCODE_PLACE_SUCCESS';
export const GEOCODE_PLACE_FAILURE = 'GEOCODE_PLACE_FAILURE';


const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_PLACES_REQUEST: {
        draft.loadPlaceLoading = true;
        draft.loadPlaceDone = false;
        draft.places = [];
        break;
      }
      case LOAD_PLACES_SUCCESS: {
        draft.loadPlaceLoading = false;
        draft.loadPlaceDone = true;
        draft.places = draft.places.concat(action.data);
        break;
      }
      case LOAD_PLACES_FAILURE: {
        draft.loadPlaceLoading = false;
        draft.loadPlaceDone = false;
        draft.loadPlaceError = action.error;
        break;
      }
      case UPLOAD_PLACE_REQUEST: {
        draft.uploadPlaceLoading = true;
        draft.uploadPlaceDone = false;
        break;
      }
      case UPLOAD_PLACE_SUCCESS: {
        draft.uploadPlaceLoading = false;
        draft.uploadPlaceDone = true;
        draft.places.concat(action.data);
        break;
      }
      case UPLOAD_PLACE_FAILURE: {
        draft.uploadPlaceLoading = false;
        draft.uploadPlaceDone = false;
        draft.uploadPlaceError = action.error;
        break;
      }
      case UPLOAD_IMAGES_REQUEST: {
        draft.uploadImageLoading = true;
        draft.uploadImageDone = false;
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        draft.uploadImageLoading = false;
        draft.uploadImageDone = true;
        action.data.forEach(src => {
          draft.imagePaths.push(src);
        })
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        draft.uploadImageLoading = false;
        draft.uploadImageDone = false;
        draft.uploadImageError = action.error;
        break;
      }
      case GEOCODE_PLACE_REQUEST: {
        if(action.data.type === 'origin') {
          draft.origin.name = action.data.place;
        } else {
          draft.destination.name = action.data.place;
        }
        break;
      }
      case GEOCODE_PLACE_SUCCESS: {
        if(action.data.type === 'origin') {
          draft.origin.lat = action.data.lat;
          draft.origin.lng = action.data.lng;
        } else {
          draft.destination.lat = action.data.lat;
          draft.destination.lng = action.data.lng;
        }
        break;
      }
      case GEOCODE_PLACE_FAILURE: {
        break;
      }
      default:
        break;
    }
  })
}

export default reducer;