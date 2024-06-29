import '../Report.scss';
import ChartSales from './ChartUIUX';

const ChartReport = ({actionReport}) => {
    return (
        <>
            <h5>{actionReport.actionHeader}</h5>
            <ChartSales typeReport={actionReport.Report}/>
        </>
    )
}

export default ChartReport;