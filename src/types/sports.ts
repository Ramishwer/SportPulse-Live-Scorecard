/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SportType = 'cricket' | 'football' | 'basketball' | 'tennis';

export type MatchStatus = 'live' | 'upcoming' | 'completed';

export interface CricketWagonShot {
  angle: number; // 0 - 360 degrees
  distance: number; // 10 - 100% of boundary
  runs: number;
  isBoundary: boolean;
  zone: 'Cover' | 'Extra Cover' | 'Mid Off' | 'Long Off' | 'Long On' | 'Mid On' | 'Mid Wicket' | 'Square Leg' | 'Fine Leg' | 'Third Man' | 'Point';
  isWicket?: boolean;
}

export interface CricketBallEvent {
  id: string;
  overNumber: number; // 0-based or 1-based
  ballInOver: number; // 1 to 6
  overStr: string; // e.g. "17.3"
  runs: number;
  isExtra?: boolean;
  extraType?: 'wide' | 'no-ball' | 'bye' | 'leg-bye';
  isBoundary?: boolean;
  isWicket?: boolean;
  wicketType?: 'bowled' | 'caught' | 'lbw' | 'run out' | 'stumped';
  dismissedPlayer?: string;
  batterName: string;
  bowlerName: string;
  commentary: string;
  shot?: CricketWagonShot;
}

export interface CricketBatter {
  id: string;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isStriker: boolean;
  isNonStriker: boolean;
  isOut: boolean;
  dismissal?: string;
}

export interface CricketBowler {
  id: string;
  name: string;
  overs: number;
  ballsThisOver: number;
  maidens: number;
  runsConceded: number;
  wickets: number;
  economy: number;
  isCurrent: boolean;
}

export interface CricketInnings {
  teamName: string;
  shortName: string;
  runs: number;
  wickets: number;
  oversStr: string;
  legalBalls: number;
  maxOvers: number;
  extras: {
    total: number;
    wides: number;
    noBalls: number;
    byes: number;
    legByes: number;
  };
  batters: CricketBatter[];
  bowlers: CricketBowler[];
  fallOfWickets: { wicket: number; runs: number; over: string; player: string }[];
  partnerships: { player1: string; player2: string; runs: number; balls: number }[];
}

export interface CricketMatchData {
  format: 'T20' | 'ODI' | 'Test';
  toss: string;
  target?: number;
  innings: CricketInnings[];
  currentInningsIndex: number;
  ballHistory: CricketBallEvent[];
  winProbability: { team1: number; team2: number }; // percentage 0 - 100
}

export interface FootballEvent {
  id: string;
  minute: number;
  stoppage?: number;
  team: 'home' | 'away';
  player: string;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'var' | 'shot_miss';
  detail: string;
  scoreAfter?: string;
  x?: number; // pitch coordinates 0-100
  y?: number; // pitch coordinates 0-100
}

export interface FootballMatchData {
  minute: number;
  period: '1st Half' | 'Halftime' | '2nd Half' | 'Full Time' | 'Extra Time';
  homeScore: number;
  awayScore: number;
  stats: {
    possession: [number, number];
    xG: [number, number];
    shots: [number, number];
    shotsOnTarget: [number, number];
    corners: [number, number];
    fouls: [number, number];
    yellowCards: [number, number];
    redCards: [number, number];
    passAccuracy: [number, number];
  };
  events: FootballEvent[];
  lineupHome: { name: string; number: number; pos: string }[];
  lineupAway: { name: string; number: number; pos: string }[];
}

export interface BasketballPlayerStat {
  name: string;
  min: string;
  pts: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  fg: string;
  threePt: string;
  plusMinus: number;
}

export interface BasketballEvent {
  id: string;
  quarter: number;
  timeLeft: string;
  team: 'home' | 'away';
  player: string;
  type: '2pt_made' | '3pt_made' | 'free_throw' | 'miss' | 'foul' | 'turnover' | 'rebound' | 'assist';
  scoreStr: string;
  detail: string;
  coord?: { x: number; y: number }; // 0-100 coordinates on court
}

export interface BasketballMatchData {
  quarter: number;
  timeLeft: string;
  quarterScores: {
    home: [number, number, number, number, number?];
    away: [number, number, number, number, number?];
  };
  homeScore: number;
  awayScore: number;
  stats: {
    fgPct: [number, number];
    threePtPct: [number, number];
    ftPct: [number, number];
    rebounds: [number, number];
    assists: [number, number];
    turnovers: [number, number];
  };
  events: BasketballEvent[];
  homePlayers: BasketballPlayerStat[];
  awayPlayers: BasketballPlayerStat[];
}

export interface TennisPointEvent {
  id: string;
  set: number;
  game: string;
  scoreStr: string;
  server: 1 | 2;
  text: string;
  type: 'ace' | 'winner' | 'unforced_error' | 'double_fault' | 'point';
}

export interface TennisMatchData {
  sets: [number, number][]; // e.g. [[6, 4], [3, 6], [7, 6], [5, 4]]
  currentSetIndex: number;
  currentGame: {
    player1Score: '0' | '15' | '30' | '40' | 'Ad';
    player2Score: '0' | '15' | '30' | '40' | 'Ad';
  };
  server: 1 | 2;
  surface: 'Grass' | 'Clay' | 'Hard Court';
  stats: {
    aces: [number, number];
    doubleFaults: [number, number];
    firstServePct: [number, number];
    breakPointsWon: [string, string];
    winners: [number, number];
    unforcedErrors: [number, number];
  };
  events: TennisPointEvent[];
}

export interface BaseMatch {
  id: string;
  sport: SportType;
  title: string;
  tournament: string;
  venue: string;
  status: MatchStatus;
  startTime: string;
  team1: {
    id: string;
    name: string;
    shortName: string;
    flag: string;
    color: string;
  };
  team2: {
    id: string;
    name: string;
    shortName: string;
    flag: string;
    color: string;
  };
  headlineNote: string;
  cricketData?: CricketMatchData;
  footballData?: FootballMatchData;
  basketballData?: BasketballMatchData;
  tennisData?: TennisMatchData;
}
