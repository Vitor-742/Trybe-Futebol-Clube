export interface User {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string
}

export interface Itoken {
  token: string;
  status: number;
}

export interface IUserService {
  create(data:Omit<User, 'id'>): Promise<User>
  list(): Promise<User[]>;
  login(data:Omit<User, 'id'>): Promise<Itoken>
  showRole(data: string | undefined): string
}

export interface IUserModel {
  create(data:Omit<User, 'id'>): Promise<User>
  list(): Promise<User[]>;
  login(data:Omit<User, 'id'>): Promise<Itoken>
  showRole(data: string | undefined): string
}

export interface JwtPayload {
  data: {
    role: string
  }
}
export interface ITeamModel {
  showTeams(): Promise<Team[]>
  showTeamById(id: number): Promise<Team | null>
}

export interface ITeamService {
  showTeams(): Promise<Team[]>
  showTeamById(id: number): Promise<Team | null>
}

export interface Team {
  id: number,
  teamName: string,
}

export interface Match {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}

export interface IMatchService {
  showMatches(): Promise<Match[]>;
  createMatch(data: Match): Promise<Match>;
  finishMatch(id: number): void;
  updateMatch(data: Omit<Match, 'homeTeam' | 'awayteam'>, id: number): void
  setLeaderboard(): any
}

export interface IMatchModel {
  showMatches(): Promise<Match[]>;
  createMatch(data: Match): Promise<Match>;
  finishMatch(id: number): Promise<void>;
  updateMatch(data: Omit<Match, 'homeTeam' | 'awayteam'>, id: number): Promise<void>
  setLeaderboard(): Promise<any>
}

export interface teamLeaderboard {
  id?: number
  name?: string
  totalPoints: number
  totalGames: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
  efficiency?: number
}
