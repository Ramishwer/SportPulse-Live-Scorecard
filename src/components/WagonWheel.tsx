/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CricketBallEvent } from '../types/sports';

interface WagonWheelProps {
  balls: CricketBallEvent[];
}

export const WagonWheel: React.FC<WagonWheelProps> = ({ balls }) => {
  const [filterType, setFilterType] = useState<'all' | 'boundary' | 'six' | 'wicket' | 'ones'>('all');
  const [selectedBatter, setSelectedBatter] = useState<string>('all');
  const [hoveredBall, setHoveredBall] = useState<CricketBallEvent | null>(null);

  // Collect unique batters who have shots
  const batters = Array.from(new Set(balls.filter(b => b.shot).map(b => b.batterName)));

  // Filter balls
  const filteredBalls = balls.filter((b) => {
    if (!b.shot) return false;
    if (selectedBatter !== 'all' && b.batterName !== selectedBatter) return false;

    if (filterType === 'six') return b.runs === 6;
    if (filterType === 'boundary') return b.runs === 4;
    if (filterType === 'wicket') return b.isWicket;
    if (filterType === 'ones') return b.runs === 1 || b.runs === 2 || b.runs === 3;
    return true;
  });

  const width = 360;
  const height = 360;
  const centerX = width / 2;
  const centerY = height / 2;
  const groundRadius = 145;
  const innerCircleRadius = 75;

  // Convert polar coordinates to Cartesian
  const getCoordinates = (angleDeg: number, distancePercent: number) => {
    // 0 deg is straight down the ground (top), 90 is point/cover, etc.
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    const r = (distancePercent / 100) * groundRadius;
    const x = centerX + r * Math.cos(angleRad);
    const y = centerY + r * Math.sin(angleRad);
    return { x, y };
  };

  const getShotColor = (ball: CricketBallEvent) => {
    if (ball.isWicket) return '#f43f5e'; // rose red
    if (ball.runs === 6) return '#10b981'; // emerald green
    if (ball.runs === 4) return '#38bdf8'; // sky blue
    if (ball.runs >= 1) return '#e2e8f0'; // bright slate
    return '#64748b';
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 rounded-xl border border-slate-800 bg-slate-900/60">
      {/* SVG Pitch & Wagon Wheel Ground */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="select-none overflow-visible"
        >
          {/* Ground Outfield Grass Circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={groundRadius + 12}
            className="fill-emerald-950/40 stroke-slate-800"
            strokeWidth="1.5"
          />

          {/* Boundary Rope */}
          <circle
            cx={centerX}
            cy={centerY}
            r={groundRadius}
            fill="none"
            className="stroke-emerald-500/50"
            strokeWidth="2"
            strokeDasharray="4 2"
          />

          {/* 30-Yard Circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={innerCircleRadius}
            fill="none"
            className="stroke-slate-700/60"
            strokeWidth="1"
            strokeDasharray="2 3"
          />

          {/* Sector divider guidelines */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const end = getCoordinates(angle, 100);
            return (
              <line
                key={angle}
                x1={centerX}
                y1={centerY}
                x2={end.x}
                y2={end.y}
                stroke="#334155"
                strokeWidth="0.5"
                strokeOpacity="0.4"
              />
            );
          })}

          {/* Pitch 22 yards in center */}
          <rect
            x={centerX - 4}
            y={centerY - 16}
            width={8}
            height={32}
            rx={1.5}
            fill="#d97706"
            opacity="0.8"
          />
          {/* Bowling crease lines */}
          <line x1={centerX - 6} y1={centerY - 14} x2={centerX + 6} y2={centerY - 14} stroke="#ffffff" strokeWidth="1" />
          <line x1={centerX - 6} y1={centerY + 14} x2={centerX + 6} y2={centerY + 14} stroke="#ffffff" strokeWidth="1" />

          {/* Field Region Labels */}
          <text x={centerX} y={22} textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600">STRAIGHT</text>
          <text x={centerX + groundRadius + 2} y={centerY + 3} textAnchor="start" fill="#64748b" fontSize="9" fontWeight="600">POINT / COVER</text>
          <text x={centerX} y={height - 12} textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600">FINE LEG</text>
          <text x={centerX - groundRadius - 2} y={centerY + 3} textAnchor="end" fill="#64748b" fontSize="9" fontWeight="600">MID-WICKET</text>

          {/* Shot vectors */}
          {filteredBalls.map((ball) => {
            if (!ball.shot) return null;
            const target = getCoordinates(ball.shot.angle, ball.shot.distance);
            const isHovered = hoveredBall?.id === ball.id;
            const color = getShotColor(ball);

            return (
              <g
                key={ball.id}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredBall(ball)}
                onMouseLeave={() => setHoveredBall(null)}
              >
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={target.x}
                  y2={target.y}
                  stroke={color}
                  strokeWidth={isHovered ? 2.5 : ball.runs >= 4 ? 2 : 1.2}
                  strokeOpacity={isHovered ? 1 : 0.75}
                />
                <circle
                  cx={target.x}
                  cy={target.y}
                  r={isHovered ? 4.5 : ball.runs === 6 ? 3.5 : ball.runs === 4 ? 3 : 2}
                  fill={color}
                  className="transition-transform"
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip when hovering shot */}
        {hoveredBall && hoveredBall.shot && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-slate-700 px-3 py-1.5 rounded-lg shadow-xl text-xs z-30 min-w-max pointer-events-none">
            <div className="font-semibold text-white">
              {hoveredBall.batterName} — {hoveredBall.runs === 0 && hoveredBall.isWicket ? 'WICKET' : `${hoveredBall.runs} Runs`}
            </div>
            <div className="text-slate-400 text-[11px] font-mono">
              Over {hoveredBall.overStr} · {hoveredBall.shot.zone} · vs {hoveredBall.bowlerName}
            </div>
          </div>
        )}
      </div>

      {/* Control & Breakdown Column */}
      <div className="flex-1 w-full space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Interactive Wagon Wheel
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time shot direction, boundary trajectory, and dismissal locations.
          </p>
        </div>

        {/* Filter by Batter */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
            Filter Batsman
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedBatter('all')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                selectedBatter === 'all'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              All Batters ({balls.filter(b => b.shot).length})
            </button>
            {batters.map((bName) => (
              <button
                key={bName}
                onClick={() => setSelectedBatter(bName)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  selectedBatter === bName
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                {bName}
              </button>
            ))}
          </div>
        </div>

        {/* Filter by Shot Type */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
            Shot Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                filterType === 'all'
                  ? 'bg-slate-800 border-slate-600 text-white font-semibold'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>All Shots</span>
              <span className="font-mono tabular-nums">{balls.filter(b => b.shot).length}</span>
            </button>

            <button
              onClick={() => setFilterType('boundary')}
              className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                filterType === 'boundary'
                  ? 'bg-sky-950/40 border-sky-500 text-sky-300 font-semibold'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-sky-300'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Fours (4s)
              </span>
              <span className="font-mono tabular-nums">{balls.filter(b => b.runs === 4).length}</span>
            </button>

            <button
              onClick={() => setFilterType('six')}
              className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                filterType === 'six'
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-emerald-300'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Sixes (6s)
              </span>
              <span className="font-mono tabular-nums">{balls.filter(b => b.runs === 6).length}</span>
            </button>

            <button
              onClick={() => setFilterType('ones')}
              className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                filterType === 'ones'
                  ? 'bg-slate-800 border-slate-500 text-white font-semibold'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                1s & 2s
              </span>
              <span className="font-mono tabular-nums">
                {balls.filter(b => b.runs === 1 || b.runs === 2 || b.runs === 3).length}
              </span>
            </button>

            <button
              onClick={() => setFilterType('wicket')}
              className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                filterType === 'wicket'
                  ? 'bg-rose-950/40 border-rose-500 text-rose-300 font-semibold'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-rose-300'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Wickets
              </span>
              <span className="font-mono tabular-nums">{balls.filter(b => b.isWicket).length}</span>
            </button>
          </div>
        </div>

        {/* Legend notes */}
        <div className="pt-2 text-[11px] text-slate-400 flex flex-wrap gap-4 border-t border-slate-800/80">
          <span>Dashed outer ring: Boundary rope</span>
          <span>Dashed inner ring: 30-yard circle</span>
          <span>Center: 22-yard pitch</span>
        </div>
      </div>
    </div>
  );
};
