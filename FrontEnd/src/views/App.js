import './App.scss';
// import Nav from '../components/Navigation/Nav';
import NavWeb from '../components/Navigation/Nav.js';
import Login from '../components/Login/Login.js'
import Home from '../components/Home/Home';
import Personnel from '../components/Personnel/Personnel.js';
import Store from '../components/Store/Store.js';
import Medicine from '../components/Medicine/Medicine.js';
import DetailMedicine from '../components/Medicine/DetailMedicine.js';
import Report from '../components/Sales/Report.js';
import { UserProvider } from './UserContext.js';
import { StoreProvider } from '../context/StoreContext.js';
import { useUser } from './UserContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from 'react-toastify';
import _ from 'lodash';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
function App() { 
  
  return (
      <Router>
        <div className=''>
          <NavWeb/>
        </div>
        <div className='body-app'>
          <Switch>
            <Route path="/medicine/:categoryName/:medicineName">
              <DetailMedicine/>
            </Route>
            <Route path="/medicine/:typeName/:categoryName">
              <Medicine/>
            </Route>
            <Route path="/medicine/:typeName">
              <Medicine/>
            </Route>
            <Route path={[
              "/medigood/cua-hang-chi-nhanh/phan-phoi/chi-tiet/:distributeId",
              "/medigood/cua-hang-chi-nhanh/phan-phoi",
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
            <Route path={[
              "/medigood/san-pham/phan-phoi/:distributeId",
              "/medigood/san-pham/phan-phoi/tao-don-phan-phoi-hang",
              '/medigood/san-pham/nhap-hang/tao-don-nhap-hang',
              '/medigood/phan-phoi-hang-hoa',
              '/medigood/nha-phan-phoi',
              '/medigood/san-pham/nhap-hang',
              '/medigood/san-pham/kho-hang',
              '/medigood/san-pham/danh-sach',
              "/medigood/san-pham",
            ]}>
              <Medicine/>
            </Route>
            <Route path="/medigood/doanh-thu">
              <Report/>
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
      
  );
}

export default App;
