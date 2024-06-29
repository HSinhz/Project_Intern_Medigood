import React from 'react';
import { NavLink, Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Store.scss';
import '../style.scss';
import { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsCart2 } from "react-icons/bs";
import { BiHome } from "react-icons/bi";
import { AiOutlineBarChart } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { GiMedicines } from "react-icons/gi";
import { AiFillSetting } from "react-icons/ai";
import { ImBoxAdd } from "react-icons/im";
const NavStored = ({ onNavLinkClick }) => {
    return (
        <>
            <div className='nav-store '>
                <div className="d-flex flex-column">
                    <Link className=' nav-link ' 
                        to='/mystored/cua-hang-chi-nhanh'
                        onClick={() => onNavLinkClick('HomeStore')}
                    > 
                        <BiHome/>
                    </Link>
                    <Link className=' nav-link' 
                        to='/cua-hang-chi-nhanh/don-hang'
                        onClick={() => onNavLinkClick('Prescription')}
                    >
                        <BsCart2/>
                    </Link>
                    <Link className=' nav-link' 
                        to='/cua-hang-chi-nhanh/duoc-pham'
                        onClick={() => onNavLinkClick('MedicineBranch')}
                    >
                        <GiMedicines/>
                    </Link>
                    <Link className=' nav-link' 
                        to='/cua-hang-chi-nhanh/duoc-pham'
                        onClick={() => onNavLinkClick('ListPurchaseBranch')}
                    >
                        <ImBoxAdd/>
                    </Link>
                    <Link className=' nav-link' 
                        to='/cua-hang-chi-nhanh/thong-ke'
                        onClick={() => onNavLinkClick('Statistics')}
                    >
                        <AiOutlineBarChart/>
                    </Link>
                    <Link className=' nav-link' 
                        to='/cua-hang-chi-nhanh/ho-so'
                        onClick={() => onNavLinkClick('PersonnelStore')}
                    >
                        <BsFillPersonLinesFill/>
                    </Link>
                    <Link className=' nav-link' 
                        to='/cua-hang-chi-nhanh/cai-dat'
                        onClick={() => onNavLinkClick('SettingStore')}
                    >
                        <AiFillSetting/>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default NavStored;