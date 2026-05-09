
import { useState } from "react";
import axios from "axios";
import {
  WiHumidity,
  WiStrongWind,
  WiThermometer,
  WiDaySunny,
  WiCloud,
} from "react-icons/wi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `https://weather-app-mixv.onrender.com/api/weather/${city}`
      );

      setWeather(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex">

      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-72 bg-[#111827] border-r border-white/10 p-6">

        <div>
          <h1 className="text-3xl font-bold text-cyan-400">
            SkyCast
          </h1>

          <p className="text-gray-400 mt-1">
            Weather Dashboard
          </p>
        </div>

        <div className="mt-10">
          <div className="bg-linear-to-br from-cyan-500 to-blue-600 rounded-3xl p-6">

            <WiDaySunny className="text-7xl" />

            <h2 className="text-2xl font-bold mt-4">
              Live Weather
            </h2>

            <p className="text-white/80 mt-2 text-sm">
              Real-time weather updates around the world.
            </p>

          </div>
        </div>

        <div className="mt-auto text-gray-500 text-sm">
          Built with React + Tailwind
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-4xl font-bold">
              Weather Overview
            </h1>

            <p className="text-gray-400 mt-2">
              Search any city to get live weather updates.
            </p>
          </div>

          {/* Search */}
          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-[#1e293b] px-5 py-3 rounded-2xl outline-none w-full md:w-80 border border-white/10"
            />

            <button
              onClick={getWeather}
              className="bg-cyan-500 hover:bg-cyan-400 transition-all px-6 rounded-2xl font-semibold"
            >
              Search
            </button>

          </div>
        </div>

        {/* Weather Hero Card */}
        <div className="mt-8 bg-linear-to-br from-cyan-500 to-blue-700 rounded-[30px] p-8 shadow-2xl">

          {loading ? (
            <div className="text-center py-20 text-2xl font-bold">
              Loading...
            </div>
          ) : weather ? (
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              <div>
                <h2 className="text-3xl font-semibold text-white/80">
                  {weather.name}
                </h2>

                <h1 className="text-8xl font-bold mt-4">
                  {Math.round(weather.main.temp)}°C
                </h1>

                <p className="capitalize text-2xl mt-3 text-white/90">
                  {weather.weather[0].description}
                </p>
              </div>

              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt="weather"
                  className="w-52"
                />
              </div>

            </div>
          ) : (
            <div className="text-center py-20">

              <WiCloud className="text-8xl mx-auto text-white/90" />

              <h2 className="text-3xl font-bold mt-5">
                Search a City
              </h2>

              <p className="mt-2 text-white/80">
                Get weather insights instantly.
              </p>

            </div>
          )}

        </div>

        {/* Stats Grid */}
        {weather && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

            <div className="bg-[#1e293b] rounded-3xl p-6 border border-white/5">
              <WiHumidity className="text-5xl text-cyan-400" />

              <p className="text-gray-400 mt-4">
                Humidity
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {weather.main.humidity}%
              </h2>
            </div>

            <div className="bg-[#1e293b] rounded-3xl p-6 border border-white/5">
              <WiStrongWind className="text-5xl text-cyan-400" />

              <p className="text-gray-400 mt-4">
                Wind Speed
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {weather.wind.speed} km/h
              </h2>
            </div>

            <div className="bg-[#1e293b] rounded-3xl p-6 border border-white/5">
              <WiThermometer className="text-5xl text-cyan-400" />

              <p className="text-gray-400 mt-4">
                Feels Like
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {Math.round(weather.main.feels_like)}°C
              </h2>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;

