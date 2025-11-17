export default function CountryList({ filtered, setFilter }) {
  return (
    <ul>
      {" "}
      {filtered.map((c) => (
        <li key={c.cca3}>
          {c.name.common}{" "}
          <button type="button" onClick={() => setFilter(c.name.common)}>
            Show
          </button>
        </li>
      ))}
    </ul>
  );
}
