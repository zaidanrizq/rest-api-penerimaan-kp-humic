import { Router } from "express";
import {getVerifiedUser,updateUserData} from "./userProfileService.js";
import upload from "../multer/index.js";

const fileFields = upload.fields([
    { name: 'profile_picture', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
    { name: 'portfolio', maxCount: 1 },
  ]);

const router = Router()

router.get('/me', async (req, res) => {

    const authToken = req.headers['authorization']?.split(' ')[1];

    if (!authToken) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {

        const user = await getVerifiedUser(authToken)

        return res.status(200).json({
            valid: true,
            data: user
        })

    } catch (error) {
        return res.status(403).json({ valid: false, message: 'Invalid token' });
    }
        
});

router.put('/me', fileFields, async (req, res) => {

    const authToken = req.headers['authorization']?.split(' ')[1];

    if (!authToken) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {

        const newData = req.body;

        const profilePictureFile = req.files['profile_picture'] ? req.files['profile_picture'][0] : null;
        
        const cvFile = req.files['cv'] ? req.files['cv'][0] : null;

        const portfolioFile = req.files['portfolio'] ? req.files['portfolio'][0] : null;

        const files = [
            {
                folder: 'User CVs',
                file: cvFile,
            },
            {
                folder: 'User Profile Pictures',
                file: profilePictureFile,
            },
            {
                folder: 'User Portfolios',
                file: portfolioFile,
            },
        ];

        const updatedUser = await updateUserData(authToken, newData, files);

        return res.status(200).json({
            valid: true,
            data: updatedUser
        });

    } catch (error) {
        if (error.code === 'P2002') {

            let existedData = error.meta.target;

            if (existedData === 'users_nim_key') {
                existedData = 'Nomor Induk Mahasiswa';
            } else if (existedData === 'users_email_key') {
                existedData = 'Email';
            }

            return res.status(400).json({
                status: "Fail",
                message: `A user with this ${existedData} already exists.`
            });
        }

        return res.status(500).json({
            status: "Error",
            message: `Internal Server Error: ${error} ${error.message}`
        });
    }
});


export default router;