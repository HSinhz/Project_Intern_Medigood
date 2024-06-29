import { useEffect, useState } from "react";
import {fetchDataAllPrescriptionWithBranch} from '../../../../services/StoreBranchService'
import { toast } from "react-toastify";
import moment from 'moment';
import { FaAddressCard } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { documentTile } from '../../../../utils/documentTitle';

const HistoryOrder = ({ setNameComponent }) => {
    const history = useHistory();
    const [listPrescription, setListPrescription] = useState([]);
    const [phoneCustomer, setPhoneCustomer] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimt, setCurrentLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [listPrescriptionPhone, setListPrescriptionPhone] = useState([]);
    const [confirmPhone, setConfirmPhone] = useState(false);
    useEffect(() => {   
        document.title = documentTile.Store.HistoryPrescription
        fetchDataPrescriptionWithBranch();
    }, [currentPage]);
    useEffect(() => {
        if(confirmPhone === true){
            fetchDataPrescriptionWithBranch();
            setConfirmPhone(false);
        }
    }, [confirmPhone])

    useEffect(() => {
        if(phoneCustomer === ''){
            fetchDataPrescriptionWithBranch();
        }
    }, [phoneCustomer])
    
    const fetchDataPrescriptionWithBranch = async () => {
        try {
            let response = await fetchDataAllPrescriptionWithBranch(phoneCustomer, currentPage, currentLimt);
            if( response && response.Success === true){
                setListPrescription(response.Data);
                setListPrescriptionPhone(response.Data);
                setTotalPages(response.totalPages);
            } else {
                toast.error("Khách hàng không tồn tại")
            }
        } catch( error) {
            toast.error("Vui lòng thử lại sau");
            console.log(error);
        }
    }

    const handleOnChange = async (phone) => {
        setPhoneCustomer(phone)
    }
    const handleGetPrescriptionCustomer = () => {
        setConfirmPhone(true)
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    return (
        <>
            <div className="history-prescription mx-4">
                <div className="d-flex mb-4">
                    <div className="me-4">
                        <h1>Lịch sử đơn hàng</h1>
                    </div>
                    <div className='d-flex  form-customer pt-2 ms-4' >  
                        <form>
                            <div className="input-container">
                                <FaAddressCard className="icon"/>
                                <input type='text' placeholder='Số điện thoại khách hàng' className='input-customer' value={phoneCustomer}
                                    onChange={(event) => handleOnChange(event.target.value)}
                                />
                            </div>
                        </form>
                        <div className='mx-2'>
                            <button className='btn btn-primary'
                                onClick={handleGetPrescriptionCustomer}
                            >Xác nhận</button>
                        </div>
                    </div>
                </div>
                { listPrescriptionPhone && listPrescriptionPhone.length > 0 ?  
                    <>
                        <div className="table-history-order">
                            <table className="order-history">
                                <thead>
                                    <tr>
                                        <th className="ps-4">Mã đơn hàng</th>
                                        <th>Ngày đặt hàng</th>
                                        <th>Khách hàng</th>
                                        <th>Tổng giá trị</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listPrescriptionPhone.map((item, index) => {
                                            const startCreated = moment(item.createdAt).local().format('DD-MM-YYYY');
                                            let totalString = item.Total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                            return (
                                                <tr className="table-row " onClick={() => [
                                                    setNameComponent('DetailPrescription'), 
                                                    history.push(`/cua-hang-chi-nhanh/don-hang/lich-su-don-hang/${item.PrescriptionId}`)]}
                                                    >
                                                    <td className="ps-4">{item.PrescriptionId}</td>
                                                    <td>{startCreated}</td>
                                                    <td>{item.CustomerPhone}</td>
                                                    <td>{totalString} </td>
                                                    <td>Hoàn thành</td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </> :
                    <>
                        <div className="text-center">
                            <img src="https://firebasestorage.googleapis.com/v0/b/medigood-d7665.appspot.com/o/image%2Fempty-bill.svg?alt=media&token=9c7b0ab0-47d7-4984-80bc-1c77d5e7c6fc"/> 
                            <h4>Chưa có đơn hàng</h4>
                        </div> 
                    </>
                }

                <div className='mt-4 paginate'>
                    <ReactPaginate
                        nextLabel="Tiếp >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPages}
                        previousLabel="< Trước "
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />       
                </div>
            </div>
        </>
    )
}

export default HistoryOrder;