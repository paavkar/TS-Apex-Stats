/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import { Request, Response } from 'express';
import "dotenv/config";
import BattleRoyale from '../models/battleRoyale';
import User from '../models/user';
import logger from '../logger';
import jsonwebtoken from 'jsonwebtoken';

const router = express.Router();


router.get('/', async (_req: Request, res: Response) => {
  /*
  const brEntries = BattleRoyale.find({});
  {
    res.send(brEntries);
  }*/
  //res.send('Something');
  const brEntries = await BattleRoyale.find({}).populate('user', { username: 1 });
  res.status(200).send(brEntries);
});


const getTokenFrom = (request: Request) => {
  const authorization: any = request.get('Authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};


router.post('/', async (req: Request, res: Response) => {
  //const brEntry = new BattleRoyale(req.body);
  
  const token = getTokenFrom(req);
  console.log(token);
  const decodedToken: any = jsonwebtoken.verify(token, String(process.env.SECRET));
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  /*
  brEntry.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      logger.info(`added new BR entry: ${brEntry}`);
      res.send(brEntry);
    }
  });
  */
  if (user) {
    const brEntry = new BattleRoyale({
      season: String(req.body.season),
      games: Number(req.body.games),
      wins: Number(req.body.wins),
      kills: Number(req.body.kills),
      kdr: Number(req.body.kdr),
      avgDamage: Number(req.body.avgDamage),
      user: user.id
    });
    const savedEntry = brEntry.save();
    res.status(201).send(savedEntry);
    logger.info(`added new BR entry: ${brEntry}`);
  } else {
    res.status(401).json({ error: 'unauthorized' });
  }
});

export default router;