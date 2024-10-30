import { findAdminWithEmail, comparePassword, signToken } from "./loginAdminRepository.js"


const findAdmin = async (email) => {

    const admin = await findAdminWithEmail(email);

    return admin;
};


const matchAdminPassword = async (inputPassword, adminPassword) => {

    const valid = await comparePassword(inputPassword, adminPassword);

    return valid;
}

const signAdminToken = (adminId, adminEmail) => {

    const token = signToken(adminId, adminEmail)

    return token;
}

export { findAdmin, matchAdminPassword, signAdminToken }