const Personnel = require('../app/models/Personnel');
const Medicine = require('../app/models/Medicine');
const Type = require('../app/models/TypeProduct');
const Category = require('../app/models/Category');

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
                    Data: dataType
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

module.exports = {
    showMedicine: showMedicine,
    getTypeMedicine: getTypeMedicine
}