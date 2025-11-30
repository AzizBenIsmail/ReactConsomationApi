import axios from "axios";

const API_URL = "http://localhost:5000/users";

export async function getAllUsers() {
  return await axios.get(`${API_URL}/getAllUsers`);
}

export async function deleteUser(id) {
  return await axios.delete(`${API_URL}/deleteUser/${id}`, id);
}

export async function addNewUser(userData) {
  return await axios.post(`${API_URL}/addUser`, userData);
}

export async function updateUser(id, userData) {
  return await axios.put(`${API_URL}/updateUser/${id}`, userData);
}

export async function addNewUserWithImg(userData) {
  return await axios.post(`${API_URL}/addClient`, userData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
