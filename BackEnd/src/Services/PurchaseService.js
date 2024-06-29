const Purchase = require('../app/models/Purchase');
const PurchaseDetail = require('../app/models/PurchaseDetail');
const Medicine = require('../app/models/Medicine');
const GroupStatus = require('../app/models/GroupStatus');
const {checkExistPersonnel, checkExistMedicine, checkExistSupplier} = require('../util/checkExist');
const {OK, INTERNAL_ERROR} = require("../config/db/httpCode");
const {createIdPurchase} = require('../util/createId');

const createPurchaseOrder = async (Email, DataPurchase) => {
    try {
        console.log('DataPurchase: ', DataPurchase)
        let existEmployee = await checkExistPersonnel(Email);
        if(existEmployee.Success === true){
            let existSupplier = await checkExistSupplier(DataPurchase.SupplierId);
            console.log("existSupplier: ", existSupplier)
            if( existSupplier.Success === true ){

                // Create and Save Purchase 
                let PurchaseId = createIdPurchase();
                const newPurchase = new Purchase({
                    PurchaseId: PurchaseId,
                    EmployeeEmail: Email,
                    SupplierId: DataPurchase.SupplierId,
                    TotalQuantity: DataPurchase.TotalQuantity,
                    Total: DataPurchase.TotalPurchase
                })
                let savePurchase = await newPurchase.save();
                if(savePurchase.PurchaseId){
                    let sure = false;
                    for( let index = 0; index < DataPurchase.DataMedicPurchase.length ; index++) {
                        // Save Detail Purchase Order
                        await new PurchaseDetail({
                            PurchaseId: savePurchase.PurchaseId,
                            MedicineId: DataPurchase.DataMedicPurchase[index].MedicineId,
                            Quantity: DataPurchase.DataMedicPurchase[index].QuantityMedic,
                            TotalPrice: DataPurchase.DataMedicPurchase[index].TotalMedicPurchase,
                        }).save().then(() => [console.log("Đã lưu tất cả"), sure = true]);

                        // Update Stock and Inventory Medicine in WareHouse
                        let currentQuantityMedicine = await Medicine.findOne({MedicineId:DataPurchase.DataMedicPurchase[index].MedicineId}).select('Stock Inventory');
                        let addStock = parseInt(currentQuantityMedicine.Stock) + parseInt(DataPurchase.DataMedicPurchase[index].QuantityMedic);
                        let addInventory = parseInt(currentQuantityMedicine.Inventory) + parseInt(DataPurchase.DataMedicPurchase[index].QuantityMedic);
                        await Medicine.updateOne({MedicineId: DataPurchase.DataMedicPurchase[index].MedicineId}, {
                            Stock: addStock,
                            Inventory: addInventory
                        }).then(() => console.log("Đã cập nhật kho hàng thành công"))
                    }

                    return {
                        Success: true,
                        Mess: 'Thêm mới đơn nhập hàng thành công',
                        Type: OK
                    }
                }
            }
        }
        return existEmployee;
    } catch(error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại',
            Type: INTERNAL_ERROR
        }
    }
}

const getAllPurchaseOrder = async (Email, Page, Limit) => {
    try {
        let existEmployee = await checkExistPersonnel(Email);
        if(existEmployee.Success === true){
            let offset = (Page - 1) * Limit;
            let countPurchase = await Purchase.find().countDocuments();
            let totalPages = Math.ceil(parseInt(countPurchase)/Limit);

            const dataPurchase = await Purchase.aggregate([
                {
                    $lookup: {
                        from: 'personnels',
                        localField: 'EmployeeEmail',
                        foreignField: 'Email',
                        as: 'PeronnelInfor'
                    }
                }, {
                    $lookup: {
                        from: 'suppliers',
                        localField: 'SupplierId',
                        foreignField: 'SupplierId',
                        as: 'SupplierInfor'
                    }
                }, {
                    $unwind: "$PeronnelInfor"
                }, {
                    $unwind: "$SupplierInfor"
                }, {
                    $project: {
                        PurchaseId: 1,
                        EmployeeLastName: "$PeronnelInfor.LastName",
                        EmployeeFirstName: '$PeronnelInfor.FirstName',
                        SupplierName: "$SupplierInfor.SupplierName",
                        Total: 1,
                        ObjectStatus: 1,
                        Status: 1,
                        createdAt: 1,
                    }
                }, {
                    $skip: parseInt(offset)
                }, {
                    $limit: parseInt(Limit)
                }
            ]);
            
            for( let index = 0 ; index < dataPurchase.length; index++){
                let status = await GroupStatus.findOne({
                    ObjectStatus: dataPurchase[index].ObjectStatus,
                    StatusId: dataPurchase[index].Status
                }).select("StatusName")
                console.log("GroupStatus: ",status )
                dataPurchase[index].StatusName = status.StatusName;
            }
            return {
                Success: true,
                Type: OK,
                totalPages: totalPages,
                Data: dataPurchase
            }

        }
        return existEmployee;
    } catch(error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại',
            Type: INTERNAL_ERROR
        }
    }
}


module.exports = {
    createPurchaseOrder: createPurchaseOrder,
    getAllPurchaseOrder: getAllPurchaseOrder
}