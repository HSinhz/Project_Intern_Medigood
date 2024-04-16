const { parse } = require("dotenv");
require("dotenv").config();
const FireBaseService = require("../../Services/FireBaseService");
const MedicinService = require("../../Services/MedicineService");
class MedicineController {
    async showMedicine( req, res) {
        try {
            if( req.user){
                let data = await MedicinService.showMedicine(req.user.email)
                console.log(data);
                return res.status(data.Type).json({data:data});
            }
            return res.status(401).json({
                Success:false,
                Mess: 'Vui lòng đăng nhập'
            })
        } catch (error ){
            console.log(error);
            return res.status(500).json({
                Success: false,
                Mess: 'Error From Server'
            })
        }
    }

    async getTypeMedicine(req, res){
        try {
            if(req.user){
                let data = await MedicineService.getTypeMedicine(req.user.email);
                return res.status(data.Type).json({data: data})
            }
            return res.status(401).json({
                Success: false,
                Mess: 'Vui lòng đăng nhập'
            })
        } catch (error){
            console.log("Error Controller: ", error);
            return res.status(500).json({
                Success: false,
                Mess: 'Có lỗi vui lòng thử lại sau'
            })
        }
    }
}

module.exports = new MedicineController;