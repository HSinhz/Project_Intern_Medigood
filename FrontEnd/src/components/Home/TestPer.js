import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../views/UserContext';
import {testpermission} from '../../services/userService'
const TestPer = () => {
    const { user } = useUser();
    const history = useHistory();
    useEffect(() => {
        const fectData = async () => {
            let data = await testpermission();
        }
        fectData();
    })

    return (
        <div className='backgroud'>
            <div className='container'>
                Sinhhhh
            </div>
        </div>
    )
}

export default TestPer;
