const {checkExistPersonnel, checkExistMedicine, checkExistSupplier} = require('../util/checkExist');
const moment = require('moment-timezone');
const Branch = require("../app/models/Branch");
const Prescription = require('../app/models/Prescription');
const MedicineStore = require('../app/models/MedicineStore');
const PrescriptionDetail = require("../app/models/PrescriptionDetail");
const { startOfWeek, endOfWeek, getISOWeek, subWeeks,addDays  } = require('date-fns');
const {OK, INTERNAL_ERROR} = require("../config/db/httpCode");


const typeReport = {
    TOTAL: 'TOTAL',
    BRANCH: 'BRANCH',
    MEDICINESTORE: 'MEDICINESTORE',
    DAYBYDAY: 'DAYBYDAY',
    DAYBYDAYSTORE: 'DAYBYDAYSTORE',
}

const formatDateWithoutYear = (date) => {
    const options = { month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-GB', options); // Định dạng ngày theo DD/MM
};

const changeFomatDate = ( date) => {
    const timeFormat = "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ";
    // Chuyển đổi chuỗi thời gian sang đối tượng moment
    const dateMoment = moment.tz(date , timeFormat, 'Asia/Ho_Chi_Minh');

    // Chuyển đổi moment sang định dạng ISO 8601 (UTC)
    const dateFormatMongoose = dateMoment.utc().toDate();

    return dateFormatMongoose;
}

const generateDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateArray = [];

    let currentDate = startDate;
    while (currentDate <= endDate) {
        dateArray.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
};


// Hàm xử lý thống kê tất cả chi nhánh
const saleAllBranches = async (start, end) => {
    
    // Chuyển đổi moment sang định dạng ISO 8601 (UTC)
    const startIsoUtc = changeFomatDate(start);
    const endIsoUtc = changeFomatDate(end);

    console.log('startIsoUtc: ', startIsoUtc);
    console.log('endIsoUtc: ', endIsoUtc);

    const branches = await Branch.find().select("Id Address");
    const countBranch = await Branch.find().countDocuments();
    const reportSaleAllBranch = [];
    for (let index = 0; index < countBranch; index++) {
        // console.log("branches[index].Id: ", branches[index].Id);
        
        let totalSales = await Prescription.aggregate([
            {
                $match: {
                    BranchId: branches[index].Id,
                    createdAt: {
                        $gte: startIsoUtc,
                        $lte: endIsoUtc
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$Total" },
                    orderCount: { $sum: 1 }
                }
            }
        ]);

        let totalSaleAmount = totalSales.length > 0 ? totalSales[0].totalSales : 0;
        let orderCount = totalSales.length > 0 ? totalSales[0].orderCount : 0;

        reportSaleAllBranch[index] = {
            Address: branches[index].Address,
            TotalSale: totalSaleAmount,
            TotalOrder: orderCount
        };
    }
    console.log("reportSaleAllBranch: ", reportSaleAllBranch);
    return reportSaleAllBranch;
}

// Hàm xử lý thống kê theo ngày của toàn bộ hệ thống
const saleDayByDay = async (start, end) => {
    const startIsoUtc = changeFomatDate(start);
    const endIsoUtc = changeFomatDate(end);

    let totalSales = await Prescription.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startIsoUtc,
                    $lte: endIsoUtc
                }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                },
                totalSales: { $sum: "$Total" },
                orderCount: { $sum: 1 } 
            }
        },
        {
            $sort: { "_id": 1 }
        }
    ]);

    console.log("totalSales: ", totalSales);

    // Tạo một bản đồ để lưu doanh thu theo ngày
    const salesByDayMap = generateDateRange(startIsoUtc, endIsoUtc).reduce((acc, date) => {
        acc[date] = { totalSales: 0, orderCount: 0 }; // Khởi tạo doanh thu mặc định là 0 cho mỗi ngày
        return acc;
    }, {});

    // Cập nhật doanh thu thực tế vào bản đồ
    totalSales.forEach(day => {
        salesByDayMap[day._id].totalSales = day.totalSales;
        salesByDayMap[day._id].orderCount = day.orderCount;
    });

    // Chuyển đổi bản đồ sang danh sách để trả về kết quả
    const salesByDay = Object.keys(salesByDayMap).map(date => ({
        date: formatDateWithoutYear(date),
        TotalSale: salesByDayMap[date].totalSales,
        TotalOrder: salesByDayMap[date].orderCount
    }));

    console.log("salesByDay: ", salesByDay);

    return salesByDay
    
}

