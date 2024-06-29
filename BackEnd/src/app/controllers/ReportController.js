const {checkReqUser, checkReqBody} = require('../../util/checkReqUser')
const {INTERNAL_ERROR, NO_LOGGIN} = require('../../config/db/httpCode');
const ReportService = require('../../Services/ReportService')
class ReportController {

    async getSaleAllBranches (req, res) {
        try {
            let check = checkReqUser(req.user);
            if( check.Success === true){
               let data = await ReportService.getReportSales(req.user.email, req.query.type, req.query.start, req.query.end, req.user.bracnhId );
               return res.status(data.Type).json({data: data})
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

module.exports = new ReportController;