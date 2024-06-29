import { useEffect, useState } from "react";
import '../Report.scss';

const ReportBranch = ({dataReportBranch, typeReport}) => {
    const [totalPrescription, setTotalPrescription] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    
    useEffect(() => {
        let totalOrder = 0;
        let totalPrice = 0;
        let totalString = '';
        for (let index = 0; index < dataReportBranch.length; index++) {
            totalOrder = parseInt(totalOrder) + parseInt(dataReportBranch[index].TotalOrder);
            totalPrice = parseInt(totalPrice) + parseInt(dataReportBranch[index].TotalSale);
            totalString = totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
          
        }
        setTotalAmount(totalString);
        setTotalPrescription(totalOrder);
    }, [dataReportBranch])
   
    return (
        <>
            <table className="">
                <thead >
                    <tr>
                        <th className="ps-4">Chi nhánh</th>
                        <th>SL đơn hàng</th>
                        <th>Doanh thu</th>
                    </tr>
                </thead>
                <tbody >
                {
                    dataReportBranch  && dataReportBranch.length > 0 ?
                    <>
                    {
                        dataReportBranch.map((item, index) => {
                            let totalString = item.TotalSale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

                            return (
                                <tr className="table-row ">
                                    <td className="ps-4">{typeReport === 'BRANCH' ? item.Address : item.date}</td>
                                    <td>{item.TotalOrder}</td>
                                    <td>{totalString}</td>
                                </tr>
                            )
                        })
                    }
                    </>
                    : 
                    <>
                    </>
                }
                    <tr className="total-report fw-bold">
                        <td className="ps-4">TỔNG CỘNG:</td>
                        <td>{totalPrescription}</td>
                        <td>{totalAmount}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )

}


export default ReportBranch;