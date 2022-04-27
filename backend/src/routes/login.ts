/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import "dotenv/config";
import User from '../models/user';
import logger from '../logger';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    logger.error(`invalid username or password on username: ${username}`);
    return res.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id
  };

  const token = jwt.sign(
    userForToken,
    String(process.env.SECRET),
    //{ expiresIn: 60*60 }
  );
  
  logger.info(`user: ${username} logged in`);
  res
    .status(200)
    .send({ token, username: user.username });
});

export default router;