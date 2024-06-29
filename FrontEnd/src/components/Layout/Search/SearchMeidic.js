import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './Search.scss'

const SearchMeidic = ({onSearch}) => {
    const handleSubmit = (value) => {
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className='form-search pt-2'>  
            <div className="input-container">
                <AiOutlineSearch className="icon"/>
                <input type='text' placeholder='Tìm theo tên, mã sản phẩm' className='input-medicine'
                    onChange={(event) => handleSubmit(event.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchMeidic;
