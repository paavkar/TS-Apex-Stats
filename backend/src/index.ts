import express from 'express';
import arenasRouter from './routes/arenas';
import battleRoyaleRouter from './routes/battleRoyale';
const app = express();
import cors from 'cors';
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.use('/api/arenas', arenasRouter);
app.use('/api/battleRoyale', battleRoyaleRouter);
app.use(express.static('build'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});