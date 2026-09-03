import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import WeatherWidget from './WeatherWidget';
import { X, Star, MapPin, Calendar, DollarSign, Globe, Languages, Sparkles, Heart, Compass, Clock, CheckCircle2 } from 'lucide-react';

export default function DestinationDetail({ dest, onClose }) {
  const { savedDestinations, toggleFavoriteDestination, setActiveModal, setSelectedFamousPlace } = useApp();
  const [activeImage, setActiveImage] = useState(dest.coverImage);
  const isFav = savedDestinations.includes(dest.id);

  const galleryImages = [dest.coverImage, ...(dest.gallery || [])];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-8 max-h-[92vh] flex flex-col">
        
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-30 px-6 py-4 glass-panel border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-heading">{dest.name}</h2>
              <p className="text-xs text-rose-400 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {dest.country}, {dest.continent}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavoriteDestination(dest.id)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title={isFav ? "Saved" : "Save destination"}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          {/* Main Gallery & Overview Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Gallery Selector */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                <img
                  src={activeImage}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md font-semibold border border-slate-700">
                    {dest.category}
                  </span>
                  <div className="flex items-center gap-1 bg-amber-500/30 backdrop-blur-md px-3 py-1 rounded-full text-amber-300 font-bold border border-amber-500/40">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{dest.rating} Rating</span>
                  </div>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImage === img ? 'border-cyan-400 scale-105' : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Specs & Description */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">About Destination</span>
                <h3 className="text-2xl font-bold text-white font-heading mt-1 mb-3">{dest.tagline}</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                  {dest.description}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 font-medium block">Best Time to Visit</span>
                  <span className="font-semibold text-cyan-300 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {dest.bestTimeToVisit}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Avg Daily Cost</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {dest.avgCostPerDay}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Local Currency</span>
                  <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-400" /> {dest.currency}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Language</span>
                  <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                    <Languages className="w-3.5 h-3.5 text-amber-400" /> {dest.language}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    setActiveModal('itinerary');
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Plan Itinerary Here
                </button>
                <button
                  onClick={() => {
                    onClose();
                    setActiveModal('aiChat');
                  }}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Ask AI Concierge
                </button>
              </div>
            </div>
          </div>

          {/* Live Weather Section */}
          <div>
            <h3 className="text-lg font-bold text-white font-heading mb-3 flex items-center gap-2">
              <span className="text-cyan-400">🌤️</span> Live Destination Weather
            </h3>
            <WeatherWidget lat={dest.lat} lon={dest.lon} cityName={dest.name} />
          </div>

          {/* Requirement 03: Famous Places Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">Famous Attractions & Sights</h3>
                <p className="text-xs text-slate-400 font-light">Notable landmarks presented with key highlights and visitor specs.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(dest.famousPlaces || []).map(place => (
                <div
                  key={place.id}
                  className="glass-card rounded-2xl p-4 border border-slate-800 flex gap-4 items-start group hover:border-cyan-500/40 cursor-pointer"
                  onClick={() => setSelectedFamousPlace(place)}
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-24 h-24 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium">
                        {place.category}
                      </span>
                      <span className="text-amber-400 font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {place.rating}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {place.name}
                    </h4>

                    <p className="text-xs text-slate-300 line-clamp-2 font-light">
                      {place.description}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> {place.visitTime}
                      </span>
                      <span className="text-emerald-400 font-medium">
                        Cost: {place.cost}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
