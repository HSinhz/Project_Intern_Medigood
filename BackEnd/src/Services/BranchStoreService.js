const Personnel = require('../app/models/Personnel');
const Medicine = require('../app/models/Medicine');
const MedicineBranch = require('../app/models/MedicineStore');
const Branch = require('../app/models/Branch');
const Prescription = require('../app/models/Prescription');
const PrescriptionDetail = require('../app/models/PrescriptionDetail');
const Customer = require("../app/models/Customer");
const Unit = require('../app/models/Unit');
const {checkExistPersonnel, checkExistMedicine, checkExistBranch, checkExistCustomer} = require('../util/checkExist');
const {INTERNAL_ERROR, OK} = require("../config/db/httpCode");
const {createIdPrescription} = require('../util/createId');

const getMedicineBranch = async (Email, BranchId) => {
    try {
        console.log("BranchId Controller: ", BranchId)
        let existPersonnel = await checkExistPersonnel(Email);
        if(existPersonnel.Success === true){
            let existBranch = await checkExistBranch(BranchId);
            if(existBranch.Success === true){
                let dataMedicineBranch = await MedicineBranch.aggregate([
                    {
                        $match: {
                            BranchId: BranchId
                        }
                    }, {
                        $lookup: {
                            from: 'medicines',
                            localField: 'MedicineId',
                            foreignField: 'MedicineId',
                            as: 'MedicineInfor'
                        }
                    }, {
                        $unwind: "$MedicineInfor"
                    }, {
                        $lookup: {
                            from: 'units',
                            localField: 'MedicineInfor.Unit',
                            foreignField: 'Id',
                            as: 'UnitInfor'
                        }
                    }, {
                        $unwind: "$UnitInfor"
                    }, {
                        $project: {
                            MedicineId: 1,
                            BranchId: 1,
                            Quantity: 1,
                            MedicineName: "$MedicineInfor.MedicineName",
                            Price: "$MedicineInfor.Price",
                            UnitId: "$MedicineInfor.Unit",
                            UnitName: '$UnitInfor.UnitName',
                            ImgUrl: '$MedicineInfor.ImgUrl',
                            ViePerBlis: '$MedicineInfor.ViePerBlis',
                            ViePerBox: '$MedicineInfor.ViePerBox'
                        }
                    }
                ])
                if(dataMedicineBranch) {
                    return {
                        Success: true,
                        Mess: 'Dữ liệu dược phẩm',
                        Data: dataMedicineBranch,
                        Type: 200
                    }
                }
                return {
                    Success: false,
                    Mess: 'Không có dữ liệu',
                    Type: 200
                }
            }
            return existBranch;
        }
        return existPersonnel;
    } catch(error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại 1111',
            Type: 500
        }
    }
}

const getStoreWithId = async (Email, BranchId) => {
    try {
        let existPersonnel = await checkExistPersonnel(Email);
        if(existPersonnel.Success === true) {
            let dataBranch = await Branch.findOne({Id: BranchId});
            if(dataBranch){
                return {
                    Success: true,
                    Mess: 'Dữ liệu chi nhánh',
                    Data: dataBranch,
                    Type: 200
                }
            }
            return {
                Success: false,
                Mess: 'Không có dữ liệu chủa chi nhánh',
                Type: 200
            }
        }
        return existPersonnel;
    } catch(error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại 1111',
            Type: 500
        }
    }
}

const createOrder = async (Email, BranchId, PersonnelId ,dataOrder) => {
    try {
        console.log("dataOrder: ", dataOrder)
        let existPersonnel = await checkExistPersonnel(Email);
        if(existPersonnel.Success === true){
            let existBranch = await checkExistBranch(BranchId);
            if( existBranch.Success === true){
                let existCustomer = await checkExistCustomer(dataOrder.phoneCustomer);
                console.log('existCustomer: ', existCustomer)
                if(existCustomer.Success === false){
                    dataOrder.phoneCustomer = '';
                } 
                let PrescriptionId = createIdPrescription();
                console.log("PrescriptionId: ", PrescriptionId);
                const newPrescription = new Prescription({
                    PrescriptionId: PrescriptionId,
                    BranchId: BranchId,
                    EmployeeId: PersonnelId,
                    CustomerPhone: dataOrder.phoneCustomer,
                    Total: dataOrder.total
                })
                let savePrescription = await newPrescription.save();
                if(savePrescription.PrescriptionId ) {
                    let sure = false;
                    // Lưu chi tiết đơn thuốc
                    for (let index = 0; index < dataOrder.orderItems.length; index++) {
                        console.log("dataOrder.orderItems: ", dataOrder.orderItems)
                        let detailPres = await new PrescriptionDetail({
                            MedicineId: dataOrder.orderItems[index].medicineId,
                            PrescriptionId: savePrescription.PrescriptionId,
                            MedicineName: dataOrder.orderItems[index].medicineName,
                            Quantity: dataOrder.orderItems[index].quantity,
                            TotalPrice: dataOrder.orderItems[index].totalPrice
                        }).save().then(() => [console.log("Đã lưu tất cả"), sure = true])
                    }


                    // Cập nhật điểm cho khách hàng
                    if(dataOrder.point > 0 ){
                        console.log('dataOrder.point: ', dataOrder.point )
                        console.log("dataOrder.phoneCustome: ", dataOrder.phoneCustomer)
                        await Customer.updateOne({CustomerPhone: dataOrder.phoneCustomer},{
                            Point: dataOrder.point
                        }).then(() =>[ console.log("Đã cập nhật điểm thành công"), sure = true]);
                    }

                    console.log("sure: ", sure);
                    if( sure === true ){
                        return {
                            Success: true,
                            Mess: 'Tạo đơn hàng thành công',
                            Type: OK
                        }
                    }
                }
                return {
                    Success: false,
                    Mess: 'Thất bại vui lòng thử lại sau',
                    Type: OK
                }
            }
            return existBranch;
        }
        return existPersonnel;
    } catch(error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại 1111',
            Type: INTERNAL_ERROR
        }
    }
}

