import Person from "./Person.jsx";

export default function PersonsList({ persons }) {
  if (!persons?.length) {
    return <p>No entries yet</p>;
  }

  return (
    <ul className="list">
      {persons.map((p) => (
        <Person key={p.id} person={p} />
      ))}
    </ul>
  );
}
