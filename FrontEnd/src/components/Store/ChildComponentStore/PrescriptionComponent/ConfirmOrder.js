import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import './ComponentChildPrescription.scss';
import { toast } from 'react-toastify';
import { FaAddressCard } from "react-icons/fa";
import ModalSuccessfully from './ModalSuccessfully';
import ModalCreateCustomer from './ModalCreateCustomer';
import { createOrder, getMedicineStockBranch } from '../../../../services/StoreBranchService';
import {getCustomer} from '../../../../services/CustomerService'
const ConfirmOrder = (props) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [phoneCustomer, setPhoneCustomer] = useState('');
    const [dataCustomer, setDataCustomer] = useState({})
    const [hiddenBtnPoint, setHiddenBtnPoint] = useState(false);
    const [hiddenBtnCreateCustomer, setHiddenBtnCreateCustomer] = useState(false);
    const [isShowModalCustomer, setShowModalCustomer] = useState(false);
    const [totalOrder, setTotalOrder] = useState(0);
    const [discoutPoint, setDiscoutPoint] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    useEffect(() => {
        setTotalOrder(props.total);
        const total = props.total - totalDiscount;
        setTotalOrder(total)
        if(props.actionOrder === 'REORDER'){
            setDataCustomer(props.customerData)
            setPhoneCustomer(props.customerData.CustomerPhone)
            console.log('12312312')
        }
    }, [props])

    

    const handleCreateOrder = async () => {
        if(props.listItemOrder.length === 0 ){
            toast.error("Đơn hàng chưa có sản phẩm")
        } else {
            console.log('listItemOrder: ', props.listItemOrder)
            const dataOrder = props.listItemOrder.map(item => {
                return {
                    medicineId: item.medicineId,
                    medicineName: item.product,
                    totalPrice: item.totalPriceItem,
                    quantity: item.quantity,
                    unitId: item.unitId
                }
            })
            let point = 0;
            if( dataCustomer){
                point = dataCustomer.Point + Math.floor(totalOrder/ 1000);
            }
            console.log("dataOrder: 123 ", dataOrder)
            let response = await createOrder(dataOrder, totalOrder , phoneCustomer, point, totalDiscount);
            if(response && response.Success === true){
                setIsShowModal(true);
                setPhoneCustomer('');
                setDataCustomer('');
                setDiscoutPoint(0);
                setTotalDiscount(0);
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
                    setHiddenBtnPoint(true);
                    setHiddenBtnCreateCustomer(false)
                } else {
                    setPhoneCustomer('');
                    setHiddenBtnCreateCustomer(true)
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

    const handleChangePoint = () => {
        if(dataCustomer ) {
            if(dataCustomer.Point > 0){
                if(props.listItemOrder.length > 0) {
                    if(discoutPoint % 1 === 0){
                        if(discoutPoint < dataCustomer.Point) {
                            const temTotal = totalOrder - discoutPoint;
                            const currentPoint = dataCustomer.Point - discoutPoint;
                            dataCustomer.Point = currentPoint;
                            let totalDiscoutCurrent = parseInt(totalDiscount)  + parseInt(discoutPoint);
                            setTotalOrder(temTotal);
                            setTotalDiscount(totalDiscoutCurrent)
                            setDiscoutPoint(0);
                        } else {
                            toast.error("Khách hàng không đủ điểm")
                        }
                    } else {
                        toast.warn("Số điểm phải là số nguyên")
                    }
                } else {
                    toast.error("Đơn hàng chưa có sản phẩm")
                }
            }
        } 
    }

    const handleOnChange = async (phone) => {
        if(phone === ""){
            setPhoneCustomer('');
            setHiddenBtnPoint(false);
            setHiddenBtnCreateCustomer(false)
            setDataCustomer({});
        } else {
            setPhoneCustomer(phone);
        }
    }

    const handleOnChangePoint = (value) => {
        setDiscoutPoint(value)
    }

    const handleClose = () => {
        setIsShowModal(false);
    }

    const handleOpenModalCustomer = () => {
        setShowModalCustomer(true)
    }

    const handlCloseModalCustomer = () => {
        setShowModalCustomer(false)
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
                        {
                            hiddenBtnCreateCustomer === true && (
                                <>
                                    <div className='mt-3 mmb-3'>
                                        <button className='btn btn-success'
                                            onClick={() => handleOpenModalCustomer()}
                                        >Thêm mới</button>
                                    </div>
                                </>
                            )
                        }
                <div>
                    {
                        hiddenBtnPoint === true && (
                            <>
                                <div className='d-flex infor-customer mt-3 mb-3'> 
                                    <div className='me-2'>
                                        <input value={dataCustomer ? dataCustomer.CustomerName : ''} disabled className='input-name-customer'/>
                                    </div>
                                    <div className='ms-2'>
                                        <input disabled value={dataCustomer ? dataCustomer.Point : ''} />
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <input className='input-point' type='text' placeholder='Nhập số điểm quy đổi' value={discoutPoint === 0 ? '' : discoutPoint}
                                        onChange={(event) => handleOnChangePoint(event.target.value)}
                                    />
                                    <button className='btn btn-warning ms-4'
                                        onClick={() => handleChangePoint()}
                                    >Đổi điểm</button>
                                </div>
                            </>
                        ) 
                    }
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
                        <div>{totalDiscount} VNĐ</div>    
                    </div> 

                    <div className='d-flex flex-row justify-content-between'>
                        <div>Giảm giá voucher: </div>
                        <div>0 VNĐ</div>    
                    </div> 
                </div>
                <div className='line mb-2 mt-2'></div>
                <div className='total d-flex  mt-2'>
                        <h3>Tổng cộng:</h3>
                        <h3>{totalOrder} VNĐ</h3>
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
            <ModalCreateCustomer 
                show={isShowModalCustomer}
                onHide={handlCloseModalCustomer}
            />
        </>
    )
}

export default ConfirmOrder;
