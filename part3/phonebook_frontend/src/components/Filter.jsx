const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <label>filter shown with</label>
      <input
        value={filter}
        onChange={setFilter}
        placeholder="type to search..."
      />
    </div>
  );
};

export default Filter;
