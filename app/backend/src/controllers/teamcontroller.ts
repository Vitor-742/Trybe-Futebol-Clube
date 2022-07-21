import { NextFunction, Request, Response } from 'express';
import { ITeamService } from '../protocols';

export default class TeamController {
  constructor(private service: ITeamService) {
    this.service = service;
  }

  async showTeams(req: Request, res: Response, _next: NextFunction) {
    const teams = await this.service.showTeams();
    return res.status(200).json(teams);
  }
}
