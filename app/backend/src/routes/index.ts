import * as express from 'express';
import loginRouter from './loginRouter';
import teamRouter from './teamsRouter';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/teams', teamRouter);

export default router;
