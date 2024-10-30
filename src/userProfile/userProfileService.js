import { findVerifiedUser, updateVerifiedUser } from "./userProfileRepository.js";


const getVerifiedUser = async (token) => {

    const user = await findVerifiedUser(token)

    return user;
}

const updateUserData = async (token, data, files) => {

    const user = await updateVerifiedUser(token, data, files);

    return user;
}

export {getVerifiedUser, updateUserData}