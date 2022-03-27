"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ErrorHandler_1 = __importDefault(require("./middlewares/ErrorHandler"));
const routes_1 = __importDefault(require("./routes"));
require("express-async-errors");
const cors = require('cors');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express_1.default.json());
app.use("/", routes_1.default);
app.use(ErrorHandler_1.default);
app.listen(PORT, () => console.log(`ON: ${PORT}`));
