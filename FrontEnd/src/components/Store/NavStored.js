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
const NavStored = ({ onNavLinkClick }) => {
    return (
        <>
            <div className='nav-store background-color-primary '>
                <Navbar expand="lg" className="flex-column ms-0">
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto flex-column">
                            <Link className='text-white nav-link fw-bold' 
                                to='/mystored/cua-hang-chi-nhanh'
                                onClick={() => onNavLinkClick('HomeStore')}
                            > 
                                <i className='icon'><BiHome/></i>
                            </Link>
                            <Link className='text-white nav-link' 
                                to='/cua-hang-chi-nhanh/don-hang'
                                onClick={() => onNavLinkClick('Prescription')}
                            >
                                <i className='icon'><BsCart2/></i>
                            </Link>
                            <Link className='text-white nav-link' 
                                to='/cua-hang-chi-nhanh/thong-ke'
                                onClick={() => onNavLinkClick('Statistics')}
                            >
                                <i className='icon'><AiOutlineBarChart/></i>
                            </Link>
                            <Link className='text-white nav-link' 
                                to='/cua-hang-chi-nhanh/ho-so'
                                onClick={() => onNavLinkClick('PersonnelStore')}
                            >
                                <i className='icon'><BsFillPersonLinesFill/></i>
                            </Link>
                            <Link className='text-white nav-link' 
                                to='/cua-hang-chi-nhanh/duoc-pham'
                                onClick={() => onNavLinkClick('Statistics')}
                            >
                                <i className='icon'><GiMedicines/></i>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Link className='text-white nav-link' 
                            to='/cua-hang-chi-nhanh/cai-dat'
                            onClick={() => onNavLinkClick('SettingStore')}
                        >
                            <i className='icon'><AiFillSetting/></i>
                        </Link>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    );
}

export default NavStored;