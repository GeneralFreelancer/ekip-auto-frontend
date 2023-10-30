import axios from 'axios';
import BASE_URL from './baseUrl';

axios.defaults.baseURL = BASE_URL;

const advertisingRequests = {
  getAdvertisingData: async (requestData) => {
    const response = await axios.get('/advertising', requestData);

    return response;
  },
};

export const {getAdvertisingData} = advertisingRequests;
