const Distribute = require('../app/models/Distribution');
const DistributeDetail = require('../app/models/DistributionDetail');
const Medicine = require('../app/models/Medicine');
const MedicineBranch = require('../app/models/MedicineStore')
const {checkExistPersonnel, checkExistBranch, checkExistDistribute} = require('../util/checkExist');
const {OK, INTERNAL_ERROR} = require("../config/db/httpCode");
const {createIdPurchase} = require('../util/createId');
const GroupStatus = require('../app/models/GroupStatus');

const createDistribute = async (DataDistribute) => {
    try {
        let DistributeId = createIdPurchase();
        const newDistribute = new Distribute({
            DistributeId: DistributeId,
            EmployeeEmail: DataDistribute.Employee,
            BranchId: DataDistribute.Branch,
            TotalQuantity: DataDistribute.TotalQuantity,
            Status: DataDistribute.Status
        });
        let saveDistribute = await newDistribute.save();
        if(saveDistribute.DistributeId){
            let sure = false;
            for( let index = 0; index < DataDistribute.ListMedicine.length ; index++) {
                // Save Detail Purchase Order
                await new DistributeDetail({
                    DistributionId: saveDistribute.DistributeId,
                    MedicineId: DataDistribute.ListMedicine[index].MedicineId,
                    Quantity: DataDistribute.ListMedicine[index].Quantity,
                }).save().then(() => [console.log("Đã lưu tất cả"), sure = true]);
                console.log("ádasdsdas")
            }
        }
        return saveDistribute;
    } catch (error) {
        console.log("Error Service: ", error);
        return {
            Success: false,
            Type: INTERNAL_ERROR,
            Mess: 'Vui lòng thử lại sau'
        }
    }
}


const createDistributeOrder = async (Email, DataDistribute) => {
    try {
        console.log('DataDistribute Service: ', DataDistribute)
        let existEmployee = await checkExistPersonnel(Email);
        if(existEmployee.Success === true){
            let existBranch = await checkExistBranch(DataDistribute.Branch);
            console.log("existBranch Service: ", existBranch)
            if( existBranch.Success === true ){
                let existEmployeeResponsible = await checkExistPersonnel(DataDistribute.Employee);
                if( existEmployeeResponsible.Success === true) {
                    // Create and Save Distribute 
                    let saveDistribute = await createDistribute(DataDistribute);

                    if(saveDistribute.DistributeId){
                        let sure = false;
                        for( let index = 0; index < DataDistribute.ListMedicine.length ; index++) {
                            let updateStockMedicine = parseInt( DataDistribute.ListMedicine[index].Stock) - parseInt(DataDistribute.ListMedicine[index].Quantity);
                            let updateInventoryMedicine = parseInt( DataDistribute.ListMedicine[index].Inventory) - parseInt(DataDistribute.ListMedicine[index].Quantity);
                            // Update Stock and Inventory Medicine in WareHouse
                            await Medicine.updateOne({MedicineId: DataDistribute.ListMedicine[index].MedicineId}, {
                                Stock: updateStockMedicine,
                                Inventory: updateInventoryMedicine
                            }).then(() => console.log("Đã cập nhật kho hàng thành công"));
                            
                            let BranchWareHouse = await MedicineBranch.findOne({
                                BranchId: DataDistribute.Branch, 
                                MedicineId: DataDistribute.ListMedicine[index].MedicineId,
                            });
                            let updateStockMedicinBranch = parseInt(BranchWareHouse.Stock) + parseInt(DataDistribute.ListMedicine[index].Quantity);
                            let updateInventoryMedicinBranch = parseInt(BranchWareHouse.Inventory) + parseInt(DataDistribute.ListMedicine[index].Quantity);
                            await MedicineBranch.updateOne({
                                BranchId: DataDistribute.Branch, 
                                MedicineId: DataDistribute.ListMedicine[index].MedicineId,
                            }, {
                                Stock : updateStockMedicinBranch,
                                Inventory: updateInventoryMedicinBranch
                            }).then(() => console.log("Đã cập nhật kho hàng thành công trong kho hàng chi nhánh"));
                        }
    
                        return {
                            Success: true,
                            Mess: 'Thêm mới đơn phân phối hàng thành công',
                            Type: OK
                        }
                    }
                }
                return existEmployeeResponsible;
            }
            return existBranch;
        }
        return existEmployee;
    } catch(error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Type: INTERNAL_ERROR,
            Mess: 'Vui lòng thử lại sau'
        }
    }
}