const fetchDataPrescription = async (Email, BranchId, page, limit, phone) => {
    try {
        let existPersonnel = await checkExistPersonnel(Email);
        if( existPersonnel.Success === true){
            let existBranch = await checkExistBranch(BranchId);
            if( existBranch.Success === true) {
                let dataPrescriptions = [];
                let offset = (page - 1) * limit;
                let countPrescription = 0;
                if( phone === ''){
                    countPrescription = await Prescription.find({BranchId: BranchId}).countDocuments();
                    dataPrescriptions = await Prescription.find({BranchId: BranchId}).skip(offset).limit(limit);
                } else {
                    let existCustomer = await checkExistCustomer(phone);
                    if(existCustomer.Success === true){
                        countPrescription = await Prescription.find({BranchId: BranchId , CustomerPhone: phone}).countDocuments();
                        dataPrescriptions = await Prescription.find({
                            BranchId: BranchId,
                            CustomerPhone: phone
                        }).skip(offset).limit(limit);
                    } else {
                        return existCustomer;
                    }
                }
                let totalPages = Math.ceil(parseInt(countPrescription)/limit);

                return {
                    Success : true,
                    Mess: 'All Data',
                    Type: OK,
                    totalPages: totalPages,
                    Data: dataPrescriptions
                }
            }
            return existBranch;
        }
        return existPersonnel;
    } catch(error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại 1111',
            Type: INTERNAL_ERROR
        }
    }
}

const fetchPrescriptionDetail = async (Email, BranchId, PrescriptionId) => {
    try {
        let existPersonnel = await checkExistPersonnel(Email);
        if( existPersonnel.Success === true){
            let existBranch = await checkExistBranch(BranchId);
            if( existBranch.Success === true) {
                let dataPrescription = await Prescription.aggregate([
                    {
                        $match: {
                            PrescriptionId: PrescriptionId
                        }
                    }, {
                        $lookup: {
                            from: 'customers',
                            localField: 'CustomerPhone',
                            foreignField: 'CustomerPhone',
                            as: 'CustomerInfo'
                        }
                    } , {
                        $unwind: "$CustomerInfo" 
                    } , {
                        $lookup: {
                            from: "branches",
                            localField: 'BranchId',
                            foreignField: 'Id',
                            as: 'BranchInfor'
                        }
                    } , {
                        $unwind: "$BranchInfor"
                    } , {
                        $lookup: {
                            from: 'personnels',
                            localField: 'EmployeeId',
                            foreignField: '_id',
                            as: 'PersonnelInfor'
                        }
                    }, {
                        $unwind: "$PersonnelInfor"
                    } ,  
                    {
                        $lookup: {
                            from : "prescriptiondetails",
                            localField: 'PrescriptionId',
                            foreignField: 'PrescriptionId',
                            as: "DetailInfor"
                        }
                    } , {
                        $unwind: "$DetailInfor"
                    } , 
                    {
                        $lookup: {
                            from:  'medicines',
                            localField: 'DetailInfor.MedicineId',
                            foreignField: 'MedicineId',
                            as: "MedicineInfor"
                        }
                    } , {
                        $unwind : "$MedicineInfor"
                    } , 
                    {
                        $project: {
                            PrescriptionId: 1,
                            EmployeeLastName: '$PersonnelInfor.LastName',
                            EmployeeFirstName: '$PersonnelInfor.FirstName',
                            CustomerName: '$CustomerInfo.CustomerName',
                            CustomerPhone: 1,
                            Total: 1,
                            AddressBranch: '$BranchInfor.Address',
                            MedicineImg: '$MedicineInfor.ImgUrl',
                            MedicineId: '$MedicineInfor.MedicineId',
                            MedicineName: '$MedicineInfor.MedicineName',
                            MedicinePrice: '$MedicineInfor.Price',
                            Quantity: "$DetailInfor.Quantity",
                        }
                    }
                ])
                if(dataPrescription ){
                    return {
                        Success: true,
                        Type: OK,
                        Data: dataPrescription
                    }
                }
                return {
                    Success: false,
                    Mess: 'Đơn hàng không tồn tại',
                    Type: OK
                }
            }
            return existBranch;
        }
        return existPersonnel;
    } catch(error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại 1111',
            Type: INTERNAL_ERROR
        }
    }
}
module.exports = {
    getStoreWithId: getStoreWithId,
    getMedicineBranch: getMedicineBranch,
    createOrder: createOrder,
    fetchDataPrescription: fetchDataPrescription,
    fetchPrescriptionDetail: fetchPrescriptionDetail
}