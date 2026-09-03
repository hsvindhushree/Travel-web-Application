import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Clock, DollarSign, CheckCircle2, MapPin, Sparkles, Filter } from 'lucide-react';

export default function FamousPlaces() {
  const { destinations, setSelectedFamousPlace } = useApp();
  const [selectedDestId, setSelectedDestId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Flatten all famous places from all destinations
  const allPlaces = destinations.flatMap(dest => 
    (dest.famousPlaces || []).map(p => ({
      ...p,
      destId: dest.id,
      destName: dest.name,
      country: dest.country
    }))
  );

  // Filter places by destination and search query
  const filteredPlaces = allPlaces.filter(place => {
    const matchesDest = selectedDestId === "all" || place.destId === selectedDestId;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      place.name.toLowerCase().includes(q) ||
      place.category.toLowerCase().includes(q) ||
      place.description.toLowerCase().includes(q) ||
      place.destName.toLowerCase().includes(q);
    return matchesDest && matchesSearch;
  });

  return (
    <section id="places" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Must-Visit Landmarks
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            Famous Sights & Experiences
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl font-light">
            Properly presented with high-res photography, recommended visit hours, pricing, and insider highlights.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Destination Dropdown Filter */}
          <select
            value={selectedDestId}
            onChange={(e) => setSelectedDestId(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">🌍 All Destinations</option>
            {destinations.map(d => (
              <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
            ))}
          </select>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sights..."
            className="bg-slate-900 text-slate-200 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 w-44 sm:w-56"
          />
        </div>
      </div>

      {/* Grid of Famous Places */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlaces.map(place => (
          <div
            key={place.id}
            onClick={() => setSelectedFamousPlace(place)}
            className="group glass-card rounded-3xl overflow-hidden flex flex-col border border-slate-800 hover:border-emerald-500/50 cursor-pointer"
          >
            {/* Image Header */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Destination Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-rose-400 border border-slate-700 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {place.destName}
                </span>
              </div>

              {/* Rating */}
              <div className="absolute top-4 right-4 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 px-2.5 py-1 rounded-lg text-amber-300 text-xs font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{place.rating}</span>
              </div>

              {/* Category Pill */}
              <div className="absolute bottom-3 left-4">
                <span className="px-3 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-md text-emerald-300 font-semibold text-xs border border-emerald-500/30">
                  {place.category}
                </span>
              </div>
            </div>

            {/* Place Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white font-heading group-hover:text-emerald-400 transition-colors mb-2">
                  {place.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-light mb-4">
                  {place.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">Key Highlights</span>
                  {(place.highlights || []).slice(0, 2).map((hl, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Meta */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{place.visitTime}</span>
                </div>
                <div className="font-semibold text-emerald-400 font-mono">
                  {place.cost}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
