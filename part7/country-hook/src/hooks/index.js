import { useEffect, useState } from "react";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) {
      setCountry(null);
      return;
    }

    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${encodeURIComponent(name)}`,
        );

        if (!response.ok) {
          setCountry({ found: false });
          return;
        }

        const data = await response.json();
        setCountry({ found: true, data });
      } catch (e) {
        setCountry({ found: false });
      }
    };

    fetchCountry();
  }, [name]);

  return country;
};

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (e) => setValue(e.target.value);
  const reset = () => setValue("");

  return {
    inputProps: { type, value, onChange },
    reset,
  };
};
