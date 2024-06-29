const {OK, INTERNAL_ERROR} = require("../config/db/httpCode");
const Customer = require("../app/models/Customer");
const Category = require("../app/models/Category");
const Medicine = require("../app/models/Medicine");
const Prescription = require('../app/models/Prescription');
const PrescriptionDetail = require('../app/models/PrescriptionDetail');
const {checkExistPersonnel, checkExistMedicine, checkExistBranch, checkExistCustomer} = require('../util/checkExist');
const {createIdPrescription} = require('../util/createId');


const handlerLoginApp = async (Phone) => {
    try{
        let existCustomer = await Customer.findOne({CustomerPhone: Phone});
        if(existCustomer){
            return {
                Success: true,
                Type: OK,
            }
        }
        return {
            Success: false,
            Type: OK,
            Mess: 'Sai số điện thoại',
        }
    } catch (error){
        console.log(error);
        return {
            Success: false,
            Type: INTERNAL_ERROR,
            Mess: 'Error from service',
        }
    }
}

const getCategory = async () => {
    try{
        let dataCategory = await Category.find();
        console.log("dataCategory: ", dataCategory);
        if( dataCategory){
            return {
                Success: true,
                Type: OK,
                Data: dataCategory
            }
        }
        return {
            Success: false,
            Type: OK,
            Mess: 'Sai số điện thoại',
        }
    } catch (error){
        console.log(error);
        return {
            Success: false,
            Type: INTERNAL_ERROR,
            Mess: 'Error from service',
        }
    }
}

const getMedicine = async () => {
    try{
        let dataMedicine = await Medicine.find().select("ImgUrl MedicineId MedicineName Price Specification");
        console.log("dataMedicine: ", dataMedicine);
        if( dataMedicine){
            return {
                Success: true,
                Type: OK,
                Data: dataMedicine
            }
        }
        return {
            Success: false,
            Type: OK,
            Mess: 'Sai số điện thoại',
        }
    } catch (error){
        console.log(error);
        return {
            Success: false,
            Type: INTERNAL_ERROR,
            Mess: 'Error from service',
        }
    }
}

const getDetailMedicine = async (MedicineId) => {
    try{
        let dataMedicine = await Medicine.aggregate([
            {
                $match: {
                    MedicineId: parseInt(MedicineId)
                }
            }, {
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
                    ViePerBlis: 1,
                    ImgUrl: 1,
                    Producer: 1,
                    Ingredient: 1,
                    Specification: 1,
                    Inventory: 1,
                    Stock: 1,
                    Description: 1,
                    Unit: 1,
                    CategoryName: "$CategoryInfor.CategoryName",
                    UnitName: "$UnitInfor.UnitName"
                }
            },
        ]);
        console.log("dataMedicine: ", dataMedicine[0]);
        if( dataMedicine){
            return {
                Success: true,
                Type: OK,
                Data: dataMedicine[0]
            }
        }
        return {
            Success: false,
            Type: OK,
            Mess: 'Sai số điện thoại',
        }
    } catch (error){
        console.log(error);
        return {
            Success: false,
            Type: INTERNAL_ERROR,
            Mess: 'Error from service',
        }
    }
}

const getDataCustomer = async (Phone) => {
    try{
        let dataCustomer = await Customer.findOne({CustomerPhone: Phone});
        console.log("dataMedicine: ", dataCustomer);
        if( dataCustomer){
            return {
                Success: true,
                Type: OK,
                Data: dataCustomer
            }
        }
        return {
            Success: false,
            Type: OK,
            Mess: 'Sai số điện thoại',
        }
    } catch (error){
        console.log(error);
        return {
            Success: false,
            Type: INTERNAL_ERROR,
            Mess: 'Error from service',
        }
    }
}

const buyPrescription = async (dataPrescription) => {
    try{
        let existCustomer = checkExistCustomer(dataPrescription.CustomerPhone);
        if( existCustomer){
            let PrescriptionId = createIdPrescription();
            let TotalOrder = 0
            for(let index = 0; index < dataPrescription.InforMedic.length; index++) {
                TotalOrder = parseInt(TotalOrder) + dataPrescription.InforMedic[index].TotalPrice;
            }
            const newPrescription = new Prescription({
                PrescriptionId: PrescriptionId,
                CustomerPhone: dataPrescription.CustomerPhone,
                Address: dataPrescription.Address,
                Total: TotalOrder,
                Status: 1
            })

            let savePrescription = await newPrescription.save();
            if(savePrescription.PrescriptionId ){
                let sure = false;
                // Lưu chi tiết đơn thuốc
                for (let index = 0; index <  dataPrescription.InforMedic.length; index++) {
                    let detailPres = await new PrescriptionDetail({
                        MedicineId: dataPrescription.InforMedic[index].MedicineId,
                        PrescriptionId: savePrescription.PrescriptionId,
                        MedicineName: dataPrescription.InforMedic[index].MedicineName,
                        Quantity: dataPrescription.InforMedic[index].Quantity,
                        TotalPrice: dataPrescription.InforMedic[index].TotalPrice,
                        Unit: dataPrescription.InforMedic[index].Unit
                    }).save().then(() => [console.log("Đã lưu tất cả"), sure = true])
                }

                let newPoint = parseInt(dataPrescription.Point) + Math.floor(TotalOrder/ 1000)
                console.log("New Point: ", newPoint)
                if(dataPrescription.Point > 0 ){
                    await Customer.updateOne({CustomerPhone: dataPrescription.CustomerPhone},{
                        Point: newPoint
                    }).then(() =>[ console.log("Đã cập nhật điểm thành công"), sure = true]);
                }
                if( sure === true ){
                    return {
                        Success: true,
                        Mess: 'Mua hàng thành công',
                        Type: OK
                    }
                }
            }
        }
        return existCustomer;
    } catch (error){
        console.log(error);
        return {
            Success: false,
            Type: INTERNAL_ERROR,
            Mess: 'Error from service',
        }
    }
}
module.exports = {
    handlerLoginApp: handlerLoginApp,
    getCategory: getCategory,
    getMedicine: getMedicine,
    getDetailMedicine: getDetailMedicine,
    getDataCustomer: getDataCustomer,
    buyPrescription: buyPrescription
}