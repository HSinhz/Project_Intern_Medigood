import { useEffect, useState } from "react";
import { getReport } from "../../../services/ReportService";
import { toast } from "react-toastify";

const ReportMedicineStore = ({dataReportMedic}) => {

   
    return (
        <>
            <div className="mt-4 table-report-medicine">
                <table className="">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th className="th-value">Số lượng</th>
                            <th className="th-value">Tổng giá trị</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataReportMedic && dataReportMedic.length> 0 ? 
                        <>
                            {
                                dataReportMedic.map((medic, index) => {
                                    let totalString = medic.TotalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

                                    return (
                                        <tr className="table-row ">
                                            <td className="">
                                                <img className='img-personnel-container img-personnel img-fluid' src={medic.ImgUrl}/>
                                            </td>
                                            <td>{medic.MedicineId}</td>
                                            <td>{medic.MedicineName}</td>
                                            <td className="th-value">{medic.TotalQuantity}</td>
                                            <td className="th-value">{totalString}</td>
                                        </tr>
                                    )
                                })
                            }
                            </>
                            :
                            <></>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ReportMedicineStore;