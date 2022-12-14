import { User, IUserModel, IUserService, Itoken } from '../protocols';

export default class UserService implements IUserService {
  constructor(private model: IUserModel) {
    this.model = model;
  }

  create(data: Omit<User, 'id'>): Promise<User> {
    const user = this.model.create(data);
    return user;
  }

  login(data: Omit<User, 'id'>): Promise<Itoken> {
    const token = this.model.login(data);
    return token;
  }

  showRole(data: string): string {
    const role = this.model.showRole(data);
    return role;
  }

  // showTeams(): Promise<Team[]> {
  //   const teams = this.model.showTeams();
  //   return teams;
  // }

  list(): Promise<User[]> {
    const users = this.model.list();
    return users;
  }
}
