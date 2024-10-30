import jwt from "jsonwebtoken";
import 'dotenv/config'

const verifyToken = (token) => {

    const SECRET_KEY = process.env.SECRET_KEY;

    const decoded = jwt.verify(token, SECRET_KEY);

    return decoded
};

export default verifyToken;
