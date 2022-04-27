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

export interface IUser extends Document {
  id?: string;
  username: string;
  passwordHash: string;
}