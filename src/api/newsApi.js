import axios from "axios";

const apiKey = "5a921d87ed1046f9859b84c51d54f335";

export default axios.create({
  baseURL: "https://newsapi.org/v2/",
  params: {
    apiKey: apiKey,
  },
});
