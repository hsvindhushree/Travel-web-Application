import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateItinerary } from '../services/aiService';
import confetti from 'canvas-confetti';
import { X, Sparkles, Calendar, Compass, Sun, Moon, Coffee, MapPin, DollarSign, Clock, Bookmark, Printer, Check, Loader2, Lightbulb } from 'lucide-react';

export default function ItineraryPlanner({ onClose }) {
  const { destinations, selectedDestination, saveItinerary, apiKeys } = useApp();

  const [dest, setDest] = useState(selectedDestination || destinations[0]);
  const [daysCount, setDaysCount] = useState(3);
  const [travelStyle, setTravelStyle] = useState("Balanced");
  
  const [itinerary, setItinerary] = useState(() => {
    try {
      const saved = localStorage.getItem('wanderlust_last_generated_itinerary');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  React.useEffect(() => {
    if (itinerary) {
      try {
        localStorage.setItem('wanderlust_last_generated_itinerary', JSON.stringify(itinerary));
      } catch (e) {}
    }
  }, [itinerary]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSaved(false);
    try {
      const plan = await generateItinerary(dest, daysCount, travelStyle, apiKeys.gemini);
      setItinerary(plan);
      // Trigger festive confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (itinerary) {
      saveItinerary(itinerary);
      setIsSaved(true);
    }
  };

  const styles = ["Balanced", "Culture & History", "Adventure & Nature", "Luxury & Fine Dining", "Budget Traveler"];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      
      {/* Container */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-8 max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="px-6 py-4 glass-panel border-b border-slate-800 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-heading">AI Day-by-Day Itinerary Planner</h2>
              <p className="text-xs text-slate-400 font-light">Generate structured visual trip timelines, not raw chat text.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          {/* Builder Generator Form */}
          <form onSubmit={handleGenerate} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Target Destination */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  Select Destination
                </label>
                <select
                  value={dest.id}
                  onChange={(e) => {
                    const d = destinations.find(x => x.id === e.target.value);
                    if (d) setDest(d);
                  }}
                  className="w-full bg-slate-950 text-white text-xs font-medium p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
                >
                  {destinations.map(d => (
                    <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
                  ))}
                </select>
              </div>

              {/* Trip Duration */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  Trip Duration: <span className="text-amber-400 font-bold">{daysCount} Days</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={daysCount}
                  onChange={(e) => setDaysCount(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>1 Day</span>
                  <span>3 Days</span>
                  <span>5 Days</span>
                  <span>7 Days</span>
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  Travel Vibe / Style
                </label>
                <select
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs font-medium p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
                >
                  {styles.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Bespoke Day-by-Day Timeline...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Build {daysCount}-Day {travelStyle} Itinerary for {dest.name}
                </>
              )}
            </button>
          </form>

          {/* Rendered Readable Day-by-Day Itinerary Result */}
          {itinerary && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Itinerary Header Summary Banner */}
              <div className="glass-panel rounded-2xl p-6 border border-amber-500/40 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/30 uppercase tracking-wider">
                      ✨ Official Bespoke Plan
                    </span>
                    <h3 className="text-2xl font-bold text-white font-heading mt-2">{itinerary.tripTitle}</h3>
                    <p className="text-xs text-slate-300 font-light mt-1 flex items-center gap-4">
                      <span>Est. Budget: <strong className="text-emerald-400 font-mono">{itinerary.estimatedTotalBudget}</strong></span>
                      <span>Best Season: <strong className="text-cyan-300">{itinerary.bestSeason}</strong></span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSave}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                        isSaved 
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
                      }`}
                    >
                      {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4 text-amber-400" />}
                      {isSaved ? "Saved to Trips!" : "Save Itinerary"}
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                      title="Print / Save PDF"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {itinerary.travelTip && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Concierge Tip:</strong> {itinerary.travelTip}</span>
                  </div>
                )}
              </div>

              {/* Day-by-Day Timeline Render */}
              <div className="space-y-6">
                {itinerary.days.map((day) => (
                  <div key={day.dayNumber} className="glass-card rounded-2xl p-6 border border-slate-800 relative space-y-6">
                    
                    {/* Day Number Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-bold font-mono text-slate-950 text-base shadow-md">
                          D{day.dayNumber}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white font-heading">Day {day.dayNumber}: {day.theme}</h4>
                          <span className="text-xs text-slate-400 font-light">Structured 3-part daily schedule</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Activity Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Morning */}
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 relative">
                        <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                          <span className="flex items-center gap-1">
                            <Coffee className="w-3.5 h-3.5" /> Morning
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{day.morning.duration}</span>
                        </div>
                        <h5 className="text-sm font-bold text-white">{day.morning.title}</h5>
                        <p className="text-xs text-slate-300 leading-relaxed font-light">{day.morning.description}</p>
                        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-900">
                          <span className="flex items-center gap-1 text-cyan-400">
                            <MapPin className="w-3 h-3" /> {day.morning.location}
                          </span>
                          <span className="font-mono text-emerald-400">{day.morning.estCost}</span>
                        </div>
                      </div>

                      {/* Afternoon */}
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 relative">
                        <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold mb-1">
                          <span className="flex items-center gap-1">
                            <Sun className="w-3.5 h-3.5" /> Afternoon
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{day.afternoon.duration}</span>
                        </div>
                        <h5 className="text-sm font-bold text-white">{day.afternoon.title}</h5>
                        <p className="text-xs text-slate-300 leading-relaxed font-light">{day.afternoon.description}</p>
                        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-900">
                          <span className="flex items-center gap-1 text-cyan-400">
                            <MapPin className="w-3 h-3" /> {day.afternoon.location}
                          </span>
                          <span className="font-mono text-emerald-400">{day.afternoon.estCost}</span>
                        </div>
                      </div>

                      {/* Evening */}
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 relative">
                        <div className="flex items-center justify-between text-xs text-purple-400 font-semibold mb-1">
                          <span className="flex items-center gap-1">
                            <Moon className="w-3.5 h-3.5" /> Evening
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{day.evening.duration}</span>
                        </div>
                        <h5 className="text-sm font-bold text-white">{day.evening.title}</h5>
                        <p className="text-xs text-slate-300 leading-relaxed font-light">{day.evening.description}</p>
                        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-900">
                          <span className="flex items-center gap-1 text-cyan-400">
                            <MapPin className="w-3 h-3" /> {day.evening.location}
                          </span>
                          <span className="font-mono text-emerald-400">{day.evening.estCost}</span>
                        </div>
                      </div>

                    </div>

                    {/* Day Insider Tip */}
                    {day.insiderTip && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                        <span><strong>Day {day.dayNumber} Secret Tip:</strong> {day.insiderTip}</span>
                      </div>
                    )}

                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
