const { createJWT, verifyJWT } = require('./jwtacction')

const checkJWTApp = (req, res, next) => {
    try {
        let accessToken = req.body.AT;
        if( accessToken ){
            let decodeAT = verifyJWT(accessToken);
            req.user = decodeAT;
            next();
        } else {
            return res.status(200).json({
                Success: false,
                Mess: 'AccessToken is not exist'
            })
        }   
    } catch( error ) {
        console.log("Error: ", error);
        return res.status(500).json({
            Success: false,
            Mess: "Có lỗi xảy ra. Vui lòng thử lại"
        })
    }
}

module.exports = {
    checkJWTApp: checkJWTApp,
}