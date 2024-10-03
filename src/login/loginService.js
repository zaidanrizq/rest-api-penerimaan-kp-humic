import { findEmailUser, matchUserPassword, generateToken } from "./loginRepository.js";


const findUserWithEmail = async (email) => {

    const user = await findEmailUser(email);

    return user;
};

const checkUserPassword = async (password, userPassword) => {

    const validPassword = await matchUserPassword(password, userPassword);

    return validPassword;
};

const createToken = (userId, userEmail) => {

    const token = generateToken(userId, userEmail);

    return token;
};

export { findUserWithEmail, checkUserPassword, createToken };