import { Document, Schema } from 'mongoose';

export interface battleRoyale extends Document {
  id?: string;
  season: string;
  games: number;
  wins: number;
  kills: number;
  kdr: number;
  avgDamage: number;
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}

export interface IUser extends Document {
  id?: string;
  username: string;
  passwordHash: string;
}