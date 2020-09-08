import produce from 'immer';

const initialState = {
  me: {
    email: "pilyeoong@gmail.com",
    name: "필영"
  },
}

export const KAKAO_LOGIN_REQUEST = 'KAKAO_LOGIN_REQUEST';
export const KAKAO_LOGIN_SUCCESS = 'KAKAO_LOGIN_SUCCESS';
export const KAKAO_LOGIN_FAILURE = 'KAKAO_LOGIN_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      default:
        break;
    }
  })
}

export default reducer;

