import { deletePersonById } from "../../services/persons.js";

export function useDeletePerson({ persons, setPersons, setError }) {
  const handleDelete = (person) => {
    const { id, name } = person;
    if (!window.confirm(`Delete ${name}?`)) return;

    const prev = persons;
    setPersons((ps) => ps.filter((p) => p.id !== id));

    deletePersonById(id)
      .then(() => {})
      .catch(() => {
        setError(`Failed to delete ${name}`);
        setPersons(prev);
      });
  };

  return { deletePerson: handleDelete };
}
