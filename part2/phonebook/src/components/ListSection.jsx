import PersonsList from "./PersonsList.jsx";

export default function ListSection({
  loading,
  error,
  personsToShow = [],
  filter,
  onDelete,
}) {
  return (
    <div aria-live="polite">
      {loading && <p>Loading persons…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading &&
        !error &&
        (personsToShow.length > 0 ? (
          <PersonsList persons={personsToShow} onDelete={onDelete} />
        ) : (
          <p>
            {filter
              ? `No matches for “${filter}”.`
              : "No persons yet. Add someone above."}
          </p>
        ))}
    </div>
  );
}
