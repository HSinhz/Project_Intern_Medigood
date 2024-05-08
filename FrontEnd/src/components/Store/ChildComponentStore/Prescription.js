import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../../views/UserContext';
import NavPrescription from './NavPrescription';
import NewOrder from './PrescriptionComponent/NewOrder';
import HistoryOrder from './PrescriptionComponent/HistoryOrder';
import DetailPrescription from './PrescriptionComponent/DetailPrescription';
const Prescription = () => {
    const { user } = useUser();
    const history = useHistory();
    const [activeComponent, setActiveComponent] = useState();
    const [selectedPrescriptionId, setSelectedPrescriptionId] = useState('');

    useEffect(() => {
        console.log(user.isAuthenticated);
        if(!user.isAuthenticated){
            history.push('/login');
        }
    }, [activeComponent]);
   
    const handleNavLinkClick = (componentName) => {
        setActiveComponent(components[componentName]);
    };
    const components = {
        NewOrder: <NewOrder/>,
        HistoryOrder: <HistoryOrder  setNameComponent={handleNavLinkClick}/>,
        DetailPrescription: <DetailPrescription />
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
