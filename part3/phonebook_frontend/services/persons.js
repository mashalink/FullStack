import axios from "axios";

const api = axios.create({
  baseURL: "/api/persons",
});

export default api;

const getPersons = () => {
  return api.get("/").then((r) => r.data);
  //.then((data) => new Promise((res) => setTimeout(() => res(data), 1500))); // for testing loading state
};

const createPerson = (person) => {
  return api.post("/", person).then((r) => r.data);
};

const updatePerson = (id, person) => {
  return api.put(`/${id}`, person).then((r) => r.data);
};

const deletePersonById = (id) => {
  return api.delete(`/${id}`).then((r) => r.data);
};

export { getPersons, createPerson, updatePerson, deletePersonById };
