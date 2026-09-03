import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Settings, Key, Check, Info, ShieldCheck } from 'lucide-react';

export default function ApiKeySettingsModal({ onClose }) {
  const { apiKeys, setApiKeys } = useApp();
  const [openWeatherKey, setOpenWeatherKey] = useState(apiKeys.openWeather || '');
  const [geminiKey, setGeminiKey] = useState(apiKeys.gemini || '');
  const [unsplashKey, setUnsplashKey] = useState(apiKeys.unsplash || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setApiKeys({
      openWeather: openWeatherKey.trim(),
      gemini: geminiKey.trim(),
      unsplash: unsplashKey.trim()
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">API Configurations</h3>
              <p className="text-xs text-slate-400 font-light">Custom API keys stored locally in your browser.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Box */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4" /> Zero-Config Fallbacks Active
          </div>
          <p className="text-[11px] text-slate-400 font-light leading-relaxed">
            All features (Weather, AI Chat, Itineraries, Images) work dynamically out-of-the-box using Open-Meteo & offline smart engines! Adding custom keys unlocks direct live API quotas.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          
          {/* Gemini API Key */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center justify-between">
              <span>Google Gemini API Key</span>
              <span className="text-[10px] text-cyan-400 font-mono">Optional</span>
            </label>
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-2.5 rounded-xl border border-slate-800 focus-within:border-cyan-500">
              <Key className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AI_zaSy..."
                className="w-full bg-transparent text-white text-xs placeholder-slate-600 focus:outline-none"
              />
            </div>
          </div>

          {/* OpenWeather API Key */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center justify-between">
              <span>OpenWeatherMap API Key</span>
              <span className="text-[10px] text-cyan-400 font-mono">Optional</span>
            </label>
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-2.5 rounded-xl border border-slate-800 focus-within:border-cyan-500">
              <Key className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                type="password"
                value={openWeatherKey}
                onChange={(e) => setOpenWeatherKey(e.target.value)}
                placeholder="OpenWeather key..."
                className="w-full bg-transparent text-white text-xs placeholder-slate-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Unsplash API Key */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center justify-between">
              <span>Unsplash Access Key</span>
              <span className="text-[10px] text-cyan-400 font-mono">Optional</span>
            </label>
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-2.5 rounded-xl border border-slate-800 focus-within:border-cyan-500">
              <Key className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                type="password"
                value={unsplashKey}
                onChange={(e) => setUnsplashKey(e.target.value)}
                placeholder="Unsplash client id..."
                className="w-full bg-transparent text-white text-xs placeholder-slate-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              saved
                ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" /> Keys Saved Successfully!
              </>
            ) : (
              "Save API Settings"
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
