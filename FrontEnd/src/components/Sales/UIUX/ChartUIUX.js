import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, format } from 'date-fns';
import '../Report.scss';
import { getReport } from '../../../services/ReportService';
import { toast } from 'react-toastify';
import ReportBranch from './ReportBranch';
import ReportMedicineStore from './ReportMedicineStore';
// Đăng ký các thành phần cần thiết
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const ChartSales = ({typeReport}) => {
    // Dữ liệu tĩnh giả định
    
    const [dataReport, setDataReport] = useState([]);
    const [totalSales, setTotalSales] = useState([]);
    const [labels, setLabels] = useState([]);
    const [dataReportMedicineBranch, setDataReportMedicineBranch] = useState([]);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        console.log("typeReport: ", typeReport);
        getSalesReport();
    }, [typeReport, endDate, startDate]);

    const getSalesReport = async () => {
        try { 
            let response = await getReport(typeReport, startDate, endDate);
            if( response && response.Success === true){
                console.log("response.Data Reprot: ", response.Data);
                if( typeReport !== "MEDICINESTORE"){
                    setDataReport(response.Data);
                    setTotalSales(response.Data.map(item => parseInt(item.TotalSale)));
                }
                console.log("check: ", dataReport)

                switch (typeReport) {
                    case 'BRANCH':
                    {
                        setLabels(response.Data.map(item => item.Address));
                        break;
                    }
                    case 'DAYBYDAY':
                    {
                        setLabels(response.Data.map(item => item.date));
                        break;
                    }
                    case 'DAYBYDAYSTORE':
                    {
                        setLabels(response.Data.map(item => item.date));
                        break;
                    } 
                    case "MEDICINESTORE": 
                    {
                        setDataReportMedicineBranch(response.Data);
                    }
                
                    default:
                        break;
                }
            } else {
                toast.error(response.Mess);
            }
        } catch (error ){ 
            console.log(error);
            toast.error("Vui lòng thử lại");
        }
    }

    const handleOnChangeStartDate = (date) => {
        console.log("start date: ", date)
        setStartDate(date);
        getSalesReport();
    }

    const handleOnChangeEndDate = (date) => {
        console.log("End date: ", date)
        setEndDate(date);
        getSalesReport();
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }

    return (
        <>
            <div className='date-picker d-flex align-item-center'>
                <div className='me-4'>
                    <label className='me-2'>Chọn ngày bắt đầu:</label>
                    <DatePicker selected={startDate} onChange={(date) => handleOnChangeStartDate(date)} />
                </div>
                <div className='ms-4'>
                    <label className='me-2'>Chọn ngày kết thúc:</label>
                    <DatePicker selected={endDate} onChange={(date) => handleOnChangeEndDate(date)} />
                </div>

            </div>
                {
                    typeReport === "MEDICINESTORE" ? 
                    <>
                        <ReportMedicineStore  dataReportMedic={dataReportMedicineBranch} />
                    </> : <>
                        <div className='chart'>
                            <Bar
                                data={{
                                    labels: labels,
                                    datasets: [{
                                        label: 'Doanh thu',
                                        data: totalSales,
                                        backgroundColor: 'rgba(0, 179, 255, 0.5)',
                                        borderColor: 'rgba(0, 179, 255, 0.5)',
                                        borderWidth: 1
                                    }]
                                }}
                                options={{
                                    scales: {
                                        x: {
                                            ticks: {
                                                callback: function(value, index) {
                                                    return labels[index]; // Hiển thị tuần dưới mỗi cột
                                                }
                                            }
                                        },
                                        y: {
                                            ticks: {
                                                beginAtZero: true
                                            }
                                        }
                                    },
                                    plugins: {
                                        tooltip: {
                                            callbacks: {
                                                label: function (context) {
                                                    return `Doanh thu: ${formatCurrency(context.raw)}`; // Hiển thị giá trị doanh thu
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className='mt-4 table-report'>
                            <ReportBranch dataReportBranch={dataReport} typeReport={typeReport}/>
                        </div>

                    </>
                }
        </>
        
    );
}

export default ChartSales;