// Hàm xử lý thống kê sản phẩm theo từng chi nhánh
const saleByMedicineStore = async (BranchId, start, end) => {
    const startIsoUtc = changeFomatDate(start);
    const endIsoUtc = changeFomatDate(end);
    // const countMedicineStore = await MedicineStore.find({BranchId: BranchId}).select("MedicineId");
    const countMedicineStore = await MedicineStore.aggregate([
        {
            $match: {
                BranchId: BranchId,
            }
        }, {
            $lookup: {
                from: 'medicines',
                localField: 'MedicineId',
                foreignField: 'MedicineId',
                as: 'InforMedic'
            }
        }, {
            $unwind: "$InforMedic"
        }, {
            $project: {
                _id: 1,
                MedicineId: 1,
                MedicineName: "$InforMedic.MedicineName",
                ImgUrl: "$InforMedic.ImgUrl",
            }
        }
    ])
    console.log("countMedicineStore: ", countMedicineStore);

    // Truy xuất đơn hàng/ đơn thuốc theo ngày được chọn để thống kê
    const countPrescription = await Prescription.aggregate([
        {
            $match: {
                BranchId: BranchId,
                createdAt: {
                    $gte: startIsoUtc,
                    $lte: endIsoUtc
                }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                },
                count: { $sum: 1 },
                PrescriptionId: {$push: '$PrescriptionId'}
            }
        },
        {
            $sort: { _id: 1 } // Sắp xếp kết quả theo ngày
        }
    ]);
    // console.log("countPrescription: ", countPrescription);
    const salesMedicineStore = [];
    // Truy xuất dữ liệu chi tiết đơn hàng/ đơn thuốc
    for( let prescription = 0; prescription < countPrescription.length; prescription++ ){
        // console.log("countPrescription[prescription].PrescriptionId: " ,countPrescription[prescription].PrescriptionId);
        salesMedicineStore[prescription] = [];
        for( let detail = 0; detail < countPrescription[prescription].PrescriptionId.length > 0; detail++ ){
            const totalSalesMedicine = await PrescriptionDetail.aggregate([
                {
                    $match: {
                        PrescriptionId: countPrescription[prescription].PrescriptionId[detail]
                    }
                }, {
                    $lookup: {
                        from: 'medicines',
                        localField: 'MedicineId',
                        foreignField: 'MedicineId',
                        as: 'InforMedic'
                    }
                }, {
                    $unwind: "$InforMedic"
                }, {
                    $project: {
                        MedicineId: 1,
                        MedicineName: 1,
                        Quantity: 1,
                        Unit: 1,
                        TotalPrice: 1,
                        UnitMain: "$InforMedic.Unit",
                        ViePerBox: "$InforMedic.ViePerBox",
                        ViePerBlis: "$InforMedic.ViePerBlis"
                    }
                }
            ])
            // console.log("totalSalesMedicine: ", totalSalesMedicine);
            salesMedicineStore[prescription][detail] = totalSalesMedicine;

           

        }
    }

    // Xử lý đơn vị về đơn vị nhỏ nhất của từng loại thuốc
    for( let prescription = 0; prescription < salesMedicineStore.length; prescription++ ){
        for( let detail = 0; detail < salesMedicineStore[prescription].length; detail++){
            for( let more = 0; more < salesMedicineStore[prescription][detail].length; more++) {
                // Khởi tạo biến Flag cho từng sản phẩm trong đơn hàng để chuẩn bị cho bước tổng hợp
                salesMedicineStore[prescription][detail][more].Flag = false;

                if(salesMedicineStore[prescription][detail][more].Unit === 7) {
                    salesMedicineStore[prescription][detail][more].Quantity = parseInt(salesMedicineStore[prescription][detail][more].Quantity) * parseInt(salesMedicineStore[prescription][detail][more].ViePerBox ) *  parseInt(salesMedicineStore[prescription][detail][more].ViePerBlis);
                } else if( salesMedicineStore[prescription][detail][more].Unit === 0 ){
                    if( salesMedicineStore[prescription][detail][more].UnitMain === 7 ){
                        salesMedicineStore[prescription][detail][more].Quantity = parseInt(salesMedicineStore[prescription][detail][more].Quantity) * parseInt(salesMedicineStore[prescription][detail][more].ViePerBox ) *  parseInt(salesMedicineStore[prescription][detail][more].ViePerBlis);
                    } else if( salesMedicineStore[prescription][detail][more].UnitMain === 1 || salesMedicineStore[prescription][detail][more].UnitMain === 2 ) {
                        salesMedicineStore[prescription][detail][more].Quantity = parseInt(salesMedicineStore[prescription][detail][more].Quantity) * parseInt(salesMedicineStore[prescription][detail][more].ViePerBox );
                    } 
                }
            }
        }
    }

    let reportMedicineBranch = [];
    // Tổng hợp số lượng đã bán theo từng loại thuốc
    for( let medic = 0 ; medic < countMedicineStore.length; medic++ ){
        reportMedicineBranch[medic] = {
            MedicineId: countMedicineStore[medic].MedicineId,
            MedicineName: countMedicineStore[medic].MedicineName,
            ImgUrl: countMedicineStore[medic].ImgUrl,
            TotalQuantity: 0,
            TotalPrice: 0
        }
        for( let prescription = 0; prescription < salesMedicineStore.length; prescription++ ){
            for( let detail = 0; detail < salesMedicineStore[prescription].length; detail++){
                for( let more = 0; more < salesMedicineStore[prescription][detail].length; more++){
                    if(salesMedicineStore[prescription][detail][more].Flag === false){
                        if(reportMedicineBranch[medic].MedicineId === salesMedicineStore[prescription][detail][more].MedicineId){
                            reportMedicineBranch[medic].TotalQuantity = parseInt(reportMedicineBranch[medic].TotalQuantity) + parseInt(salesMedicineStore[prescription][detail][more].Quantity)
                            reportMedicineBranch[medic].TotalPrice = parseInt(reportMedicineBranch[medic].TotalPrice) + parseInt(salesMedicineStore[prescription][detail][more].TotalPrice);
                            salesMedicineStore[prescription][detail][more].Flag = true;
                        }
                    }
                }
                
            }
        }
    }
    console.log("reportMedicineBranch: ", reportMedicineBranch)


    return reportMedicineBranch;
}

