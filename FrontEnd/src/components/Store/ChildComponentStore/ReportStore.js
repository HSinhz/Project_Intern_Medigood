import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../../views/UserContext';

const ReportStore = () => {
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
            ReportStore
        </div>
    )
}

export default ReportStore;
