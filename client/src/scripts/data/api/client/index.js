import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:9001',
  headers: {
    authorization: process.env.API_KEY
  }
});

export default client;
