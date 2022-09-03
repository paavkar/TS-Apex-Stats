"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const mongoose_1 = __importDefault(require("mongoose"));
const battleRoyaleSchema = new mongoose_1.default.Schema({
    season: { type: String, required: true },
    games: { type: Number, required: true },
    wins: { type: Number, required: true },
    kills: { type: Number, required: true },
    kdr: { type: Number, required: true },
    avgDamage: { type: Number, required: true },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
});
battleRoyaleSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const BattleRoyale = mongoose_1.default.model('BattleRoyale', battleRoyaleSchema);
exports.default = BattleRoyale;
