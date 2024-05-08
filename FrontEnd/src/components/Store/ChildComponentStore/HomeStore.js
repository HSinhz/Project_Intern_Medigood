import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../../views/UserContext';
import { getStoreById } from '../../../services/StoreBranchService';
import { toast } from 'react-toastify';
import { get } from 'lodash';
const HomeStore = ({data, setData}) => {
    const { user } = useUser();
    const history = useHistory();

    const [dataStore, setDataStore] = useState({})
    useEffect(() => {
        console.log(user.isAuthenticated);
        if(!user.isAuthenticated){
            history.push('/login');
        }
        const fetchDataBranchStore = async () => {
            try {
                let response = await getStoreById();
                if(response && response.Success === true){
                    console.log("response.Data Store: ", response.Data)
                    setDataStore(response.Data);
                    setData(response.Data)
                } else {
                    toast.error(response.Mess)
                }
            } catch (error){
                console.log("Error Fetch Data: ", error);
                toast.error("Vui lòng thử lại sau")
            }
        }
        fetchDataBranchStore()
    }, []);

    
    return (
        <>
           <div className='home-stores'>
                {dataStore.Address}
           </div>
        </>
    )
}

export default HomeStore;
