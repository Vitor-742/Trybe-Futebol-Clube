import { compareSync } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import Model from '../database/models/User';
import { User, IUserModel, Itoken, JwtPayload } from '../protocols';
import 'dotenv/config';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

export default class UserRepository implements IUserModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const user = await this.model.create(data);

    return user;
  }

  // async showTeams(): Promise<Team[]> {
  //   const teams = await this.model.findAll()
  // }

  async login(data: Omit<User, 'id'>): Promise<Itoken> {
    const jwtConfig: object = {
      algorithm: 'HS256',
    };
    const userFound = await this.model.findOne({ where: { email: data.email } });
    if (userFound === null) return { token: '', status: 401 };
    if (compareSync(data.password, userFound.password)) {
      const token = sign({ data: userFound }, secret, jwtConfig);
      return { token, status: 200 };
    }
    return { token: '', status: 401 };
  }

  showRole(token: string): string {
    const { data } = verify(token, secret) as JwtPayload;
    console.log(typeof this.model);
    return data.role;
  }

  async list(): Promise<User[]> {
    const users = await this.model.findAll();

    return users;
  }
}
