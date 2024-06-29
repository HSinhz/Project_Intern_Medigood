import React from 'react';
import { NavLink, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './Nav.scss'
import { useEffect, useState, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { BiStore } from "react-icons/bi";
import { BsPersonLinesFill } from "react-icons/bs";
import { GiMedicines } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { LuWarehouse } from "react-icons/lu";
import { AiOutlineBarChart } from "react-icons/ai";
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import  logo from '../../assets/images/logo-nav.png';
import { UserContext } from '../../views/UserContext';
const NavWeb = () => {
    const {user} = useContext(UserContext);
    const location = useLocation();
    if( user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                <div className="container-fluid background-navbar">
                    <Navbar expand="lg" className='' >
                        <Navbar.Brand href="/medigood" className='logo-container'><img src={logo} className='img-fluid logo-img-nav inline-block'/></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto fw-bold">
                            <Nav.Link href="/mystored/cua-hang-chi-nhanh" className='nav-link text-color'>Cửa hàng</Nav.Link>
                            <Nav.Link href="/news" className='nav-link text-color'>Tin tức</Nav.Link>
                            <NavDropdown title="Quản trị" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/medigood/doanh-thu" className='fs-5'><span className='m-2'><AiOutlineBarChart/></span>Quản lý doanh thu</NavDropdown.Item>
                                <NavDropdown.Item href="/medigood/san-pham" className='fs-5'><span className='m-2'><GiMedicines/></span>Quản lý dược phẩm</NavDropdown.Item>
                                <NavDropdown.Item href="/personnel" className='fs-5'><span className='m-2'><BsPersonLinesFill/></span>Quản lý nhân sự</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </>
        );
    } else {
        return <></>
    }
    
}

export default NavWeb;