import express from 'express';
import { battleRoyale } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Something');
});

export default router;