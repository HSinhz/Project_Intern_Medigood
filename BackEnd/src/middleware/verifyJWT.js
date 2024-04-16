const { verifyJWT } = require('./jwtacction');
const {getRefreshTokenUser} = require("../Services/JWTService");

const checkUserJWT = (req, res, next )=> {
        let cookies = req.cookies;
        // console.log("cookie check JWT", cookies)
        if( cookies && cookies.AccessToken){
            let decodeAccessToken = verifyJWT(cookies.AccessToken);
            let expiresIn = decodeAccessToken.exp;
            let check = checkExpiredJWT(expiresIn);
            if(decodeAccessToken){  // Kiểm tra AccessToken có tồn tại
                if( check ){ // Kiểm tra thời gian của AccessToken
                    req.user = decodeAccessToken;
                    next();
                } else {
                    let data = getRefreshTokenUser(decodeAccessToken, decodeAccessToken.email)
                    if( data&& data.Success === true ){
                        res.cookie('AccessToken', data.AT, { httpOnly: true});
                        req.user = decodeAccessToken;
                        next();
                    } else if( data && data.Success === false && data.Type == 401){
                        return res.status(data.Type).json({data: data});
                    }
                    next(); // ==> chuyển người dùng tới trang /homme nếu tất cả đã hoàn thành 
                }
            } else {
                return res.status(401).json({
                    Success: false,
                    MessErr: "Access Token is not exist" 
                })
            }
        } else {
            console.log("Ddaat nefffffffffffff")
            return res.status(401).json({
                data: {
                    Success: false,
                    Mess: 'Not Authenticated the user'
                }
            })
        }
}

const checkPermissionUser = ( req, res, next) => {
        if(req.user ){
            let roleUser = req.user.Roles;
            const reversedRoles = [...roleUser].reverse();
            console.log("req.user.Roles", reversedRoles)
            let uri = req.path;
            uri = uri.substring(0, uri.lastIndexOf('/'));
            console.log("uri: ", uri);

            if( roleUser[0] === '*' ){
                console.log("this is Boss, welcom Boss")
                next();
            } else if(reversedRoles.includes(uri) ){
                console.log("Đây là nhân viên có quyền")
                next();
            } else {
                console.log("Không phận sự miễn vào ")
                return res.status(403).json({
                    data: {
                        Success: false,
                        Mess: 'No permissions to access'
                    }
                })
            }
        } else {
            return res.status(401).json({
                data: {
                    Success: false,
                    Mess: 'Not Authenticated the user'
                }
            })
        }
}

const checkExpiredJWT = (expiresIn) => {
    let currentTimes = Math.floor(Date.now() / 1000);
    // console.log("Time now: " ,currentTimes - expiresIn);
    if( currentTimes > expiresIn ){
       return false;
    } else {
        return true;
    }
}

module.exports = {
    checkUserJWT: checkUserJWT,
    checkPermissionUser:checkPermissionUser,
}