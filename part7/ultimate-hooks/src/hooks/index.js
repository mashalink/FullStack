import axios from "axios";
import { useEffect, useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { type, value, onChange };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };
    fetchAll();
  }, [baseUrl]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources((prev) => prev.concat(response.data));
    return response.data;
  };

  return [resources, { create }];
};
