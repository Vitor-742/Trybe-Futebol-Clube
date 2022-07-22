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
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: number,
}

export interface IMatchService {
  showMatches(): Promise<Match[]>;
}

export interface IMatchModel {
  showMatches(): Promise<Match[]>;
}
