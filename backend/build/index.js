"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const arenas_1 = __importDefault(require("./routes/arenas"));
const battleRoyale_1 = __importDefault(require("./routes/battleRoyale"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const logger_1 = __importDefault(require("./logger"));
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
app.use(express_1.default.static('build'));
app.use(express_1.default.static('buildFE'));
mongoose_1.default.connect(`${process.env.MONGODB_URI}`)
    .then(() => {
    logger_1.default.info('connected to MongoDB');
})
    .catch((error) => {
    logger_1.default.error('error connection to MongoDB:', error.message);
});
const PORT = process.env.PORT;
app.use('/api/arenas', arenas_1.default);
app.use('/api/br', battleRoyale_1.default);
app.listen(PORT, () => {
    logger_1.default.info(`Server running on port ${PORT}`);
});
