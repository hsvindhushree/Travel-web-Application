import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchLiveWeather } from '../services/weatherService';
import { Wind, Droplets, Thermometer, CloudSun, RefreshCw } from 'lucide-react';

export default function WeatherWidget({ lat, lon, cityName }) {
  const { weatherUnit, setWeatherUnit, apiKeys } = useApp();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchLiveWeather(lat, lon, cityName, apiKeys.openWeather);
      setWeather(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lat && lon) {
      loadData();
    }
  }, [lat, lon, cityName, apiKeys.openWeather]);

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-6 animate-shimmer h-44 flex items-center justify-center">
        <span className="text-xs text-slate-400 font-mono animate-pulse flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" /> Fetching live satellite weather...
        </span>
      </div>
    );
  }

  if (!weather) return null;

  const tempDisplay = weatherUnit === 'C' ? `${weather.tempC}°C` : `${weather.tempF}°F`;
  const feelsLikeDisplay = weatherUnit === 'C' ? `${weather.feelsLikeC}°C` : `${weather.feelsLikeF}°F`;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 relative overflow-hidden shadow-xl">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{weather.icon}</span>
          <div>
            <h4 className="text-lg font-bold text-white font-heading">{weather.cityName}</h4>
            <p className="text-xs text-slate-400 capitalize">{weather.description}</p>
          </div>
        </div>

        {/* Temperature & Unit Switch */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-3xl font-extrabold text-white font-mono">{tempDisplay}</span>
            <span className="text-[10px] text-slate-400 block">Feels like {feelsLikeDisplay}</span>
          </div>

          <button
            onClick={() => setWeatherUnit(prev => prev === 'C' ? 'F' : 'C')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-cyan-300 border border-slate-700 transition-colors"
          >
            °{weatherUnit}
          </button>
        </div>
      </div>

      {/* Weather Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-cyan-400" />
          <div>
            <span className="text-slate-400 text-[10px] block">Humidity</span>
            <span className="font-semibold text-slate-200">{weather.humidity}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-emerald-400" />
          <div>
            <span className="text-slate-400 text-[10px] block">Wind Speed</span>
            <span className="font-semibold text-slate-200">{weather.windKmH} km/h</span>
          </div>
        </div>

        <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
          <Thermometer className="w-4 h-4 text-amber-400" />
          <div>
            <span className="text-slate-400 text-[10px] block">Condition</span>
            <span className="font-semibold text-slate-200">{weather.condition}</span>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast Stream */}
      {weather.forecast && weather.forecast.length > 0 && (
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider text-slate-300">5-Day Outlook</span>
            <span className="font-mono text-[10px] text-cyan-400/80">Source: {weather.source}</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {weather.forecast.map((day, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <span className="text-[10px] font-semibold text-slate-300 block">{day.day}</span>
                <span className="text-lg my-1 block">{day.icon}</span>
                <span className="text-[11px] font-mono font-bold text-white block">
                  {weatherUnit === 'C' ? `${day.maxC}°` : `${Math.round((day.maxC * 9)/5 + 32)}°`}
                </span>
                <span className="text-[9px] font-mono text-slate-400 block">
                  {weatherUnit === 'C' ? `${day.minC}°` : `${Math.round((day.minC * 9)/5 + 32)}°`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
