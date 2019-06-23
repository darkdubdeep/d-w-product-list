import {
  GET_PRODUCTS_DATA,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from './types';

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
                products.sort((a, b) => b.id - a.id);
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

export const getProductsData2 = body => dispatch => {
  let products = [];
  let productData = [];
  const productsPromises = [];
  const assetsPromises = [];
  return axios
    .get(`${apiUrl}/products`)
    .then(response => {
      const initialData = response.data.data;
      for (let i = 0, len = initialData.length; i < len; i++) {
        const productPromise = axios.get(
          `${apiUrl}/products/${initialData[i].id}`
        );
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
          for (let productsItem of productData) {
            let assets = values.find(
              item =>
                item.data.data.id == productsItem.data.data.elements[8].value.id
            );
            productsItem.data.data.assets = assets;
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
    console.log(response.data.data);
    let productData = response.data.data;
    axios
      .get(
        `${apiUrl}/assets/${
          productData.elements[productData.elements.length - 1].value.id
        }`
      )
      .then(response => {
        productData.assets = response.data.data;
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
