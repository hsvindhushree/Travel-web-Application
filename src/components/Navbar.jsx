import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Compass, MapPin, Sparkles, Calendar, Bookmark, Settings, LogIn, LogOut, User, Navigation, ShieldCheck, ChevronDown, Check } from 'lucide-react';

export default function Navbar() {
  const {
    userLocation,
    requestUserLocation,
    weatherData,
    weatherUnit,
    setWeatherUnit,
    setActiveModal,
    savedTrips,
    savedDestinations,
    user,
    logoutUser
  } = useApp();

  const [profileOpen, setProfileOpen] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRefreshLocation = async (e) => {
    e.stopPropagation();
    setLocLoading(true);
    try {
      await requestUserLocation();
    } catch (err) {
      console.warn(err);
    } finally {
      setLocLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Compass className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-bold font-heading tracking-tight text-white flex items-center gap-1.5">
              Wander<span className="text-gradient">lust</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase text-slate-400 block font-medium -mt-1">
              DesignEsthetics Edition
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
          <a
            href="#explorer"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/80 transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            Explorer
          </a>
          <a
            href="#places"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/80 transition-all flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            Famous Places
          </a>
          <button
            onClick={() => setActiveModal('itinerary')}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/80 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            Itinerary Planner
          </button>
          <button
            onClick={() => setActiveModal('aiChat')}
            className="px-4 py-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full border border-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            AI Concierge
          </button>
        </nav>

        {/* Right Actions, User Profile & Location Badge */}
        <div className="flex items-center gap-3">
          
          {/* Detected Location Badge */}
          <button
            onClick={() => setActiveModal('location')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-all shadow-inner cursor-pointer"
            title="Change or detect current location"
          >
            <MapPin className={`w-4 h-4 text-rose-400 shrink-0 ${userLocation.isDetected ? 'animate-bounce' : ''}`} />
            <span className="font-semibold text-white max-w-[90px] sm:max-w-[120px] truncate">
              {userLocation.city}
            </span>
            {weatherData && (
              <span className="hidden sm:inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 text-[11px] font-mono border border-slate-700">
                {weatherData.icon} {weatherUnit === 'C' ? `${weatherData.tempC}°C` : `${weatherData.tempF}°F`}
              </span>
            )}
          </button>

          {/* Temperature Unit Toggle */}
          <button
            onClick={() => setWeatherUnit(prev => prev === 'C' ? 'F' : 'C')}
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Toggle °C / °F"
          >
            °{weatherUnit}
          </button>

          {/* Saved Items Badge */}
          <button
            onClick={() => setActiveModal('savedTrips')}
            className="relative p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Saved Trips & Favorites"
          >
            <Bookmark className="w-4 h-4" />
            {(savedTrips.length > 0 || savedDestinations.length > 0) && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {savedTrips.length + savedDestinations.length}
              </span>
            )}
          </button>

          {/* API Key Settings Gear */}
          <button
            onClick={() => setActiveModal('settings')}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            title="API Key Configuration"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* User Profile / Login Area */}
          <div className="relative" ref={dropdownRef}>
            {user ? (
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-lg object-cover border border-cyan-500/40"
                />
                <span className="text-xs font-bold text-white max-w-[100px] truncate hidden sm:inline">
                  {user.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ) : (
              <button
                onClick={() => setActiveModal('auth')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}

            {/* Profile Dropdown Card */}
            {profileOpen && user && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 space-y-4 animate-fadeIn z-50 glass-panel">
                
                {/* Header info */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-cyan-500/50 shadow-md"
                  />
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-white truncate font-heading">{user.name}</h4>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-semibold border border-cyan-500/30">
                      <ShieldCheck className="w-3 h-3" /> {user.travelVibe}
                    </span>
                  </div>
                </div>

                {/* Location Badge */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" /> Current Location:
                    </span>
                    <button
                      onClick={handleRefreshLocation}
                      disabled={locLoading}
                      className="text-[10px] font-semibold text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Navigation className={`w-3 h-3 ${locLoading ? 'animate-spin' : ''}`} /> Detect
                    </button>
                  </div>
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>{userLocation.city}, {userLocation.country}</span>
                    {weatherData && (
                      <span className="text-[10px] text-cyan-300 font-mono bg-slate-900 px-2 py-0.5 rounded">
                        {weatherData.tempC}°C
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <span className="block font-bold text-cyan-400 text-sm">{savedTrips.length}</span>
                    <span className="text-[10px] text-slate-400">Saved Trips</span>
                  </div>
                  <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <span className="block font-bold text-amber-400 text-sm">{savedDestinations.length}</span>
                    <span className="text-[10px] text-slate-400">Favorites</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-1 pt-1 border-t border-slate-800">
                  <button
                    onClick={() => { setProfileOpen(false); setActiveModal('savedTrips'); }}
                    className="w-full px-3 py-2 text-left text-xs text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4 text-cyan-400" /> My Saved Journeys
                  </button>
                  <button
                    onClick={() => { setProfileOpen(false); setActiveModal('location'); }}
                    className="w-full px-3 py-2 text-left text-xs text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-rose-400" /> Location Settings
                  </button>
                  <button
                    onClick={() => { setProfileOpen(false); logoutUser(); }}
                    className="w-full px-3 py-2 text-left text-xs text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10 transition-colors flex items-center gap-2 cursor-pointer mt-1 font-semibold"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}

