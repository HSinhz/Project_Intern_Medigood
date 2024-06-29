import { useEffect, useState } from 'react';
import { useParams, useHistory, Link} from 'react-router-dom';
import './ComponentChildPrescription.scss';
import { fetchDataPrescripTionDetail } from '../../../../services/StoreBranchService';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import { documentTile } from '../../../../utils/documentTitle';


const DetailPrescription = ({handleReOrder, handleSendData}) => {
    const history = useHistory();
    const { madonhang } = useParams();
    const [dataPrescription, setDataPrescription] = useState({});
    const [totalOrder, setTotalOrder] = useState('');
    const [totalDiscount, setTotalDiscount] = useState('')
    const [quantityMedicOrder, setQuantityMedicOrder] = useState('')
    useEffect(() => {
        document.title = documentTile.Store.DetailPrescription + madonhang;
        fetchPrescriptionDetail();
    },[])

    const fetchPrescriptionDetail = async () => {
        try {
            let response = await fetchDataPrescripTionDetail(madonhang);
            if(response && response.Success === true){
                response.Data.createdAt = moment(response.Data.createdAt).local().format('DD-MM-YYYY  HH:mm');
                setDataPrescription(response.Data);
                response.Data.Total = response.Data.Total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                response.Data.TotalDiscount = response.Data.TotalDiscount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                setQuantityMedicOrder(response.Data.detailMedic.length);
                setTotalOrder(response.Data.Total);
                setTotalDiscount(response.Data.TotalDiscount)
                console.log("response.Data: ", response.Data);
            } else {
                toast.error(response.Mess);
            }
        } catch (error){
            toast.error("Vui lòng thử lại sau");
            console.log(error);
        }
    }
    
    
    
    return (
        <>
            <div className="detail-prescription p-2">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <div className="me-2">   
                            <h3>Chi tiết đơn hàng - {madonhang}</h3>
                        </div>
                        <div>
                            <button className='me-2 btn btn-primary' >Xuất hóa đơn</button>
                            <Link className='ms-2 btn btn-primary'
                                to={{
                                    pathname: '/cua-hang-chi-nhanh/don-hang/tao-moi',
                                    state: { 
                                        dataPrescription: dataPrescription,
                                    }
                                }}
                                onClick={() => handleReOrder('NewOrder')}
                               >Mua lại</Link>
                        </div>
                    </div>
                    <div className='mt-4 d-flex'>
                        <div className='flex-grow-1 me-3'>
                            <div className="p-4  background-white infor-customer">
                                <h5>Thông tin khách hàng</h5>
                                <div className='mb-4'>Khách mua tại cửa hàng</div>
                                <div className='line mb-4'></div>
                                <p>
                                    {dataPrescription.CustomerName} - {dataPrescription.CustomerPhone}
                                </p>
                            </div>
                            <div className='mt-4 infor-medic-prescription background-white'>
                                <div className='pt-4 ps-4 pb-2'>
                                    <h5>Thông tin sản phẩm</h5>
                                </div>
                                <div className=''>
                                    <table className='table-container'>
                                        <thead className='table-head'>
                                            <tr>
                                                <th  className='p-2 m-8' scope='col'></th>
                                                <th  className='p-2 m-8' scope='col' >Sản phẩm</th>
                                                <th  className='p-2 m-8 text-right' scope='col' >Giá</th>
                                                <th  className='p-2 m-8' scope='col' >Đơn vị</th>
                                                <th  className='p-2 m-8 text-right' scope='col' >Số lượng</th>
                                                <th  className='p-2 m-8 text-right' scope='col' >Tổng tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataPrescription.detailMedic && dataPrescription.detailMedic.length > 0 ?  
                                                <>
                                                    {
                                                        dataPrescription.detailMedic.map((item, index) => {
                                                            let priceMedic = item.MedicinePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                                            let totalItems = item.TotalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                                            
                                                            return (
                                                                <tr>
                                                                    <td  scope='col' className='p-2 cell-img'>
                                                                        <img className='img-medic' src={item.MedicneImg} />
                                                                    </td>
                                                                    <td  scope='col' className='p-2 '>{item.MedicineName}</td>
                                                                    <td  scope='col' className='p-2 text-right'>{priceMedic}</td>
                                                                    <td  scope='col' className='p-2 '>{item.UnitNameOrder}</td>
                                                                    <td  scope='col' className='p-2 text-right'>{item.Quantity}</td>
                                                                    <td  scope='col' className='p-2 text-right'>{totalItems}</td>
                                                                </tr>
                                                            )
                                                        })

                                                    }
                                                </> : 
                                                <>
                                                    <div>Chưa có sản phẩm</div>
                                                </>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className='line mb-4 mt-4'></div>
                                <div className='group-total'>
                                    <li className='d-flex listItem'>
                                        <div className='listItemText'>
                                            Tổng tiền ({quantityMedicOrder} sản phẩm)
                                        </div>
                                        <div className='listItemText'>
                                            {totalOrder}
                                        </div>
                                    </li>
                                    <li className='d-flex listItem'>
                                        <div className='listItemText'>
                                            Giảm giá
                                        </div>
                                        <div className='listItemText'>
                                            {totalDiscount}
                                        </div>
                                    </li>
                                    <li className='d-flex listItem fw-bold'>
                                        <div className='listItemText'>
                                            Khách phải trả
                                        </div>
                                        <div className='listItemText'>
                                            {totalOrder}
                                        </div>
                                    </li>
                                </div>
                            </div>
                        </div>
                        <div className='p-4 ms-2 infor-prescription background-white'>
                            <div className='mb-3'>       
                                <h5>Thông tin đơn hàng</h5>
                            </div>
                            <div className='d-flex infor-prescription-body'>
                                <p className='body1'>Chi nhánh <span>:</span></p>
                                <p className='body2'>{dataPrescription.AddressBranch}</p>
                            </div>
                            <div className='d-flex infor-prescription-body'>
                                <p className='body1'>Nhân viên <span>:</span></p>
                                <p  className='body2'>{dataPrescription.EmployeeLastName} {dataPrescription.EmployeeFirstName}</p>
                            </div>
                            <div className='d-flex infor-prescription-body'>
                                <p className='body1'>Ngày bán<span>:</span></p>
                                {
                                    
                                }
                                <p  className='body2'  >{dataPrescription.createdAt}</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPrescription;
