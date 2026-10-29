/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BaseMatch } from '../types/sports';

interface MatchHeroProps {
  match: BaseMatch;
}

export const MatchHero: React.FC<MatchHeroProps> = ({ match }) => {
  const getBannerImage = () => {
    switch (match.sport) {
      case 'cricket':
        return '/src/assets/images/cricket_stadium_lights_1793311021833.jpg';
      case 'football':
        return '/src/assets/images/football_stadium_atmosphere_1793311022341.jpg';
      case 'basketball':
        return '/src/assets/images/basketball_arena_court_1793311023070.jpg';
      case 'tennis':
        return '/src/assets/images/cricket_stadium_lights_1793311021833.jpg';
      default:
        return '/src/assets/images/cricket_stadium_lights_1793311021833.jpg';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
      {/* Background Stadium Photo with Contrast Scrim */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={getBannerImage()}
          alt={match.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-25 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/60" />
      </div>

      <div className="relative p-6 md:p-8 z-10 flex flex-col gap-6">
        {/* Top unboxed metadata line */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-400 uppercase tracking-wider">{match.sport}</span>
            <span aria-hidden="true">·</span>
            <span>{match.tournament}</span>
            <span aria-hidden="true">·</span>
            <span>{match.venue}</span>
          </div>

          <div className="flex items-center gap-2 font-mono">
            {match.status === 'live' && (
              <span className="flex items-center gap-1.5 text-rose-400 font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                Live Broadcast
              </span>
            )}
            {match.status === 'upcoming' && <span className="text-amber-400">Scheduled: {match.startTime}</span>}
            {match.status === 'completed' && <span className="text-slate-400">Match Completed</span>}
          </div>
        </div>

        {/* Primary Teams & Scores Showcase */}
        {match.sport === 'cricket' && match.cricketData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Team 1 Score (First innings) */}
            {match.cricketData.innings[0] && (
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{match.team2.flag}</span>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">{match.team2.name}</h2>
                    <span className="text-xs text-slate-400">1st Innings · 20 Overs</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-extrabold text-white font-mono tabular-nums">
                    {match.cricketData.innings[0].runs}/{match.cricketData.innings[0].wickets}
                  </div>
                  <div className="text-xs text-slate-400 font-mono tabular-nums">
                    ({match.cricketData.innings[0].oversStr} ov · RR: {(match.cricketData.innings[0].runs / 20).toFixed(2)})
                  </div>
                </div>
              </div>
            )}

            {/* Team 2 Score (Chasing innings) */}
            {match.cricketData.innings[1] && (
              <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{match.team1.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-emerald-400 tracking-tight">{match.team1.name}</h2>
                      <span className="text-xs text-emerald-400/80 font-semibold font-mono">CHASING</span>
                    </div>
                    <span className="text-xs text-slate-400">
                      Target {match.cricketData.target} · Req RR: {
                        ((match.cricketData.target! - match.cricketData.innings[1].runs) / Math.max(0.1, (20 - 17.3))).toFixed(2)
                      }
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-extrabold text-emerald-300 font-mono tabular-nums">
                    {match.cricketData.innings[1].runs}/{match.cricketData.innings[1].wickets}
                  </div>
                  <div className="text-xs text-emerald-400/80 font-mono tabular-nums">
                    {match.cricketData.innings[1].oversStr} / 20 Overs (CRR: {(match.cricketData.innings[1].runs / 17.3).toFixed(2)})
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Football Scoreboard */}
        {match.sport === 'football' && match.footballData && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-4xl">{match.team1.flag}</span>
              <div>
                <h2 className="text-xl font-bold text-white">{match.team1.name}</h2>
                <span className="text-xs text-slate-400">Home · {match.footballData.lineupHome[9]?.name} leading attack</span>
              </div>
            </div>

            <div className="flex flex-col items-center px-8 border-y md:border-y-0 md:border-x border-slate-800 py-2">
              <div className="text-4xl md:text-5xl font-extrabold text-white font-mono tabular-nums tracking-wider">
                {match.footballData.homeScore} - {match.footballData.awayScore}
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs font-semibold text-rose-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>{match.footballData.minute}' {match.footballData.period}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 flex-1 text-right">
              <div>
                <h2 className="text-xl font-bold text-white">{match.team2.name}</h2>
                <span className="text-xs text-slate-400">Away · {match.footballData.lineupAway[10]?.name} on pitch</span>
              </div>
              <span className="text-4xl">{match.team2.flag}</span>
            </div>
          </div>
        )}

        {/* Basketball Scoreboard */}
        {match.sport === 'basketball' && match.basketballData && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-4xl">{match.team1.flag}</span>
              <div>
                <h2 className="text-xl font-bold text-white">{match.team1.name}</h2>
                <span className="text-xs text-slate-400">FG: {match.basketballData.stats.fgPct[0]}% · 3PT: {match.basketballData.stats.threePtPct[0]}%</span>
              </div>
            </div>

            <div className="flex flex-col items-center px-8 border-y md:border-y-0 md:border-x border-slate-800 py-2">
              <div className="text-4xl md:text-5xl font-extrabold text-white font-mono tabular-nums tracking-wider">
                {match.basketballData.homeScore} - {match.basketballData.awayScore}
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs font-semibold text-amber-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Q{match.basketballData.quarter} · {match.basketballData.timeLeft}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 flex-1 text-right">
              <div>
                <h2 className="text-xl font-bold text-white">{match.team2.name}</h2>
                <span className="text-xs text-slate-400">FG: {match.basketballData.stats.fgPct[1]}% · 3PT: {match.basketballData.stats.threePtPct[1]}%</span>
              </div>
              <span className="text-4xl">{match.team2.flag}</span>
            </div>
          </div>
        )}

        {/* Tennis Scoreboard */}
        {match.sport === 'tennis' && match.tennisData && (
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <div className="flex items-center justify-between py-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{match.team1.flag}</span>
                    <span className="font-bold text-white">{match.team1.name}</span>
                    {match.tennisData.server === 1 && <span className="text-xs text-amber-400 font-mono">● SERVING</span>}
                  </div>
                  <div className="flex items-center gap-3 font-mono font-bold tabular-nums">
                    {match.tennisData.sets.map(([s1], i) => (
                      <span key={i} className={`w-6 text-center ${i === match.tennisData!.currentSetIndex ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {s1}
                      </span>
                    ))}
                    <span className="w-8 text-center bg-emerald-500/20 text-emerald-300 rounded px-1">
                      {match.tennisData.currentGame.player1Score}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{match.team2.flag}</span>
                    <span className="font-bold text-white">{match.team2.name}</span>
                    {match.tennisData.server === 2 && <span className="text-xs text-amber-400 font-mono">● SERVING</span>}
                  </div>
                  <div className="flex items-center gap-3 font-mono font-bold tabular-nums">
                    {match.tennisData.sets.map(([, s2], i) => (
                      <span key={i} className={`w-6 text-center ${i === match.tennisData!.currentSetIndex ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {s2}
                      </span>
                    ))}
                    <span className="w-8 text-center bg-emerald-500/20 text-emerald-300 rounded px-1">
                      {match.tennisData.currentGame.player2Score}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-400 space-y-1.5 md:pl-6 md:border-l border-slate-800">
                <div className="flex justify-between">
                  <span>Surface</span>
                  <span className="text-white font-medium">{match.tennisData.surface}</span>
                </div>
                <div className="flex justify-between">
                  <span>Aces</span>
                  <span className="text-white font-mono tabular-nums">{match.tennisData.stats.aces[0]} - {match.tennisData.stats.aces[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span>Winners</span>
                  <span className="text-white font-mono tabular-nums">{match.tennisData.stats.winners[0]} - {match.tennisData.stats.winners[1]}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Headline Note */}
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
          <span className="font-medium">{match.headlineNote}</span>
          <span className="text-slate-500 font-mono">Updated just now</span>
        </div>

        {/* Dynamic Win Predictor Bar for Cricket */}
        {match.sport === 'cricket' && match.cricketData && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono font-semibold">
              <span className="text-blue-400">{match.team1.shortName} {match.cricketData.winProbability.team1}%</span>
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">Live Win Probability</span>
              <span className="text-amber-400">{match.team2.shortName} {match.cricketData.winProbability.team2}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
              <div
                style={{ width: `${match.cricketData.winProbability.team1}%` }}
                className="bg-blue-500 transition-all duration-500 ease-out"
              />
              <div
                style={{ width: `${match.cricketData.winProbability.team2}%` }}
                className="bg-amber-400 transition-all duration-500 ease-out"
              />
            </div>
          </div>
        )}

        {/* Active Performers Bar for Cricket */}
        {match.sport === 'cricket' && match.cricketData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-800/80 text-xs">
            {/* Batter 1 */}
            {match.cricketData.innings[1]?.batters.find(b => b.isStriker) && (
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-medium text-white">
                    <span>{match.cricketData.innings[1].batters.find(b => b.isStriker)?.name}</span>
                    <span className="text-emerald-400 font-bold">*</span>
                  </div>
                  <span className="text-slate-400">Striker</span>
                </div>
                <div className="text-right font-mono tabular-nums">
                  <span className="font-bold text-white text-sm">
                    {match.cricketData.innings[1].batters.find(b => b.isStriker)?.runs}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {' '}({match.cricketData.innings[1].batters.find(b => b.isStriker)?.balls}b, {match.cricketData.innings[1].batters.find(b => b.isStriker)?.fours}x4, {match.cricketData.innings[1].batters.find(b => b.isStriker)?.sixes}x6)
                  </span>
                </div>
              </div>
            )}

            {/* Batter 2 */}
            {match.cricketData.innings[1]?.batters.find(b => b.isNonStriker) && (
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/60 flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">
                    {match.cricketData.innings[1].batters.find(b => b.isNonStriker)?.name}
                  </div>
                  <span className="text-slate-400">Non-striker</span>
                </div>
                <div className="text-right font-mono tabular-nums">
                  <span className="font-bold text-white text-sm">
                    {match.cricketData.innings[1].batters.find(b => b.isNonStriker)?.runs}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {' '}({match.cricketData.innings[1].batters.find(b => b.isNonStriker)?.balls}b)
                  </span>
                </div>
              </div>
            )}

            {/* Bowler */}
            {match.cricketData.innings[1]?.bowlers.find(b => b.isCurrent) && (
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/60 flex items-center justify-between">
                <div>
                  <div className="font-medium text-amber-300">
                    {match.cricketData.innings[1].bowlers.find(b => b.isCurrent)?.name}
                  </div>
                  <span className="text-slate-400">Bowling</span>
                </div>
                <div className="text-right font-mono tabular-nums">
                  <span className="font-bold text-white text-sm">
                    {match.cricketData.innings[1].bowlers.find(b => b.isCurrent)?.wickets}-
                    {match.cricketData.innings[1].bowlers.find(b => b.isCurrent)?.runsConceded}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {' '}({match.cricketData.innings[1].bowlers.find(b => b.isCurrent)?.overs}.{match.cricketData.innings[1].bowlers.find(b => b.isCurrent)?.ballsThisOver} ov, ECON: {match.cricketData.innings[1].bowlers.find(b => b.isCurrent)?.economy.toFixed(1)})
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
