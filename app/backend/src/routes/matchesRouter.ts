import * as express from 'express';
import MatchesRepository from '../repository/matchesrepository';
import MatchesService from '../services/matchesservice';
import MatchesController from '../controllers/matchescontroller';
import validateToken from '../middlewares/validateToken';

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

router.post('/', validateToken, async (req, res, next) => {
  const newMatch = await MatchFactory().createMatch(req, res, next);
  return newMatch;
});

router.patch('/:id/finish', /* validateToken, */ async (req, res, next) => {
  const finishMatch = await MatchFactory().finishMatch(req, res, next);
  return finishMatch;
});

export default router;
