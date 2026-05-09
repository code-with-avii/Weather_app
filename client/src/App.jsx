import { useState } from "react";
import axios from "axios";
import {
  WiHumidity,
  WiStrongWind,
  WiThermometer,
} from "react-icons/wi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/weather/${city}`
      );

      setWeather(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-400 via-blue-500 to-indigo-700 flex items-center justify-center px-4">

      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-8 w-full max-w-md text-white">

        <h1 className="text-4xl font-bold text-center mb-6 tracking-wide">
          Weather App
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 outline-none border border-white/30"
          />

          <button
            onClick={getWeather}
            className="bg-white text-blue-600 px-5 rounded-xl font-semibold hover:scale-105 transition duration-300"
          >
            Search
          </button>
        </div>

        {weather && (
          <div className="mt-8 text-center">

            <h2 className="text-3xl font-semibold">
              {weather.name}
            </h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="weather"
              className="mx-auto"
            />

            <p className="text-5xl font-bold">
              {Math.round(weather.main.temp)}°C
            </p>

            <p className="capitalize text-lg mt-2 text-white/80">
              {weather.weather[0].description}
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8">

              <div className="bg-white/10 p-4 rounded-2xl">
                <WiHumidity className="text-4xl mx-auto" />
                <p className="mt-2 text-sm">Humidity</p>
                <h3 className="font-bold">
                  {weather.main.humidity}%
                </h3>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl">
                <WiStrongWind className="text-4xl mx-auto" />
                <p className="mt-2 text-sm">Wind</p>
                <h3 className="font-bold">
                  {weather.wind.speed} km/h
                </h3>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl">
                <WiThermometer className="text-4xl mx-auto" />
                <p className="mt-2 text-sm">Feels Like</p>
                <h3 className="font-bold">
                  {Math.round(weather.main.feels_like)}°C
                </h3>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;