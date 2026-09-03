import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/destinationsData';
import { Star, MapPin, Calendar, Heart, ArrowRight, Sparkles, Filter, DollarSign } from 'lucide-react';

export default function DestinationExplorer({ searchQuery, setSearchQuery }) {
  const { destinations, openDestinationDetail, savedDestinations, toggleFavoriteDestination } = useApp();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rating"); // 'rating' | 'price' | 'name'

  // Filter destinations by search query and category
  const filtered = destinations.filter(dest => {
    const matchesCategory = activeCategory === "All" || dest.category.toLowerCase() === activeCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      dest.name.toLowerCase().includes(query) ||
      dest.country.toLowerCase().includes(query) ||
      dest.continent.toLowerCase().includes(query) ||
      dest.tagline.toLowerCase().includes(query) ||
      dest.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // Sort destinations
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price") return a.priceLevel.length - b.priceLevel.length;
    return 0;
  });

  return (
    <section id="explorer" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <CompassIcon className="w-3.5 h-3.5" />
            Destination Explorer
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            Curated World Destinations
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl font-light">
            Filter by travel style, explore live weather forecasts, famous attractions, and launch AI itineraries.
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          >
            <option value="rating">Top Rated ⭐</option>
            <option value="name">Alphabetical (A-Z)</option>
            <option value="price">Price (Budget First)</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105"
                : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Destination Grid */}
      {sorted.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center max-w-lg mx-auto my-8">
          <p className="text-4xl mb-3">🔍</p>
          <h3 className="text-xl font-bold text-white mb-2">No Destinations Found</h3>
          <p className="text-slate-400 text-sm mb-6">
            We couldn't find any destination matching "{searchQuery}". Try clearing search filters or changing category.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map(dest => {
            const isFav = savedDestinations.includes(dest.id);
            return (
              <div
                key={dest.id}
                className="group glass-card rounded-3xl overflow-hidden flex flex-col cursor-pointer border border-slate-800 hover:border-cyan-500/50"
                onClick={() => openDestinationDetail(dest)}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.coverImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Category & Continent Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-cyan-300 border border-slate-700">
                      {dest.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-medium text-slate-300 border border-slate-700">
                      {dest.continent}
                    </span>
                  </div>

                  {/* Favorite Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavoriteDestination(dest.id);
                    }}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-rose-400 transition-colors"
                    title={isFav ? "Remove from saved" : "Save destination"}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Rating Tag */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-1 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 px-2.5 py-1 rounded-lg text-amber-300 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{dest.rating}</span>
                    <span className="text-slate-400 font-normal text-[10px]">({dest.reviewsCount})</span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-4 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-emerald-400 font-mono text-xs font-semibold border border-slate-700">
                    {dest.priceLevel}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{dest.country}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white font-heading group-hover:text-cyan-400 transition-colors mb-2">
                      {dest.name}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4 font-light">
                      {dest.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{dest.bestTimeToVisit}</span>
                    </div>

                    <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Explore Page
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function CompassIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" strokeWidth="2"/>
    </svg>
  );
}
