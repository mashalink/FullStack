import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_WEATHER_KEY;

export default function Weather({ capital }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!capital || !apiKey) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      capital
    )}&units=metric&appid=${apiKey}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load weather");
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load weather");
      });
  }, [capital]);

  if (!capital) return null;
  if (error) return <p>{error}</p>;
  if (!weather) return <p>Loading weather…</p>;

  const temp = weather.main?.temp;
  const wind = weather.wind?.speed;
  const iconCode = weather.weather?.[0]?.icon;
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature: {temp} °C</p>
      {iconUrl && <img src={iconUrl} alt={weather.weather?.[0]?.description} />}
      <p>wind: {wind} m/s</p>
    </div>
  );
}
