"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const battleRoyaleSchema = new mongoose_1.default.Schema({
    season: { type: String, required: true },
    games: { type: Number, required: true },
    wins: { type: Number, required: true },
    kills: { type: Number, required: true },
    kdr: { type: Number, required: true },
    avgDamage: { type: Number, required: true },
});
const BattleRoyale = mongoose_1.default.model('BattleRoyale', battleRoyaleSchema);
exports.default = BattleRoyale;
