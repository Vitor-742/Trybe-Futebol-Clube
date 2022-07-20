import * as express from 'express';
import UserController from './controllers/usercontroller';
import UserService from './services/userservice';
import Repository from './repository/repository';
import validateToken from './middlewares/validateToken';

const userFactory = () => {
  const repository = new Repository();
  const service = new UserService(repository);
  const controller = new UserController(service);

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
      const data = await userFactory().login(req, res, next);
      return data;
    });
    this.app.get('/login/validate', validateToken, async (req, res, next) => {
      const data = await userFactory().showRole(req, res, next);
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
