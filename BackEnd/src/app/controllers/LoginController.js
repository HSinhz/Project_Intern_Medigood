const LoginService = require('../../Services/LoginService');


class LoginController {
    async handlerLogin(req, res ){
        try {
            if( !req.body.Email || !req.body.Password){
                return res.status(200).json({
                    Success: false,
                    Mess: 'User is required',
                })
            } 
            let data = await LoginService.handlerLogin(req.body);
            console.log(data)
            if (data && data.Success ) {
                res.cookie('AccessToken', data.access_token, { httpOnly: true});
            }
            return res.status(200).json( {data});
        } catch (error){
            return res.status(500).json({
                Success: false,
                Mess: 'Error from Server',
            })
        }
    }

    async getPosition(req, res){
        console.log("avccc", req.path)
        let data = await LoginService.getPosition();
        return res.status(403).json({data: data})
    }

    async testMDW(req, res){
        return res.status(200).json({data: "OKKKKKKKKKKKK"})
    }
 }

module.exports = new LoginController;