const saleDayByDayStore = async (BranchId, start, end) => {
    const startIsoUtc = changeFomatDate(start);
    const endIsoUtc = changeFomatDate(end);

    let totalSales = await Prescription.aggregate([
        {
            $match: {
                BranchId: BranchId,
                createdAt: {
                    $gte: startIsoUtc,
                    $lte: endIsoUtc
                }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                },
                totalSales: { $sum: "$Total" },
                orderCount: { $sum: 1 } 
            }
        },
        {
            $sort: { "_id": 1 }
        }
    ]);

    console.log("totalSales: ", totalSales);

    // Tạo một bản đồ để lưu doanh thu theo ngày
    const salesByDayMap = generateDateRange(startIsoUtc, endIsoUtc).reduce((acc, date) => {
        acc[date] = { totalSales: 0, orderCount: 0 }; // Khởi tạo doanh thu mặc định là 0 cho mỗi ngày
        return acc;
    }, {});

    // Cập nhật doanh thu thực tế vào bản đồ
    totalSales.forEach(day => {
        salesByDayMap[day._id].totalSales = day.totalSales;
        salesByDayMap[day._id].orderCount = day.orderCount;
    });

    // Chuyển đổi bản đồ sang danh sách để trả về kết quả
    const salesByDay = Object.keys(salesByDayMap).map(date => ({
        date: formatDateWithoutYear(date),
        TotalSale: salesByDayMap[date].totalSales,
        TotalOrder: salesByDayMap[date].orderCount
    }));

    console.log("salesByDay: ", salesByDay);

    return salesByDay
}

const getReportSales = async (Email, TypeReport, Start, End, BranchId) => {
    try {
        console.log("TypeReport: ", TypeReport);
        console.log("Start: ", Start);
        console.log("End: ", End);

        let existEmployee = await checkExistPersonnel(Email);
        if(existEmployee.Success === true){
            let dataReport = [];
            switch (TypeReport) {
                case typeReport.BRANCH:
                {
                    dataReport = await saleAllBranches(Start, End);
                    break;
                }
                case typeReport.DAYBYDAY:
                {
                    dataReport = await saleDayByDay(Start, End);
                    break;
                }
                case typeReport.MEDICINESTORE:
                {
                    dataReport = await saleByMedicineStore( BranchId, Start, End);
                    break;
                }
                case typeReport.DAYBYDAYSTORE:
                {
                    dataReport = await saleDayByDayStore(BranchId, Start, End);
                    break;
                }
                default:
                    break;
            }

            return {
                Success: true, 
                Type: OK,
                Data: dataReport
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
    getReportSales: getReportSales,
}