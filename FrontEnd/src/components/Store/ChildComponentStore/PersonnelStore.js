import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../../views/UserContext';

const PersonnelStore = () => {
    const { user } = useUser();
    const history = useHistory();
    useEffect(() => {
        console.log(user.isAuthenticated);
        if(!user.isAuthenticated){
            history.push('/login');
        }
    }, []);
    return (
        <div className='container'>
            PersonnelStore
        </div>
    )
}

export default PersonnelStore;
