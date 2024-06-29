import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../../views/UserContext';

const PersonnelStore = () => {
    const history = useHistory();
    useEffect(() => {
       
    }, []);
    return (
        <div className='container'>
            PersonnelStore
        </div>
    )
}

export default PersonnelStore;
