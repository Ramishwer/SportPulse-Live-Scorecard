/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { BaseMatch, SportType } from '../types/sports';

interface NewMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMatch: (match: BaseMatch) => void;
}

export const NewMatchModal: React.FC<NewMatchModalProps> = ({
  isOpen,
  onClose,
  onCreateMatch,
}) => {
  const [sport, setSport] = useState<SportType>('cricket');
  const [team1Name, setTeam1Name] = useState('New Zealand');
  const [team1Short, setTeam1Short] = useState('NZ');
  const [team1Flag, setTeam1Flag] = useState('🇳🇿');
  const [team2Name, setTeam2Name] = useState('Pakistan');
  const [team2Short, setTeam2Short] = useState('PAK');
  const [team2Flag, setTeam2Flag] = useState('🇵🇰');
  const [tournament, setTournament] = useState('World Cup Clash 2026');
  const [venue, setVenue] = useState('Eden Park, Auckland');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMatch: BaseMatch = {
      id: `match-custom-${Date.now()}`,
      sport,
      title: `${tournament} · Match`,
      tournament,
      venue,
      status: 'live',
      startTime: 'Just started',
      team1: {
        id: team1Short.toLowerCase(),
        name: team1Name,
        shortName: team1Short,
        flag: team1Flag || '🏆',
        color: '#0284c7',
      },
      team2: {
        id: team2Short.toLowerCase(),
        name: team2Name,
        shortName: team2Short,
        flag: team2Flag || '⚡',
        color: '#15803d',
      },
      headlineNote: `Match underway at ${venue} · Toss won by ${team1Name}`,
    };

    if (sport === 'cricket') {
      newMatch.cricketData = {
        format: 'T20',
        toss: `${team1Name} won the toss and opted to bowl`,
        target: 175,
        currentInningsIndex: 1,
        winProbability: { team1: 50, team2: 50 },
        ballHistory: [
          {
            id: 'b-init-1',
            overNumber: 0,
            ballInOver: 1,
            overStr: '0.1',
            runs: 1,
            batterName: `${team1Name} Opener`,
            bowlerName: `${team2Name} Strike Bowler`,
            commentary: 'First ball gently pushed into the covers for a quick single to get off the mark.',
            shot: {
              angle: 120,
              distance: 55,
              runs: 1,
              isBoundary: false,
              zone: 'Cover',
            },
          },
        ],
        innings: [
          {
            teamName: team2Name,
            shortName: team2Short,
            runs: 174,
            wickets: 6,
            oversStr: '20.0',
            legalBalls: 120,
            maxOvers: 20,
            extras: { total: 6, wides: 4, noBalls: 0, byes: 1, legByes: 1 },
            batters: [
              { id: 'tb1', name: `${team2Short} Opener 1`, runs: 58, balls: 38, fours: 6, sixes: 2, strikeRate: 152.6, isStriker: false, isNonStriker: false, isOut: true, dismissal: 'c Wicketkeeper' },
              { id: 'tb2', name: `${team2Short} Captain`, runs: 44, balls: 30, fours: 4, sixes: 1, strikeRate: 146.6, isStriker: false, isNonStriker: false, isOut: true, dismissal: 'b Bowler' },
            ],
            bowlers: [
              { id: 'tbowl1', name: `${team1Short} Bowler 1`, overs: 4, ballsThisOver: 0, maidens: 0, runsConceded: 32, wickets: 2, economy: 8.0, isCurrent: false },
            ],
            fallOfWickets: [
              { wicket: 1, runs: 45, over: '5.2', player: `${team2Short} Opener 1` },
            ],
            partnerships: [
              { player1: 'Opener 1', player2: 'Captain', runs: 45, balls: 32 },
            ],
          },
          {
            teamName: team1Name,
            shortName: team1Short,
            runs: 1,
            wickets: 0,
            oversStr: '0.1',
            legalBalls: 1,
            maxOvers: 20,
            extras: { total: 0, wides: 0, noBalls: 0, byes: 0, legByes: 0 },
            batters: [
              { id: 'nb1', name: `${team1Short} Opener`, runs: 1, balls: 1, fours: 0, sixes: 0, strikeRate: 100.0, isStriker: false, isNonStriker: true, isOut: false },
              { id: 'nb2', name: `${team1Short} Batter 2`, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, isStriker: true, isNonStriker: false, isOut: false },
            ],
            bowlers: [
              { id: 'nbowl1', name: `${team2Name} Strike Bowler`, overs: 0, ballsThisOver: 1, maidens: 0, runsConceded: 1, wickets: 0, economy: 6.0, isCurrent: true },
            ],
            fallOfWickets: [],
            partnerships: [
              { player1: `${team1Short} Opener`, player2: `${team1Short} Batter 2`, runs: 1, balls: 1 },
            ],
          },
        ],
      };
    } else if (sport === 'football') {
      newMatch.footballData = {
        minute: 12,
        period: '1st Half',
        homeScore: 0,
        awayScore: 0,
        stats: {
          possession: [50, 50],
          xG: [0.15, 0.2],
          shots: [2, 1],
          shotsOnTarget: [1, 0],
          corners: [1, 1],
          fouls: [2, 1],
          yellowCards: [0, 0],
          redCards: [0, 0],
          passAccuracy: [85, 84],
        },
        events: [
          { id: 'fe-init-1', minute: 8, team: 'home', player: `${team1Name} Striker`, type: 'shot_miss', detail: 'Long-range shot blocked by defender.' },
        ],
        lineupHome: [
          { name: 'Goalkeeper', number: 1, pos: 'GK' },
          { name: 'Striker', number: 9, pos: 'ST' },
        ],
        lineupAway: [
          { name: 'Goalkeeper', number: 1, pos: 'GK' },
          { name: 'Forward', number: 10, pos: 'ST' },
        ],
      };
    } else if (sport === 'basketball') {
      newMatch.basketballData = {
        quarter: 1,
        timeLeft: '08:30',
        quarterScores: {
          home: [12, 0, 0, 0],
          away: [10, 0, 0, 0],
        },
        homeScore: 12,
        awayScore: 10,
        stats: {
          fgPct: [50.0, 44.0],
          threePtPct: [40.0, 33.3],
          ftPct: [100.0, 100.0],
          rebounds: [8, 6],
          assists: [4, 3],
          turnovers: [2, 1],
        },
        events: [
          { id: 'be-init-1', quarter: 1, timeLeft: '09:12', team: 'home', player: `${team1Name} Star`, type: '3pt_made', scoreStr: '12 - 10', detail: '3-point jumper from beyond the arc!', coord: { x: 75, y: 30 } },
        ],
        homePlayers: [
          { name: `${team1Name} Star`, min: '03:30', pts: 7, reb: 2, ast: 2, stl: 1, blk: 0, fg: '3/4', threePt: '1/2', plusMinus: 2 },
        ],
        awayPlayers: [
          { name: `${team2Name} Guard`, min: '03:30', pts: 6, reb: 1, ast: 1, stl: 0, blk: 0, fg: '2/3', threePt: '1/1', plusMinus: -2 },
        ],
      };
    }

    onCreateMatch(newMatch);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Create New Match Center</h3>
            <p className="text-xs text-slate-400">Launch a custom live match and score it in real time.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sport Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Sport Category
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['cricket', 'football', 'basketball', 'tennis'] as SportType[]).map((sp) => (
                <button
                  type="button"
                  key={sp}
                  onClick={() => setSport(sp)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg capitalize border transition-all ${
                    sport === sp
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>

          {/* Teams Config */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Team / Player 1</label>
              <input
                type="text"
                value={team1Name}
                onChange={(e) => setTeam1Name(e.target.value)}
                placeholder="Team 1 Name"
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                required
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={team1Short}
                  onChange={(e) => setTeam1Short(e.target.value)}
                  placeholder="Short (NZ)"
                  maxLength={5}
                  className="w-1/2 text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                  required
                />
                <input
                  type="text"
                  value={team1Flag}
                  onChange={(e) => setTeam1Flag(e.target.value)}
                  placeholder="Flag 🇳🇿"
                  className="w-1/2 text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-center focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Team / Player 2</label>
              <input
                type="text"
                value={team2Name}
                onChange={(e) => setTeam2Name(e.target.value)}
                placeholder="Team 2 Name"
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                required
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={team2Short}
                  onChange={(e) => setTeam2Short(e.target.value)}
                  placeholder="Short (PAK)"
                  maxLength={5}
                  className="w-1/2 text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                  required
                />
                <input
                  type="text"
                  value={team2Flag}
                  onChange={(e) => setTeam2Flag(e.target.value)}
                  placeholder="Flag 🇵🇰"
                  className="w-1/2 text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-center focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Tournament & Venue */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tournament / League</label>
              <input
                type="text"
                value={tournament}
                onChange={(e) => setTournament(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Stadium / Venue</label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-md transition-colors"
            >
              Start Live Match
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
