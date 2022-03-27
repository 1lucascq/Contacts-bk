import express, { NextFunction, Request, Response } from 'express';
import ErrorHandler from './middlewares/ErrorHandler';
import router from './routes';
import 'express-async-errors'
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../swagger.json";

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use("/", router);

app.use(ErrorHandler);

app.listen(PORT, () => console.log(`ON: ${PORT}`));
