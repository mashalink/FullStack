import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3001" });

export const getCourses = () => {
  return api.get("/courses").then((r) => r.data);
};
