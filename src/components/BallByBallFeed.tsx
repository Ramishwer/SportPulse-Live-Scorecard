/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { CricketBallEvent } from '../types/sports';

interface BallByBallFeedProps {
  balls: CricketBallEvent[];
}

export const BallByBallFeed: React.FC<BallByBallFeedProps> = ({ balls }) => {
  const [filter, setFilter] = useState<'all' | 'boundaries' | 'wickets'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBalls = balls.filter((b) => {
    if (filter === 'boundaries' && !b.isBoundary) return false;
    if (filter === 'wickets' && !b.isWicket) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        b.commentary.toLowerCase().includes(q) ||
        b.batterName.toLowerCase().includes(q) ||
        b.bowlerName.toLowerCase().includes(q) ||
        b.overStr.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Ball-by-Ball Live Commentary
          </h3>
          <p className="text-xs text-slate-400">
            Real-time delivery descriptions, fielding placements, and boundary calls.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded transition-colors ${
                filter === 'all' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({balls.length})
            </button>
            <button
              onClick={() => setFilter('boundaries')}
              className={`px-3 py-1 rounded transition-colors ${
                filter === 'boundaries' ? 'bg-sky-900/50 text-sky-300 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Boundaries ({balls.filter(b => b.isBoundary).length})
            </button>
            <button
              onClick={() => setFilter('wickets')}
              className={`px-3 py-1 rounded transition-colors ${
                filter === 'wickets' ? 'bg-rose-900/50 text-rose-300 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Wickets ({balls.filter(b => b.isWicket).length})
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search commentary by player, over, or keywords (e.g. 'six', 'yorker', 'Pandya')..."
          className="w-full bg-slate-950/70 border border-slate-800 text-slate-200 text-xs rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
        />
      </div>

      {/* Commentary Items */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
        {filteredBalls.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No deliveries match your current filter.
          </div>
        ) : (
          filteredBalls.map((ball) => {
            const isFour = ball.runs === 4;
            const isSix = ball.runs === 6;
            const isWicket = ball.isWicket;

            return (
              <div
                key={ball.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isWicket
                    ? 'bg-rose-950/20 border-rose-800/60'
                    : isSix
                    ? 'bg-emerald-950/20 border-emerald-800/60'
                    : isFour
                    ? 'bg-sky-950/20 border-sky-800/60'
                    : 'bg-slate-950/40 border-slate-800/70 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded">
                      {ball.overStr}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {ball.bowlerName} to {ball.batterName}
                    </span>
                  </div>

                  {/* Run / Event Pill */}
                  <div className="flex items-center gap-1.5 font-mono">
                    {isWicket && (
                      <span className="px-2 py-0.5 text-xs font-extrabold bg-rose-600 text-white rounded">
                        WICKET
                      </span>
                    )}
                    {isSix && (
                      <span className="px-2 py-0.5 text-xs font-extrabold bg-emerald-600 text-white rounded">
                        6 RUNS
                      </span>
                    )}
                    {isFour && (
                      <span className="px-2 py-0.5 text-xs font-extrabold bg-sky-600 text-white rounded">
                        4 RUNS
                      </span>
                    )}
                    {!isFour && !isSix && !isWicket && (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-slate-800 text-slate-300 rounded tabular-nums">
                        {ball.runs} {ball.runs === 1 ? 'Run' : 'Runs'}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed">
                  {ball.commentary}
                </p>

                {ball.shot && (
                  <div className="mt-2 text-[11px] text-slate-400 font-mono flex items-center gap-3">
                    <span>Sector: {ball.shot.zone}</span>
                    <span aria-hidden="true">·</span>
                    <span>Shot Distance: {ball.shot.distance}%</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
