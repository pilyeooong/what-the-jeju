import produce from 'immer';

const initialState = {
  me: null,

  // 내정보 불러오기
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,

  // 회원가입
  signupLoading: false,
  signupDone: false,
  signupError: null,

  // 로그인
  loginLoading: false,
  loginDone: false,
  loginError: null,

  // 로그아웃
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,

  // 도민 인증
  checkJejuNativeLoading: false,
  checkJejuNativeDone: false,
  checkJejuNativeError: null,
}

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const CHECK_JEJU_NATIVE_REQUEST = 'CHECK_JEJU_NATIVE_REQUEST';
export const CHECK_JEJU_NATIVE_SUCCESS = 'CHECK_JEJU_NATIVE_SUCCESS';
export const CHECK_JEJU_NATIVE_FAILURE = 'CHECK_JEJU_NATIVE_FAILURE';

export const ADD_WISH_PLACE_TO_ME = 'ADD_WISH_PLACE_TO_ME';
export const REMOVE_WISH_PLACE_TO_ME = 'REMOVE_WISH_PLACE_TO_ME';

export const ADD_LIKE_PLACE_TO_ME = 'ADD_LIKE_PLACE_TO_ME';
export const REMOVE_LIKE_PLACE_TO_ME = 'REMOVE_LIKE_PLACE_TO_ME';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signupLoading = true;
        draft.signupDone = false;
        draft.signupError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signupLoading = false;
        draft.signupDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signupLoading = false;
        draft.signupDone = false;
        draft.signupError = action.error;
        break;
      case LOG_IN_REQUEST:
        draft.loginLoading = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.loginLoading = false;
        draft.loginDone = true;
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.loginLoading = false;
        draft.loginDone = false;
        draft.loginError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutDone = false;
        draft.logOutError = action.error;
        break;
      case CHECK_JEJU_NATIVE_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case CHECK_JEJU_NATIVE_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me.jejuNative = action.data;
        break;
      case CHECK_JEJU_NATIVE_FAILURE:
        draft.logOutLoading = false;
        draft.logOutDone = false;
        draft.logOutError = action.error;
        break;
      case ADD_WISH_PLACE_TO_ME:
        draft.me.Wished.push(action.data);
        break;
      case REMOVE_WISH_PLACE_TO_ME:
        draft.me.Wished = draft.me.Wished.filter(v => v.id !== action.data);
        break;
      case ADD_LIKE_PLACE_TO_ME:
        draft.me.Liked.push({ id: action.data });
        break;
      case REMOVE_LIKE_PLACE_TO_ME:
        draft.me.Liked = draft.me.Liked.filter(v => v.id !== action.data);
        break;
      default:
        break;
    }
  })
}

export default reducer;

