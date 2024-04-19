import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import '../style.scss';
import './Medicine.scss';
import { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsCart2 } from "react-icons/bs";
import { BiHome } from "react-icons/bi";
import { AiOutlineBarChart } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { GiMedicines } from "react-icons/gi";
import { AiFillSetting } from "react-icons/ai";
const NavCategory = () => {
    return (
        <>
            <div className='d-flex nav-category'>
                <ul className="nav me-auto">
                    <li className="nav-item dropdown">
                        <a href="#action/3.8978" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" aria-expanded="false">
                            Thực phẩm chức năng
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#action/3.1">Action</a></li>
                            <li><a className="dropdown-item" href="#action/3.2">Another action</a></li>
                            <li><a className="dropdown-item" href="#action/3.3">Something</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#action/3.4">Separated link</a></li>
                        </ul>
                    </li>
                </ul>
                <ul className="nav me-auto">
                    <li className="nav-item dropdown">
                        <a href="#action/3.8978" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" aria-expanded="false">
                            Thực phẩm chức năng
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#action/3.1">Action</a></li>
                            <li><a className="dropdown-item" href="#action/3.2">Another action</a></li>
                            <li><a className="dropdown-item" href="#action/3.3">Something</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#action/3.4">Separated link</a></li>
                        </ul>
                    </li>
                </ul>
                <ul className="nav me-auto">
                    <li className="nav-item dropdown">
                        <a href="/action/3.8978" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" aria-expanded="false">
                            Thực phẩm chức năng
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#action/3.1">Action</a></li>
                            <li><a className="dropdown-item" href="#action/3.2">Another action</a></li>
                            <li><a className="dropdown-item" href="#action/3.3">Something</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#action/3.4">Separated link</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default NavCategory;