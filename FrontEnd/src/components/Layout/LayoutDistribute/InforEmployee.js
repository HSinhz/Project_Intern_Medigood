import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { VscChromeClose } from "react-icons/vsc";
import { FaCircle } from "react-icons/fa";

const InforEmployee = ({employee, date, Id}) => {

    return (
        <>
                <h5>Thông tin đơn phân phối</h5>
                <div className="mt-4 fs-4 form-infor gridViewLeft">
                    <li className="muiListItem">
                        <div className="muiListItemText">Đơn nhập hàng:</div>
                        <div className="muiListItemText">
                            <span className="muiListItemRight">{Id}</span>
                        </div>
                    </li>
                    <li className="muiListItem">
                        <div className="muiListItemText">Tên nhân viên:</div>
                        <div className="muiListItemText">
                        {/* <span className="muiListItemRight">{user.PersonnelName}</span> */}
                            <span className="muiListItemRight">{employee.PersonnelName}</span>
                        </div>
                    </li>
                    <li className="muiListItem">
                        <div className="muiListItemText">Ngày nhập:</div>
                        <div className="muiListItemText">
                            <span className="muiListItemRight">{date}</span>    
                        </div>
                    </li>
                </div>
        </>
    );
};

export default InforEmployee;
