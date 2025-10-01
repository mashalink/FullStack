import { useState, useMemo, useEffect } from "react";
import PersonsList from "./components/PersonsList.jsx";
import Header from "./components/Header.jsx";
import SmallHeader from "./components/SmallHeader.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import { getPersons, createPerson } from "../services/api.js";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Load initial data with .then/.catch/.finally
  useEffect(() => {
    setLoading(true);
    setError(null);
    getPersons()
      .then((data) => setPersons(data))
      .catch(() => setError("Failed to load persons"))
      .finally(() => setLoading(false));
  }, []);

  // Derived data: filter + sort (memoized)
  const personsToShow = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const list = q
      ? persons.filter((p) => p.name.toLowerCase().includes(q))
      : persons.slice(); // copy because sort mutates
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [filter, persons]);

  // Add a new person locally (no server POST here)
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

  return (
    <div>
      <Header name="Phonebook" />

      <Filter filter={filter} setFilter={(e) => setFilter(e.target.value)} />

      <SmallHeader name="Add a new" />
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <SmallHeader name="Numbers" />

      {/* Only the list area changes between loading/error/content */}
      <div aria-live="polite">
        {loading && <p>Loading persons…</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}

        {!loading &&
          !error &&
          (personsToShow.length > 0 ? (
            <PersonsList persons={personsToShow} />
          ) : (
            <p>
              {filter
                ? `No matches for “${filter}”.`
                : "No persons yet. Add someone above."}
            </p>
          ))}
      </div>
    </div>
  );
};

export default App;
