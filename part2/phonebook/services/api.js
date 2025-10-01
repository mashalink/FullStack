import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3001" });

// for testing error state:
// const api = axios.create({ baseURL: "http://localhost:3001", timeout: 1 });

const getPersons = () => {
  return api
    .get("/persons")
    .then((r) => r.data)
    .then((data) => new Promise((res) => setTimeout(() => res(data), 1500))); // for testing loading state
};

const createPerson = (person) => {
  return api.post("/persons", person).then((r) => r.data);
};

const updatePerson = (id, person) => {
  return api.put(`/persons/${id}`, person).then((r) => r.data);
};

const deletePerson = (id) => {
  return api.delete(`/persons/${id}`).then((r) => r.data);
};

export { getPersons, createPerson, updatePerson, deletePerson };
