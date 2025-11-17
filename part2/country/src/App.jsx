import { useEffect, useState } from "react";
import "./App.css";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import Search from "./components/Search";
// import { getTodos } from "./services/api";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((r) => r.json())
      .then((data) => setCountries(data));
  }, []);

  const filtered = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  let content = null;
  if (filter !== "") {
    if (filtered.length > 10)
      content = <p>Too many matches, specify another filter</p>;
    else if (filtered.length > 1) content = <CountryList filtered={filtered} />;
    else if (filtered.length === 1)
      content = <CountryDetail country={filtered[0]} />;
  }
  return (
    <div>
      <Search value={filter} onChange={(e) => setFilter(e.target.value)} />

      {content}
    </div>
  );
}
