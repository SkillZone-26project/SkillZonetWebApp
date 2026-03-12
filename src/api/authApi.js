import api from "./axios";

export const registerUser = async (data) => {
  return api.post("/register", data);
};

export const loginUser = async (data) => {
  return api.post("/login", data);
};