import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Bookmark, Trash2, Calendar, MapPin, Star, Heart, ArrowRight } from 'lucide-react';

export default function SavedTrips({ onClose }) {
  const { savedTrips, deleteItinerary, savedDestinations, destinations, openDestinationDetail, toggleFavoriteDestination } = useApp();

  const favDestObjects = destinations.filter(d => savedDestinations.includes(d.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 max-h-[90vh] flex flex-col space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">Saved Trips & Bookmarks</h3>
              <p className="text-xs text-slate-400 font-light">Access saved day-by-day itineraries and favorite destinations.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto space-y-8 flex-1 pr-1">
          
          {/* Saved Itineraries Section */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Saved Day-by-Day Plans ({savedTrips.length})
            </h4>

            {savedTrips.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 text-center text-xs text-slate-400">
                No itineraries saved yet. Click "Save Itinerary" when generating a plan!
              </div>
            ) : (
              <div className="space-y-4">
                {savedTrips.map(trip => (
                  <div key={trip.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                        {trip.totalDays} Days • {trip.destination}
                      </span>
                      <h5 className="text-base font-bold text-white mt-0.5">{trip.tripTitle}</h5>
                      <span className="text-xs text-slate-400">Est. Budget: {trip.estimatedTotalBudget}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteItinerary(trip.id)}
                        className="p-2.5 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                        title="Delete saved trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Favorited Destinations Section */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 fill-rose-400" /> Bookmarked Destinations ({favDestObjects.length})
            </h4>

            {favDestObjects.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 text-center text-xs text-slate-400">
                No destinations bookmarked yet. Click the heart icon on any destination card!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favDestObjects.map(dest => (
                  <div key={dest.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3 group">
                    <img src={dest.coverImage} alt={dest.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h5 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{dest.name}</h5>
                      <span className="text-xs text-rose-400 font-medium">{dest.country}</span>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        openDestinationDetail(dest);
                      }}
                      className="p-2 rounded-xl bg-slate-800 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
