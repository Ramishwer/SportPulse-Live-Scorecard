/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

export const StandingsTable: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<'cricket' | 'football' | 'basketball'>('cricket');

  const cricketStandings = [
    { rank: 1, team: 'India', flag: '🇮🇳', p: 3, w: 3, l: 0, pts: 6, nrr: '+2.417', form: ['W', 'W', 'W'] },
    { rank: 2, team: 'Australia', flag: '🇦🇺', p: 3, w: 2, l: 1, pts: 4, nrr: '+0.892', form: ['W', 'W', 'L'] },
    { rank: 3, team: 'Afghanistan', flag: '🇦🇫', p: 3, w: 1, l: 2, pts: 2, nrr: '-0.383', form: ['L', 'W', 'L'] },
    { rank: 4, team: 'Bangladesh', flag: '🇧🇩', p: 3, w: 0, l: 3, pts: 0, nrr: '-2.489', form: ['L', 'L', 'L'] },
  ];

  const footballStandings = [
    { rank: 1, team: 'Real Madrid', flag: '🇪🇸', p: 8, w: 6, d: 1, l: 1, gd: '+14', pts: 19, form: ['W', 'D', 'W', 'W', 'W'] },
    { rank: 2, team: 'Manchester City', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', p: 8, w: 5, d: 2, l: 1, gd: '+12', pts: 17, form: ['W', 'W', 'D', 'W', 'W'] },
    { rank: 3, team: 'Bayern Munich', flag: '🇩🇪', p: 8, w: 5, d: 1, l: 2, gd: '+9', pts: 16, form: ['L', 'W', 'W', 'W', 'D'] },
    { rank: 4, team: 'Arsenal', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', p: 8, w: 4, d: 2, l: 2, gd: '+8', pts: 14, form: ['W', 'L', 'W', 'D', 'W'] },
  ];

  const basketballStandings = [
    { rank: 1, team: 'Boston Celtics', flag: '☘️', w: 64, l: 18, pct: '.780', gb: '-', streak: 'W5' },
    { rank: 2, team: 'Golden State Warriors', flag: '🌉', w: 56, l: 26, pct: '.683', gb: '8.0', streak: 'W3' },
    { rank: 3, team: 'Denver Nuggets', flag: '🏔️', w: 54, l: 28, pct: '.659', gb: '10.0', streak: 'L1' },
    { rank: 4, team: 'Minnesota Timberwolves', flag: '🐺', w: 52, l: 30, pct: '.634', gb: '12.0', streak: 'W2' },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Championship Standings & Tables
          </h2>
          <p className="text-xs text-slate-400">
            Official league tables, qualification zones, and current form guide.
          </p>
        </div>

        {/* Sport Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedSport('cricket')}
            className={`px-3 py-1 rounded transition-colors ${
              selectedSport === 'cricket' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            T20 World Cup
          </button>
          <button
            onClick={() => setSelectedSport('football')}
            className={`px-3 py-1 rounded transition-colors ${
              selectedSport === 'football' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Champions League
          </button>
          <button
            onClick={() => setSelectedSport('basketball')}
            className={`px-3 py-1 rounded transition-colors ${
              selectedSport === 'basketball' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            NBA Standings
          </button>
        </div>
      </div>

      {/* Cricket Standings */}
      {selectedSport === 'cricket' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-sans">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-4">Team</th>
                <th className="py-2.5 px-3 text-right">P</th>
                <th className="py-2.5 px-3 text-right">W</th>
                <th className="py-2.5 px-3 text-right">L</th>
                <th className="py-2.5 px-3 text-right font-bold text-white">PTS</th>
                <th className="py-2.5 px-4 text-right">NRR</th>
                <th className="py-2.5 px-4 text-center font-sans">Recent Form</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {cricketStandings.map((team) => (
                <tr key={team.team} className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-slate-400 font-semibold">{team.rank}</td>
                  <td className="py-3 px-4 font-sans font-semibold text-white flex items-center gap-2">
                    <span className="text-base">{team.flag}</span>
                    <span>{team.team}</span>
                  </td>
                  <td className="py-3 px-3 text-right text-slate-300 tabular-nums">{team.p}</td>
                  <td className="py-3 px-3 text-right text-slate-300 tabular-nums">{team.w}</td>
                  <td className="py-3 px-3 text-right text-slate-300 tabular-nums">{team.l}</td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-400 tabular-nums">{team.pts}</td>
                  <td className={`py-3 px-4 text-right tabular-nums ${team.nrr.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {team.nrr}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {team.form.map((res, i) => (
                        <span
                          key={i}
                          className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                            res === 'W' ? 'bg-emerald-600/80 text-white' : 'bg-rose-600/80 text-white'
                          }`}
                        >
                          {res}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Football Standings */}
      {selectedSport === 'football' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-sans">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-4">Club</th>
                <th className="py-2.5 px-3 text-right">P</th>
                <th className="py-2.5 px-3 text-right">W</th>
                <th className="py-2.5 px-3 text-right">D</th>
                <th className="py-2.5 px-3 text-right">L</th>
                <th className="py-2.5 px-3 text-right">GD</th>
                <th className="py-2.5 px-3 text-right font-bold text-white">PTS</th>
                <th className="py-2.5 px-4 text-center font-sans">Form</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {footballStandings.map((team) => (
                <tr key={team.team} className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-slate-400 font-semibold">{team.rank}</td>
                  <td className="py-3 px-4 font-sans font-semibold text-white flex items-center gap-2">
                    <span className="text-base">{team.flag}</span>
                    <span>{team.team}</span>
                  </td>
                  <td className="py-3 px-3 text-right text-slate-300 tabular-nums">{team.p}</td>
                  <td className="py-3 px-3 text-right text-slate-300 tabular-nums">{team.w}</td>
                  <td className="py-3 px-3 text-right text-slate-300 tabular-nums">{team.d}</td>
                  <td className="py-3 px-3 text-right text-slate-300 tabular-nums">{team.l}</td>
                  <td className="py-3 px-3 text-right text-emerald-400 tabular-nums">{team.gd}</td>
                  <td className="py-3 px-3 text-right font-bold text-white tabular-nums">{team.pts}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {team.form.map((res, i) => (
                        <span
                          key={i}
                          className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                            res === 'W'
                              ? 'bg-emerald-600/80 text-white'
                              : res === 'D'
                              ? 'bg-amber-600/80 text-white'
                              : 'bg-rose-600/80 text-white'
                          }`}
                        >
                          {res}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Basketball Standings */}
      {selectedSport === 'basketball' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-sans">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-4">Team</th>
                <th className="py-2.5 px-3 text-right">W</th>
                <th className="py-2.5 px-3 text-right">L</th>
                <th className="py-2.5 px-3 text-right font-bold text-white">PCT</th>
                <th className="py-2.5 px-3 text-right">GB</th>
                <th className="py-2.5 px-4 text-center font-sans">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {basketballStandings.map((team) => (
                <tr key={team.team} className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-slate-400 font-semibold">{team.rank}</td>
                  <td className="py-3 px-4 font-sans font-semibold text-white flex items-center gap-2">
                    <span className="text-base">{team.flag}</span>
                    <span>{team.team}</span>
                  </td>
                  <td className="py-3 px-3 text-right text-slate-300 tabular-nums">{team.w}</td>
                  <td className="py-3 px-3 text-right text-slate-300 tabular-nums">{team.l}</td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-400 tabular-nums">{team.pct}</td>
                  <td className="py-3 px-3 text-right text-slate-400 tabular-nums">{team.gb}</td>
                  <td className="py-3 px-4 text-center font-sans">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-emerald-400">
                      {team.streak}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
