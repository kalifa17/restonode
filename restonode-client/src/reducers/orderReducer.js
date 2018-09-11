import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_NEW_ORDER:
      let orders = [...state.items, Object.assign({}, action.order)];
      initialState.items = orders;
      return {
        items: orders,
        loading: false,
        error: null
      };

    default:
      return state;
  }
};
