import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchForm = ({onSearch}) => {
    const handleSubmit = (value) => {
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className='form-search-medicine pt-2 ' >  
            <form>
                <div className="input-container">
                    <AiOutlineSearch className="icon"/>
                    <input type='text' placeholder='Tìm theo tên, mã sản phẩm' className='input-medicine ' 
                        onChange={(event) => handleSubmit(event.target.value)}
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
