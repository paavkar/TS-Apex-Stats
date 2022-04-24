import { Document } from 'mongoose';

export interface battleRoyale extends Document {
  id?: string;
  season: string;
  games: number;
  wins: number;
  kills: number;
  kdr: number;
  avgDamage: number;
}