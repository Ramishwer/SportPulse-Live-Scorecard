/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TennisMatchData, BaseMatch } from '../types/sports';

interface TennisCenterProps {
  match: BaseMatch;
  tennisData: TennisMatchData;
}

export const TennisCenter: React.FC<TennisCenterProps> = ({
  match,
  tennisData,
}) => {
  return (
    <div className="space-y-6">
      {/* Set by Set Scorecard */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Match Scoreboard
          </h3>
          <span className="text-xs text-emerald-400 font-mono">
            Set {tennisData.currentSetIndex + 1} · Game Point
          </span>
        </div>

        <table className="w-full text-center text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2.5 px-4 text-left font-sans">Player</th>
              {tennisData.sets.map((_, i) => (
                <th key={i} className="py-2.5 px-3">Set {i + 1}</th>
              ))}
              <th className="py-2.5 px-4 text-right font-bold text-white">POINT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            <tr>
              <td className="py-3 px-4 text-left font-sans font-semibold text-white flex items-center gap-2">
                <span>{match.team1.flag}</span>
                <span>{match.team1.name}</span>
                {tennisData.server === 1 && (
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1 rounded font-mono">
                    SERVE
                  </span>
                )}
              </td>
              {tennisData.sets.map(([s1], i) => (
                <td key={i} className={`py-3 px-3 tabular-nums ${i === tennisData.currentSetIndex ? 'text-white font-bold' : 'text-slate-400'}`}>
                  {s1}
                </td>
              ))}
              <td className="py-3 px-4 text-right font-bold text-emerald-400 text-sm tabular-nums">
                {tennisData.currentGame.player1Score}
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-left font-sans font-semibold text-white flex items-center gap-2">
                <span>{match.team2.flag}</span>
                <span>{match.team2.name}</span>
                {tennisData.server === 2 && (
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1 rounded font-mono">
                    SERVE
                  </span>
                )}
              </td>
              {tennisData.sets.map(([, s2], i) => (
                <td key={i} className={`py-3 px-3 tabular-nums ${i === tennisData.currentSetIndex ? 'text-white font-bold' : 'text-slate-400'}`}>
                  {s2}
                </td>
              ))}
              <td className="py-3 px-4 text-right font-bold text-emerald-400 text-sm tabular-nums">
                {tennisData.currentGame.player2Score}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Match Stats Comparison */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="font-bold text-white text-sm">{match.team1.name}</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Match Statistics</span>
          <span className="font-bold text-white text-sm">{match.team2.name}</span>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Aces', home: tennisData.stats.aces[0], away: tennisData.stats.aces[1] },
            { label: 'Double Faults', home: tennisData.stats.doubleFaults[0], away: tennisData.stats.doubleFaults[1] },
            { label: 'First Serve %', home: `${tennisData.stats.firstServePct[0]}%`, away: `${tennisData.stats.firstServePct[1]}%` },
            { label: 'Break Points Converted', home: tennisData.stats.breakPointsWon[0], away: tennisData.stats.breakPointsWon[1] },
            { label: 'Total Winners', home: tennisData.stats.winners[0], away: tennisData.stats.winners[1] },
            { label: 'Unforced Errors', home: tennisData.stats.unforcedErrors[0], away: tennisData.stats.unforcedErrors[1] },
          ].map((st, i) => (
            <div key={i} className="flex justify-between items-center text-xs">
              <span className="font-mono font-bold text-white tabular-nums">{st.home}</span>
              <span className="text-slate-400 font-medium">{st.label}</span>
              <span className="font-mono font-bold text-white tabular-nums">{st.away}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Point by Point Feed */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Live Point History</h4>
        <div className="space-y-2">
          {tennisData.events.map((evt) => (
            <div key={evt.id} className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono text-emerald-400 font-semibold">{evt.scoreStr}</span>
                <span className="text-slate-200">{evt.text}</span>
              </div>
              <span className="font-mono text-[11px] text-slate-500">Set {evt.set}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
