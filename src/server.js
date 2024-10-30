import express from "express";
import cors from "cors";
import 'dotenv/config';

import registerController from "./register/registerController.js"
import loginController from "./login/loginController.js";
import validateTokenController from "./validateToken/validateTokenController.js"
import roleKPController from "./KPRole/roleKPController.js"
import userProfileController from "./userProfile/userProfileController.js"
import applicationKPController from "./KPApplication/applicationKPController.js"
import adminLoginController from "./loginAdmin/loginAdminController.js"
import batchController from "./batch/batchController.js"

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/register', registerController);
app.use('/login', loginController);
app.use('/verify-token', validateTokenController);
app.use('/role-kp', roleKPController);
app.use('/user', userProfileController);
app.use('/application-kp', applicationKPController)
app.use('/admin-login', adminLoginController)
app.use('/batch', batchController);

const PORT = process.env.PORT;

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)

});