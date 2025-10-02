import { createPerson } from "../../services/persons.js";
import { useState } from "react";

// Creates a person via the server and updates state
export function useCreatePerson({
  persons,
  setPersons,
  setError,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) {
  const [saving, setSaving] = useState(false);
  const addPerson = (e) => {
    e.preventDefault();

    if (saving) return;

    const name = newName.trim();
    const number = newNumber.trim();
    if (!name || !number) return;

    const nameExists = persons.some(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    const numberExists = persons.some((p) => p.number === number);

    if (nameExists) return alert(`${name} is already in the phonebook`);
    if (numberExists) return alert(`${number} is already in the phonebook`);

    setError(null);
    setSaving(true);

    createPerson({ name, number })
      .then((saved) => {
        // server returns the saved person WITH id
        setPersons((prev) => prev.concat(saved));
        setNewName("");
        setNewNumber("");
      })
      .catch((err) => {
        const msg = err?.response?.data?.error || "Failed to save person";
        setError(msg);
      })
      .finally(() => setSaving(false));
  };
  return { addPerson };
}
