import { Router } from "express";

import { findUserWithEmail, checkUserPassword, createToken } from "./loginService.js";

const router = new Router();

router.post('/', async (req,res) => {

    try {

        const {email, password} = req.body;

        const user = await findUserWithEmail(email);

        if (!user) {

            return res.status(400).json({
                status: "Fail",
                message: "User not found"
            });

        }

        const validPassword = await checkUserPassword(password, user.password);

        if (!validPassword) {

            return res.status(400).json({
                status: "Fail",
                message: "Invalid Password"
            });

        }

        const token = createToken(user.user_id, user.email);

        res.status(200).json({
            status: "Success",
            message: "Login successful",
            token
        })

    } catch (error) {

        res.status(500).json({ message: 'Error logging in', error });

    }

});


export default router;