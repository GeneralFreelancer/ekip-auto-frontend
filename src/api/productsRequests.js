import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from './baseUrl';

axios.defaults.baseURL = BASE_URL;

const productsRequests = {
  getProductsRequest: createAsyncThunk('products/getProducts', async () => {
    const response = await axios.get('/product');

    return response.data.products;
  }),
};

export const {getProductsRequest} = productsRequests;
