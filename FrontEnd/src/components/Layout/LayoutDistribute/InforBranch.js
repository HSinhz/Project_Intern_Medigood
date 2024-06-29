import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { VscChromeClose } from "react-icons/vsc";
import { FaCircle } from "react-icons/fa";

const InforBranch = ({branch}) => {

    return (
        <>
            <div className="mt-4 fs-4 form-infor gridViewLeft">
                <li className="muiListItem">
                    <div className="muiListItemText">Địa chỉ:</div>
                        <div className="muiListItemText d-flex justify-content-between">
                        {/* <span className="muiListItemRight">{branch.Address}</span>
                         */}
                        <span className="muiListItemRight">{branch.Address}</span>
                        {/* <div className="">
                            <a className="text-dark btn-delete-branch"
                                // onClick={() => deleteBranch()}
                            ><VscChromeClose /></a>
                        </div> */}
                    </div>
                </li>
                <li className="muiListItem">
                    <div className="muiListItemText">Mã chi nhánh:</div>
                    <div className="muiListItemText">
                        <span className="muiListItemRight">{branch.Id}</span>   
                    </div>
                </li>
                <li className="muiListItem">
                    <div className="muiListItemText">Trạng thái:</div>
                    <div className=" muiListItemText status">
                        <span  className="muiListItemRight">
                            <FaCircle/> <span>Đang hoạt động</span>
                        </span>
                    </div>
                </li>
            </div>
        </>
    );
};

export default InforBranch;
