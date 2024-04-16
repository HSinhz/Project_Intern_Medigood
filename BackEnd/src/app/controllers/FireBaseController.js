const { parse } = require("dotenv");
require("dotenv").config();
const FireBaseService = require("../../Services/FireBaseService");
class FireBaseController {
    async uploadImg( req, res) {
        try {
            const dataImg = req.file;
            console.log("req.body FB: ", JSON.parse(req.body.employeeData) );
            console.log("req.file FB: ", req.file);
            if( req.user){
                if( req.file){
                    let data = await FireBaseService.uploadStorageFireBase(dataImg);
                    return res.status(process.env.GOOD_REQ).json({data: data});
                }
                return res.status(process.env.GOOD_REQ).json({ data: {
                    Success: false,
                    Mess: 'Vui lòng chọn ảnh'
                }})
            }
            return res.status(process.env.NO_LOGGIN).json({
                data: {
                    Success: false,
                    Mess: 'Lỗi vui lòng thử lại sau'
                }
            })
            
        } catch (error ){
            console.log("------------------ Có lỗi khi upload ảnh ----------------");
            console.log(error);
            return res.status(500).json({
                Success: false,
                Mess: 'Error From Server'
            })
        }
    }
}

module.exports = new FireBaseController;