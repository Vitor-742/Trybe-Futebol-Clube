// import { compareSync } from 'bcryptjs';
// import { sign, verify } from 'jsonwebtoken';
import Model from '../database/models/Team';
import { Team, ITeamModel } from '../protocols';
import 'dotenv/config';

// const secret: string = process.env.JWT_SECRET || 'jwt_secret';

export default class TeamRepository implements ITeamModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async showTeams(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async showIds(idTeam: number): Promise<Team | null> {
    const team = await this.model.findOne({
      where: {
        id: idTeam,
      },
    });
    return team;
  }

  async showTeamById(id: number): Promise<Team | null> {
    const team = await this.model.findOne({ where: { id } });
    return team;
  }
}
