import axios from 'axios';

const apiKey = 'bc53aeff651b4467b204ee9c759d6e9b';

export default axios.create({
  baseURL: 'https://newsapi.org/v2/',
  params: {
    apiKey: apiKey,
  }
});