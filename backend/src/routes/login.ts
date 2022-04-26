import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  /*
  const brEntries = BattleRoyale.find({});
  {
    res.send(brEntries);
  }*/
  //res.send('Something');
  res.send(req.body);
});

export default router;