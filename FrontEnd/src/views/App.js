import './App.scss';
// import Nav from '../components/Navigation/Nav';
import NavWeb from '../components/Navigation/Nav.js';
import Login from '../components/Login/Login.js'
import Home from '../components/Home/Home';
import Personnel from '../components/Personnel/Personnel.js';
import Store from '../components/Store/Store.js';
import Medicine from '../components/Medicine/Medicine.js';
import DetailMedicine from '../components/Medicine/DetailMedicine.js';
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
              <Route path="/medicine/:typeName/:categoryName/:medicineName">
                <DetailMedicine/>
              </Route>
              <Route path="/medicine/:typeName/:categoryName">
                <Medicine/>
              </Route>
              <Route path="/medicine/:typeId">
                <Medicine/>
              </Route>
              <Route path={
                [
                  "/cua-hang-chi-nhanh/don-hang/lich-su-don-hang/:madonhang",
                  "/cua-hang-chi-nhanh/don-hang/tao-moi",
                  "/cua-hang-chi-nhanh/don-hang/khach-hang",
                  "/cua-hang-chi-nhanh/don-hang/lich-su-don-hang",
                  "/mystored/cua-hang-chi-nhanh", 
                  '/cua-hang-chi-nhanh/don-hang', 
                  '/cua-hang-chi-nhanh/thong-ke', 
                  '/cua-hang-chi-nhanh/ho-so', 
                  '/cua-hang-chi-nhanh/duoc-pham', 
                  '/cua-hang-chi-nhanh/cai-dat']}>
                <Store />
              </Route>
              <Route path="/medicine">
                <Medicine/>
              </Route>
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
