import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import '../../style.scss';
import '../Store.scss';
import './StoreComponent.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaClipboardList } from "react-icons/fa6";
import { BsFillFilePersonFill } from "react-icons/bs";
import { PiClipboardTextBold } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";

const NavPrescription = ({  onNavLinkClick }) => {
    return (
        <>
            <div className='nav-presciption row d-flex '>
                <Link className='col-3 col-sm-1 text-center form-func'
                    to='/cua-hang-chi-nhanh/don-hang/tao-moi'
                    onClick={() => onNavLinkClick('NewOrder')}
                >
                    <i><PiClipboardTextBold /></i>      
                    <div>Đơn hàng mới</div>      
                </Link>
                <Link className='col-3 col-sm-1 text-center form-func'
                    to='/cua-hang-chi-nhanh/don-hang/khach-hang'
                    onClick={() => onNavLinkClick('Customers')}
                >
                    <i><BsFillFilePersonFill/></i>   
                    <div>Khách hàng</div>           
                </Link>
                <Link className='col-3 col-sm-1 text-center form-func'
                    to='/cua-hang-chi-nhanh/don-hang/lich-su-don-hang'
                    onClick={() => onNavLinkClick('HistoryOrder')}
                >
                    <i><FaHistory/></i>   
                    <div>Lịch sử đơn hàng</div>  
                </Link>
                             
                
            </div>
        </>
    );
}

export default NavPrescription;