import axios from 'axios';

const apiKey = '028ff9f1bc8e45398e36b78fdbbb2b58';

export default axios.create({
  baseURL: 'https://newsapi.org/v2/',
  params: {
    apiKey: apiKey,
  }
});