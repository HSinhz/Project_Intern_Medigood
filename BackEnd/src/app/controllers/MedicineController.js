const { parse } = require("dotenv");
require("dotenv").config();
const FireBaseService = require("../../Services/FireBaseService");
const MedicinService = require("../../Services/MedicineService");
const {checkReqUser} = require('../../util/checkReqUser')

class MedicineController {
    async showMedicine( req, res) {
        try {
            if( req.user){
                console.log("req.query: ", req.query);
                const {kind, id, page, limit} = req.query;
                let data = await MedicinService.showMedicine(kind, id, page, limit, req.user.email)
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

    async getUnit(req, res){
        try {
            if(req.user){
                let data = await MedicinService.getUnit(req.user.email);
                return res.status(data.Type).json({data: data})
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

    async editMedicine(req, res) {
        try {
            console.log("controller")
            if(req.user){
                if(req.params.medicineId){
                    if( req.body.medicineData){
                        let medicineId = req.params.medicineId;
                        let newUrlImg  = '';
                        const dataImg = req.file;
                        const dataEdit = JSON.parse(req.body.medicineData);
                        if(dataImg){
                            let data = await FireBaseService.uploadStorageFireBase(dataImg);
                            if( data.Success === true && data.URL_IMG){
                                newUrlImg = data.URL_IMG;
                            }
                        }
                        if( newUrlImg != '') {
                            let dataEditMedicine = await MedicinService.editMedicine(medicineId, dataEdit ,newUrlImg, req.user.email);
                            return res.status(dataEditMedicine.Type).json({data: dataEditMedicine});
                        }
                        let dataEditMedicine = await MedicinService.editMedicine(medicineId, dataEdit, dataEdit.ImgUrl, req.user.email);
                        return res.status(dataEditMedicine.Type).json({data: dataEditMedicine});
                    }
                }
                return res.status(200).json({
                    Success: false,
                    Mess: 'Sản phẩm không tồn tại'
                })
            } 
            return res.status(401).json({
                Success: false,
                Mess: 'Vui lòng đăng nhập'
            })
        } catch (error) {
            console.log("Error Controller", error);
            return res.status(500).json({
                Success: false,
                Mess: 'Vui lòng thử lại sau'
            })
        }
    }

    async deleteMedicine(req, res) {
        try {
            let check = checkReqUser(req.user);
            console.log(check)
            if( check.Success === true){
                if(req.params.medicineId){
                    let data = await MedicinService.deleteMedicine(req.params.medicineId, req.user.email);
                    return res.status(data.Type).json({data: data});
                }
                return res.status(200).json({
                    Success: false,
                    Mess: 'Sản phẩm không tồn tại'
                })
            }
            return res.status(check.Type).json({data: check});
            
        } catch (error) {
            console.log("Error Controller", error);
            return res.status(500).json({
                Success: false,
                Mess: 'Vui lòng thử lại sau'
            })
        }
    }

    async getCategoryMedicineByType(req, res){
        try {
            console.log('vao roi ne')
            let check = checkReqUser(req.user);
            if( check.Success === true){
                if(req.params.typeId !== ''){
                    console.log("req.params.typeId: ", req.params.typeId)
                    let data = await MedicinService.getCategoryMedicineByType(req.params.typeId, req.user.email)
                    console.log(data);
                    return res.status(data.Type).json({data: data})
                }
                return res.status(200).json({
                    Success: true,
                })
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
}

module.exports = new MedicineController;