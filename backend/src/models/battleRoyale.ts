import mongoose from 'mongoose';
import { battleRoyale } from '../types';

const battleRoyaleSchema = new mongoose.Schema<battleRoyale>({
  season: { type: String, required: true },
  games: { type: Number, required: true },
  wins: { type: Number, required: true },
  kills: { type: Number, required: true },
  kdr: { type: Number, required: true },
  avgDamage: { type: Number, required: true },
});

module.exports = mongoose.model<battleRoyale>('BattleRoyale', battleRoyaleSchema);