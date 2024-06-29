import './Login.scss';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState, useContext} from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { loginUser} from '../../services/userService'
import useCheckLogin from '../../utils/checkLogin';
import '../style.scss';
import validateLogin from '../../utils/validates/validateLogin';
import { UserContext } from '../../views/UserContext';
import Personnel from '../Personnel/Personnel';
const Login = (props) => {
    const {loginContext} = useContext(UserContext);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [dataLogin, setDataLogin] = useState({})
    const history = useHistory();
    const defaultValidInput = {
        isValidEmail: true,
        isValidPassword: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
    useEffect(() => {
        window.document.title = "Đăng nhập"
        let isLogin = localStorage.getItem("account");
        if(isLogin){
            history.push('/medigood')
        } 
    }, []);

    const handlerLogin = async () => {
        setObjCheckInput(defaultValidInput);
        let validate = validateLogin(Email, Password);
        if( validate.ER === false ){
            if( validate.Type == 1) {
                toast.error(validate.EM);
                setObjCheckInput({...defaultValidInput , isValidEmail: false});
                return false;
            } 
            if( validate.Type == 2){
                toast.error(validate.EM);
                setObjCheckInput({...defaultValidInput , isValidPassword: false});
                return false;
            }
        }
        let response =  await loginUser(Email, Password);
        if(response && response.Success === true){
            let data = {
                isAuthenticated: true,
                Mess: 'Logined',
                PersonnelName: response.PersonnelName,
                Email: response.Email,
                Position: response.Position
            }
            localStorage.setItem("account", JSON.stringify(data));
            loginContext(data)
            history.push('/medigood');
        } 

        if( response && response.Success === false){
            toast.error(response.Mess);
        }
    }
    // const {user} =   React.useContext(UserContext);
    // console.log('>>> Check User Login: ', user);
    
    return ( 
        <div className="login-container">
            <div className="container-sm">
                <div className="row">
                    <div className=" col-md-8 mt-4 ">
                        <img src='https://cdn.vectorstock.com/i/preview-1x/95/59/medicine-and-healthcare-round-poster-vector-45099559.jpg' className='w-100'/>
                    </div>
                    <div className="col-md-4 ">
                        <div className="form-login mt-32">
                            <h1 className="mb-3 text-center fw-bold primary-color">Welcom to Medigood</h1>
                            <h2 className="mb-4 mt-3 text-center primary-color">Login</h2>
                                <div className="mb-3">
                                    <input type="email" className={objCheckInput.isValidEmail ? 'form-control' :'form-control is-invalid'} id="email" aria-describedby="emailHelp" placeholder="Email" required
                                        value={Email} onChange={( event) => setEmail(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className={objCheckInput.isValidPassword ? 'form-control' :'form-control is-invalid'} id="exampleInputPassword1" placeholder="Password" required
                                        value={Password} onChange={( event) => setPassword(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" for="exampleCheck1">Remember Account</label>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-success " onClick={() => handlerLogin()}>Log in</button>
                                </div>
                            <div className="mb-3 text-center ">
                                <a href="#" className="forgot-pass">Forgotten Password</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;