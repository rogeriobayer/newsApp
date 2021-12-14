import axios from 'axios';

const apiKey = 'cb0825352e7e46b88d780a038ff8a6d5';

export default axios.create({
  baseURL: 'https://newsapi.org/v2/',
  params: {
    apiKey: apiKey,
  }
});