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
require("dotenv/config");
const battleRoyale_1 = __importDefault(require("../models/battleRoyale"));
const user_1 = __importDefault(require("../models/user"));
const logger_1 = __importDefault(require("../logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    const brEntries = BattleRoyale.find({});
    {
      res.send(brEntries);
    }*/
    //res.send('Something');
    const token = getTokenFrom(req);
    let decodedToken = null;
    if (token != null) {
        decodedToken = jsonwebtoken_1.default.verify(String(token), String(process.env.SECRET));
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' });
        }
    }
    //console.log(token);
    const user = yield user_1.default.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id);
    //console.log(user);
    if (user) {
        const id = user === null || user === void 0 ? void 0 : user.id;
        console.log(id);
        const brEntries = yield battleRoyale_1.default
            .find({ user: id })
            .find({ user: id }).populate('user', { username: 1 });
        res.status(200).send(brEntries);
    }
    /*
    const brEntries = await BattleRoyale
        .find({})
        .find({}).populate('user', { username: 1 });
      res.status(200).send(brEntries);
      */
}));
const getTokenFrom = (request) => {
    const authorization = request.get('Authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
};
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const brEntry = new BattleRoyale(req.body);
    const token = getTokenFrom(req);
    console.log(token);
    const decodedToken = jsonwebtoken_1.default.verify(String(token), String(process.env.SECRET));
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    const user = yield user_1.default.findById(decodedToken.id);
    /*
    brEntry.save((err: any) => {
      if (err) {
        res.send(err);
      } else {
        logger.info(`added new BR entry: ${brEntry}`);
        res.send(brEntry);
      }
    });
    */
    if (user) {
        const brEntry = new battleRoyale_1.default({
            season: String(req.body.season),
            games: Number(req.body.games),
            wins: Number(req.body.wins),
            kills: Number(req.body.kills),
            kdr: Number(req.body.kdr),
            avgDamage: Number(req.body.avgDamage),
            user: user.id
        });
        const savedEntry = yield brEntry.save();
        const brEntryToReturn = yield battleRoyale_1.default
            .findById(savedEntry._id)
            .populate('user', { username: 1 });
        res.status(201).send(brEntryToReturn);
        logger_1.default.info(`added new BR entry: ${brEntry}`);
    }
    else {
        res.status(401).json({ error: 'unauthorized' });
    }
}));
exports.default = router;
