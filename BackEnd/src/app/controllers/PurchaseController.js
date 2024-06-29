const {checkReqUser, checkReqBody} = require('../../util/checkReqUser')
const {INTERNAL_ERROR, NO_LOGGIN} = require('../../config/db/httpCode');
const PurchaseService = require('../../Services/PurchaseService')
class PurchaseController {

    async createPurchaseOrder(req, res) {
        try {
            let check = checkReqUser(req.user);
            if( check.Success === true){
                let checkBody = checkReqBody(req.body);
                if(checkBody.Success === true){
                    let data = await PurchaseService.createPurchaseOrder(req.user.email, req.body)
                    return res.status(data.Type).json({data: data});
                }
                return res.status(checkBody.Type).json({data: checkBody});
            }
            return res.status(check.Type).json({data: check});
            
        } catch (error) {
            console.log("Error Controller", error);
            return res.status(500).json({
                Success: false,
                Mess: 'Vui lòng thử lại sau 1111'
            })
        }
    }

    async getAllPurchaseOrder (req, res) {
        try {
            let check = checkReqUser(req.user);
            if( check.Success === true){
                console.log("req.params: ", req.query)
                let data = await PurchaseService.getAllPurchaseOrder(req.user.email, req.query.page, req.query.limit);
                console.log("data: ", data);
                return res.status(data.Type).json({data: data});
            }
            return res.status(check.Type).json({data: check});
        }catch (error){
            console.log("Error Controller");
            return res.status(INTERNAL_ERROR).json({
                Success: false,
                Mess: 'Vui lòng thử lại sau'
            })
        }
    }    
}

module.exports = new PurchaseController;