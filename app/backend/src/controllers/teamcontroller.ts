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

  async showTeamById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    const team = await this.service.showTeamById(idNumber);
    return res.status(200).json(team);
  }
}
