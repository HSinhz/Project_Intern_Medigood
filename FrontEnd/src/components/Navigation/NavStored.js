import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Nav.scss';
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
const NavStored = () => {
    return (
        <>
        <div className='nav-store background-color-primary '>
            <Navbar expand="lg" className="flex-column ms-0">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto flex-column">
                        <Nav.Link className='text-white nav-link fw-bold' href="#home"> <i className='icon'><BiHome/></i></Nav.Link>
                        <Nav.Link className='text-white nav-link' href="#link"><i className='icon'><BsCart2/></i></Nav.Link>
                        <Nav.Link className='text-white nav-link' href="#link"><i className='icon'><AiOutlineBarChart/></i></Nav.Link>
                        <Nav.Link className='text-white nav-link' href="#link"><i className='icon'><BsFillPersonLinesFill/></i></Nav.Link>
                        <Nav.Link className='text-white nav-link' href="#link"><i className='icon'><GiMedicines/></i></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link className='text-white nav-link' href="#link"><i className='icon'><AiFillSetting/></i></Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
            
        </>
    );
}

export default NavStored;