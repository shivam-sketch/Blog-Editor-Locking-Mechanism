import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/",

});
export const imagePath = "http://localhost:5000/images";



api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("blogs_hub");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("blogs_hub");
      Cookies.remove("blogs_hub");
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);




export default api;