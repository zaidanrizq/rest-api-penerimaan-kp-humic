import prisma from "../db/index.js";
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'

const findAdminWithEmail = async (email) => {

    const admin = await prisma.admin.findUnique({
        where: {email}
    });

    return admin
}

const comparePassword = async (inputPassword, adminPassword) => {

    const valid = await bcrypt.compare(inputPassword,adminPassword);

    return valid;
};

const signToken = (adminId, adminEmail) => {

    const SECRET_KEY = process.env.SECRET_KEY;

    const token = jwt.sign(
        {
            admin_id: adminId,
            admin_email: adminEmail
        },
        SECRET_KEY,
        {
            expiresIn: '3h'
        }
    );

    return token;
}

export { findAdminWithEmail, comparePassword, signToken }