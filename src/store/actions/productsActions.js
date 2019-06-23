import { GET_PRODUCTS_DATA } from './types';

import axios from 'axios';

const apiUrl = 'https://dev-api.danielwellington.com/frontend';

export const getProductsData = body => dispatch => {
  const products = [];
  return axios
    .get(`${apiUrl}/products`)
    .then(response => {
      const initialData = response.data.data;
      for (let i = 0, len = initialData.length; i < len; i++) {
        axios.get(`${apiUrl}/products/${initialData[i].id}`).then(response => {
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
              // if (i === initialData.length - 1)
              setTimeout(() => {
                dispatch({
                  type: GET_PRODUCTS_DATA,
                  payload: products
                });
              }, 300);
            });
        });
      }
    })
    .catch(error => {
      throw error;
    });
};
