require("dotenv").config();
const BranchStoreService = require("../../Services/BranchStoreService");
const CustomerService = require('../../Services/CustomerService');
const {checkReqUser, checkReqParams} = require('../../util/checkReqUser');
const {INTERNAL_ERROR, NO_LOGGIN} = require('../../config/db/httpCode');

class BranchStoreController {
    async getBranchStoreWithId( req, res) {
        try {
            let check = checkReqUser(req.user);
            if(check.Success === true){
                let data = await BranchStoreService.getStoreWithId(req.user.email, req.user.bracnhId);
                return res.status(data.Type).json({data: data})
            }
            return res.status(check.Type).json({
                data: check
            })
            
        } catch (error ){
            console.log(error);
            return res.status(500).json({
                Success: false,
                Mess: 'Error From Server'
            })
        }
    }

    async getMedicineBranch(req, res) {
        try{
            console.log("req.user: ", req.user)
            let check =  checkReqUser(req.user);
            if(check.Success === true){
                let data = await BranchStoreService.getMedicineBranch(req.user.email, req.user.bracnhId);
                return res.status(data.Type).json({data: data});
            }
            return res.status(check.Type).json({data: check})
        } catch (error){
            console.log(error);
            return res.status(500).json({
                Success: false,
                Mess: 'Error From Server'
            })
        }
    }

    async createPrescription(req, res) {
        try{
            console.log("req.user: ", req.user);
            console.log("req.body: ", req.body);
            let check =  checkReqUser(req.user);
            if(check.Success === true){
                let data = await BranchStoreService.createOrder(req.user.email, req.user.bracnhId, req.user.personnelId, req.body);
                return res.status(data.Type).json({data: data});
            }
            return res.status(NO_LOGGIN).json({data: check})
        } catch (error){
            console.log(error);
            return res.status(INTERNAL_ERROR).json({
                Success: false,
                Mess: 'Error From Server'
            })
        }
    }

    async getCustomer(req, res) {
        try {
            let check = checkReqUser(req.user);
            if( check.Success === true){
                let data = await CustomerService.getCustomer(req.user.email, req.body);
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

    async fetchDataPrescriptionWithBranch(req, res){
        try {
            let check = checkReqUser(req.user);
            if( check.Success === true){
                console.log("req.params: ", req.query)
                let data = await BranchStoreService.fetchDataPrescription(req.user.email, req.user.bracnhId, req.query.page, req.query.limit, req.query.phone);
                console.log("data: ", data);
                return res.status(data.Type).json({data: data});
            }
            return res.status(check.Type).json({data: check});
        } catch (error){
            console.log("Error Controller");
            return res.status(INTERNAL_ERROR).json({
                Success: false,
                Mess: 'Vui lòng thử lại sau'
            })
        }
    }

    async fetchPrescriptionDetail(req, res ){
        try {
            let check = checkReqUser(req.user);
            if( check.Success === true){
                let checkParams = checkReqParams(req.params.prescriptionId);
                if(checkParams.Success === true){
                    let data = await BranchStoreService.fetchPrescriptionDetail(req.user.email, req.user.bracnhId,  req.params.prescriptionId);
                    console.log("Data: ", data.Data);
                    return res.status(data.Type).json({data: data});
                }
                return res.status(checkParams.Type).json({data: checkParams});
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

module.exports = new BranchStoreController;