import express from "express";
import cors from "cors";
import 'dotenv/config';

import registerController from "./register/registerController.js"
import loginController from "./login/loginController.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/register', registerController);
app.use('/login', loginController);

const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(PORT, HOST, () => {

    console.log(`Server running on http://${HOST}:${PORT}`)

});