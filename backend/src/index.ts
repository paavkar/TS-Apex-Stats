import express from 'express';
import arenasRouter from './routes/arenas';
import battleRoyaleRouter from './routes/battleRoyale';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose';
import "dotenv/config";
import logger from './logger';


app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

mongoose.connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

const PORT = 3001;

app.use('/api/arenas', arenasRouter);
app.use('/api/br', battleRoyaleRouter);
app.use(express.static('build'));

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});