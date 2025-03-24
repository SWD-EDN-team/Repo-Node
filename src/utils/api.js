import axios from "axios";

// const token = localStorage.getItem("token");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2Y5MGIwNzUxMDcxZjBhNmFiYjM3NCIsImVtYWlsIjoic2VsbGVyQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0MTg2NTE4NSwiZXhwIjoxNzQxOTUxNTg1fQ.-Ti9a9nPWUt-xU5YtAp1Ap5A1cHMKwuLlLyXUwBy744";
const API_URL = "http://localhost:8081/api/v1";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const product = () => {
  return api.get("/product");
};

export const reviews = () => {
    return api.get("/review");
}

export const categories = () => {
    return api.get("/category")
}

export const productById = (id) => {
    return api.get(`/product/${id}`);
}
export const productpage = (page) => {
    const url = `http://localhost:8081/api/v1/product/page/${page}`
    return axios.get(url);
  };
  