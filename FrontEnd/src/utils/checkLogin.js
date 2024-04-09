import { useEffect} from 'react';
import { useHistory } from 'react-router-dom';


const CheckLogin = () => {
    const history = useHistory();
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if(!session){
            history.push('/login')
        }
    
    }, [history]);
}


export default CheckLogin;