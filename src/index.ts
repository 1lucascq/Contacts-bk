import express from 'express';
import ErrorHandler from './middlewares/ErrorHandler';
import router from './routes';
import 'express-async-errors'



const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use("/", router);

app.get("/", (req, res) => res.status(200).json({ test: (typeof req.body.phoneNumbers) }));


app.use(ErrorHandler);

app.listen(PORT, () => console.log(`ON: ${PORT}`));
