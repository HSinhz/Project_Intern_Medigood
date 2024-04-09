const BranchService = require('../../Services/BranchService');

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
 }

module.exports = new BranchController;