import bcrypt from "bcrypt";
import prisma from "../db/index.js";


const insertNewUsers = async (newUserData) => {

    const hashedPassword = await bcrypt.hash(newUserData.password, 10);

    await prisma.users.create({
        data: {
            full_name: newUserData.full_name,
            nim: newUserData.nim,
            perguruan_tinggi: newUserData.perguruan_tinggi,
            prodi: newUserData.prodi,
            phone_number: newUserData.phone_number,
            email: newUserData.email,
            password: hashedPassword
        }
    });

};


export default insertNewUsers