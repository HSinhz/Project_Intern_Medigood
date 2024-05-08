import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import '../style.scss';
import './Medicine.scss';
import { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getType, getCategory } from '../../services/MedicineService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const NavCategory = ({  onSelectType, onSelectcategory }) => {
    

    const [dataCategory, setCategory] = useState([]);
    const [dataType, setTypeMedicine] = useState([]);
   
    useEffect(() => {
        fetchDataCategory();
        fetchDataType();
    }, []);

    
    const fetchDataCategory = async () => {
        try {
            let response = await getCategory();
            if(response && response.Success === true){
                setCategory(response.Data);
            } else {
                toast.error(response.Mess);
            }
        } catch(error){
            console.log("Error Fetch: ", error);
            toast.error("Vui lòng thử lại sau")
        }
    }

    const fetchDataType = async () => {
        try {
            let response = await getType();
            if(response && response.Success === true){
                setTypeMedicine(response.Data);
            } else {
                toast.error(response.Mess);
            }
        } catch(error){
            console.log("Error Fetch: ", error);
            toast.error("Vui lòng thử lại sau")
        }
    }
    

    return (
        <>
            <div className='d-flex nav-category'>
            {dataType && dataType.length > 0 ? (
                dataType.map((item1, index) => (
                    <ul className="nav me-auto" key={index}>
                        <li className="nav-item dropdown">
                            <Link to={`/medicine/${item1.TypeName}`} className="nav-link dropdown-toggle" onClick={() => onSelectType(item1.TypeId)}>
                                {item1.TypeName}
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {dataCategory && dataCategory.length > 0 ? (
                                    dataCategory.map((item, index) => {
                                        if (item.TypeId === item1.TypeId) {
                                            return (
                                                <li key={index}>
                                                    <Link to={`/medicine/${item1.TypeName}/${item.CategoryName}`} className="dropdown-item" onClick={() => onSelectcategory(item.CategoryId)}>
                                                        {item.CategoryName}
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        return null;
                                    })
                                ) : (
                                    <li>Không có dữ liệu</li>
                                )}
                            </ul>
                        </li>
                    </ul>
                ))
            ) : (
                <p>Không có dữ liệu</p>
            )}
        </div>
        </>
    );
}

export default NavCategory;