import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavPrescription from './NavPrescription';
import NewOrder from './PrescriptionComponent/NewOrder';
import HistoryOrder from './PrescriptionComponent/HistoryOrder';
import DetailPrescription from './PrescriptionComponent/DetailPrescription';
const Prescription = () => {
    const history = useHistory();
    const [activeComponent, setActiveComponent] = useState();
    const [selectedPrescriptionId, setSelectedPrescriptionId] = useState('');
    const [dataReOrder, setDataReOrder] = useState({});
    useEffect(() => {
       
    }, [activeComponent]);
   
    const handleNavLinkClick = (componentName) => {
        setActiveComponent(components[componentName]);
        
    };

    const getDataPrescription = (data) => {
        setDataReOrder(data)
        console.log("data: ", dataReOrder)

    }
    const components = {
        NewOrder: <NewOrder dataReOrder={dataReOrder}/>,
        HistoryOrder: <HistoryOrder setNameComponent={handleNavLinkClick}/>,
        DetailPrescription: <DetailPrescription handleReOrder={handleNavLinkClick} handleSendData={getDataPrescription} />
    };
    
    return (
        <>
            <div className=''>
                <NavPrescription  onNavLinkClick={handleNavLinkClick}/>
            </div>
            <div className='mt-4 parent-component-prescription'>
                {activeComponent}
            </div>
        </>
        
    )
}

export default Prescription;
