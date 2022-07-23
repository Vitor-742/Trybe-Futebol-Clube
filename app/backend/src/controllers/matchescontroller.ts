import { NextFunction, Request, Response } from 'express';
import { IMatchService } from '../protocols';

export default class MatchesController {
  constructor(private service: IMatchService) {
    this.service = service;
  }

  async showMatches(req: Request, res: Response, _next: NextFunction) {
    const matches = await this.service.showMatches();
    return res.status(200).json(matches);
  }

  async createMatch(req: Request, res: Response, _next: NextFunction) {
    const newMatch = await this.service.createMatch(req.body);
    return res.status(201).json(newMatch);
  }

  async finishMatch(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    await this.service.finishMatch(parseInt(id, 10));
    return res.status(200).json({ message: 'Finished' });
  }
}
