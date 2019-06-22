import { GET_PRODUCTS_DATA } from './types';

import axios from 'axios';

const apiUrl = 'https://dev-api.danielwellington.com/frontend';

export const getProductsData = body => dispatch => {
  const products = [];
  return axios
    .get(`${apiUrl}/products`)
    .then(response => {
      for (let item of response.data.data) {
        axios.get(`${apiUrl}/products/${item.id}`).then(response => {
          let productData = response.data.data;
          axios
            .get(
              `${apiUrl}/assets/${
                productData.elements[productData.elements.length - 1].value.id
              }`
            )
            .then(response => {
              productData.assets = response.data.data;
              products.push(productData);
              console.log(products);
            });
        });
      }
    })
    .then(
      dispatch({
        type: GET_PRODUCTS_DATA,
        payload: products
      })
    )
    .catch(error => {
      throw error;
    });
};
