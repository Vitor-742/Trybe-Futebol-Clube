import * as express from 'express';
import loginRouter from './loginRouter';
import teamRouter from './teamsRouter';
import matchesRouter from './matchesRouter';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchesRouter);
router.use('/', matchesRouter);

export default router;
