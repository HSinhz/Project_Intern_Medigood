import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const HeaderCreateContext = ({action, handleCreate}) => {

    return (
        <div className="p-4 background-white mt-4">
            <div className="d-flex justify-content-between">
                <h3>{action.textHeader}</h3>
                <button className="btn btn-primary"
                    onClick={() => handleCreate()}
                >{action.btnText}</button>
            </div>
        </div>
    );
};

export default HeaderCreateContext;
