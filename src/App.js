import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    onSearch(searchValue);
  };
  return (
    <div className="search-bar">
      <input
        placeholder="Enter city name"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const WeatherCard = ({ title, value }) => {
  return (
    <div className="weather-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

const WeatherDisplay = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (city) {
      setLoading(true);
      axios
        .get(`https://api.weatherapi.com/v1/current.json`, {
          params: {
            key: "34cdc0eea008416a8bc112954240502",
            q: city,
          },
        })
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data");
          alert("Failed to fetch weather data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [city]);

  return (
    <div className="weather-display">
      {loading && <p>Loading...</p>}
      {!loading && weatherData && (
        <div className="weather-cards">
          <WeatherCard
            title="Temperature"
            value={`${weatherData.current.temp_c}°C`}
          />
          <WeatherCard
            title="Humidity"
            value={`${weatherData.current.humidity}%`}
          />
          <WeatherCard
            title="Condition"
            value={`${weatherData.current.condition.text}`}
          />
          <WeatherCard
            title="Wind-Speed"
            value={`${weatherData.current.wind_kph}kph`}
          />
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [city, setCity] = useState("");

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };
  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />

      <WeatherDisplay city={city} />
    </div>
  );
}
