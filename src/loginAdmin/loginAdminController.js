import { Router } from "express";
import { findAdmin, matchAdminPassword, signAdminToken } from "./loginAdminService.js"


const router = Router();

router.post('/', async (req,res) => {

    try {

        const { email, password } = req.body

        const admin = await findAdmin(email);

        if (!admin) {

            return res.status(400).json({
                status: "Fail",
                message: "Admin not found"
            });
        }

        const validPassword = await matchAdminPassword(password, admin.password);

        if (!validPassword) {

            return res.status(400).json({
                status: "Fail",
                message: "Invalid password"
            });
        }

        const token = signAdminToken(admin.admin_id, admin.email);

        res.status(200).json({
            status: "Success",
            message: "Login successful",
            token
        })

    } catch (error) {

        res.status(500).json({
            status: "Fail",
            message: `Error logging in ${error}`
        })
    }
});

export default router;