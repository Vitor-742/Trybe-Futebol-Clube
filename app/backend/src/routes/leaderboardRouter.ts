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

router.get('/home', async (req, res, next) => {
  const leaderboard = await MatchFactory().setLeaderboard(req, res, next);
  return leaderboard;
});

router.get('/away', async (req, res, next) => {
  const leaderboard = await MatchFactory().setLeaderboardAway(req, res, next);
  return leaderboard;
});

router.get('/', async (req, res, next) => {
  const leaderboard = await MatchFactory().setLeaderboardFull(req, res, next);
  return leaderboard;
});

export default router;
