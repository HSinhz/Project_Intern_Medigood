import HeaderContainer from "../Layout/Header/HeaderContainer"
import './Report.scss';
import ChartReport from "./UIUX/ChartReport";
import { useState } from "react";

const Report = () => {
    const actionReport = {
        TOTAL: {
            actionHeader: 'Tổng doanh thu',
            Report: 'TOTAL'
        },
        BRANCH:  {
            actionHeader: 'Thống kê theo chi nhánh',
            Report: 'BRANCH'
        },
        MEDICINE:  {
            actionHeader: 'Thống kê theo sản phẩm',
            Report: 'MEDICINE'
        },
        DAYBYDAY:  {
            actionHeader: 'Thống kê theo thời gian',
            Report: 'DAYBYDAY'
        },
    };

    const typeReport = {
        TOTAL: <ChartReport actionReport={actionReport.TOTAL}/>,
        BRANCH: <ChartReport actionReport={actionReport.BRANCH}/>,
        MEDICINE: <ChartReport actionReport={actionReport.MEDICINE}/>,
        DAYBYDAY: <ChartReport actionReport={actionReport.DAYBYDAY}/>,
    };
    const [activetypeReport, setActivetypeReport] = useState(typeReport.TOTAL);
    const handleSelectChange = (event) => {
        setActivetypeReport(typeReport[event.target.value]);
    };

    return (
        <>
            <div className="report-container p-4 ">
                <div className="report-header">
                    <h1>Thống kê doanh thu công ty</h1>
                </div>
                <div className="d-flex align-items-center ">
                    <div className="me-4 type-report-label">Loại thống kê: </div>
                    <select className="form-select w-50"
                        defaultValue=""
                        onChange={handleSelectChange}
                    >
                        <option value="" disabled hidden>Loại thống kê</option> 
                        <option value="TOTAL">Tổng doanh thu</option>
                        <option value="BRANCH">Theo chi nhánh</option>
                        <option value="MEDICINE">Theo sản phẩm</option>
                        <option value="DAYBYDAY">Theo thời gian</option>
                    </select>
                </div>
                <div className="chart-container mt-4">
                    {activetypeReport}
                </div>
            </div>
        </>
    )
}

export default Report