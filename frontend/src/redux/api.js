import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

console.log(process.env.REACT_APP_API);

const API = axios.create({ baseURL: process.env.REACT_APP_API });
// const API = axios.create({ baseURL: process.env.API_KEY });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/users/login", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const updateUser = (formData) => API.patch("/users/profiles", formData);
export const deleteUser = (id) => API.post(`/users/delete/${id}`);
