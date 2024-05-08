import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Nav.scss'
import { useEffect, useState} from 'react';
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

const NavWeb = () => {
    const [account, setAccount] = useState();

    useState( () => {
        let isLogin = localStorage.getItem("account");
        if(isLogin){
            setAccount(JSON.parse(isLogin));
        }
    } , [account]) // [] chỉ chạy một lần
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
                            <NavDropdown.Item href="#action/3.1" className='fs-5'><span className='m-2'><BiStore/></span> Quản lý cửa hàng</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2" className='fs-5'><span className='m-2'><AiOutlineBarChart/></span>Quản lý doanh thu</NavDropdown.Item>
                            <NavDropdown.Item href="/medicine" className='fs-5'><span className='m-2'><GiMedicines/></span>Quản lý dược phẩm</NavDropdown.Item>
                            <NavDropdown.Item href="/personnel" className='fs-5'><span className='m-2'><BsPersonLinesFill/></span>Quản lý nhân sự</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3" className='fs-5'><span className='m-2'><LuWarehouse/></span>Quản lý kho hàng</NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    );
}

export default NavWeb;