import axios from "axios";
const url = "http://localhost:3001/persons";

const getAll = () => {
  const response = axios.get(url);
  return response.then((response) => response.data);
};

const create = (person) => {
  const response = axios.post(url, person);
  return response.then((response) => response.data);
};

const remove = (person) => {
  const response = axios.delete(`${url}/${person.id}`);
  return response.then((response) => response.data);
};

const update = (person) => {
  const response = axios.put(`${url}/${person.id}`, person);
  return response.then((response) => response.data);
};

export default { getAll, create, remove, update };
