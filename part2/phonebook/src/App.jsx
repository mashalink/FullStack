import { useState, useMemo } from "react";
import PersonsList from "./components/PersonsList.jsx";
import Header from "./components/Header.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import "./App.css";

const initialPersons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
];

const App = () => {
  const [persons, setPersons] = useState(initialPersons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const name = newName.trim();
    const number = newNumber.trim();
    if (!name || !number) return;

    const nameExists = persons.some(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
    const numberExists = persons.some((person) => person.number === number);

    if (nameExists) {
      alert(`${name} is already added to phonebook`);
      return;
    }

    if (numberExists) {
      alert(`${number} is already added to phonebook`);
      return;
    }

    const nextId =
      persons.length === 0 ? 1 : Math.max(...persons.map((p) => p.id)) + 1;

    const personObject = {
      name: name,
      number: number,
      id: nextId,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const personsToShow = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return q
      ? persons.filter((p) => p.name.toLowerCase().includes(q))
      : persons;
  }, [filter, persons]);

  return (
    <div>
      <Header name={"Phonebook"} />
      <Filter filter={filter} setFilter={(e) => setFilter(e.target.value)} />
      <Header name={"add a new"} />
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <Header name={"Numbers"} />
      <PersonsList persons={personsToShow} />
    </div>
  );
};

export default App;
