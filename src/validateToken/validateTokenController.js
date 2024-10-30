import { Router } from "express";
import verify from "./validateTokenService.js";

const router = new Router();

router.get('/', (req, res) => {
    const authToken = req.headers['authorization']?.split(' ')[1];

    if (!authToken) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {

        const decoded =  verify(authToken);

        return res.status(200).json({
            valid: true,
            user: decoded
        })

    } catch (error) {
        return res.status(403).json({ valid: false, message: 'Invalid token' });
    }
});

export default router;
