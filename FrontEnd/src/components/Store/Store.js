import { useEffect, useContext , useState} from 'react';
import { useUser } from '../../views/UserContext';
import NavStored from './NavStored';
import {
    useHistory,
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './Store.scss'
import HomeStore from './ChildComponentStore/HomeStore';
import PersonnelStore from './ChildComponentStore/PersonnelStore';
import Prescription from './ChildComponentStore/Prescription';
import ReportStore from './ChildComponentStore/ReportStore';
import SettingStore from './ChildComponentStore/SettingStored';

const Store = () => {
    const { user } = useUser();
    const history = useHistory();
    const [dataStore, setDataStore] = useState({});

    useEffect(() => {
        console.log(user.isAuthenticated);
        if(!user.isAuthenticated){
            history.push('/login');
        }
        console.log("dataStore in component cha: ", dataStore)
    }, []);
    
    const components = {
        HomeStore: <HomeStore data={dataStore} setData={setDataStore} />,
        PersonnelStore: <PersonnelStore />,
        Prescription: <Prescription />,
        Statistics: <ReportStore />,
        SettingStore: <SettingStore />
    };
    const [activeComponent, setActiveComponent] = useState(components.HomeStore);
    const handleNavLinkClick = (componentName) => {
        setActiveComponent(components[componentName]);
    };
    return (
        <>
            <div className="my-store d-flex bd-highlight">
                <div className="flex-shrink-1 bd-highlight nav-right">
                    <NavStored onNavLinkClick={handleNavLinkClick} />
                </div>
                <div className="w-100  bd-highlight">
                    {activeComponent}
                </div>
            </div>
        </>
        
    )
}

export default Store;
