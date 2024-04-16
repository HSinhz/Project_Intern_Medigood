import { useEffect, useContext } from 'react';
import { useUser } from '../../views/UserContext';
import NavStored from '../Navigation/NavStored';
import {
    useHistory,
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './Store.scss'

const Store = () => {
    const { user } = useUser();
    const history = useHistory();
    useEffect(() => {
        console.log(user.isAuthenticated);
        if(!user.isAuthenticated){
            history.push('/login');
        }
    }, []);
    return (
        
        <div className="my-store d-flex bd-highlight">
            <div className="flex-shrink-1 bd-highlight nav-right">
                <NavStored />
            </div>
            <div className="p-2 w-100  bd-highlight">Right</div>
        </div>
    )
}

export default Store;
