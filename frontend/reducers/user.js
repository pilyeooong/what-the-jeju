import produce from 'immer';

const initialState = {
  me: {
    email: "pilyeoong@gmail.com",
    name: "필영"
  },
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

