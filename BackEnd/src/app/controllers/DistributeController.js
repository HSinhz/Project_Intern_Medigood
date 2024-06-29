const {checkReqUser, checkReqBody, checkReqParams} = require('../../util/checkReqUser')
const {INTERNAL_ERROR, NO_LOGGIN} = require('../../config/db/httpCode');
const DistributeService = require('../../Services/DistributeService');
class DistributeController {
    async createDistributeOrder ( req, res) {
        try {
            let check = checkReqUser(req.user);
            if( check.Success === true){
                let checkBody = checkReqBody(req.body);
                if(checkBody.Success === true){
                    let data = await DistributeService.createDistributeOrder(req.user.email, req.body)
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
    

    async getDistribute ( req, res) {
        try {
            let check = checkReqUser(req.user);
            if( check.Success === true){
                let data = await DistributeService.getDistributeOrder(req.user.email, req.query.page, req.query.limit);
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

    async createDistributeBranch (req, res) {
        try {
            console.log("Ádasdasdasda")
            let check = checkReqUser(req.user);
            if( check.Success === true){
                let checkBody = checkReqBody(req.body);
                if(checkBody.Success === true){
                    let data = await DistributeService.createDistributeBranch(req.user.email, req.body);
                    console.log("data: ", data)
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

    async getDistributeBranch(req, res) {
        try {
            let check = checkReqUser(req.user);
            if( check.Success === true){
                console.log("req.params: ", req.query)
                let data = await DistributeService.getDistributeBranch(req.user.email, req.user.bracnhId, req.query.page, req.query.limit);
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

    async showDetailDistribute(req, res) {
        try {
            let check = checkReqUser(req.user);
            if( check.Success === true){
                let checkParams = checkReqParams(req.params.DistributeId);
                if(checkParams.Success === true){
                    let data = await DistributeService.showDetailDistribute(req.user.email, req.params.DistributeId);
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

    async confirmDistributeOrder(req, res) {
        try {
            console.log("asadasd")
            let check = checkReqUser(req.user);
            if( check.Success === true){
                let checkParams = checkReqParams(req.params.DistributeId);
                if(checkParams.Success === true){
                    let checkBody = checkReqBody(req.body);
                    if( checkBody.Success === true){
                        console.log("req.body Cornfirm: ", req.body.DataDistribute);
                        let data = await DistributeService.confirmDistributeOrder(req.user.email, req.params.DistributeId, req.body.DataDistribute);
                        console.log("Data: ", data.Data);
                        return res.status(data.Type).json({data: data});
                    }
                    return res.status(checkBody.Type).json({data: checkBody});
                }
                return res.status(checkParams.Type).json({data: checkParams});
            }
            return res.status(check.Type).json({data: check});
        }catch (error){
            console.log("Error Controller", error);
            return res.status(INTERNAL_ERROR).json({
                Success: false,
                Mess: 'Vui lòng thử lại sau'
            })
        }
    }
}

module.exports = new DistributeController;