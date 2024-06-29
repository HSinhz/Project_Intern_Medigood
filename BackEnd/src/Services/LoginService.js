require("dotenv").config();
const Personnel = require('../app/models/Personnel');
const { createJWT} = require('../middleware/jwtacction');
const bcryptjs = require('bcryptjs');
const GroupRole = require('../app/models/GroupRole');
const handlerLogin = async ( userData) => {
    try{
        let data = {};
        let existUser = await Personnel.findOne({ Email: userData.Email});
            if( existUser ){
                let checkpass =  checkPassWord( userData.Password, existUser.Password);
                if( checkpass ){
                        let roleUser = await GroupRole.find({PositionId: existUser.PositionId}).select("Url");
                        const groupRoleUrl = roleUser.map(role => role.Url);
                        let payload = {
                            personnelId: existUser._id,
                            email: existUser.Email,
                            Roles: groupRoleUrl,
                            bracnhId: existUser.BranchId                            
                        }
                        // tạo Access_Token và Refresh_Token
                        let accessToken = createJWT(payload, 30*60);
                        let refreshToken = createJWT(payload, null);
                        Personnel.updateOne( {Email:existUser.Email},{
                            $set: {
                                Online: true,
                                Access_token: accessToken,
                                Refresh_token: refreshToken
                            }
                        }).catch( err => { console.error(err); });
                        let PersonnelName = existUser.LastName + " " +existUser.FirstName
                        console.log("PersonnelName: ", PersonnelName);
                        return {
                            Success :true,
                            Mess : 'Đăng nhập thành công',
                            PersonnelName: PersonnelName,
                            Email: existUser.Email,
                            Position: existUser.PositionId,
                            access_token:  accessToken,
                        }        
                    
                }   
                return {
                    data : {
                        Success :false,
                        Mess : 'Email hoặc mật khẩu sai', 
                    }    
                }
            } 
            return {    
                data : {
                    Success :false,
                    Mess : 'Email hoặc mật khẩu sai',
                }    
            }
    } catch (error) {
        console.log(error);
        return {
            Success: false,
            Mess: 'ERROR: from Server'
        }
    }
}

const checkPassWord = (inputPass, hashPass) => {
    return bcryptjs.compareSync( inputPass, hashPass);
}

const getPosition = async () => {
    console.log("iiii")
    let data = await GroupRole.find();
    return data;
}
module.exports = {
    handlerLogin: handlerLogin,
    getPosition: getPosition

}