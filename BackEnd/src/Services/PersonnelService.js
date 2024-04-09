const Employee = require('../app/models/Employee');
const Position = require('../app/models/Position');

const getEmployeeWithPagination = async (Email) => {
    try {
        let existEmployee = await Employee.findOne({Email: Email});
        if(existEmployee){
            let dataPersonnel = await Employee.find();
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
        let existUser = await Employee.findOne({Email: Email});
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

module.exports = {
    getEmployeeWithPagination: getEmployeeWithPagination,
    getPosition:getPosition
}