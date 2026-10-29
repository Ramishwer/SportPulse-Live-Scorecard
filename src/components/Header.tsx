/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, Plus } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeaderProps {
  activeSport: string;
  onSelectSport: (sport: string) => void;
  onOpenNewMatch: () => void;
  activeView: 'matches' | 'standings';
  onSelectView: (view: 'matches' | 'standings') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSport,
  onSelectSport,
  onOpenNewMatch,
  activeView,
  onSelectView,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      {/* Zone 1: Single text wordmark */}
      <div 
        onClick={() => { onSelectSport('all'); onSelectView('matches'); }}
        className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 hover:text-emerald-400 transition-colors"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
        <span>SportPulse Live</span>
      </div>

      {/* Zone 2: 4-5 clean single-line navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => { onSelectSport('all'); onSelectView('matches'); }}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSport === 'all' && activeView === 'matches' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          All Matches
        </button>
        <button
          onClick={() => { onSelectSport('cricket'); onSelectView('matches'); }}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSport === 'cricket' && activeView === 'matches' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Cricket
        </button>
        <button
          onClick={() => { onSelectSport('football'); onSelectView('matches'); }}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSport === 'football' && activeView === 'matches' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Football
        </button>
        <button
          onClick={() => { onSelectSport('basketball'); onSelectView('matches'); }}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSport === 'basketball' && activeView === 'matches' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Basketball
        </button>
        <button
          onClick={() => { onSelectSport('tennis'); onSelectView('matches'); }}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSport === 'tennis' && activeView === 'matches' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Tennis
        </button>
        <button
          onClick={() => onSelectView('standings')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'standings' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Standings
        </button>
      </nav>

      {/* Zone 3: 1 primary action with audio toggle */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Broadcast Sound' : 'Enable Broadcast Sound'}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>
        <button
          onClick={onOpenNewMatch}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Match</span>
        </button>
      </div>
    </header>
  );
};
