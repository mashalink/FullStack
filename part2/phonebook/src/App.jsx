import { useState } from "react";
import Person from "./components/Person.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);
    const phoneExists = persons.some((person) => person.phone === newPhone);

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    if (phoneExists) {
      alert(`${newPhone} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1,
    };
    console.log(personObject.id);

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewPhone("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    console.log(event.target.value);
    setNewPhone(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
            placeholder="a new person..."
          />
        </div>
        <div>
          phone:
          <input
            value={newPhone}
            onChange={handlePhoneChange}
            placeholder="a phone number..."
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
