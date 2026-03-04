const Country = ({ country }) => {
  if (!country) return null;

  if (!country.found) {
    return <div>not found...</div>;
  }

  const c = country.data;
  const name = c.name?.common ?? c.name;
  const flag = c.flags?.png ?? c.flag;

  return (
    <div>
      <h3>{name}</h3>
      <div>capital {Array.isArray(c.capital) ? c.capital[0] : c.capital}</div>
      <div>population {c.population}</div>
      <img src={flag} height="100" alt={`flag of ${name}`} />
    </div>
  );
};

export default Country;
