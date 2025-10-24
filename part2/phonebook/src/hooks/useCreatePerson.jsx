import { useState } from "react";
import { createPerson, updatePerson } from "../../services/persons.js";

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

  const addPerson = async (e) => {
    e.preventDefault();
    if (saving) return;

    const originalName = newName.trim();
    const number = newNumber.trim();
    if (!originalName || !number) return;

    const norm = (s) => s.trim().toLowerCase();

    const existing = persons.find((p) => norm(p.name) === norm(originalName));

    const numberUsedByAnother = persons.some(
      (p) => p.number === number && (!existing || p.id !== existing.id)
    );
    if (numberUsedByAnother) {
      alert(`The number ${number} is already used by another contact.`);
      return;
    }

    setError(null);
    setSaving(true);

    try {
      if (existing) {
        if ((existing.number ?? "") === number) {
          alert(`"${existing.name}" already has the number ${number}.`);
          return;
        }

        const ok = window.confirm(
          `"${existing.name}" is already in the phonebook. Replace ${
            existing.number ?? "—"
          } with ${number}?`
        );
        if (!ok) return;

        const updated = await updatePerson(existing.id, {
          ...existing,
          number,
        });
        setPersons((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
        setNewName("");
        setNewNumber("");
        return;
      }

      const created = await createPerson({ name: originalName, number });
      setPersons((prev) => prev.concat(created));
      setNewName("");
      setNewNumber("");
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to save person";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return { addPerson, saving };
}
