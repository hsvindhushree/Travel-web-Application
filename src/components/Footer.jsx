import React from 'react';
import { Compass, Heart, Globe, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold font-heading text-white">
              Wander<span className="text-gradient">lust</span>
            </span>
            <p className="text-xs text-slate-400 font-light">Front-End Developer Assignment — designesthetics</p>
          </div>
        </div>

        {/* Links & Attribution */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <a href="#explorer" className="hover:text-cyan-400 transition-colors">Explorer</a>
          <a href="#places" className="hover:text-emerald-400 transition-colors">Famous Places</a>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> React & Vite
          </span>
        </div>

      </div>
    </footer>
  );
}
