import { Request, Response } from 'express';
import BattleRoyale from '../models/battleRoyale';

export const allEntries = (req: Request, res: Response) => {
  const books = BattleRoyale.find((err: any, brEntries: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(books);
    }
  });
};