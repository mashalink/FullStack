const PersonForm = ({
  onSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>name:</label>
        <input
          value={newName}
          onChange={handleNameChange}
          placeholder="a new person..."
        />
      </div>
      <div>
        <label>phone:</label>
        <input
          value={newNumber}
          onChange={handleNumberChange}
          placeholder="a number..."
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
