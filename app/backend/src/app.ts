import * as express from 'express';
import UserController from './controllers/usercontroller';
import UserService from './services/userservice';
import UserRepository from './repository/userrepository';
import validateToken from './middlewares/validateToken';
import TeamRepository from './repository/teamrepository';
import TeamService from './services/teamservice';
import TeamController from './controllers/teamcontroller';

const UserFactory = () => {
  const repository = new UserRepository();
  const service = new UserService(repository);
  const controller = new UserController(service);

  return controller;
};

const TeamFactory = () => {
  const repository = new TeamRepository();
  const service = new TeamService(repository);
  const controller = new TeamController(service);

  return controller;
};

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', async (req, res, next) => {
      const data = await UserFactory().login(req, res, next);
      return data;
    });
    this.app.get('/login/validate', validateToken, async (req, res, next) => {
      const data = await UserFactory().showRole(req, res, next);
      return data;
    });
    this.app.get('/teams', /* validateToken, */ async (req, res, next) => {
      const data = await TeamFactory().showTeams(req, res, next);
      return data;
    });
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
