import { useEffect, useContext , useState} from 'react';
import NavStored from './NavStored';
import {
    useHistory,
    BrowserRouter as Router,
} from "react-router-dom";
import './Store.scss'
import HomeStore from './ChildComponentStore/HomeStore';
import PersonnelStore from './ChildComponentStore/PersonnelStore';
import Prescription from './ChildComponentStore/Prescription';
import ReportStore from './ChildComponentStore/ReportStore';
import SettingStore from './ChildComponentStore/SettingStored';
import ListPurchaseBranch from './PurchaseBranch/ListDistributeBranch';
import CreateDistributeBranch from './PurchaseBranch/CreateDistributeBranch';
import DetailDistributeOrder from '../Page/DetailDistribute';
import MedicineBranch from './ChildComponentStore/MedicineBranch';

const Store = () => {
   
    const handleNavLinkClick = (componentName) => {
        setActiveComponent(components[componentName]);
    };

    const components = {
        HomeStore: <HomeStore />,
        PersonnelStore: <PersonnelStore />,
        Prescription: <Prescription />,
        Statistics: <ReportStore />,
        SettingStore: <SettingStore />,
        ListPurchaseBranch: <ListPurchaseBranch onComponentClick={handleNavLinkClick} showDetailDistribute={handleNavLinkClick}/>,
        CreateDistributeBranch: <CreateDistributeBranch />,
        DetailDistributeOrder: <DetailDistributeOrder />,
        MedicineBranch: <MedicineBranch />
    };
    const [activeComponent, setActiveComponent] = useState(components.HomeStore);
    
    return (
        <>
            <div className="my-store d-flex">
                <NavStored onNavLinkClick={handleNavLinkClick} />
                <div className="w-100 body-content-branch">
                    {activeComponent}
                </div>
            </div>
        </>
        
    )
}

export default Store;