const getDistributeOrder = async (Email, Page, Limit) => {
    try {
        let existEmployee = await checkExistPersonnel(Email);
        if( existEmployee.Success === true) {
            let offset = (Page - 1) * Limit;
            let countDistribute = await Distribute.find().countDocuments();
            let totalPages = Math.ceil(parseInt(countDistribute)/Limit);
            let dataDistribute = await Distribute.aggregate([
                {
                    $lookup: {
                        from: 'personnels',
                        localField: 'EmployeeEmail',
                        foreignField: 'Email',
                        as: 'PeronnelInfor'
                    }
                }, {
                    $lookup: {
                        from: 'branches',
                        localField: 'BranchId',
                        foreignField: 'Id',
                        as: 'BranchInfor'
                    } 
                }, {
                    $unwind: "$PeronnelInfor"
                }, {
                    $unwind: "$BranchInfor"
                }, {
                    $project: {
                        DistributeId: 1,
                        TotalQuantity: 1,
                        EmployeeLastName: "$PeronnelInfor.LastName",
                        EmployeeFirstName: '$PeronnelInfor.FirstName',
                        BranchId: 1,
                        BranchAddress: '$BranchInfor.Address',
                        StatusDistribute: 1,
                        ObjectStatus: 1,
                        Status: 1,
                        createdAt: 1,
                    }
                }, {
                    $skip: parseInt(offset)
                }, {
                    $limit: parseInt(Limit)
                }
            ])
            for( let index = 0 ; index < dataDistribute.length; index++){
                let status = await GroupStatus.findOne({
                    ObjectStatus: dataDistribute[index].ObjectStatus,
                    StatusId: dataDistribute[index].Status
                }).select("StatusName")
                dataDistribute[index].StatusName = status.StatusName;
            }   
            return {
                Success: true,
                Type: OK,
                totalPages: totalPages,
                Data: dataDistribute
            }
        } 
        return existEmployee
    } catch (error) {
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại',
            Type: INTERNAL_ERROR
        }
    }
}

const getDistributeBranch = async (Email, BranchId, Page, Limit) => {
    try {
        let existEmployee = await checkExistPersonnel(Email);
        if( existEmployee.Success === true) {
            let existBranch = await checkExistBranch(BranchId);
            if( existBranch.Success === true) {
                let offset = (Page - 1) * Limit;
                let countDistribute = await Distribute.find({BranchId: BranchId}).countDocuments();
                let totalPages = Math.ceil(parseInt(countDistribute)/Limit);
                let dataDistribute = await Distribute.aggregate([
                    {
                        $match: {
                           BranchId: BranchId
                        }
                    } , {
                        $lookup: {
                            from: 'personnels',
                            localField: 'EmployeeEmail',
                            foreignField: 'Email',
                            as: 'PeronnelInfor'
                        }
                    }, {
                        $lookup: {
                            from: 'branches',
                            localField: 'BranchId',
                            foreignField: 'Id',
                            as: 'BranchInfor'
                        } 
                    }, {
                        $unwind: "$PeronnelInfor"
                    }, {
                        $unwind: "$BranchInfor"
                    }, {
                        $project: {
                            DistributeId: 1,
                            TotalQuantity: 1,
                            EmployeeLastName: "$PeronnelInfor.LastName",
                            EmployeeFirstName: '$PeronnelInfor.FirstName',
                            BranchId: 1,
                            BranchAddress: '$BranchInfor.Address',
                            StatusDistribute: 1,
                            ObjectStatus: 1,
                            Status: 1,
                            createdAt: 1,
                        }
                    }, {
                        $skip: parseInt(offset)
                    }, {
                        $limit: parseInt(Limit)
                    }
                ])
                for( let index = 0 ; index < dataDistribute.length; index++){
                    let status = await GroupStatus.findOne({
                        ObjectStatus: dataDistribute[index].ObjectStatus,
                        StatusId: dataDistribute[index].Status
                    }).select("StatusName")
                    console.log("GroupStatus: ",status )
                    dataDistribute[index].StatusName = status.StatusName;
                }   
                return {
                    Success: true,
                    Type: OK,
                    totalPages: totalPages,
                    Data: dataDistribute
                }
            }
            return existBranch;
        } 
        return existEmployee
    } catch (error) {
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại',
            Type: INTERNAL_ERROR
        }
    }
}

const showDetailDistribute = async (Email, DistributeId) => {
    try {
        let existEmployee = await checkExistPersonnel(Email);
        if( existEmployee.Success === true) {
            let dataDistribute = await Distribute.aggregate([
                {
                    $match: {
                        DistributeId: DistributeId
                    }
                } , {
                    $lookup: {
                        from: 'personnels',
                        localField: 'EmployeeEmail',
                        foreignField: 'Email',
                        as: 'PeronnelInfor'
                    }
                }, {
                    $lookup: {
                        from: 'branches',
                        localField: 'BranchId',
                        foreignField: 'Id',
                        as: 'BranchInfor'
                    } 
                }, {
                    $unwind: "$PeronnelInfor"
                }, {
                    $unwind: "$BranchInfor"
                }, {
                    $project: {
                        DistributeId: 1,
                        TotalQuantity: 1,  
                        InforBranch: {
                            Id: '$BranchInfor.Id',
                            Address: '$BranchInfor.Address',
                        },
                        InforEmployee: {
                            EmployeeLastName: "$PeronnelInfor.LastName",
                            EmployeeFirstName: '$PeronnelInfor.FirstName',
                        },
                        ListMedicine: {
                            TotalQuantity: 1,
                        },
                        Status: 1,
                        StatusDistribute: 1,
                        ObjectStatus: 1,
                        createdAt: 1,
                    }
                }
            ])

            if(dataDistribute) {
                let detailDistribute = await DistributeDetail.aggregate([
                    {
                        $match: {
                            DistributionId: DistributeId
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
                        $project : {
                            MedicineId: 1,
                            Quantity: 1,
                            MedicineName: '$MedicineInfor.MedicineName',
                            ImgUrl: '$MedicineInfor.ImgUrl',
                        }
                    }
                ])

                let statusName = await GroupStatus.findOne({
                    ObjectStatus: dataDistribute[0].ObjectStatus,
                    StatusId: dataDistribute[0].Status,
                }).select("StatusName");
                dataDistribute[0].ListMedicine = detailDistribute;
                dataDistribute[0].StatusName = statusName.StatusName;
                return {
                    Success: true,
                    Data: dataDistribute,
                    Type: OK
                }
            }
        } 
        return existEmployee
    } catch (error) {
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại',
            Type: INTERNAL_ERROR
        }
    }
}


