const Branch = require('../app/models/Branch');
const Personnel = require('../app/models/Personnel');
const Position = require('../app/models/Position');

const getEmployeeWithPagination = async (Email) => {
    try {
        let existEmployee = await Personnel.findOne({Email: Email});
        if(existEmployee){
            let dataPersonnel = await Personnel.aggregate([
                {
                    $lookup: {
                        from: 'positions',
                        localField: 'PositionId',
                        foreignField: 'Id',
                        as: 'PositionInfor'
                    }
                }, {
                    $unwind: "$PositionInfor"
                },{
                    $project: { 
                        Position: "$PositionInfor.Name",
                        PositionId: "$PositionInfor.Id",
                        _id: 1,
                        BranchId: 1,
                        Email: 1,
                        Password: 1,
                        LastName: 1,
                        FirstName: 1,
                        Phone: 1,
                        Address: 1,
                        Gender: 1,
                        ImgUrl: 1,
                        BirthDay: 1,
                        Country: 1,
                        Online: 1,
                        OnlineTotal: 1,
                        TotalOrder: 1,
                        Decscription: 1,
                        createdAt: 1
                    }
                }
            ]);
            if(dataPersonnel && dataPersonnel.length > 0){
                return {
                    Success: true,
                    Mess: 'Show All Personnel',
                    Data: dataPersonnel
                }
            }
            return {
                Success: false,
                Mess: 'Không có dữ liệu',
                Data: ''
            }
        }
        return {
            Success: false,
            Mess: 'Không tồn tại người dùng',
            Data: ''
        }
    } catch (error){
        console.log(error);
        return {
            Success: false,
            Mess: 'Erorr From Server',
            Data: ''
        }
    }
}

const getPosition = async (Email) => {
    try{
        let existUser = await Personnel.findOne({Email: Email});
        if(existUser){
            let allPosition = await Position.find().select("Id Name");
            return {
                Success: true,
                Type: 200,
                Mess: 'All Position',
                Data: allPosition
            }
        }
        return {
            Success: false,
            Type: 401,
            Mess: 'Không tồn tại nhân viên',
            Data: '',
        }
    } catch (error){
        console.log(error);
        return {
            Success: false,
            Type: 500,
            Mess: 'Error from server',
            Data: ''
        }
    }
}

const createPersonal = async (dataEmployee, BirthDay, URL_IMG) => {
    try {
        let existEmployee = await Personnel.findOne({Email: dataEmployee.Email});
        let sure = false;
        if( existEmployee ){
            return {
                Success: false,
                Mess: 'Nhân viên đã tồn tại',
                Type: 201
            }
        }
        const newPersonnal = await new Personnel({
            Email: dataEmployee.Email,
            PositionId: dataEmployee.PositionId,
            BranchId: dataEmployee.BranchId,
            LastName: dataEmployee.LastName,
            FirstName: dataEmployee.FirstName,
            Phone: dataEmployee.Phone,
            Address: dataEmployee.Address,
            Country: dataEmployee.Country,
            BirthDay: BirthDay,
            Gender: dataEmployee.Gender,
            Decscription: dataEmployee.Decscription,
            ImgUrl :URL_IMG,
        }).save().then(() => [console.log("Tạo mới nhân viên thành công"), sure = true])
        console.log("Sure: ", sure);
        return {
            Success: true,
            Mess: 'Tạo nhân viên mới thành công',
            Type: 200
        }
    } catch( error ) {
        console.log(error);
        return {
            Success: false,
            Mess: "Error from server"
        }
    }
}

const editPersonal = async ( personalId , dataEmployee, BirthDay, URL_IMG) => {
    try {
        let existPersonal = await Personnel.findOne({_id: personalId});
        if(existPersonal){ 
            await Personnel.updateOne({_id: personalId}, {
                Email: dataEmployee.Email,
                PositionId: dataEmployee.PositionId,
                BranchId: dataEmployee.BranchId,
                LastName: dataEmployee.LastName,
                FirstName: dataEmployee.FirstName,
                Phone: dataEmployee.Phone,
                Address: dataEmployee.Address,
                Country: dataEmployee.Country,
                BirthDay: BirthDay,
                Gender: dataEmployee.Gender,
                Decscription: dataEmployee.Decscription,
                ImgUrl :URL_IMG,
            }).then( () => console.log("Chỉnh sửa nhân viên thành công"));
            return {
                Success: true,
                Type: 200,
                Mess: 'Chỉnh sửa nhân viên thành công'
            }
        }
        return {
            Success: false,
            Mess: 'Nhân viên không tồn tại',
            Type: 200
        }
    } catch (error){
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from server',
            Type: 500,
        }
    }
}

const deletePersonal = async (personalId) => {
    try {
        let existPersonal = await Personnel.findOne({_id: personalId});
        console.log('existPersonal', existPersonal)
        if(existPersonal){
            await Personnel.deleteOne({_id: personalId}).then(() => console.log("Delete Employee Success"));
            return {
                Success: true,
                Mess: 'Xóa nhân viên thành công',
                Type: 200
            }
        }
        return {
            Success: false,
            Mess: 'Nhân viên không tồn tại abcs',
            Type: 200
        }
    } catch( error ) {
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại sau',
            Type: 500
        }
    }
}
module.exports = {
    getEmployeeWithPagination: getEmployeeWithPagination,
    getPosition:getPosition,
    createPersonal: createPersonal,
    editPersonal: editPersonal,
    deletePersonal: deletePersonal
}