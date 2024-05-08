require("dotenv").config();
const CustomerService = require('../../Services/CustomerService');
const {checkReqUser} = require('../../util/checkReqUser');
const {INTERNAL_ERROR, NO_LOGGIN} = require('../../config/db/httpCode');

class BranchStoreController {
    async getCustomer(req, res) {
        try {
            let check = checkReqUser(req.user);
            if( check.Success === true){
                let data = await CustomerService.getCustomer(req.user.email, req.params.phone);
                console.log("Data: ", data)
                return res.status(data.Type).json({data: data});
            }
            return res.status(check.Type).json({data: check})
        } catch (error){
            console.log(error);
            return res.status(INTERNAL_ERROR).json({
                Success: false,
                Mess: 'Error From Server'
            })
        }
    }
}

module.exports = new BranchStoreController;