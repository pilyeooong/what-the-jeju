import produce from 'immer';

const initialState = {
  me: null,
}

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      default:
        break;
    }
  })
}

export default reducer;

