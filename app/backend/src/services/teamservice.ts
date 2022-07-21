import { ITeamModel, ITeamService, Team } from '../protocols';

export default class UserService implements ITeamService {
  constructor(private model: ITeamModel) {
    this.model = model;
  }

  showTeams(): Promise<Team[]> {
    const teams = this.model.showTeams();
    return teams;
  }

  showTeamById(id: number): Promise<Team | null> {
    const team = this.model.showTeamById(id);
    return team;
  }
}
