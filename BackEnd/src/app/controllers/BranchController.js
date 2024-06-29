const BranchService = require('../../Services/BranchService');
const {checkReqUser, checkReqBody} = require('../../util/checkReqUser');
const {INTERNAL_ERROR, NO_LOGGIN} = require('../../config/db/httpCode');


class BranchController {
    async getBranch(req, res){
        try{
            if(req.user){
                let data = await BranchService.getBranch(req.user.email);
                if( data && data.Success === true){
                    return res.status(data.Type).json({data: data});
                }
                return res.status(data.Type).json({data: data});
            }
            return res.status(401).json({
                data: {
                    Success: false,
                    Mess: 'Lỗi vui lòng thử lại sau'
                }
            })
        } catch( error){
            return res.status(500).json({
                Success: false,
                Mess: 'Error from Server',
            }) 
        }
    }

    async getBranchWithId(req, res){
        try {
            let check = checkReqUser(req.user);
            if( check.Success === true){
               let data = await BranchService.getBranchWithId(req.user.email, req.user.bracnhId);
               return res.status(data.Type).json({data:data})
            }
            return res.status(check.Type).json({data: check});
            
        } catch (error) {
            console.log("Error Controller", error);
            return res.status(INTERNAL_ERROR).json({
                Success: false,
                Mess: 'Vui lòng thử lại sau 1111'
            })
        }
    }
 }

module.exports = new BranchController;