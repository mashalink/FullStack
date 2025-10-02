import PersonsList from "./PersonsList.jsx";

export default function ListSection({
  loading,
  error,
  personsToShow = [],
  filter,
}) {
  return (
    <div aria-live="polite">
      {loading && <p>Loading persons…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading &&
        !error &&
        (personsToShow.length > 0 ? (
          <PersonsList persons={personsToShow} />
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
