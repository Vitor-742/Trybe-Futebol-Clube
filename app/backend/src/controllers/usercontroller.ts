import { NextFunction, Request, Response } from 'express';
import { IService } from '../protocols';

export default class UserController {
  constructor(private service: IService) {
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

  async login(req: Request, res: Response, _next: NextFunction) {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    if (!password) return res.status(400).json({ message: 'All fields must be filled' });
    try {
      const { token, status } = await this.service.login(req.body);
      if (status === 200) return res.status(200).json({ token });
      return res.status(404).json({ token });
    } catch (error) {
      console.log(error);
    }
  }

  async list(_req: Request, res: Response, _next: NextFunction) {
    const users = await this.service.list();

    return res.status(200).json({ users });
  }
}
