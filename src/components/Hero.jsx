import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Sparkles, MapPin, ArrowRight, Play, CloudSun, Compass } from 'lucide-react';

export default function Hero({ onSearchSubmit }) {
  const { weatherData, weatherUnit, userLocation, setActiveModal, destinations, openDestinationDetail } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit(searchQuery);
    // Scroll to explorer section
    const explorer = document.getElementById('explorer');
    if (explorer) explorer.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      
      {/* Requirement 01: Looping Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover scale-105 filter brightness-75 contrast-110 transform transition-transform duration-1000"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-beach-and-sea-with-sunset-41553-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-at-night-42861-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient Overlays for Cinematic Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950/90" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
        
        {/* Live Location & Weather Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 mb-8 animate-float-slow shadow-xl shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200">
            {userLocation.city}, {userLocation.country || "Earth"}
          </span>
          {weatherData && (
            <span className="text-xs font-mono text-cyan-300 border-l border-slate-700 pl-2">
              {weatherData.icon} {weatherUnit === 'C' ? `${weatherData.tempC}°C` : `${weatherData.tempF}°F`} ({weatherData.condition})
            </span>
          )}
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 font-heading">
          Explore The World <br className="hidden sm:block" />
          <span className="text-gradient">Powered by Intelligence</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-light mb-10 leading-relaxed">
          Discover handpicked destinations, live weather updates, famous sights, and let our Gemini AI concierge craft your bespoke day-by-day travel itinerary.
        </p>

        {/* Search Bar Overlay */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
          <div className="glass-panel p-2 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700/80 focus-within:border-cyan-500/60 transition-all">
            <Search className="w-6 h-6 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations (e.g., Paris, Tokyo, Bali, Beaches)..."
              className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none px-2"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 shrink-0 cursor-pointer"
            >
              Search
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#explorer"
            className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 transition-all flex items-center gap-2 hover:border-slate-500"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            Explore 12+ Destinations
          </a>
          <button
            onClick={() => setActiveModal('itinerary')}
            className="px-6 py-3.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-semibold text-sm border border-cyan-500/40 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/10"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Build AI Day-by-Day Itinerary
          </button>
        </div>

      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
}
