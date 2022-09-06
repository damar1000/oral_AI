import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-type": "application/json",
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
});

export const baseURL = axios.create({
  baseURL: "http://localhost:8000/",
})