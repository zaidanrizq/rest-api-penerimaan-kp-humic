import insertNewUsers from "./registerRepository.js";


const registerNewUser = async (newUserData) => {

    await insertNewUsers(newUserData);

};


export default registerNewUser