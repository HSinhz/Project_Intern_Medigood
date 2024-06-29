import { useEffect, useContext, useState } from 'react';
import { useHistory, NavLink, Link  } from 'react-router-dom';
import { UserContext } from '../../views/UserContext';
import './Medicine.scss';
import ListMedicine from './ListMedicine';
import NavWareHouse from './NavWareHouse';
import WareHouse from './WareHouse';
import ImportGoods from './ImportGoods';
import CreatePureChaseOrder from './CreatePurchaseOrder';
import Supplier from './Supplier';
import CreateSupplier from './CreateSupplier';
import Distribute from './ComponentMedicine/Distribute';
import CreateDistributeOrder from './ComponentMedicine/CreateDistributeOrder';
import DetailDistributeOrder from '../Page/DetailDistribute';

const Medicine = () => {
    const { user } = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        document.title = 'Dược Phẩm' ;
        console.log(user.isAuthenticated);
        
    }, []);
    const handleComponentClick = (componentName) => {
        setActiveComponent(components[componentName]);
    }
    const components = {
        ListMedicine: <ListMedicine />,
        WareHouse: <WareHouse />,
        ImportGoods : <ImportGoods onComponentClick={handleComponentClick}/>,
        CreatePureChaseOrder: <CreatePureChaseOrder />,
        Supplier : <Supplier onComponentClick={handleComponentClick}/>,
        CreateSupplier: <CreateSupplier />,
        Distribute: <Distribute onComponentClick={handleComponentClick} showDetailDistribute={handleComponentClick}/>,
        CreateDistributeOrder: <CreateDistributeOrder />,
        DetailDistributeOrder: <DetailDistributeOrder />

    };
    const [activeComponent, setActiveComponent] = useState(components.ListMedicine)
    

    return (
        <>
            <div className='d-flex  medicine'>
                <NavWareHouse onComponentClick={handleComponentClick}/>
                <div className='body-content-medicine'>
                    {activeComponent}
                </div>
            </div>
        </>
    )
}

export default Medicine;
