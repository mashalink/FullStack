import { useEffect, useState } from "react";
import { getPersons } from "../../services/persons.js";

// Load initial data with .then/.catch/.finally
export function usePersons() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPersons()
      .then((data) => setPersons(data))
      .catch(() => setError("Failed to load persons"))
      .finally(() => setLoading(false));
  }, []);

  return { persons, setPersons, loading, error, setError };
}
