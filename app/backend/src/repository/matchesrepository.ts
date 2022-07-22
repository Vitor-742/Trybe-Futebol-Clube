import Model from '../database/models/Match';
import Team from '../database/models/Team';
import { IMatchModel, Match } from '../protocols';
import 'dotenv/config';

export default class MatchesRepository implements IMatchModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async showMatches(): Promise<Match[]> {
    const matches = await this.model
      .findAll({ include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }] });
    console.log(matches);
    return matches;
  }
}
