import { useEffect, useState } from 'react';
import '../SCSS/Distribute.scss';
import HeaderContainer from '../UIUX/HeaderContainer';
import { toast } from 'react-toastify';
import {getAllDistributeOrder} from '../../../services/DistributeService'
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import Status from '../UIUX/Status/StatusPurchase';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Distribute = ({onComponentClick, showDetailDistribute}) => {
    const history = useHistory();
    const action = {
        textHeader: 'Danh sách đơn phân phối hàng hóa',
        btnText: 'Thêm đơn phân phối mới',
        componentChildren: 'CreateDistributeOrder',
        path: "/medigood/san-pham/phan-phoi/tao-don-phan-phoi-hang"
    }
    const [listDistributeOrder, setListDistributeOrder] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimt, setCurrentLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchDataDistribute();
    }, [currentPage]);

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const fetchDataDistribute = async () => {
        try {
            let response = await getAllDistributeOrder(currentPage, currentLimt);
            if(response && response.Success === true ){
                console.log("response.Data: ", response.Data)
                setListDistributeOrder(response.Data);
                setTotalPages(response.totalPages)
            } else {
                toast.error(response.Mess);
            }
        } catch (error) {
            console.log(error);
            toast.error('Vui lòng thử lại sau')
        }
    }
    return (
        <>
            <div className="distribute-container">
                <HeaderContainer action={action} onComponentClick={onComponentClick}/>
                <div className='list-distribute-order background-white pt-4'>
                    <table className='table-list-distribution'>
                        <thead>
                            <th className='ps-4' scope='col'>Mã đơn</th>
                            <th className='' scope='col'>Ngày tạo</th>
                            <th className='' scope='col'>Trạng thái</th>
                            <th className='' scope='col'>Trạng thái nhập</th>
                            <th className='' scope='col'>Nhân viên tạo</th>
                            <th className='' scope='col'>Chi nhánh nhập</th>
                        </thead>
                        <tbody >
                            {
                                listDistributeOrder && listDistributeOrder.length > 0 ? 
                                <>
                                    {
                                        listDistributeOrder.map((item, index) => {
                                            let employee = item.EmployeeFirstName + ' ' + item.EmployeeLastName;
                                            const startCreated = moment(item.createdAt).local().format('DD/MM/YYYY HH:mm');
                                            return (
                                                <tr className='table-row' 
                                                    onClick={() => [
                                                        showDetailDistribute('DetailDistributeOrder'),
                                                        history.push(`/medigood/san-pham/phan-phoi/${item.DistributeId}`)
                                                    ]}
                                                >
                                                    <td className='ps-4'>{item.DistributeId}</td>
                                                    <td>{startCreated}</td>
                                                    <td><Status statusId={item.Status} statusName={item.StatusName} /></td>
                                                    <td >
                                                            <span className={item.Status === 1 ? 'border-context is-input' : 'border-context not-input'}>{item.Status === 1 ? 'Đã xuất hàng' : 'Chưa xuất hàng'}</span>
                                                    </td>
                                                    <td>{employee}</td>
                                                    <td>{item.BranchAddress}</td>

                                                </tr>
                                            )
                                        })
                                    }
                                </> :
                                <>
                                     <tr>
                                        <td colSpan="6" className="text-center">
                                            <div className="mt-2">
                                                <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/medigood-d7665.appspot.com/o/image%2Fempty-bill.svg?alt=media&token=9c7b0ab0-47d7-4984-80bc-1c77d5e7c6fc"
                                                    alt="No orders"
                                                />
                                                <h4>Chưa có đơn phân phối</h4>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            }
                        </tbody>
                    </table>
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

export default Distribute;