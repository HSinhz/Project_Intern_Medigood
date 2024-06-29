import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { documentTile } from "../../utils/documentTitle";
import { getAllPurchaseOrder } from "../../services/PurchaseService";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from "react-toastify";
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import './SCSS/Purchase.scss'
import Status from "./UIUX/Status/StatusPurchase";

const ImportGoods = ({onComponentClick}) => {
    const [listPurchaseOrder, setListPurchaseOrder] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimt, setCurrentLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        document.title = documentTile.Medicine.PurchaseOrder;
        fetchAllPurchaseOrder();
    }, [currentPage])

    const handleOpenCreatePurchaseOrder = () => {

    }

    const fetchAllPurchaseOrder = async () => {
        try {
            let respone = await getAllPurchaseOrder(currentPage, currentLimt);
            if(respone && respone.Success === true ){
                setListPurchaseOrder(respone.Data);
                setTotalPages(respone.totalPages)
            } else {
                toast.error(respone.Mess);
            }
        } catch(error) {
            toast.error("Vui lòng thử lại");
            console.log(error);
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };
    return (
        <>
            <div className="import-goods mt-4">
                    <div className="d-flex justify-content-between mb-4 p-4">
                        <h3>Danh sách đơn nhập hàng</h3>
                        <Link className="btn btn-primary" 
                            to="/medigood/san-pham/nhap-hang/tao-don-nhap-hang"
                            onClick={() => [handleOpenCreatePurchaseOrder(),  onComponentClick('CreatePureChaseOrder')]}
                        ><AiOutlinePlus className='pb-1 mx-2'/> Tạo đơn nhập hàng</Link>
                    </div>
                    <div className="mt-4">
                        {
                            listPurchaseOrder && listPurchaseOrder.length > 0 ? 
                            <>
                                <table className="table-import">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="ps-4">Mã đơn nhập</th>
                                            <th scope="col">Ngày nhập</th>
                                            <th scope="col">Trạng thái</th>
                                            <th scope="col">Nhà cung cấp</th>
                                            <th scope="col">Nhân viên</th>
                                            <th className="th-value pe-4" scope="col">Giá trị đơn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listPurchaseOrder.map((item, index) => {
                                                const startCreated = moment(item.createdAt).local().format('DD/MM/YYYY HH:mm');
                                                let totalString = item.Total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                                return (
                                                    <tr className="table-row">
                                                        <td className="ps-4 ">{item.PurchaseId} </td>
                                                        <td>{startCreated} </td>
                                                        <td > <Status statusId={item.Status} statusName={item.StatusName}/> </td>
                                                        <td>{item.SupplierName} </td>
                                                        <td>{item.EmployeeLastName} {item.EmployeeFirstName} </td>
                                                        <td className="th-value pe-4">{totalString} </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </> : 
                            <>
                                <div className="text-center">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/medigood-d7665.appspot.com/o/image%2Fempty-bill.svg?alt=media&token=9c7b0ab0-47d7-4984-80bc-1c77d5e7c6fc"/> 
                                    <h4>Chưa có đơn hàng</h4>
                                </div> 
                            </>
                        }
                        
                    </div>
                    <div className='mt-4 d-flex justify-content-center'>
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="< previous"
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

export default ImportGoods;