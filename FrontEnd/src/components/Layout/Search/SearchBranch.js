import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './Search.scss'

const SearchBranch = ({onSearch}) => {
    const handleSubmit = (value) => {
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className='form-search pt-2 ' >  
            <div className="input-container w-50">
                <AiOutlineSearch className="icon"/>
                <input type='text' placeholder='Tìm theo tên, mã chi nhánh' className='input-medicine ' 
                    onChange={(event) => handleSubmit(event.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBranch;
