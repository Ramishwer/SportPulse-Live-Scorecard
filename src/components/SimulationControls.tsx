/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, Pause, SkipForward, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { BaseMatch } from '../types/sports';

interface SimulationControlsProps {
  match: BaseMatch;
  isSimulating: boolean;
  simulationSpeed: number; // 1, 2, 5
  onToggleSimulate: () => void;
  onChangeSpeed: (speed: number) => void;
  onStepPlay: () => void;
  onResetMatch: () => void;
  onManualCricketScore?: (action: 'dot' | '1' | '2' | '3' | '4' | '6' | 'wicket' | 'wide' | 'noball') => void;
  onManualFootballScore?: (action: 'goal_home' | 'goal_away' | 'yellow' | 'shot') => void;
  onManualBasketballScore?: (action: '2pt_home' | '3pt_home' | '2pt_away' | '3pt_away' | 'foul') => void;
  onManualTennisScore?: (player: 1 | 2, action: 'winner' | 'ace' | 'error') => void;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  match,
  isSimulating,
  simulationSpeed,
  onToggleSimulate,
  onChangeSpeed,
  onStepPlay,
  onResetMatch,
  onManualCricketScore,
  onManualFootballScore,
  onManualBasketballScore,
  onManualTennisScore,
}) => {
  const [showManualPad, setShowManualPad] = useState(false);

  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/90 shadow-lg space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Play/Pause & Step Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSimulate}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
              isSimulating
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isSimulating ? 'Pause Simulation' : 'Live Auto-Simulate'}</span>
          </button>

          <button
            onClick={onStepPlay}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Step next ball or play"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Next Play</span>
          </button>

          <button
            onClick={onResetMatch}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            title="Reset match back to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Speed Selector & Manual Pad Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono">
            {[1, 2, 5].map((speed) => (
              <button
                key={speed}
                onClick={() => onChangeSpeed(speed)}
                className={`px-2 py-1 rounded transition-colors ${
                  simulationSpeed === speed
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowManualPad(!showManualPad)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
              showManualPad
                ? 'bg-slate-800 text-emerald-400 border-emerald-500/50'
                : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Scorekeeper Pad</span>
          </button>
        </div>
      </div>

      {/* Manual Scoring Controls Pad */}
      {showManualPad && (
        <div className="pt-3 border-t border-slate-800">
          <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Official Scorekeeper Mode — {match.sport.toUpperCase()}
          </div>

          {match.sport === 'cricket' && onManualCricketScore && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onManualCricketScore('dot')}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold"
              >
                0 (Dot)
              </button>
              <button
                onClick={() => onManualCricketScore('1')}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold"
              >
                1 Run
              </button>
              <button
                onClick={() => onManualCricketScore('2')}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold"
              >
                2 Runs
              </button>
              <button
                onClick={() => onManualCricketScore('3')}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold"
              >
                3 Runs
              </button>
              <button
                onClick={() => onManualCricketScore('4')}
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold shadow-sm"
              >
                4 (Four!)
              </button>
              <button
                onClick={() => onManualCricketScore('6')}
                className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold shadow-sm"
              >
                6 (Six!)
              </button>
              <button
                onClick={() => onManualCricketScore('wicket')}
                className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold shadow-sm"
              >
                WICKET!
              </button>
              <button
                onClick={() => onManualCricketScore('wide')}
                className="px-2.5 py-1.5 rounded bg-amber-900/40 hover:bg-amber-900/60 text-amber-300 text-xs font-mono"
              >
                Wide (+1)
              </button>
              <button
                onClick={() => onManualCricketScore('noball')}
                className="px-2.5 py-1.5 rounded bg-amber-900/40 hover:bg-amber-900/60 text-amber-300 text-xs font-mono"
              >
                No Ball (+1)
              </button>
            </div>
          )}

          {match.sport === 'football' && onManualFootballScore && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onManualFootballScore('goal_home')}
                className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium"
              >
                ⚽ Goal {match.team1.shortName}
              </button>
              <button
                onClick={() => onManualFootballScore('goal_away')}
                className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium"
              >
                ⚽ Goal {match.team2.shortName}
              </button>
              <button
                onClick={() => onManualFootballScore('yellow')}
                className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium"
              >
                🟨 Yellow Card
              </button>
              <button
                onClick={() => onManualFootballScore('shot')}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              >
                🎯 Shot on Target
              </button>
            </div>
          )}

          {match.sport === 'basketball' && onManualBasketballScore && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onManualBasketballScore('2pt_home')}
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono"
              >
                +2 {match.team1.shortName}
              </button>
              <button
                onClick={() => onManualBasketballScore('3pt_home')}
                className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold"
              >
                +3 {match.team1.shortName}
              </button>
              <button
                onClick={() => onManualBasketballScore('2pt_away')}
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono"
              >
                +2 {match.team2.shortName}
              </button>
              <button
                onClick={() => onManualBasketballScore('3pt_away')}
                className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold"
              >
                +3 {match.team2.shortName}
              </button>
              <button
                onClick={() => onManualBasketballScore('foul')}
                className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono"
              >
                Foul
              </button>
            </div>
          )}

          {match.sport === 'tennis' && onManualTennisScore && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onManualTennisScore(1, 'winner')}
                className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium"
              >
                Point {match.team1.name} (Winner)
              </button>
              <button
                onClick={() => onManualTennisScore(1, 'ace')}
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
              >
                Ace {match.team1.name}
              </button>
              <button
                onClick={() => onManualTennisScore(2, 'winner')}
                className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium"
              >
                Point {match.team2.name} (Winner)
              </button>
              <button
                onClick={() => onManualTennisScore(2, 'ace')}
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
              >
                Ace {match.team2.name}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
