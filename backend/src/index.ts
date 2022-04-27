import express from 'express';
import { Request, Response } from 'express';
import arenasRouter from './routes/arenas';
import battleRoyaleRouter from './routes/battleRoyale';
import loginRouter from './routes/login';
import usersRouter from './routes/users';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose';
import "dotenv/config";
import logger from './logger';


app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.static('build'));
app.use(express.static('buildFE'));

mongoose.connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

const PORT = process.env.PORT;

app.get('/api/ping', (_req: Request, res: Response) => {
  res.send('pinging works');
});

app.use('/api/arenas', arenasRouter);
app.use('/api/br', battleRoyaleRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});