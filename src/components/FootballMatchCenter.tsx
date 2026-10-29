/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FootballMatchData, BaseMatch } from '../types/sports';

interface FootballMatchCenterProps {
  match: BaseMatch;
  footballData: FootballMatchData;
}

export const FootballMatchCenter: React.FC<FootballMatchCenterProps> = ({
  match,
  footballData,
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'stats' | 'pitch' | 'lineups'>('timeline');

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-lg border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'timeline'
              ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Timeline
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'stats'
              ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Match Stats
        </button>
        <button
          onClick={() => setActiveTab('pitch')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'pitch'
              ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Pitch Shot Map
        </button>
        <button
          onClick={() => setActiveTab('lineups')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'lineups'
              ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Lineups
        </button>
      </div>

      {/* Tab 1: Timeline */}
      {activeTab === 'timeline' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Match Timeline
            </h3>
            <span className="text-xs font-mono text-emerald-400">Current: {footballData.minute}'</span>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-4 space-y-6">
            {footballData.events.map((evt) => {
              const isHome = evt.team === 'home';
              return (
                <div key={evt.id} className="relative pl-6">
                  {/* Event Marker on timeline */}
                  <div
                    className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      evt.type === 'goal'
                        ? 'bg-emerald-500 text-slate-950 font-bold ring-4 ring-emerald-500/20'
                        : evt.type === 'yellow_card'
                        ? 'bg-amber-500 text-slate-950'
                        : evt.type === 'red_card'
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    {evt.type === 'goal' ? '⚽' : evt.type === 'yellow_card' ? '🟨' : '•'}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-400">{evt.minute}'</span>
                      <span className="font-semibold text-white text-xs">{evt.player}</span>
                      <span className="text-[11px] text-slate-500">({isHome ? match.team1.shortName : match.team2.shortName})</span>
                    </div>
                    {evt.scoreAfter && (
                      <span className="font-mono text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                        {evt.scoreAfter}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {evt.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Match Stats Comparison */}
      {activeTab === 'stats' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-white text-sm">{match.team1.name}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Team Statistics</span>
            <span className="font-bold text-white text-sm">{match.team2.name}</span>
          </div>

          <div className="space-y-5">
            {[
              { label: 'Ball Possession (%)', home: footballData.stats.possession[0], away: footballData.stats.possession[1], isPct: true },
              { label: 'Expected Goals (xG)', home: footballData.stats.xG[0], away: footballData.stats.xG[1], isFloat: true },
              { label: 'Total Shots', home: footballData.stats.shots[0], away: footballData.stats.shots[1] },
              { label: 'Shots on Target', home: footballData.stats.shotsOnTarget[0], away: footballData.stats.shotsOnTarget[1] },
              { label: 'Corner Kicks', home: footballData.stats.corners[0], away: footballData.stats.corners[1] },
              { label: 'Pass Accuracy (%)', home: footballData.stats.passAccuracy[0], away: footballData.stats.passAccuracy[1], isPct: true },
              { label: 'Fouls Committed', home: footballData.stats.fouls[0], away: footballData.stats.fouls[1] },
              { label: 'Yellow Cards', home: footballData.stats.yellowCards[0], away: footballData.stats.yellowCards[1] },
            ].map((st, i) => {
              const total = (Number(st.home) + Number(st.away)) || 1;
              const homePct = (Number(st.home) / total) * 100;
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-bold text-white tabular-nums">{st.home}</span>
                    <span className="text-slate-400 font-medium">{st.label}</span>
                    <span className="font-mono font-bold text-white tabular-nums">{st.away}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full flex overflow-hidden">
                    <div style={{ width: `${homePct}%` }} className="bg-sky-500 h-full transition-all duration-300" />
                    <div style={{ width: `${100 - homePct}%` }} className="bg-cyan-300 h-full transition-all duration-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Pitch Shot Map */}
      {activeTab === 'pitch' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Tactical Pitch Shot Map</h3>
              <p className="text-xs text-slate-400">Goals and shot attempts plotted onto pitch coordinates.</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-sky-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> {match.team1.shortName}
              </span>
              <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-300" /> {match.team2.shortName}
              </span>
            </div>
          </div>

          {/* Styled SVG Soccer Pitch */}
          <div className="relative w-full max-w-2xl bg-emerald-950/60 border-2 border-emerald-500/40 rounded-xl overflow-hidden shadow-inner aspect-[16/10]">
            <svg viewBox="0 0 100 64" className="w-full h-full">
              {/* Pitch turf lines */}
              <rect x="0" y="0" width="100" height="64" fill="none" />
              {/* Halfway line & Center Circle */}
              <line x1="50" y1="0" x2="50" y2="64" stroke="#059669" strokeWidth="0.8" />
              <circle cx="50" cy="32" r="9" fill="none" stroke="#059669" strokeWidth="0.8" />
              <circle cx="50" cy="32" r="0.8" fill="#059669" />

              {/* Penalty boxes */}
              <rect x="0" y="16" width="16" height="32" fill="none" stroke="#059669" strokeWidth="0.8" />
              <rect x="84" y="16" width="16" height="32" fill="none" stroke="#059669" strokeWidth="0.8" />
              {/* 6-yard boxes */}
              <rect x="0" y="24" width="6" height="16" fill="none" stroke="#059669" strokeWidth="0.8" />
              <rect x="94" y="24" width="6" height="16" fill="none" stroke="#059669" strokeWidth="0.8" />

              {/* Goals plotted */}
              {footballData.events.filter(e => e.x && e.y).map((e) => {
                const isHome = e.team === 'home';
                return (
                  <g key={e.id} className="cursor-pointer">
                    <circle
                      cx={e.x}
                      cy={e.y}
                      r={e.type === 'goal' ? 2.5 : 1.8}
                      fill={isHome ? '#38bdf8' : '#67e8f9'}
                      stroke="#ffffff"
                      strokeWidth="0.5"
                    />
                    {e.type === 'goal' && (
                      <circle
                        cx={e.x}
                        cy={e.y}
                        r={4}
                        fill="none"
                        stroke={isHome ? '#38bdf8' : '#67e8f9'}
                        strokeWidth="0.4"
                        strokeDasharray="1 1"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* Tab 4: Lineups */}
      {activeTab === 'lineups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {match.team1.name} (4-3-3)
            </h4>
            <div className="space-y-1.5 divide-y divide-slate-800/60">
              {footballData.lineupHome.map((p) => (
                <div key={p.number} className="pt-1.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400 w-5">{p.number}</span>
                    <span className="text-white font-medium">{p.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {p.pos}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {match.team2.name} (4-2-3-1)
            </h4>
            <div className="space-y-1.5 divide-y divide-slate-800/60">
              {footballData.lineupAway.map((p) => (
                <div key={p.number} className="pt-1.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400 w-5">{p.number}</span>
                    <span className="text-white font-medium">{p.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {p.pos}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
