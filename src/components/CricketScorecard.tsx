/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CricketMatchData } from '../types/sports';

interface CricketScorecardProps {
  cricketData: CricketMatchData;
}

export const CricketScorecard: React.FC<CricketScorecardProps> = ({ cricketData }) => {
  const [selectedInningsIdx, setSelectedInningsIdx] = useState<number>(cricketData.currentInningsIndex);

  const innings = cricketData.innings[selectedInningsIdx];
  if (!innings) return null;

  return (
    <div className="space-y-6">
      {/* Innings Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-lg border border-slate-800 w-fit">
        {cricketData.innings.map((inn, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedInningsIdx(idx)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              selectedInningsIdx === idx
                ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {inn.teamName} — {inn.runs}/{inn.wickets} ({inn.oversStr} ov)
          </button>
        ))}
      </div>

      {/* Batting Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-900 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {innings.teamName} Batting
          </h3>
          <span className="text-xs font-mono text-slate-400 tabular-nums">
            {innings.runs}/{innings.wickets} in {innings.oversStr} Overs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="py-2.5 px-4 font-semibold text-slate-300">Batter</th>
                <th className="py-2.5 px-4">Dismissal</th>
                <th className="py-2.5 px-3 text-right font-semibold text-white">R</th>
                <th className="py-2.5 px-3 text-right">B</th>
                <th className="py-2.5 px-3 text-right">4s</th>
                <th className="py-2.5 px-3 text-right">6s</th>
                <th className="py-2.5 px-4 text-right font-semibold">SR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {innings.batters.map((b) => (
                <tr
                  key={b.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    b.isStriker ? 'bg-emerald-950/20' : ''
                  }`}
                >
                  <td className="py-2.5 px-4 font-medium text-white whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      {b.name}
                      {b.isStriker && <span className="text-emerald-400 font-bold text-sm">*</span>}
                      {b.isNonStriker && <span className="text-slate-400 text-xs">(non-striker)</span>}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-400 truncate max-w-[220px]">
                    {b.isOut ? (
                      b.dismissal
                    ) : (
                      <span className="text-emerald-400 font-medium">not out</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-white tabular-nums">
                    {b.runs}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-300 tabular-nums">
                    {b.balls}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-300 tabular-nums">
                    {b.fours}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-300 tabular-nums">
                    {b.sixes}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-200 tabular-nums font-semibold">
                    {b.strikeRate.toFixed(2)}
                  </td>
                </tr>
              ))}

              {/* Extras Row */}
              <tr className="bg-slate-950/40 text-slate-300 font-mono">
                <td className="py-2.5 px-4 font-sans font-semibold text-white">Extras</td>
                <td className="py-2.5 px-4 text-slate-400 font-sans text-[11px]" colSpan={2}>
                  (b {innings.extras.byes}, lb {innings.extras.legByes}, w {innings.extras.wides}, nb {innings.extras.noBalls})
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-white tabular-nums" colSpan={4}>
                  {innings.extras.total}
                </td>
              </tr>

              {/* Total Row */}
              <tr className="bg-slate-900 text-white font-bold font-mono">
                <td className="py-3 px-4 font-sans text-sm">TOTAL</td>
                <td className="py-3 px-4 text-slate-400 font-sans font-normal text-xs" colSpan={2}>
                  ({innings.oversStr} Overs, RR: {(innings.runs / Math.max(1, parseFloat(innings.oversStr))).toFixed(2)})
                </td>
                <td className="py-3 px-3 text-right text-base text-emerald-400 tabular-nums" colSpan={4}>
                  {innings.runs}/{innings.wickets}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bowling Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-900 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Bowling
          </h3>
          <span className="text-xs text-slate-400">Figures</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="py-2.5 px-4 font-semibold text-slate-300">Bowler</th>
                <th className="py-2.5 px-3 text-right">O</th>
                <th className="py-2.5 px-3 text-right">M</th>
                <th className="py-2.5 px-3 text-right font-semibold">R</th>
                <th className="py-2.5 px-3 text-right font-semibold text-rose-400">W</th>
                <th className="py-2.5 px-4 text-right">ECON</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {innings.bowlers.map((bw) => (
                <tr
                  key={bw.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    bw.isCurrent ? 'bg-amber-950/20' : ''
                  }`}
                >
                  <td className="py-2.5 px-4 font-sans font-medium text-white whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      {bw.name}
                      {bw.isCurrent && (
                        <span className="text-amber-400 font-semibold font-mono text-[10px] px-1 py-0.5 rounded bg-amber-400/10">
                          BOWLING
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-300 tabular-nums">
                    {bw.overs}.{bw.ballsThisOver}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-300 tabular-nums">
                    {bw.maidens}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-200 tabular-nums font-semibold">
                    {bw.runsConceded}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-rose-400 tabular-nums">
                    {bw.wickets}
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-300 tabular-nums">
                    {bw.economy.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fall of Wickets (FOW) & Partnerships */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fall of Wickets */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Fall of Wickets
          </h4>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {innings.fallOfWickets.map((fow) => (
              <div
                key={fow.wicket}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300 flex items-center gap-1.5"
              >
                <span className="font-bold text-rose-400">{fow.wicket}-{fow.runs}</span>
                <span className="text-slate-500">({fow.player}, ov {fow.over})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partnerships */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Key Partnerships
          </h4>
          <div className="space-y-2">
            {innings.partnerships.map((p, i) => {
              const maxRuns = Math.max(...innings.partnerships.map(pr => pr.runs), 1);
              const pct = (p.runs / maxRuns) * 100;
              return (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{p.player1} & {p.player2}</span>
                    <span className="text-white font-mono font-bold tabular-nums">
                      {p.runs} runs ({p.balls}b)
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
