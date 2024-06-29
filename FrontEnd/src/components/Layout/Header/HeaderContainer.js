import React from 'react';
import { NavLink } from 'react-bootstrap';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const HeaderContainer = ({action, onComponentClick}) => {

    return (
        <div className="d-flex justify-content-between mb-4 p-4">
            <h3>{action.textHeader}</h3>
            <NavLink className="btn btn-primary" 
                to={action.path}
                onClick={() => onComponentClick(action.componentChildren)}
            ><AiOutlinePlus className='pb-1 mx-2'/> {action.btnText}</NavLink>
        </div>
    );
};

export default HeaderContainer;
