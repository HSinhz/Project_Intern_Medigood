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
                let data = await MedicinService.getTypeMedicine(req.user.email);
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

    async getCategoryMedicine(req, res) {
        try {
            if( req.user){
                let data = await MedicinService.getCategoryMedicine(req.user.email);
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

    async createMedicine(req, res){
        try {
            const dataImg = req.file;
            if(req.user){
                if(req.file){
                    if(req.body.medicineData) {
                        let data = await FireBaseService.uploadStorageFireBase(dataImg);
                        if(data && data.Success === true){
                            let dataCreate = await MedicinService.createMedicine(JSON.parse(req.body.medicineData), data.URL_IMG, req.user.email);
                            return res.status(dataCreate.Type).json({data: dataCreate});
                        }
                        return res.status(200).json({
                            Success: false,
                            Mess: 'Vui lòng thử lại'
                        })
                    }
                    return res.status(200).json({
                        Success: false,
                        Mess: 'Vui lòng nhập đầy đủ thông tin   '
                    })
                }
                return res.status(process.env.GOOD_REQ).json({ data: {
                    Success: false,
                    Mess: 'Vui lòng chọn ảnh'
                }})
            }
            return res.status(401).json({
                Success: false,
                Mess: 'Vui lòng đăng nhập'
            })
        } catch(error){
            console.log("Error Controller", error);
            return res.status(500).json({
                Success: false,
                Mess: 'Vui lòng thử lại sau'
            })
        }
    }

    async getMedicineById(req, res){
        try{
            if(req.user){
                if( req.params){
                    let data = await MedicinService.getMedicineById(req.params.medicineId, req.user.email);
                    return res.status(data.Type).json({data: data});
                }
                return res.status(200).json({
                    Success: false,
                    Mess: 'Không có sản phẩm',
                })
            }
            return res.status(401).json({
                Success: false,
                Mess: 'Vui lòng đăng nhập'
            })
        } catch(error){
            console.log("Error Controller", error);
            return res.status(500).json({
                Success: false,
                Mess: 'Vui lòng thử lại sau'
            })
        }
    }
}

module.exports = new MedicineController;