import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ComponentChildPrescription.scss';
import { fetchDataPrescripTionDetail } from '../../../../services/StoreBranchService';
import { toast } from 'react-toastify';
const DetailPrescription = () => {
    const { madonhang } = useParams();
    const [dataPrescription, setDataPrescription] = useState([]);

    useEffect(() => {
        fetchPrescriptionDetail();
    },[])

    const fetchPrescriptionDetail = async () => {
        try {
            let response = await fetchDataPrescripTionDetail(madonhang);
            if(response && response.Success === true){
                setDataPrescription(response.Data);
                console.log("response.Data: ", response.Data)
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
                            <button className='me-2 btn btn-primary'>Xuất hóa đơn</button>
                            <button className='ms-2 btn btn-primary'>Mua lại</button>
                        </div>
                    </div>
                    <div className='mt-4 d-flex'>
                        <div className='flex-grow-1 me-3'>
                            <div className="p-4  background-white infor-customer">
                                <h5>Thông tin khách hàng</h5>
                                <div className='mb-4'>Khách mua tại cửa hàng</div>
                                <div className='line mb-4'></div>
                                <p>
                                    Anh Sinh - 0933516029
                                </p>
                            </div>
                            <div className='mt-4 infor-medic-prescription background-white'>
                                <div className='p-4 mb-4'>
                                    <h5>Thông tin sản phẩm</h5>
                                </div>
                                <div className=''>
                                    <table className='table-container'>
                                        <thead className='table-head'>
                                            <tr>
                                                <th  className='p-2 m-8' scope='col'></th>
                                                <th  className='p-2 m-8' scope='col' >Sản phẩm</th>
                                                <th  className='p-2 m-8' scope='col' >Giá</th>
                                                <th  className='p-2 m-8' scope='col' >Đơn vị</th>
                                                <th  className='p-2 m-8' scope='col' >Số lượng</th>
                                                <th  className='p-2 m-8' scope='col' >Tổng tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td  scope='col' className='p-2 cell-img'>
                                                    <img className=' img-medic' src='https://firebasestorage.googleapis.com/v0/b/medigood-d7665.appspot.com/o/image%2F199385759_345470910277839_3988273979229903886_n.png?alt=media&token=14f34203-7aa0-40d7-82bf-10f72008958a' />
                                                </td>
                                                <td  scope='col' className='p-2'>Viên sủi Berocca Bayer bổ sung vitamin và khoáng chất </td>
                                                <td  scope='col' className='p-2'>7.500 Đ</td>
                                                <td  scope='col' className='p-2'>Viên</td>
                                                <td  scope='col' className='p-2'>10</td>
                                                <td  scope='col' className='p-2'>75.000 Đ</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='p-4 ms-2 infor-prescription background-white'>
                            <div className='mb-3'>       
                                <h5>Thông tin đơn hàng</h5>
                            </div>
                            <div className='d-flex infor-prescription-body'>
                                <p className='body1'>Chi nhánh <span>:</span></p>
                                <p className='body2'>128 Ni Sư Huỳnh Liên</p>
                            </div>
                            <div className='d-flex infor-prescription-body'>
                                <p className='body1'>Nhân viên <span>:</span></p>
                                <p  className='body2'>Hoàng Hà Nhi</p>
                            </div>
                            <div className='d-flex infor-prescription-body'>
                                <p className='body1'>Ngày bán<span>:</span></p>
                                <p  className='body2'>5-6-2024 13:15</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPrescription;
