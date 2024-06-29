import Status from "../../Medicine/UIUX/Status/StatusPurchase";
import moment from "moment";
import Paginate from "../Paginate/Paginate";
import './LayoutDistribute.scss';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ListDistribute = ({listDistribute, totalPage , actionDistribute , showDetailDistribute, handlePageClick}) => {
    const history = useHistory();
    return (
        <>
            <div className='list-distribute-order background-white pt-4'>
                <table className='table-list-distribution'>
                    <thead>
                        <th className='ps-4' scope='col'>Mã đơn</th>
                        <th className='' scope='col'>Ngày tạo</th>
                        <th className='' scope='col'>Trạng thái</th>
                        <th className='' scope='col'>
                            {
                                actionDistribute.role === 'BRANCH' ?  
                                    'Trạng thái nhập'
                                : 'Trạng thái xuất'
                            }
                            
                        </th>
                        <th className='' scope='col'>Nhân viên tạo</th>
                        <th className='' scope='col'>Chi nhánh nhập</th>
                    </thead>
                    <tbody >
                    {
                        listDistribute && listDistribute.length > 0 ? 
                        <>
                            {
                                listDistribute.map((item, index) => {
                                let employee = item.EmployeeFirstName + ' ' + item.EmployeeLastName;
                                const startCreated = moment(item.createdAt).local().format('DD/MM/YYYY HH:mm');
                                return (
                                    <tr className='table-row'
                                        onClick={() => [
                                            showDetailDistribute('DetailDistributeOrder'),
                                            history.push(`/medigood/cua-hang-chi-nhanh/phan-phoi/chi-tiet/${item.DistributeId}`)
                                        ]}
                                    >
                                        <td className='ps-4'>{item.DistributeId}</td>
                                        <td className=''>{startCreated}</td>
                                        <td className=''><Status statusId={item.Status} statusName={item.StatusName} /></td>
                                        <td className=''>
                                            <span className={item.Status === 1 ? 'border-context is-input' : 'border-context not-input'}>{item.Status === 1 ? 'Đã xuất hàng' : 'Chưa xuất hàng'}</span>
                                        </td>
                                        <td className=''> {employee}</td>
                                        <td className=''>{item.BranchAddress}</td>
                                    </tr>
                                )})
                            }
                        </> 
                            :
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
                {
                    listDistribute && listDistribute.length > 0  ?
                    <>
                        <Paginate totalPages={totalPage} handlePageClick={handlePageClick}/>
                    </>
                    :
                    <>
                    </>
                }
            </div>
        </>
    )
}

export default ListDistribute