import * as express from 'express';
import TeamRepository from '../repository/teamrepository';
import TeamService from '../services/teamservice';
import TeamController from '../controllers/teamcontroller';

const router = express.Router();

const TeamFactory = () => {
  const repository = new TeamRepository();
  const service = new TeamService(repository);
  const controller = new TeamController(service);

  return controller;
};

router.get('/', /* validateToken, */ async (req, res, next) => {
  const data = await TeamFactory().showTeams(req, res, next);
  return data;
});
router.get('/:id', async (req, res, next) => {
  const data = await TeamFactory().showTeamById(req, res, next);
  return data;
});

export default router;
