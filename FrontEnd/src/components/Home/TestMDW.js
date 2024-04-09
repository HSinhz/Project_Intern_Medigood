import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../views/UserContext';
import {testmiddleware} from '../../services/userService'
const TestMDW = () => {
    const { user } = useUser();
    const history = useHistory();
    useEffect(() => {
        const fectData = async () => {
            let data = await testmiddleware();
        }
        fectData();
    })

    return (
        <div className='backgroud'>
            <div className='container'>
                MiddleWare
            </div>
        </div>
    )
}

export default TestMDW;
