import prisma from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';


const findEmailUser = async (email) => {

    const user = await prisma.users.findUnique({
        where: { email }
    });

    return user;
}

const matchUserPassword = async (password, userPassword) => {

    const validPassword = await bcrypt.compare(password, userPassword);

    return validPassword;
}

const generateToken = (userId, userEmail) => {

    const SECRET_KEY = process.env.SECRET_KEY;

    const token = jwt.sign(
        { 
            user_id: userId, 
            email: userEmail 
        }, 
        SECRET_KEY, 
        { expiresIn: '2h' }
    );

    return token;
};

export { findEmailUser, matchUserPassword, generateToken };