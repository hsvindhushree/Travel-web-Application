import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { searchLocationByQuery } from '../services/locationService';
import { X, Navigation, Search, MapPin, Check, AlertCircle, Loader2 } from 'lucide-react';

export default function LocationModal({ onClose }) {
  const { userLocation, requestUserLocation, setManualLocation } = useApp();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locError, setLocError] = useState(null);

  const handleDetectLocation = async () => {
    setIsLocating(true);
    setLocError(null);
    try {
      await requestUserLocation();
      onClose();
    } catch (err) {
      setLocError(err.message || "Failed to retrieve location.");
    } finally {
      setIsLocating(false);
    }
  };

  const handleSearchChange = async (val) => {
    setQuery(val);
    if (val.length >= 2) {
      setIsSearching(true);
      const results = await searchLocationByQuery(val);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectResult = (item) => {
    setManualLocation(item.name, item.country, item.lat, item.lon);
    onClose();
  };

  const quickCities = [
    { city: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
    { city: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
    { city: "New York", country: "USA", lat: 40.7128, lon: -74.0060 },
    { city: "Bali", country: "Indonesia", lat: -8.4095, lon: 115.1889 },
    { city: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964 },
    { city: "Reykjavik", country: "Iceland", lat: 64.1466, lon: -21.9426 }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">Location Awareness</h3>
              <p className="text-xs text-slate-400 font-light">Set your current city for local weather & distance specs.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Location Card */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Active Location</span>
              <span className="text-base font-bold text-white">
                {userLocation.city}, {userLocation.country || "Earth"}
              </span>
            </div>
          </div>
          {userLocation.isDetected && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
              GPS Detected
            </span>
          )}
        </div>

        {/* Detect Geolocation Button */}
        <button
          onClick={handleDetectLocation}
          disabled={isLocating}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          {isLocating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Detecting via Browser Geolocation...
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4" />
              Use My Current Device Location
            </>
          )}
        </button>

        {locError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{locError}</span>
          </div>
        )}

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-xs text-slate-400 font-mono">OR SEARCH CITY</span>
        </div>

        {/* City Search Bar */}
        <div className="relative">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-3 rounded-xl border border-slate-800 focus-within:border-cyan-500 transition-all">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search any city worldwide (e.g. London, Sydney)..."
              className="w-full bg-transparent text-white text-xs placeholder-slate-400 focus:outline-none"
            />
            {isSearching && <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />}
          </div>

          {/* Search Autocomplete Results */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-20 max-h-48 overflow-y-auto">
              {searchResults.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectResult(item)}
                  className="w-full px-4 py-2.5 text-left text-xs text-slate-200 hover:bg-slate-800 flex items-center justify-between transition-colors border-b border-slate-800/50 last:border-0"
                >
                  <span className="font-semibold">{item.displayName}</span>
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Popular Cities */}
        <div>
          <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block mb-2">Popular Global Hubs</span>
          <div className="flex flex-wrap gap-2">
            {quickCities.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setManualLocation(item.city, item.country, item.lat, item.lon) || onClose()}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-3 h-3 text-cyan-400" />
                {item.city}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
