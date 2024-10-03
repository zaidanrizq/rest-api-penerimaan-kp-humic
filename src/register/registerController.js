import { Router } from "express";

import registerNewUser from "./registerService.js";

const router = new Router();

router.post('/', async (req, res) => {

    try {
        
        const newUserData = req.body;

        await registerNewUser(newUserData);

        return res.status(201).json({
            status: "Success",
            message: "User successfully registered"
        });

    } catch (error) {

        if (error.code === 'P2002') {
            return res.status(400).json({
                status: "Fail",
                message: `A user with this ${error.meta.target} already exists.`
            });
        }

        return res.status(500).json({
            status: "Error",
            message: "Internal server error."
        });
    }
    
});

export default router;