export interface User {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string
}

export interface Itoken {
  token: string;
  status: number;
}

export interface IService {
  create(data:Omit<User, 'id'>): Promise<User>
  list(): Promise<User[]>;
  login(data:Omit<User, 'id'>): Promise<Itoken>
  showRole(data: string | undefined): string
}

export interface IModel {
  create(data:Omit<User, 'id'>): Promise<User>
  list(): Promise<User[]>;
  login(data:Omit<User, 'id'>): Promise<Itoken>
  showRole(data: string | undefined): string
}

export interface JwtPayload {
  data: {
    role: string
  }
}
