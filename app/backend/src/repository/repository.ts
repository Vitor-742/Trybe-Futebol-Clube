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
    // const salt = genSaltSync(10);
    // const passwordEncoded = hashSync(data.password, salt);
    // const newData = {
    //   email: data.email,
    //   password: passwordEncoded,
    // };
    // console.log(newData);
    const userFound = await this.model.findOne({ where: { email: data.email } });
    if (userFound === null) return { token: '', status: 404 };
    if (compareSync(data.password, userFound.password)) {
      const token = sign({ data: userFound }, secret, jwtConfig);
      return { token, status: 200 };
    }
    return { token: '', status: 404 };
  }

  async list(): Promise<User[]> {
    const users = await this.model.findAll();

    return users;
  }
}
