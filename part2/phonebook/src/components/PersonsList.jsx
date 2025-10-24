import Person from "./Person.jsx";

export default function PersonsList({ persons, onDelete }) {
  if (!persons?.length) {
    return <p>No entries yet</p>;
  }

  return (
    <ul>
      {persons.map((p) => (
        <li key={p.id}>
          {p.name} {p.number}{" "}
          <button onClick={() => onDelete(p)}>delete</button>
        </li>
      ))}
    </ul>
  );
}
