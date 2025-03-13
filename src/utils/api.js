import axios from "axios";

export const product = () => {
  const url = "http://localhost:8081/api/v1/product"
  return axios.get(url);
};

export const reviews = () => {
    const url = "http://localhost:8081/api/v1/review"
    return axios.get(url);
}

export const productpage = (page) => {
    const url = `http://localhost:8081/api/v1/product/${page}`
    return axios.get(url);
  };
  