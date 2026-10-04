import axios from 'axios';

const audioDbApi = axios.create({
  baseURL: 'https://www.theaudiodb.com/api/v1/json/123',
  timeout: 10000,
});

export default audioDbApi;