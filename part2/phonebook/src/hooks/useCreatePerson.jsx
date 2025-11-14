import { useState } from "react";
import { createPerson, updatePerson } from "../../services/persons.js";

export function useCreateUpdatePerson({
  persons,
  setPersons,
  setError,
  setSuccessMessage,
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
        setSuccessMessage(`Updated number for ${updated.name}`);
        setTimeout(() => setSuccessMessage(null), 5000);
        return;
      }

      const created = await createPerson({ name: originalName, number });
      setPersons((prev) => prev.concat(created));
      setNewName("");
      setNewNumber("");
      setSuccessMessage(`Added ${created.name}`);
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      if (err?.response?.status === 404) {
        setError(
          `Information of "${existing.name}" has already been removed from server`
        );
        setPersons((prev) => prev.filter((p) => p.id !== existing.id));
        return;
      }
      const msg = err?.response?.data?.error || "Failed to save person";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };
  return { addPerson, saving };
}
