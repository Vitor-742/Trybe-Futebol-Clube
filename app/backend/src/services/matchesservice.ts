import { IMatchModel, IMatchService, Match } from '../protocols';

export default class MatchesService implements IMatchService {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  showMatches(): Promise<Match[]> {
    const matches = this.model.showMatches();
    return matches;
  }

  createMatch(data: Match): Promise<Match> {
    const newMatch = this.model.createMatch({ ...data, inProgress: true });
    return newMatch;
  }

  updateMatch(data: Omit<Match, 'homeTeam' | 'awayteam'>, id: number): void {
    this.model.updateMatch(data, id);
  }

  finishMatch(id: number): void {
    this.model.finishMatch(id);
  }

  async setLeaderboard(): Promise<any> {
    const leaderboard = await this.model.setLeaderboard();

    leaderboard.sort((a: any, b: any) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      return 0;
    });
    let oldTeam = '';
    const LB = leaderboard.filter((time: any) => {
      const aux = time.name !== oldTeam;
      oldTeam = time.name;
      return aux;
    });
    return LB;
  }

  async setLeaderboardAway(): Promise<any> {
    const leaderboard = await this.model.setLeaderboardAway();

    leaderboard.sort((a: any, b: any) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      return 0;
    });
    let oldTeam = '';
    const LB = leaderboard.filter((time: any) => {
      const aux = time.name !== oldTeam;
      oldTeam = time.name;
      return aux;
    });
    return LB;
  }
}
