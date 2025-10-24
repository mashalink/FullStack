import { useState } from "react";
import Header from "./components/Header.jsx";
import SmallHeader from "./components/SmallHeader.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import ListSection from "./components/ListSection.jsx";
import { useFilteredPersons } from "./hooks/useFilteredPersons.jsx";
import { usePersons } from "./hooks/usePersons.jsx";
import { useCreatePerson } from "./hooks/useCreatePerson.jsx";
import { useDeletePerson } from "./hooks/useDeletePerson.jsx";
import "./App.css";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  // Load initial data with .then/.catch/.finally
  const { persons, setPersons, loading, error, setError } = usePersons();

  // Derived data: filter + sort (memoized)
  const personsToShow = useFilteredPersons(persons, filter);

  // Creates a person OR updates the number if the name already exists
  const { addPerson } = useCreatePerson({
    persons,
    setPersons,
    setError,
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
