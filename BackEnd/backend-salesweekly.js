const { startOfWeek, endOfWeek, getISOWeek, subWeeks,addDays  } = require('date-fns');


const getReportSalesWeek = async (ShopId) => {
    try{
        let existShopOwner = await ShopOwner.findOne({_id: ShopId});
        if(existShopOwner){
            let salesByWeek = [];
            let currentWeek = getISOWeek(new Date());
            for (let i = 1; i < currentWeek; i++) { // Lấy 12 tuần trước
                let startDate = startOfWeek(subWeeks(new Date(), i)); // Ngày bắt đầu của tuần
                let start = addDays(startDate, 2); // Di chuyển từ Chủ Nhật sang Thứ Hai
                let endDate = endOfWeek(subWeeks(new Date(), i)); // Ngày kết thúc của tuần
                let end = addDays(endDate, 2); // Di chuyển từ Chủ Nhật sang Thứ Hai
                let totalSales = await Order.aggregate([
                    {
                        $match: {
                            ShopId: ShopId,
                            createdAt: {
                                $gte: start,
                                $lte: end
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalSales: { $sum: "$TotalAmount" },
                        }
                    }
                ]);
        
                // Thêm kết quả vào mảng salesByWeek
                salesByWeek.push({
                    week: currentWeek - i, // Lấy số tuần dựa trên thời gian hiện tại
                    startDate: start,
                    endDate: end,
                    totalSales: totalSales.length > 0 ? totalSales[0].totalSales : 0,

                });
            }
            return {
                Success: true,
                Sales: salesByWeek
            }
        } 
        return {
            Success: false,
            Mess: 'ShopOwner is not exist'
        }
    } catch( error ){
        console.log(error);
        return {
            Success: false,
            Mess: 'Error from server'
        }
    }
}