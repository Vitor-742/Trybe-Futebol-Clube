import * as express from 'express';
import UserController from '../controllers/usercontroller';
import UserService from '../services/userservice';
import UserRepository from '../repository/userrepository';
import validateToken from '../middlewares/validateToken';

const router = express.Router();

const UserFactory = () => {
  const repository = new UserRepository();
  const service = new UserService(repository);
  const controller = new UserController(service);

  return controller;
};

router.post('/', async (req, res, next) => {
  const data = await UserFactory().login(req, res, next);
  return data;
});

router.get('/validate', validateToken, async (req, res, next) => {
  const data = await UserFactory().showRole(req, res, next);
  return data;
});

export default router;
