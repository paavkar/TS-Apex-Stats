import express from 'express';
import { Request, Response } from 'express';
//import { battleRoyale } from '../types';
import BattleRoyale from '../models/battleRoyale';
import logger from '../logger';

const router = express.Router();


router.get('/', async (_req: Request, res: Response) => {
  /*
  const brEntries = BattleRoyale.find({});
  {
    res.send(brEntries);
  }*/
  //res.send('Something');
  const brEntries = await BattleRoyale.find({});
  res.status(200).send(brEntries);
});


router.post('/', (req: Request, res: Response) => {
  const brEntry = new BattleRoyale(req.body);
  brEntry.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      logger.info(`added new BR entry: ${brEntry}`);
      res.send(brEntry);
    }
  });
  /*
  const body = req.body;
  const brEntry = new BattleRoyale({
    season: String(body.season),
    games: Number(body.games),
    wins: Number(body.wins),
    kills: Number(body.kills),
    kdr: Number(body.kdr),
    avgDamage: Number(body.avgDamage)
  });
  const savedEntry = brEntry.save();
  res.status(201).send(savedEntry);*/
});

export default router;