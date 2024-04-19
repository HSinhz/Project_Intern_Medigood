const Personnel = require('../app/models/Personnel');
const Medicine = require('../app/models/Medicine');
const Type = require('../app/models/TypeProduct');
const Category = require('../app/models/Category');
const {createIdMedicine} = require('../util/createId')
const {checkExistPersonnel} = require('../util/checkExistPersonnel');
const {checkExistMedicine} = require('../util/checkExistMedicine')
const showMedicine = async (Email) => {
    try {
        let existPersonnel = await Personnel.findOne({Email: Email});
        if(existPersonnel){
            let dataMedicine = await Medicine.aggregate([
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'CategoryId',
                        foreignField: 'CategoryId',
                        as: 'CategoryInfor'
                    }
                }, {
                    $unwind: "$CategoryInfor"
                } , {
                    $project: {
                        MedicineId: 1,
                        CategoryId: 1,
                        MedicineName: 1,
                        Price: 1,
                        Quantity: 1,
                        ImgUrl: 1,
                        Producer: 1,
                        Ingredient: 1,
                        Specification: 1,
                        Description: 1,
                        Unit: 1,
                        CategoryName: "$CategoryInfor.CategoryName"
                    }
                }
            ]);

            if( dataMedicine ){
                return {
                    Success: true,
                    Mess: 'Show All MEdicine',
                    Data: dataMedicine,
                    Type: 200
                }
            }
            return {
                Success: false,
                Mess: 'No Data',
                Data: '',
                Type: 200
            }
        }
    } catch(error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại sau',
            Type: 500
        }
    }
}

const getTypeMedicine = async (Email) => {
    try {
        let existPersonnel = await Personnel.findOne({Email: Email});
        if(existPersonnel){
            let dataType = await Type.find();
            if( dataType){
                return {
                    Success: true,
                    Mess: 'Successfully',
                    Data: dataType,
                    Type: 200
                }
            }
        }
        return {
            Success: false,
            Mess: 'Vui lòng đăng nhập',
            Type: 401
        }
    } catch (error){
        console.log("Error SerVice:", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại sau',
            Type: 500
        }
    }
}

const getCategoryMedicine = async (Email) => {
    try {
        let existPersonnel = await Personnel.findOne({Email: Email});
        if( existPersonnel ){
            let data = await Category.find();
            return {
                Success: true,
                Mess: 'Successfully',
                Type: 200,
                Data: data
            }
        }
        return {
            Success: false,
            Mess: 'Vui lòng đăng nhập',
            Type: 401
        }
    } catch (error){
        console.log("Error SerVice:", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại sau',
            Type: 500
        }
    }
}

const createMedicine = async (medicinData, ImgUrl, Email) => {
    try {

        let existPersonnel = await Personnel.findOne({Email: Email});
        if(existPersonnel){
            let sure = false;
            let medicineId = createIdMedicine();
            const newMedicine = await new Medicine({
                MedicineId: medicineId,
                MedicineName: medicinData.MedicineName,
                TypeId: medicinData.TypeId,
                CategoryId: medicinData.CategoryId,
                Price: medicinData.Price,
                Quantity: medicinData.Quantity,
                ImgUrl: ImgUrl,
                Producer: medicinData.Producer,
                Ingredient: medicinData.Ingredient,
                Specification: medicinData.Specification,
                Description: medicinData.Description,
                Unit: medicinData.Unit,
            }).save().then(() => [console.log("Tạo mới nhân viên thành công"), sure = true] );
            if(sure){
                return {
                    Success: true,
                    Mess: 'Tạo sản phẩm mới thành công',
                    Type: 200
                }
            }
            return {
                Success: false,
                Mess: 'Vui lòng thử lại sau',
                Type: 200
            }

        } 
        return {
            Success: false,
            Mess: 'Vui lòng đăng nhập',
            Type: 401
        }
    }catch (error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui Lòng thử lại sau',
            Type: 500
        }
    }
}

const getMedicineById = async (medicineId, Email) => {
    try {
        let existPersonnel = await checkExistPersonnel(Email);
        console.log('existPersonnel', existPersonnel)
        if(existPersonnel.Success === true){
            let existMedicine = await checkExistMedicine(medicineId);
            return existMedicine;
        }
        return existPersonnel;
    } catch(error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại',
            Type: 500
        }
    }
}
module.exports = {
    showMedicine: showMedicine,
    getTypeMedicine: getTypeMedicine,
    getCategoryMedicine: getCategoryMedicine,
    createMedicine: createMedicine,
    getMedicineById: getMedicineById
}