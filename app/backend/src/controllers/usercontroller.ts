import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../protocols';

export default class UserController {
  constructor(private service: IUserService) {
    this.service = service;
  }

  async create(req: Request, res: Response, _next: NextFunction) {
    try {
      const user = await this.service.create(req.body);

      return res.status(201).json({ user });
    } catch (error) {
      console.log(error);
    }
  }

  // async showTeams(req: Request, res: Response, _next: NextFunction) {
  //   const teams = await this.service.showTeams();
  //   return res.status(200).json(teams);
  // }

  async login(req: Request, res: Response, _next: NextFunction) {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    if (!password) return res.status(400).json({ message: 'All fields must be filled' });
    try {
      const { token, status } = await this.service.login(req.body);
      if (status === 200) return res.status(status).json({ token });
      if (status === 401) {
        return res.status(status)
          .json({ message: 'Incorrect email or password' });
      }
      return res.status(404).json({ token });
    } catch (error) {
      console.log(error);
    }
  }

  async showRole(req: Request, res: Response, _next: NextFunction) {
    const { authorization: token } = req.headers;
    const role = this.service.showRole(token);
    return res.status(200).json({ role });
  }

  async list(_req: Request, res: Response, _next: NextFunction) {
    const users = await this.service.list();

    return res.status(200).json({ users });
  }
}
