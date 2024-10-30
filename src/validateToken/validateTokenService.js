import verifyToken from "./validateTokenRepository.js";


const verify = (token) => {

    const decoded = verifyToken(token);

    return decoded;
};

export default verify;