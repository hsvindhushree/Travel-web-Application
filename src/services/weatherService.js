/**
 * Weather Service supporting OpenWeatherMap API and Open-Meteo API as zero-config fallback.
 */

// Weather Code mapping for Open-Meteo to human-readable condition & icon
const WMO_CODE_MAP = {
  0: { description: "Clear Sky", icon: "☀️", condition: "Clear" },
  1: { description: "Mainly Clear", icon: "🌤️", condition: "Clear" },
  2: { description: "Partly Cloudy", icon: "⛅", condition: "Clouds" },
  3: { description: "Overcast", icon: "☁️", condition: "Clouds" },
  45: { description: "Foggy", icon: "🌫️", condition: "Fog" },
  48: { description: "Depositing Rime Fog", icon: "🌫️", condition: "Fog" },
  51: { description: "Light Drizzle", icon: "🌧️", condition: "Rain" },
  53: { description: "Moderate Drizzle", icon: "🌧️", condition: "Rain" },
  55: { description: "Dense Drizzle", icon: "🌧️", condition: "Rain" },
  61: { description: "Slight Rain", icon: "🌧️", condition: "Rain" },
  63: { description: "Moderate Rain", icon: "🌧️", condition: "Rain" },
  65: { description: "Heavy Rain", icon: "🌧️", condition: "Rain" },
  71: { description: "Slight Snow", icon: "🌨️", condition: "Snow" },
  73: { description: "Moderate Snow", icon: "🌨️", condition: "Snow" },
  75: { description: "Heavy Snow", icon: "🌨️", condition: "Snow" },
  80: { description: "Slight Rain Showers", icon: "🌦️", condition: "Rain" },
  81: { description: "Moderate Rain Showers", icon: "🌦️", condition: "Rain" },
  82: { description: "Violent Rain Showers", icon: "⛈️", condition: "Thunderstorm" },
  95: { description: "Thunderstorm", icon: "⛈️", condition: "Thunderstorm" },
  96: { description: "Thunderstorm with Hail", icon: "⛈️", condition: "Thunderstorm" }
};

export async function fetchLiveWeather(lat, lon, cityName = "", apiKey = "") {
  // Option A: Try OpenWeather if API Key is present
  if (apiKey) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        return {
          tempC: Math.round(data.main.temp),
          tempF: Math.round((data.main.temp * 9) / 5 + 32),
          feelsLikeC: Math.round(data.main.feels_like),
          feelsLikeF: Math.round((data.main.feels_like * 9) / 5 + 32),
          condition: data.weather[0]?.main || "Clear",
          description: data.weather[0]?.description || "Clear Sky",
          humidity: data.main.humidity,
          windKmH: Math.round(data.wind.speed * 3.6),
          cityName: data.name || cityName,
          icon: getWeatherEmoji(data.weather[0]?.main),
          source: "OpenWeather"
        };
      }
    } catch (e) {
      console.warn("OpenWeather API call failed, falling back to Open-Meteo:", e);
    }
  }

  // Option B: Open-Meteo API (No Key Required, Free, Live Real-time Weather)
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Open-Meteo API error");
    const data = await res.json();
    
    const current = data.current;
    const weatherInfo = WMO_CODE_MAP[current.weather_code] || { description: "Partly Cloudy", icon: "⛅", condition: "Clouds" };
    
    const dailyForecast = (data.daily?.time || []).slice(0, 5).map((dateStr, idx) => {
      const date = new Date(dateStr);
      const dayName = idx === 0 ? "Today" : date.toLocaleDateString('en-US', { weekday: 'short' });
      const wInfo = WMO_CODE_MAP[data.daily.weather_code[idx]] || { icon: "⛅", condition: "Clouds" };
      return {
        day: dayName,
        maxC: Math.round(data.daily.temperature_2m_max[idx]),
        minC: Math.round(data.daily.temperature_2m_min[idx]),
        icon: wInfo.icon,
        condition: wInfo.condition
      };
    });

    return {
      tempC: Math.round(current.temperature_2m),
      tempF: Math.round((current.temperature_2m * 9) / 5 + 32),
      feelsLikeC: Math.round(current.apparent_temperature),
      feelsLikeF: Math.round((current.apparent_temperature * 9) / 5 + 32),
      condition: weatherInfo.condition,
      description: weatherInfo.description,
      humidity: current.relative_humidity_2m,
      windKmH: Math.round(current.wind_speed_10m),
      cityName: cityName || "Current Location",
      icon: weatherInfo.icon,
      forecast: dailyForecast,
      source: "Open-Meteo (Live)"
    };
  } catch (err) {
    console.error("Failed to fetch weather from Open-Meteo:", err);
    // Simulated fallback if network fails
    return {
      tempC: 24,
      tempF: 75,
      feelsLikeC: 25,
      feelsLikeF: 77,
      condition: "Clear",
      description: "Sunny & Pleasant",
      humidity: 55,
      windKmH: 12,
      cityName: cityName || "Destination",
      icon: "☀️",
      forecast: [
        { day: "Today", maxC: 24, minC: 16, icon: "☀️" },
        { day: "Tomorrow", maxC: 26, minC: 17, icon: "🌤️" },
        { day: "Day 3", maxC: 23, minC: 15, icon: "⛅" },
        { day: "Day 4", maxC: 25, minC: 16, icon: "☀️" },
        { day: "Day 5", maxC: 22, minC: 14, icon: "🌧️" }
      ],
      source: "Offline Mode"
    };
  }
}

function getWeatherEmoji(condition = "") {
  const cond = condition.toLowerCase();
  if (cond.includes("cloud")) return "⛅";
  if (cond.includes("rain") || cond.includes("drizzle")) return "🌧️";
  if (cond.includes("thunder")) return "⛈️";
  if (cond.includes("snow")) return "🌨️";
  if (cond.includes("clear") || cond.includes("sun")) return "☀️";
  return "🌤️";
}
