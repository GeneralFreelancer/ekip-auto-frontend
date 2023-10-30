import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from './baseUrl';

axios.defaults.baseURL = BASE_URL;

const tempUpdateProdFrom1cRequest = async (products) => {
  const response = await axios.post('/product/update', products);
  console.log('Update products from 1C response: ', response);
  return response;
};

export default tempUpdateProdFrom1cRequest;
