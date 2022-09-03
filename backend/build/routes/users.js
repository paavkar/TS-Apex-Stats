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
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const logger_1 = __importDefault(require("../logger"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
/*
router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find({});
  res.json(users);
});*/
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!password || password.length < 3) {
        return res.status(400).json({
            error: 'invalid password'
        });
    }
    const existingUser = yield user_1.default.findOne({ username });
    if (existingUser) {
        return res.status(400).json({
            error: 'username must be unique'
        });
    }
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(String(password), saltRounds);
    const user = new user_1.default({
        username,
        passwordHash
    });
    const savedUser = yield user.save();
    res.status(201).json(savedUser);
    logger_1.default.info(`new user created: ${savedUser}`);
}));
exports.default = router;
