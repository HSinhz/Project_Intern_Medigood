import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Status from '../../Medicine/UIUX/Status/StatusPurchase';
const HeaderStatus = ({action, Id, statusId, statusName, handleProcessDistribute, PositionId}) => {
    const [actionBtn, setActionBtn] = useState('Chỉnh sửa')
    const handleEdit = () => {
        setActionBtn("Xác nhận")
    }
    return (
        <div className="p-4 background-white mt-4">
            <div className="d-flex justify-content-between">
                <div className='d-flex'>
                    <div className='me-2 d-flex'>
                        <h3>{action.textHeader} <span> - {Id}</span></h3>
                    </div>
                    <div className='ms-2 mt-2'>
                        <Status statusId={statusId} statusName={statusName}/>
                    </div>
                </div>
                {
                    statusId === 1 ? 
                        <></> 
                    :
                    statusId === 6 ? 
                        <></>
                    : 
                        PositionId === 5 || PositionId === 6 ?
                        <>
                            <button className="btn btn-primary"
                                onClick={() => [
                                    handleProcessDistribute('EDIT'),
                                    handleEdit()
                                ]}
                            >{actionBtn}</button>
                        </>
                        :
                        <>
                            <div className='d-flex'>
                                <button className="btn btn-primary me-2"
                                    onClick={() => [
                                        handleProcessDistribute('EDIT'),
                                        handleEdit()
                                    ]}
                                >{actionBtn}</button>
                                <button className="btn btn-primary ms-2"
                                onClick={() => handleProcessDistribute('CONFIRM')}
                            >{action.btnText}</button>
                            </div>
                            
                        </>
                            
                }
            </div>
        </div>
    );
};

export default HeaderStatus;
