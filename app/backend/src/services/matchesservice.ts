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
}
