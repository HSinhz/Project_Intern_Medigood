import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { BsBoxSeamFill } from "react-icons/bs";
import { LiaClipboardListSolid } from "react-icons/lia";
import { GiMedicinePills } from "react-icons/gi";
import { FaHandshakeSimple } from "react-icons/fa6";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesPacking } from '@fortawesome/free-solid-svg-icons';
const NavWareHouse = ({onComponentClick}) => {
    return (
        <>
            <div className='nav-container'>
                <h3>Kho hàng</h3>
                <div className="d-flex flex-column ps-3">
                    <Link className='nav-content' href="#home"
                        to='/medigood/san-pham/danh-sach'
                        onClick={() => onComponentClick('ListMedicine')} 
                    >
                        <GiMedicinePills/> Dược phẩm/ Sản phẩm
                    </Link>
                    <Link className='nav-content' href="#home"
                        to='/medigood/san-pham/kho-hang'
                        onClick={() => onComponentClick('WareHouse')}
                    >
                        <BsBoxSeamFill/> Quản lý kho
                    </Link>
                    <Link className='nav-content' href="#link"
                        to='/medigood/san-pham/nhap-hang'
                        onClick={() => onComponentClick('ImportGoods')}
                    >
                        <LiaClipboardListSolid /> Nhập hàng
                    </Link>
                    <Link className='nav-content' href="#link"
                        to='/medigood/phan-phoi-hang-hoa'
                        onClick={() => onComponentClick('Distribute')}
                    >
                        <FontAwesomeIcon icon={faBoxesPacking} /> Phân phối sản phẩm
                    </Link>
                    <Link className='nav-content' href="#link"
                        to='/medigood/nha-phan-phoi'
                        onClick={() => onComponentClick('Supplier')}
                    >
                        <FaHandshakeSimple /> Nhà cung cấp
                    </Link>
                </div>
            </div>
                
        </>
        
    )
}

export default NavWareHouse;
