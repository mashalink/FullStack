export default function CountryList({ filtered }) {
  return (
    <ul>
      {" "}
      {filtered.map((c) => (
        <li key={c.cca3}>{c.name.common}</li>
      ))}
    </ul>
  );
}
