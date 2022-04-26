"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { battleRoyale } from '../types';
const battleRoyale_1 = __importDefault(require("../models/battleRoyale"));
const logger_1 = __importDefault(require("../logger"));
const router = express_1.default.Router();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    const brEntries = BattleRoyale.find({});
    {
      res.send(brEntries);
    }*/
    //res.send('Something');
    const brEntries = yield battleRoyale_1.default.find();
    res.status(200).send(brEntries);
}));
router.post('/', (req, res) => {
    const brEntry = new battleRoyale_1.default(req.body);
    brEntry.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(brEntry);
            logger_1.default.info(`added new BR entry: ${brEntry}`);
        }
    });
    /*
    const body = req.body;
    const brEntry = new BattleRoyale({
      season: String(body.season),
      games: Number(body.games),
      wins: Number(body.wins),
      kills: Number(body.kills),
      kdr: Number(body.kdr),
      avgDamage: Number(body.avgDamage)
    });
    const savedEntry = brEntry.save();
    res.status(201).send(savedEntry);*/
});
exports.default = router;