const updateStockAndInventory = async (ListMedicine, BranchId) => {
    try {
        for( let index = 0; index < ListMedicine.length ; index++) {
            let dataMedicineId = await Medicine.findOne({MedicineId: ListMedicine[index].MedicineId }).select("Stock Inventory");

            console.log("dataMedicineId: ", dataMedicineId)

            let updateStockMedicine = parseInt( dataMedicineId.Stock) - parseInt(ListMedicine[index].Quantity);
            let updateInventoryMedicine = parseInt( dataMedicineId.Inventory) - parseInt(ListMedicine[index].Quantity);

            console.log("Stock Medicine: ", updateStockMedicine);
            console.log("Inventory Medicine: ", updateInventoryMedicine);

            // Update Stock and Inventory Medicine in WareHouse
            await Medicine.updateOne({MedicineId: ListMedicine[index].MedicineId}, {
                Stock: updateStockMedicine,
                Inventory: updateInventoryMedicine
            }).then(() => console.log("Đã cập nhật kho hàng thành công"));
            
            let BranchWareHouse = await MedicineBranch.findOne({
                BranchId: BranchId, 
                MedicineId: ListMedicine[index].MedicineId,
            });
            let updateStockMedicinBranch = parseInt(BranchWareHouse.Stock) + parseInt(ListMedicine[index].Quantity);
            let updateInventoryMedicinBranch = parseInt(BranchWareHouse.Inventory) + parseInt(ListMedicine[index].Quantity);

            console.log("Stock Medicine Branch: ", updateStockMedicinBranch);
            console.log("Inventory Medicine Branch: ", updateInventoryMedicinBranch);
            await MedicineBranch.updateOne({
                BranchId: BranchId, 
                MedicineId: ListMedicine[index].MedicineId,
            }, {
                Stock : updateStockMedicinBranch,
                Inventory: updateInventoryMedicinBranch
            }).then(() => console.log("Đã cập nhật kho hàng thành công trong kho hàng chi nhánh"));
        }
    } catch (error) {
        console.log("Error Service: ", error);
        return {
            Success: false,
            Type: INTERNAL_ERROR,
            Mess: 'Vui lòng thử lại sau'
        }
    }
}


const confirmDistributeOrder = async (Email, DistributeId, DataDistribute) => {
    try {
        console.log("DataDistribute confirm: ", DataDistribute)
        let existEmployee = await checkExistPersonnel(Email);
        if( existEmployee.Success === true) {
            let existDistribute = await checkExistDistribute(DistributeId);
            if( existDistribute.Success === true) {
                await Distribute.updateOne({DistributeId: DistributeId}, {
                    Status: 1
                })

                updateStockAndInventory(DataDistribute.ListMedicine, DataDistribute.InforBranch.Id);
                
                return {
                    Success: true,
                    Type: OK,
                    Mess: 'Xác nhận đơn hàng thành công'
                }
            }
            return existDistribute;
        } 
        return existEmployee
    } catch (error) {
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại',
            Type: INTERNAL_ERROR
        }
    }
}

const createDistributeBranch = async (Email, DataDistribute) => {
    try {
        console.log("DataDistribute Branch: ", DataDistribute);
        let existEmployee = await checkExistPersonnel(Email);
        if( existEmployee.Success === true) {
            let existBranch = await checkExistBranch(DataDistribute.Branch);
            if( existBranch.Success === true) {
                let saveDistribute = await createDistribute(DataDistribute);
                if( saveDistribute.DistributeId) {
                    return {
                        Success: true,
                        Mess: 'Tạo đơn phân phối hàng thành công',
                        Type: OK,
                    }
                }
            }
            return existBranch;
        } 
        return existEmployee
    } catch (error) {
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại',
            Type: INTERNAL_ERROR
        }
    }
}

module.exports = {
    createDistributeOrder: createDistributeOrder,
    getDistributeOrder: getDistributeOrder,
    getDistributeBranch: getDistributeBranch,
    showDetailDistribute: showDetailDistribute,
    confirmDistributeOrder: confirmDistributeOrder,
    createDistributeBranch: createDistributeBranch
}