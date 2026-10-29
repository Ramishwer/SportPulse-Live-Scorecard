/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BaseMatch } from '../types/sports';

interface LiveTickerBarProps {
  matches: BaseMatch[];
  selectedMatchId: string;
  onSelectMatch: (matchId: string) => void;
}

export const LiveTickerBar: React.FC<LiveTickerBarProps> = ({
  matches,
  selectedMatchId,
  onSelectMatch,
}) => {
  return (
    <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-2 overflow-x-auto scrollbar-thin">
      <div className="flex items-center gap-3 min-w-max">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 uppercase tracking-wider pl-1 pr-3 border-r border-slate-800 shrink-0">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span>LIVE</span>
        </div>

        {matches.map((m) => {
          const isSelected = m.id === selectedMatchId;
          let scoreDisplay = '';

          if (m.sport === 'cricket' && m.cricketData) {
            const currentInnings = m.cricketData.innings[m.cricketData.currentInningsIndex];
            scoreDisplay = `${currentInnings.shortName} ${currentInnings.runs}/${currentInnings.wickets} (${currentInnings.oversStr})`;
          } else if (m.sport === 'football' && m.footballData) {
            scoreDisplay = `${m.team1.shortName} ${m.footballData.homeScore} - ${m.footballData.awayScore} ${m.team2.shortName} · ${m.footballData.minute}'`;
          } else if (m.sport === 'basketball' && m.basketballData) {
            scoreDisplay = `${m.team1.shortName} ${m.basketballData.homeScore} - ${m.basketballData.awayScore} ${m.team2.shortName} (Q${m.basketballData.quarter})`;
          } else if (m.sport === 'tennis' && m.tennisData) {
            const setScores = m.tennisData.sets.map(([s1, s2]) => `${s1}-${s2}`).join(' ');
            scoreDisplay = `${m.team1.shortName} vs ${m.team2.shortName} [${setScores}]`;
          } else {
            scoreDisplay = `${m.team1.shortName} vs ${m.team2.shortName} · Upcoming`;
          }

          return (
            <button
              key={m.id}
              onClick={() => onSelectMatch(m.id)}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                isSelected
                  ? 'bg-slate-800 text-white ring-1 ring-emerald-500/50 shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span className="text-sm">{m.team1.flag}</span>
              <span className="text-white font-semibold">{m.team1.shortName}</span>
              <span className="text-slate-500">vs</span>
              <span className="text-white font-semibold">{m.team2.shortName}</span>
              <span className="text-sm">{m.team2.flag}</span>
              <span className="text-slate-600">|</span>
              <span className={`tabular-nums font-mono ${isSelected ? 'text-emerald-400 font-semibold' : 'text-slate-300'}`}>
                {scoreDisplay}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
