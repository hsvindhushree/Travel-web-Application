import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DestinationExplorer from './components/DestinationExplorer';
import FamousPlaces from './components/FamousPlaces';
import DestinationDetail from './components/DestinationDetail';
import LocationModal from './components/LocationModal';
import AIChatbot from './components/AIChatbot';
import ItineraryPlanner from './components/ItineraryPlanner';
import SavedTrips from './components/SavedTrips';
import ApiKeySettingsModal from './components/ApiKeySettingsModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { X, Star, Clock, CheckCircle2, MapPin, Sparkles } from 'lucide-react';

function AppContent() {
  const {
    selectedDestination,
    activeModal,
    setActiveModal,
    selectedFamousPlace,
    setSelectedFamousPlace
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
      
      <div>
        <Navbar />

        {/* Hero Section */}
        <Hero onSearchSubmit={(q) => setSearchQuery(q)} />

        {/* Destination Explorer Section */}
        <DestinationExplorer searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Famous Places & Sights Section */}
        <FamousPlaces />
      </div>

      {/* Footer */}
      <Footer />

      {/* Overlays and Modals */}
      {activeModal === 'auth' && (
        <AuthModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'detail' && selectedDestination && (
        <DestinationDetail dest={selectedDestination} onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'location' && (
        <LocationModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'aiChat' && (
        <AIChatbot onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'itinerary' && (
        <ItineraryPlanner onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'savedTrips' && (
        <SavedTrips onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'settings' && (
        <ApiKeySettingsModal onClose={() => setActiveModal(null)} />
      )}

      {/* Famous Place Detail Modal */}
      {selectedFamousPlace && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 font-semibold text-xs border border-emerald-500/30">
                {selectedFamousPlace.category}
              </span>
              <button
                onClick={() => setSelectedFamousPlace(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-800">
              <img src={selectedFamousPlace.image} alt={selectedFamousPlace.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-amber-500/20 backdrop-blur-md px-3 py-1 rounded-lg text-amber-300 font-bold text-xs flex items-center gap-1 border border-amber-500/30">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {selectedFamousPlace.rating}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white font-heading mb-2">{selectedFamousPlace.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">{selectedFamousPlace.description}</p>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs mb-4">
                <div>
                  <span className="text-slate-400 font-medium block">Recommended Time</span>
                  <span className="font-semibold text-cyan-300 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5" /> {selectedFamousPlace.visitTime}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Entry / Ticket Fee</span>
                  <span className="font-semibold text-emerald-400 font-mono mt-0.5 block">
                    {selectedFamousPlace.cost}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">Key Highlights</span>
                {(selectedFamousPlace.highlights || []).map((hl, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
