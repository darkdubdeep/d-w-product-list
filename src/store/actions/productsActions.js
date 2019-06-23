import {
  GET_PRODUCTS_DATA,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from './types';

import axios from 'axios';

const apiUrl = 'https://dev-api.danielwellington.com/frontend';
let noPhutoUrl = 'https://tlt-agro.ru/upload/iblock/7dd/no_photo.jpg';

export const getProductsData = body => dispatch => {
  let products = [];
  let productData = [];
  const productsPromises = [];
  const assetsPromises = [];
  return axios
    .get(`${apiUrl}/products`)
    .then(response => {
      const initialData = response.data.data;
      for (let item of initialData) {
        const productPromise = axios.get(`${apiUrl}/products/${item.id}`);
        productsPromises.push(productPromise);
      }
      Promise.all(productsPromises).then(values => {
        productData = values;
        for (let item of productData) {
          const assestPromise = axios.get(
            `${apiUrl}/assets/${item.data.data.elements[8].value.id}`
          );
          assetsPromises.push(assestPromise);
        }
        Promise.all(assetsPromises).then(values => {
          const defaultAssets = {
            uri: noPhutoUrl
          };
          for (let productsItem of productData) {
            let assets = values.find(
              item =>
                item.data.data.id ===
                productsItem.data.data.elements[8].value.id
            );

            productsItem.data.data.assets = assets
              ? assets.data.data
              : defaultAssets;

            if (!products.find(item => item.id === productsItem.data.data.id)) {
              products.push(productsItem.data.data);
            }
          }
          dispatch({
            type: GET_PRODUCTS_DATA,
            payload: products
          });
        });
      });
    })
    .catch(error => {
      throw error;
    });
};

export const getProductDetail = id => dispatch => {
  return axios.get(`${apiUrl}/products/${id}`).then(response => {
    let productData = response.data.data;
    axios
      .get(`${apiUrl}/assets/${productData.elements[8].value.id}`)
      .then(response => {
        if (productData.elements[8].value.id === response.data.data.id) {
          productData.assets = response.data.data;
        } else {
          const defaultAssets = {
            uri: noPhutoUrl
          };
          productData.assets = defaultAssets;
        }
        dispatch({
          type: GET_PRODUCT_DETAIL,
          payload: productData
        });
      });
  });
};

export const clearProductDetail = () => dispatch => {
  dispatch({
    type: CLEAR_PRODUCT_DETAIL,
    payload: {}
  });
};
