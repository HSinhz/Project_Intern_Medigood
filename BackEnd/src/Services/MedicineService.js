const Personnel = require('../app/models/Personnel');
const Medicine = require('../app/models/Medicine');
const Type = require('../app/models/TypeProduct');
const Category = require('../app/models/Category');
const Unit = require('../app/models/Unit');
const MedicineBranch = require('../app/models/MedicineStore');
const Branch = require('../app/models/Branch');
const {createIdMedicine} = require('../util/createId')
const {checkExistPersonnel, checkExistMedicine} = require('../util/checkExist');


const showMedicine = async ( kind, id, page, limit  , Email) => {
    try {
        let existPersonnel = await Personnel.findOne({Email: Email});
        if(existPersonnel){
            let offset = (page - 1) * limit;
            let countMedicine = await Medicine.find().countDocuments();
            let totalPages = Math.ceil(parseInt(countMedicine)/limit);
            let aggregationPipeline = [];

            // Kiểm tra nếu kind và id không rỗng thì thêm $match vào pipeline
            if (kind !== '' && id !== '') {
                aggregationPipeline.push({
                    $match: {
                        [kind]: parseInt(id)
                    }
                });
            }

            aggregationPipeline.push(
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'CategoryId',
                        foreignField: 'CategoryId',
                        as: 'CategoryInfor'
                    }
                }, {
                    $lookup: {
                        from: 'units',
                        localField: 'Unit',
                        foreignField: 'Id',
                        as: 'UnitInfor'
                    }
                }, {
                    $unwind: "$CategoryInfor"
                }, {
                    $unwind: "$UnitInfor"
                }, {
                    $project: {
                        MedicineId: 1,
                        CategoryId: 1,
                        MedicineName: 1,
                        MedicineDetailName: 1,
                        Price: 1,
                        ViePerBox: 1,
                        ImgUrl: 1,
                        Producer: 1,
                        Ingredient: 1,
                        Specification: 1,
                        Description: 1,
                        Unit: 1,
                        CategoryName: "$CategoryInfor.CategoryName",
                        UnitName: "$UnitInfor.UnitName"
                    }
                },
                {
                    $skip: parseInt(offset)
                },
                {
                    $limit: parseInt(limit)
                }
            );

            let dataMedicine = await Medicine.aggregate(aggregationPipeline);

            if( dataMedicine ){
                return {
                    Success: true,
                    Mess: 'Show All MEdicine',
                    Data: dataMedicine,
                    totalPages: totalPages,
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
           
            const newMedicine =  new Medicine({
                MedicineId: medicineId,
                MedicineName: medicinData.MedicineName,
                MedicineDetailName: medicinData.MedicineDetailName,
                TypeId: medicinData.TypeId,
                CategoryId: medicinData.CategoryId,
                Price: medicinData.Price,
                ViePerBox: medicinData.ViePerBox,
                ImgUrl: ImgUrl,
                Producer: medicinData.Producer,
                Ingredient: medicinData.Ingredient,
                Specification: medicinData.Specification,
                Description: medicinData.Description,
                Unit: medicinData.Unit,
                ViePerBlis: medicinData.ViePerBlis
            });

            let saveMedicine = await newMedicine.save();
            if( saveMedicine.MedicineId){
                sure = true;
                let totalBranch = await Branch.find().countDocuments();
                let branch = await Branch.find().select('Id');
                for (let index = 0; index < totalBranch; index++) {
                    console.log("branch[index].Id: ", branch[index].Id)
                    let newMedicineStore = await new MedicineBranch({
                        BranchId: branch[index].Id,
                        MedicineId: saveMedicine.MedicineId,
                        
                    }).save().then(() => console.log("Đã thêm thuốc mới vào cửa hàng thành công"))
                }
            }

            if(sure){
                return {
                    Success: true,
                    Mess: 'Tạo sản phẩm mới thành công',
                    Type: 200
                }
            } else {
                return {
                    Success: false,
                    Mess: 'Vui lòng thử lại',
                    Type: 200
                }
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
        console.log('existPersonnel', typeof(medicineId))
        if(existPersonnel.Success === true){
            let existMedicine = await Medicine.aggregate([
                {
                    $match: {
                        MedicineId: parseInt(medicineId)
                    }
                },{
                    $lookup: {
                        from: 'categories',
                        localField: 'CategoryId',
                        foreignField: 'CategoryId',
                        as: 'CategoryInfor'
                    }
                }, {
                    $lookup: {
                        from: 'units',
                        localField: 'Unit',
                        foreignField: 'Id',
                        as: 'UnitInfor'
                    }
                },{
                    $unwind: "$CategoryInfor"
                },{
                    $unwind: "$UnitInfor"
                },{
                    $project: {
                        MedicineId: 1,
                        CategoryId: 1,
                        TypeId: 1,
                        MedicineName: 1,
                        MedicineDetailName: 1,
                        Price: 1,
                        ViePerBox: 1,
                        ViePerBlis: 1,
                        ImgUrl: 1,
                        Producer: 1,
                        Ingredient: 1,
                        Specification: 1,
                        Description: 1,
                        Unit: 1,
                        CategoryName: "$CategoryInfor.CategoryName",
                        UnitName: '$UnitInfor.UnitName'
                    }
                }
            ])
            console.log("existMedicine", existMedicine)
            if( existMedicine) {
                return {
                    Success: true,
                    Mess: 'Medicine Detail',
                    Data: existMedicine[0],
                    Type: 200
                }
            }
            return {
                Success: false,
                Mess: 'Sản phẩm không tồn tại',
                Type: 200
            }
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

const getUnit = async (Email) => {
    try {
        let existPersonnel = await checkExistPersonnel(Email);
        if(existPersonnel.Success === true){
            let unit = await Unit.find();
            return {
                Success: true,
                Type: 200,
                Mess: 'Okkkk',
                Data: unit
            }
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

const editMedicine = async (medicineId, medicinData, NewImg, Email) => {
    try {
        console.log("Service")
        let existPersonnel = await checkExistPersonnel(Email);
        if(existPersonnel.Success === true){
            let existMedicine = await checkExistMedicine(medicineId);
            if(existMedicine.Success === true){
                let sure = false;
                await Medicine.updateOne({MedicineId: medicineId}, {
                    MedicineId: medicineId,
                    MedicineName: medicinData.MedicineName,
                    MedicineDetailName: medicinData.MedicineDetailName,
                    TypeId: medicinData.TypeId,
                    CategoryId: medicinData.CategoryId,
                    Price: medicinData.Price,
                    ViePerBox: medicinData.ViePerBox,
                    ImgUrl: NewImg,
                    Producer: medicinData.Producer,
                    Ingredient: medicinData.Ingredient,
                    Specification: medicinData.Specification,
                    Description: medicinData.Description,
                    Unit: medicinData.Unit,
                    ViePerBlis: medicinData.ViePerBlis
                }).then(() =>[ console.log("Đã cập nhật thành công"), sure = true]);
                if(sure) {
                    return {
                        Success: true,
                        Mess: 'Chỉnh sửa thành  công',
                        Type: 200
                    }
                } else {
                    return {
                        Success: false,
                        Mess: 'Vui lòng thử lại',
                        Type: 500
                    }
                }
                
            }
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

const deleteMedicine = async (medicineId, Email) => {
    try {
        console.log("medicineId: ", medicineId)
        let existEmployee = await checkExistPersonnel(Email);
        if(existEmployee.Success === true){
            let existMedicine = await checkExistMedicine(medicineId);
            if(existMedicine.Success === true){
                await Medicine.deleteOne({MedicineId: medicineId}).then(() => console.log('Đã xóa thành công'));
                return {
                    Success: true,
                    Mess: 'Xóa sản phẩm thành công',
                    Type: 200
                }
            }
            return existMedicine;
        }
        return existEmployee;
    } catch(error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại 1111',
            Type: 500
        }
    }
}

const getCategoryMedicineByType = async (TypeId, Email) => {
    try {
        let existEmployee = await checkExistPersonnel(Email);
        if(existEmployee.Success === true){
            let data = await Category.find({TypeId: TypeId});
            return {
                Success: true,
                Mess: 'Successfully',
                Type: 200,
                Data: data
            }
        }
        return existEmployee;
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
    getMedicineById: getMedicineById,
    getUnit: getUnit,
    editMedicine: editMedicine,
    deleteMedicine: deleteMedicine,
    getCategoryMedicineByType:getCategoryMedicineByType
}