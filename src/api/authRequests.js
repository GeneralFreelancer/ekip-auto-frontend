import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from './baseUrl';

axios.defaults.baseURL = BASE_URL;

const axiosToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const authRequests = {
  loginRequest: async (userData) => {
    try {
      const response = await axios.post('/auth/login', userData);

      if (response) {
        axiosToken.set(response.data.token);
      }

      return response;
    } catch (error) {
      const errorMessage = error.message;
    }
  },
  loginByTokenRequest: createAsyncThunk('user/loginByToken', async (token) => {
    try {
      if (token) {
        axiosToken.set(token);
        const response = await axios.post('/auth/login/token');

        return response.data;
      }

      return null;
    } catch (error) {
      const errorMessage = error.message;
    }
  }),
  LogoutRequest: createAsyncThunk(async () => {
    try {
      const response = await axios.post('/api/users/logout');

      axiosToken.unset();
    } catch (error) {
      const errorMessage = error.message;
    }
  }),
  registerRequest: async (registerData) => {
    const response = await axios.post('/auth/register', registerData);

    return response;
  },
  emailConfirmRequest: createAsyncThunk('user/emailConfirm', async (code) => {
    try {
      const response = await axios.post('/auth/register/confirm', {code});

      return response.data;
    } catch (error) {
      const errorMessage = error.message;
    }
  }),
  setUserDataRequest: createAsyncThunk(async (id) => {
    try {
      const response = await axios.post('/api/users/register', id);
    } catch (error) {
      const errorMessage = error.message;
    }
  }),
};

export const {
  loginRequest,
  loginByTokenRequest,
  LogoutRequest,
  registerRequest,
  emailConfirmRequest,
  setUserDataRequest,
} = authRequests;
