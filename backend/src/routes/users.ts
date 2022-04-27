/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { Request, Response } from 'express';
import User from '../models/user';
import logger from '../logger';
import bcrypt from 'bcrypt';

const router = express.Router();


router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find({});
  res.json(users);
});

router.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({
      error: 'username must be unique'
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
  logger.info(`new user created: ${savedUser}`);
});

export default router;