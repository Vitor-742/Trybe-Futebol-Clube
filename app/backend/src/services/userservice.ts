import { User, IModel, IService, Itoken } from '../protocols';

export default class UserService implements IService {
  constructor(private model: IModel) {
    this.model = model;
  }

  create(data: Omit<User, 'id'>): Promise<User> {
    const user = this.model.create(data);
    return user;
  }

  login(data: Omit<User, 'id'>): Promise<Itoken> {
    // const wrong = { token: '', status: 400 };
    // const { email, password } = data;
    // if (!email) return { token: '', status: 400 };
    const token = this.model.login(data);
    return token;
  }

  list(): Promise<User[]> {
    const users = this.model.list();
    return users;
  }
}
