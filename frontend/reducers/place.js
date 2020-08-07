import produce from 'immer';

const initialState = {
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

export const GEOCODE_PLACE_REQUEST = 'GEOCODE_PLACE_REQUEST';
export const GEOCODE_PLACE_SUCCESS = 'GEOCODE_PLACE_SUCCESS';
export const GEOCODE_PLACE_FAILURE = 'GEOCODE_PLACE_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
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