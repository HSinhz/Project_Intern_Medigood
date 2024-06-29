import { useEffect, useContext, useState } from 'react';
import { useHistory, NavLink, Link  } from 'react-router-dom';
import SearchForm from "./UIUX/Input";
import {showMedicine} from '../../services/MedicineService';
import { UserContext } from '../../views/UserContext';
import { toast } from 'react-toastify';
const WareHouse = () => {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimt, setCurrentLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [listMedicine, setListMedicine] = useState([]);

    useEffect(() => {
        document.title = 'Dược Phẩm' ;
        console.log(user.isAuthenticated);
        if(!user.isAuthenticated){
            history.push('/login');
        }
        fetchDataMedicine();
    }, [ currentPage]);
    const fetchDataMedicine = async () => {
        try{
            let response = await showMedicine('', '', currentPage, currentLimt );
            if(response && response.Success === true){
                setListMedicine(response.Data);
                console.log("WareHouse: ", response .Data)
            }
        } catch (error){
            console.log("Error when fetch data medicine: ", error);
            toast.error("Có lỗi vui lòng thử lại sau");
        }
    }
    return (
        <>
            <div className="ware-house mt-3">
                <div className="d-flex">
                    <h3 className="me-4">Quản lý kho hàng</h3>
                    <div className="ms-4 me-4 w-50">
                        <SearchForm />
                    </div>
                    <div className="ms-4 me-4">
                        <select className="form-select">
                            <option>123123</option>
                        </select>
                    </div>
                    <div className="ms-4">
                        <select className="form-select">
                            <option>123123</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <table class="table mt-4">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tồn kho</th>
                                <th scope="col">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listMedicine && listMedicine.length > 0 ? 
                                <>
                                    {
                                        listMedicine.map((item, index) => {
                                            return (
                                                <tr className='table-row '>
                                                    <td className='w-60'><img className='img-personnel-container img-personnel img-fluid' src={item.ImgUrl}/></td>
                                                    <td className=' witd-td-name'>
                                                        <div className='d-flex align-items-center justify-content-center '>
                                                            {item.MedicineDetailName}
                                                        </div>                                                    
                                                    </td>
                                                    <td>
                                                    {item.Price} VNĐ
                                                    </td>
                                                    <td>{item.Stock}</td>
                                                    <td>{item.Inventory}</td>
                                                    <td>
                                                        <div>
                                                        </div>
                                                    </td>
                                                </tr>

                                            )
                                        })
                                    }
                                </> : 
                                <>
                                    <div className="text-center">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/medigood-d7665.appspot.com/o/image%2Fempty-bill.svg?alt=media&token=9c7b0ab0-47d7-4984-80bc-1c77d5e7c6fc"/> 
                                        <h4>Chưa có đơn hàng</h4>
                                    </div> 
                                </>}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default WareHouse;