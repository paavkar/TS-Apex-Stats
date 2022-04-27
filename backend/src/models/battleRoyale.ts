/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import { battleRoyale } from '../types';

const battleRoyaleSchema: mongoose.Schema = new mongoose.Schema<battleRoyale>({
  season: { type: String, required: true },
  games: { type: Number, required: true },
  wins: { type: Number, required: true },
  kills: { type: Number, required: true },
  kdr: { type: Number, required: true },
  avgDamage: { type: Number, required: true },
});

battleRoyaleSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  }
});

const BattleRoyale = mongoose.model<battleRoyale>('BattleRoyale', battleRoyaleSchema);

export default BattleRoyale;