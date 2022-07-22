import * as express from 'express';
import MatchesRepository from '../repository/matchesrepository';
import MatchesService from '../services/matchesservice';
import MatchesController from '../controllers/matchescontroller';

const router = express.Router();

const MatchFactory = () => {
  const repository = new MatchesRepository();
  const service = new MatchesService(repository);
  const controller = new MatchesController(service);

  return controller;
};

router.get('/', async (req, res, next) => {
  const data = await MatchFactory().showMatches(req, res, next);
  return data;
});

// router.get('/', /* validateToken, */ async (req, res, next) => {
//   const data = await TeamFactory().showTeams(req, res, next);
//   return data;
// });
// router.get('/:id', async (req, res, next) => {
//   const data = await TeamFactory().showTeamById(req, res, next);
//   return data;
// });

export default router;