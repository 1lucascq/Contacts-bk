const express = require("express");
const ErrorHandler = require("./middlewares/ErrorHandler");
const PhBookController = require("./controllers/PhBookController");
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/contacts", PhBookController);

app.use(ErrorHandler);

app.listen(PORT, () => console.log(`ON: ${PORT}`));
