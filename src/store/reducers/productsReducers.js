import {
  GET_PRODUCTS_DATA,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from '../actions/types';

const initialState = {
  products: [],
  product: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_DATA:
      return {
        ...state,
        products: action.payload
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        product: action.payload
      };
    case CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        product: {}
      };
    default:
      return state;
  }
}
