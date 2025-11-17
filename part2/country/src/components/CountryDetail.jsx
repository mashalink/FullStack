import Weather from "./Weather.jsx";

export default function CountryDetail({ country }) {
  const capital = Array.isArray(country.capital)
    ? country.capital[0]
    : country.capital;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>

      <h4>Languages:</h4>
      <ul>
        {Object.values(country.languages || {}).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.name.common} width="150" />

      <Weather capital={capital} />
    </div>
  );
}
