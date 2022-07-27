import * as express from 'express';
import loginRouter from './loginRouter';
import teamRouter from './teamsRouter';
import matchesRouter from './matchesRouter';
import leaderboardRouter from './leaderboardRouter';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
