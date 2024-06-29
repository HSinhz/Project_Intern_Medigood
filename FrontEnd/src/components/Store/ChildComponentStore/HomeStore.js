import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getStoreById } from '../../../services/StoreBranchService';
import { toast } from 'react-toastify';
const HomeStore = () => {
    const history = useHistory();
    const [dataStore, setDataStore] = useState({})
    useEffect( () => {
        
        const fetchDataBranchStore = async () => {
            try {
                let response = await getStoreById();
                if(response && response.Success === true){
                    console.log("response.Data Store: ", response.Data.Address)
                    setDataStore(response.Data);
                    document.title = response.Data.Address
                } else {
                    toast.error(response.Mess)
                }
            } catch (error){
                console.log("Error Fetch Data: ", error);
                toast.error("Vui lòng thử lại sau")
            }
        }
        fetchDataBranchStore();
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
