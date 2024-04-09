require("dotenv").config();
const jwt = require('jsonwebtoken');

const createJWT = ( payload ,expiresIn) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try{
        token = jwt.sign(payload, key, { expiresIn: Number(expiresIn) });
    } catch ( err ){   
        console.log(err);
    }
    return token;
}

const verifyJWT = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try{
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (err) {
        console.log(err);
    }
    return data;
}
module.exports = {
    createJWT,
    verifyJWT
}