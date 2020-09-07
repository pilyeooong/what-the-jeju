import produce from 'immer';

const initialState = {
  places: [],

  // load places
  loadPlaceLoading: false,
  loadPlaceDone: false,
  loadPlaceError: null,

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