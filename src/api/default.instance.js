import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    format: "json",
  },
});

export default instance;
