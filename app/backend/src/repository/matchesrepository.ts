import Model from '../database/models/Match';
import Team from '../database/models/Team';
import { IMatchModel, Match } from '../protocols';
import 'dotenv/config';
import TeamRepository from './teamrepository';

export default class MatchesRepository implements IMatchModel {
  private teamRepository;
  constructor(private model = Model) {
    this.model = model;
    this.teamRepository = new TeamRepository();
  }

  async showMatches(): Promise<Match[]> {
    const matches = await this.model
      .findAll({ include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }] });
    return matches;
  }

  async createMatch(data: Match): Promise<Match> {
    const homeTeam = await this.teamRepository.showIds(data.homeTeam);
    const awayTeam = await this.teamRepository.showIds(data.awayTeam);

    if (!homeTeam || !awayTeam) throw new Error('There is no team with such id!');

    const newMatch = await this.model.create(data);
    return newMatch;
  }

  async updateMatch(data: Omit<Match, 'homeTeam' | 'awayteam'>, id: number): Promise<void> {
    await this.model.update(data, { where: { id } });
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }
}
