import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import './ComponentChildPrescription.scss';
import { toast } from 'react-toastify';
import { FaAddressCard } from "react-icons/fa";
import ModalSuccessfully from './ModalSuccessfully';
import { createOrder } from '../../../../services/StoreBranchService';
import {getCustomer} from '../../../../services/CustomerService'
const ConfirmOrder = (props) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [phoneCustomer, setPhoneCustomer] = useState('');
    const [dataCustomer, setDataCustomer] = useState({})

   

    const handleCreateOrder = async () => {
        if(props.listItemOrder.length === 0 ){
            toast.error("Đơn hàng chưa có sản phẩm")
        } else {

            const dataOrder = props.listItemOrder.map(item => {
                return {
                    medicineId: item.meidicineId,
                    medicineName: item.product,
                    totalPrice: item.totalPriceItem,
                    quantity: item.quantity
                }
            })
            let point = 0;
            if( dataCustomer){
                point = dataCustomer.Point + Math.floor(props.total / 1000);
            }
            console.log("phoneCustomer: ", phoneCustomer)
            let response = await createOrder(dataOrder, props.total , phoneCustomer, point);
            if(response && response.Success === true){
                setIsShowModal(true);
                setPhoneCustomer('');
                setDataCustomer('');
                props.handleSuccess();
            } else {
                toast.error(response.Mess);
            }
        }
    }

    const handleGetCustomer = async () => {
        try {
            if( phoneCustomer !== '') {
                let response = await getCustomer(phoneCustomer);
                if(response && response.Success === true) {
                    console.log("Data Customer: ", response.Data);
                    setDataCustomer(response.Data);
                } else {
                    setPhoneCustomer('');
                    toast.error(response.Mess);
                }
            } else {
                setDataCustomer({})
            }
        } catch (error){
            toast.error('Vui lòng thửu lại sau');
            console.log(error);
        }
    }

    const handleOnChange = async (phone) => {
        if(phone === ""){
            setPhoneCustomer('')
        } else {
            setPhoneCustomer(phone);
        }
    }
    const handleClose = () => {
        setIsShowModal(false);
    }
    return (
        <>
            <div className='form-confirm-order '>
                <div className='text-center'>
                    <h1>Xác nhận đơn hàng</h1>
                </div>
                <div className='d-flex  form-customer pt-4' >  
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
                            onClick={() => handleGetCustomer()}
                        >Xác nhận</button>
                    </div>
                   
                </div>
                <div className='d-flex  infor-customer mt-3 mb-3'> 
                    <div className='me-2'>
                        <input value={dataCustomer ? dataCustomer.CustomerName : ''} disabled className='input-name-customer'/>
                    </div>
                    <div className='ms-2'>
                        <input disabled value={dataCustomer ? dataCustomer.Point : ''} />
                    </div>
                </div>
                <div className='line mb-2 mt-2'></div>
                <div className='text-center mb-2 mt-2'>
                    <h2>Thông tin đơn hàng</h2>
                </div>
                <div className='mt-2  '>
                    <div className='d-flex flex-row justify-content-between'>
                        <div>Tổng giá tiền:</div>
                        <div>{props.total} VNĐ</div>
                    </div> 
                    <div className='d-flex flex-row justify-content-between'>
                        <div>Giảm giá tích lũy điểm: </div>
                        <div>25.000 VNĐ</div>    
                    </div> 

                    <div className='d-flex flex-row justify-content-between'>
                        <div>Giảm giá voucher: </div>
                        <div>10.000 VNĐ</div>    
                    </div> 
                </div>
                <div className='line mb-2 mt-2'></div>
                <div className='total d-flex  mt-2'>
                        <h3>Tổng cộng:</h3>
                        <h3>{props.total} VNĐ</h3>
                    </div>
                <div className='d-flex w-100 mt-4 btn-context'>
                    <div className='me-2 btn-context-left'>
                        <button className='btn btn-success btn-create-order fw-bold'
                            onClick={() => handleCreateOrder()}
                        >Thêm đơn</button>
                    </div>
                    <div className='ms-2 btn-context-right'>   
                        <button className='btn btn-secondary btn-cancel fw-bold'>Hủy</button>
                    </div>
                </div>
            </div>

            <ModalSuccessfully 
                show={isShowModal}
                onHide={handleClose}
            />
        </>
    )
}

export default ConfirmOrder;
