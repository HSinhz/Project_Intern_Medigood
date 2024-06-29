import { useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import ChartSales from '../../Sales/UIUX/ChartUIUX';
import ChartReport from '../../Sales/UIUX/ChartReport';
import '../../Sales/Report.scss';
const ReportStore = () => {
    
    const actionReport = {
        MEDICINESTORE:  {
            actionHeader: 'Thống kê theo sản phẩm',
            Report: 'MEDICINESTORE'
        },
        DAYBYDAYSTORE:  {
            actionHeader: 'Thống kê theo thời gian',
            Report: 'DAYBYDAYSTORE'
        },
    };

    const typeReport = {
        MEDICINESTORE: <ChartReport actionReport={actionReport.MEDICINESTORE}/>,
        DAYBYDAYSTORE: <ChartReport actionReport={actionReport.DAYBYDAYSTORE}/>,
    };
    const [activetypeReport, setActivetypeReport] = useState(typeReport.DAYBYDAYSTORE);
    const handleSelectChange = (event) => {
        setActivetypeReport(typeReport[event.target.value]);
    };

    return (
        <div className='container report-container'>
            <h2>Thống kê cửa hàng</h2>
            <div className="d-flex align-items-center ">
                <div className="me-4 type-report-label">Loại thống kê: </div>
                <select className="form-select w-50"
                    defaultValue=""
                    onChange={handleSelectChange}
                >
                    <option value="" disabled hidden>Loại thống kê</option> 
                    <option value={actionReport.MEDICINESTORE.Report}>Theo sản phẩm</option>
                    <option value={actionReport.DAYBYDAYSTORE.Report}>Theo thời gian</option>
                </select>
            </div>
            <div className='chart-container'>
                {activetypeReport}
            </div>
        </div>
    )
}

export default ReportStore;
