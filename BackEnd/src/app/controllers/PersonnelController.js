const PersonnelService = require('../../Services/PersonnelService');
const FireBaseService = require("../../Services/FireBaseService");
class PersonnelController {
    async getEmployeeWithPagination(req, res ){
        try {
            if( req.user) {
                console.log(req.user);
                let data = await PersonnelService.getEmployeeWithPagination(req.user.email);
                if( data && data.Success === true) {
                    return res.status(200).json({data:data})
                }
                return res.status(200).json({data:data})
            } 
            return res.status(401).json({
                data: {
                    Success: false,
                    Mess: 'Not Authenticated the user'
                }
            })
        } catch (error){
            return res.status(500).json({
                Success: false,
                Mess: 'Error from Server',
            })
        }
    }

    async getPosition(req, res){
        try{
            if(req.user){
                let data = await PersonnelService.getPosition(req.user.email);
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

    async createPersonal(req, res){
        try {
            const dataImg = req.file;
            console.log("req.body FB: ", JSON.parse(req.body.employeeData) );
            console.log("req.file FB: ", dataImg);
            if( req.user){
                if( req.file){
                    let data = await FireBaseService.uploadStorageFireBase(dataImg);
                    if( data && data.Success === true && data.URL_IMG){
                        let dataCreate = await PersonnelService.createPersonal(JSON.parse(req.body.employeeData), req.body.BirthDay, data.URL_IMG)
                        if( dataCreate && dataCreate.Success === true){
                            return res.status(200).json({data: dataCreate});
                        }
                        return res.status(200).json({data: dataCreate});
                    }
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

    async editPersonal(req, res){
        try {
            console.log('req.body.employeeData',  JSON.parse(req.body.employeeData));
            if( req.user ){
                if(req.params.personalId){
                    let personalId = req.params.personalId;
                    if(req.body.employeeData){
                        let newUrlImg  = '';
                        const dataImg = req.file;
                        const dataEdit = JSON.parse(req.body.employeeData);
                        // Xử lý khi thay đổi hình ảnh
                        if(dataImg){
                            let data = await FireBaseService.uploadStorageFireBase(dataImg);
                            if( data.Success === true && data.URL_IMG){
                                newUrlImg = data.URL_IMG;
                            }
                        }
                        // Xử lý khi thay đổi ngày sinh
                        if(req.body.BirthDay) {
                            // Kiểm tra người dùng có thay đổi hình ảnh hay không
                            if( newUrlImg != '') {
                                let dataEditPersonal = await PersonnelService.editPersonal(personalId, dataEdit , req.body.BirthDay, newUrlImg);
                                return res.status(dataEditPersonal.Type).json({data: dataEditPersonal});
                            } 
                            let dataEditPersonal = await PersonnelService.editPersonal(personalId, dataEdit, req.body.BirthDay, dataEdit.ImgUrl);
                            return res.status(dataEditPersonal.Type).json({data: dataEditPersonal});
                        }
                        // Nếu không thay đổi ngày sinh
                        if( newUrlImg != '') {
                            let dataEditPersonal = await PersonnelService.editPersonal(personalId, dataEdit, dataEdit.BirthDay ,newUrlImg);
                            return res.status(dataEditPersonal.Type).json({data: dataEditPersonal});
                        }
                        let dataEditPersonal = await PersonnelService.editPersonal(personalId, dataEdit, dataEdit.BirthDay, dataEdit.ImgUrl);
                        return res.status(dataEditPersonal.Type).json({data: dataEditPersonal});
                        
                    } 
                    return res.status(200).json({
                        Success: false,
                        Mess: 'Nhân viên không tồn tại'
                    })
                }
                return res.status(200).json({
                    Success: false,
                    Mess: 'Nhân viên không tồn tại'
                })
            }
            return res.status(process.env.NO_LOGGIN).json({
                data: {
                    Success: false,
                    Mess: 'Lỗi vui lòng thử lại sau'
                }
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                Success: false,
                Mess: 'Error From User'
            })
        }
    }

    async deletePersonal(req, res){
        try {
            if(req.user){
                if( req.params.personalId){
                    console.log('req.params.personalId', req.params.personalId)
                    let data = await PersonnelService.deletePersonal(req.params.personalId);
                    return res.status(data.Type).json({data: data});
                }
                return res.status(200).json({
                    Success: false,
                    Mess: 'Nhân viên không tồn tại'
                })
            } 
            return res.status(401).json({
                Success: false,
                Mess: 'Vui lòng đăng nhập'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                Success: false,
                Mess: 'Có lỗi vui lòng thử lại'
            })
        }
    }
}

module.exports = new PersonnelController;