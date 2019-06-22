import { GET_PRODUCTS_DATA } from '../actions/types';

const initialState = {
  products: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_DATA:
      return {
        ...state,
        products: action.payload
      };
    default:
      return state;
  }
}
