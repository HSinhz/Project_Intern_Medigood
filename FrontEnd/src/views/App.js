import './App.scss';
// import Nav from '../components/Navigation/Nav';
import NavWeb from '../components/Navigation/Nav.js';
import Login from '../components/Login/Login.js'
import Home from '../components/Home/Home';
import TestPer from '../components/Home/TestPer.js';
import TestMDW from '../components/Home/TestMDW.js';
import Personnel from '../components/Personnel/Personnel.js';
import { UserProvider } from './UserContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from 'react-toastify';
import _ from 'lodash';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
function App() { 
  const [account, setAccount] = useState({});
  useState( () => {
    let session = localStorage.getItem("account");
    if(session){
      setAccount(JSON.parse(session));

    }
  }, []) // [] chỉ chạy một lần
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <div className='header'>
            { 
              account && !_.isEmpty(account) && account.isAuthenticated
              && <NavWeb/>
            }
          </div>
          <div className='body'>
            <Switch>
              <Route path="/personnel">
                <Personnel/>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/medigood">
                <Home/>
              </Route>
              <Route path="*">
                404 Not Found
              </Route>
            </Switch>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </UserProvider>
    
  );
}

export default App;
