import axios from "axios";

const apiKey = "e33b8a0a4d1d430bbdacbb213bdef5a2";

export default axios.create({
  baseURL: "https://newsapi.org/v2/",
  params: {
    apiKey: apiKey,
  },
});
