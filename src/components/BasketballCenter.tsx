/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BasketballMatchData, BaseMatch } from '../types/sports';

interface BasketballCenterProps {
  match: BaseMatch;
  basketballData: BasketballMatchData;
}

export const BasketballCenter: React.FC<BasketballCenterProps> = ({
  match,
  basketballData,
}) => {
  const [activeTab, setActiveTab] = useState<'boxscore' | 'shotchart' | 'playbyplay'>('boxscore');
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');

  return (
    <div className="space-y-6">
      {/* Quarter by Quarter Score Matrix */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Quarter Breakdown
          </h3>
          <span className="text-xs text-amber-400 font-mono">Q{basketballData.quarter} · {basketballData.timeLeft}</span>
        </div>

        <table className="w-full text-center text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2.5 px-4 text-left font-sans">Team</th>
              <th className="py-2.5 px-3">Q1</th>
              <th className="py-2.5 px-3">Q2</th>
              <th className="py-2.5 px-3">Q3</th>
              <th className="py-2.5 px-3">Q4</th>
              <th className="py-2.5 px-4 text-right font-bold text-white">TOTAL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            <tr>
              <td className="py-2.5 px-4 text-left font-sans font-semibold text-white flex items-center gap-2">
                <span>{match.team1.flag}</span>
                <span>{match.team1.name}</span>
              </td>
              <td className="py-2.5 px-3 text-slate-300 tabular-nums">{basketballData.quarterScores.home[0]}</td>
              <td className="py-2.5 px-3 text-slate-300 tabular-nums">{basketballData.quarterScores.home[1]}</td>
              <td className="py-2.5 px-3 text-slate-300 tabular-nums">{basketballData.quarterScores.home[2]}</td>
              <td className="py-2.5 px-3 text-slate-300 tabular-nums">{basketballData.quarterScores.home[3]}</td>
              <td className="py-2.5 px-4 text-right font-bold text-emerald-400 text-sm tabular-nums">
                {basketballData.homeScore}
              </td>
            </tr>
            <tr>
              <td className="py-2.5 px-4 text-left font-sans font-semibold text-white flex items-center gap-2">
                <span>{match.team2.flag}</span>
                <span>{match.team2.name}</span>
              </td>
              <td className="py-2.5 px-3 text-slate-300 tabular-nums">{basketballData.quarterScores.away[0]}</td>
              <td className="py-2.5 px-3 text-slate-300 tabular-nums">{basketballData.quarterScores.away[1]}</td>
              <td className="py-2.5 px-3 text-slate-300 tabular-nums">{basketballData.quarterScores.away[2]}</td>
              <td className="py-2.5 px-3 text-slate-300 tabular-nums">{basketballData.quarterScores.away[3]}</td>
              <td className="py-2.5 px-4 text-right font-bold text-emerald-400 text-sm tabular-nums">
                {basketballData.awayScore}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-lg border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab('boxscore')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'boxscore' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Box Score
        </button>
        <button
          onClick={() => setActiveTab('shotchart')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'shotchart' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Court Shot Chart
        </button>
        <button
          onClick={() => setActiveTab('playbyplay')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'playbyplay' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Play-by-Play
        </button>
      </div>

      {/* Tab 1: Box Score */}
      {activeTab === 'boxscore' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedTeam('home')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                selectedTeam === 'home' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {match.team1.name}
            </button>
            <button
              onClick={() => setSelectedTeam('away')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                selectedTeam === 'away' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {match.team2.name}
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="py-2.5 px-4 font-semibold text-slate-300">Player</th>
                  <th className="py-2.5 px-2">MIN</th>
                  <th className="py-2.5 px-2 text-right font-bold text-white">PTS</th>
                  <th className="py-2.5 px-2 text-right">REB</th>
                  <th className="py-2.5 px-2 text-right">AST</th>
                  <th className="py-2.5 px-2 text-right">STL</th>
                  <th className="py-2.5 px-2 text-right">BLK</th>
                  <th className="py-2.5 px-2 text-right">FG</th>
                  <th className="py-2.5 px-2 text-right">3PT</th>
                  <th className="py-2.5 px-3 text-right">+/-</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {(selectedTeam === 'home' ? basketballData.homePlayers : basketballData.awayPlayers).map((pl) => (
                  <tr key={pl.name} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-sans font-medium text-white">{pl.name}</td>
                    <td className="py-2.5 px-2 text-slate-400 tabular-nums">{pl.min}</td>
                    <td className="py-2.5 px-2 text-right font-bold text-emerald-400 tabular-nums">{pl.pts}</td>
                    <td className="py-2.5 px-2 text-right text-slate-300 tabular-nums">{pl.reb}</td>
                    <td className="py-2.5 px-2 text-right text-slate-300 tabular-nums">{pl.ast}</td>
                    <td className="py-2.5 px-2 text-right text-slate-300 tabular-nums">{pl.stl}</td>
                    <td className="py-2.5 px-2 text-right text-slate-300 tabular-nums">{pl.blk}</td>
                    <td className="py-2.5 px-2 text-right text-slate-300 tabular-nums">{pl.fg}</td>
                    <td className="py-2.5 px-2 text-right text-slate-300 tabular-nums">{pl.threePt}</td>
                    <td className={`py-2.5 px-3 text-right tabular-nums ${pl.plusMinus > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {pl.plusMinus > 0 ? `+${pl.plusMinus}` : pl.plusMinus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Court Shot Chart */}
      {activeTab === 'shotchart' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Basketball Shot Chart</h3>
              <p className="text-xs text-slate-400">Half-court tracking with 3-point arc & paint attempts.</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Made Shot
              </span>
              <span className="flex items-center gap-1.5 text-rose-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Missed
              </span>
            </div>
          </div>

          <div className="relative w-full max-w-lg bg-amber-950/20 border-2 border-slate-700 rounded-xl overflow-hidden aspect-[4/3]">
            <svg viewBox="0 0 100 85" className="w-full h-full">
              {/* Baseline */}
              <line x1="0" y1="84" x2="100" y2="84" stroke="#475569" strokeWidth="1" />
              {/* Backboard & Rim */}
              <line x1="45" y1="80" x2="55" y2="80" stroke="#f8fafc" strokeWidth="1.2" />
              <circle cx="50" cy="76" r="3" fill="none" stroke="#f97316" strokeWidth="1" />
              {/* Key / Paint */}
              <rect x="36" y="52" width="28" height="32" fill="none" stroke="#475569" strokeWidth="0.8" />
              {/* Free throw circle */}
              <circle cx="50" cy="52" r="12" fill="none" stroke="#475569" strokeWidth="0.8" strokeDasharray="2 2" />
              {/* 3-Point Arc */}
              <path d="M 12 84 L 12 68 C 12 28, 88 28, 88 68 L 88 84" fill="none" stroke="#475569" strokeWidth="1" />

              {/* Plotted Shots */}
              {basketballData.events.filter(e => e.coord).map((e) => (
                <g key={e.id}>
                  <circle
                    cx={e.coord!.x}
                    cy={e.coord!.y}
                    r={2.5}
                    fill={e.type.includes('made') ? '#10b981' : '#f43f5e'}
                    stroke="#ffffff"
                    strokeWidth="0.5"
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>
      )}

      {/* Tab 3: Play-by-Play */}
      {activeTab === 'playbyplay' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Recent Plays</h4>
          <div className="space-y-2">
            {basketballData.events.map((evt) => (
              <div key={evt.id} className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-amber-400 font-semibold">{evt.timeLeft}</span>
                  <span className="font-semibold text-white">{evt.player}</span>
                  <span className="text-slate-400">{evt.detail}</span>
                </div>
                <span className="font-mono text-white font-bold">{evt.scoreStr}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
