import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter.jsx";
import Header from "./components/Header.jsx";
import ListSection from "./components/ListSection.jsx";
import Notification from "./components/Notification.jsx";
import PersonForm from "./components/PersonForm.jsx";
import SmallHeader from "./components/SmallHeader.jsx";
import { useCreateUpdatePerson } from "./hooks/useCreatePerson.jsx";
import { useDeletePerson } from "./hooks/useDeletePerson.jsx";
import { useFilteredPersons } from "./hooks/useFilteredPersons.jsx";
import { usePersons } from "./hooks/usePersons.jsx";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  const { persons, setPersons, loading, error, setError } = usePersons();

  const personsToShow = useFilteredPersons(persons, filter);

  const { addPerson, saving } = useCreateUpdatePerson({
    persons,
    setPersons,
    setError,
    setSuccessMessage,
    newName,
    setNewName,
    newNumber,
    setNewNumber,
  });

  const { deletePerson } = useDeletePerson({
    persons,
    setPersons,
    setError,
  });
  useEffect(() => {
    if (!error) return;
    const id = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(id);
  }, [error]);
  return (
    <div>
      <Header name="Phonebook" />

      <Notification message={successMessage} className="success" />
      <Notification message={error} className="error" />

      <Filter filter={filter} setFilter={(e) => setFilter(e.target.value)} />

      <SmallHeader name="Add a new" />
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
        disabled={saving}
      />

      <SmallHeader name="Numbers" />
      <ListSection
        loading={loading}
        error={error}
        personsToShow={personsToShow}
        filter={filter}
        onDelete={deletePerson}
      />
    </div>
  );
};

export default App;
