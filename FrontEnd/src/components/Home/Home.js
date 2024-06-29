import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../views/UserContext';

const Home = () => {
    const { user } = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        document.title = 'Medigood'
        console.log(user);
        if(!user.isAuthenticated){
            history.push('/login');
        }
    }, []);
    return (
        <div className='container'>
            Home
        </div>
    )
}

export default Home;
