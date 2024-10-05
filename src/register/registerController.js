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

            let existedData = error.meta.target;

            if (existedData === 'users_nim_key') {
                existedData = 'Nomor Induk Mahasiswa';
            } else if (existedData === 'users_email_key') {
                existedData = 'email';
            }

            return res.status(400).json({
                status: "Fail",
                message: `A user with this ${existedData} already exists.`
            });
        }

        return res.status(500).json({
            status: "Error",
            message: "Internal server error."
        });
    }
    
});

export default router;