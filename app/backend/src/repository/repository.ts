import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Model from '../database/models/User';
import { User, IModel, Itoken } from '../protocols';
import 'dotenv/config';

export default class Repository implements IModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const user = await this.model.create(data);

    return user;
  }

  async login(data: Omit<User, 'id'>): Promise<Itoken> {
    const jwtConfig: object = {
      algorithm: 'HS256',
    };
    const secret: string = process.env.JWT_SECRET || 'jwt_secret';
    const userFound = await this.model.findOne({ where: { email: data.email } });
    if (userFound === null) return { token: '', status: 401 };
    if (compareSync(data.password, userFound.password)) {
      const token = sign({ data: userFound }, secret, jwtConfig);
      return { token, status: 200 };
    }
    return { token: '', status: 401 };
  }

  async list(): Promise<User[]> {
    const users = await this.model.findAll();

    return users;
  }
}
