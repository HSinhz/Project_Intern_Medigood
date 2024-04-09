import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import './Personnel.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPosition } from '../../services/PersonnelService';
import { getBranch } from '../../services/BranchService';
const ModalCreateEmployee = (props) => {
    const {action, dataModalProduct} = props;
    const defaultProductData = {
        Name: '',
        Price: '',
        ImageUrl: '',
        Description: '',
        Category: '',
    }
    const validInputsDefault = {
        Name: true,
        Price: true,
        ImageUrl: true,
        Description: true,
        Category: true
    }
    const [listPosition, setListPosition] = useState([]);
    const [listBranch, setListBranch] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [productData, setProductData] = useState(defaultProductData);
    const [validInputs, setValidInput] = useState(validInputsDefault);
    
    const handleOnchangeInput = (value, name) => {
        let _productData = _.cloneDeep(productData);
        _productData[name] = value;
        setProductData(_productData);
    }

    const validateProductInput = () => {
        setValidInput(validInputsDefault);
        let arr = ['Name', 'Price' , 'ImageUrl' ];
        let check = true;
        for( let i = 0 ; i < arr.length ; i++){
            if( !productData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInput({_validInputs});
                toast.error(`${arr[i]} không được bỏ trống`);
                check = false;
                break;
            }
        }
        return check;
    }

    // const handleConfirmProduct = async () => {
    //     let check = validateProductInput();
    //     if( check === true) {
    //         let response = await createProduct(productData.Name, productData.Price, productData.ImageUrl, productData.Description);
    //         console.log('>>> Check response Create Product', response.data.Success);
    //         if( response.data.Success === true){
    //             toast.success(response.data.Mess)
    //             props.onHide();
    //             setProductData(defaultProductData);
    //         } else {
    //             toast.error(response.data.Mess)
    //         }
    //     }
    // }

    const handleCloseModalProduct = () => {
        props.onHide();
        setProductData(defaultProductData);
        setValidInput(validInputsDefault);
    }

    // const handleUpdateProduct = async () => {
    //     let check = validateProductInput();
    //     console.log("Check dataModalProduct: ", dataModalProduct)
    //     if( check === true ){
    //         let response = await updateProduct( dataModalProduct._id, productData.Name, productData.Price, productData.ImageUrl, productData.Description);
    //         if( response){
    //             toast.success(response.Mess);
    //             console.log('>>> Check response Update Employee: ', response);
    //             props.onHide();
    //             setProductData(defaultProductData);
    //         } else {
    //             toast.error(response.Mess);
    //         }
    //     }
    // }

    useEffect(() => {
        if( action !== "CREATE") {
            setProductData(dataModalProduct);
        }

        const fetchDataPosition = async () => {
            try {
                let response = await getPosition();
                if(response && response.Success === true){
                    console.log("All Position:", response.Data);
                    setListPosition(response.Data);
                }
            } catch (error){
                console.log("Error: ", error);
                toast.error("Có lỗi vui lòng thử lại sau");
            }
        }

        const fetchDataBranch = async () => {
            try {
                let response = await getBranch();
                if( response && response.Success === true){
                    setListBranch(response.Data)
                }
            } catch (error){
                console.log(error);
                toast.error("Có lỗi vui lòng thử lại sau");
            }
        }
        fetchDataPosition();
        fetchDataBranch();
    }, [dataModalProduct])
    return (
        <>
            <Modal size="lg" show={props.show} className='modal-user' onHide={() => handleCloseModalProduct()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.action === 'CREATE' ? "Thêm nhân viên" : "Chỉnh sửa sản phẩm"}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className='content-body row'>
                        <div className='col-12 col-sm-7'>
                            <div className='form-group mb-2'>
                                <label>Email <span className='red'>(*)</span> :</label>
                                <input className='form-control w-60' type='text' required />
                                {/* <input className={validInputs.Name ? 'form-control' : 'form-control is-invalid'} type='text' required value={productData.Name}
                                    onChange={(event) => handleOnchangeInput( event.target.value, "Name" )}
                                /> */}
                            </div>
                            <div className='form-group mb-2'>
                                <label>Họ <span className='red'>(*)</span> :</label>
                                <input className='form-control w-50' type='text' required />
                                {/* <input className={validInputs.Name ? 'form-control' : 'form-control is-invalid'} type='text' required value={productData.Name}
                                    onChange={(event) => handleOnchangeInput( event.target.value, "Name" )}
                                /> */}
                            </div>
                            <div className='form-group mb-2 '>
                                <label>Tên <span className='red'>(*)</span> :</label>
                                <div className='d-flex justify-content-between '>
                                    <input className='form-control w-50' type='text' required />
                                    <button className='btn btn-primary'>Chọn ảnh</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-sm-5 d-flex align-items-center justify-content-center'>
                            <img className='img-personnel-container img-personnel img-fluid w-50 d-flex align-items-center justify-content-center' src='https://img.freepik.com/premium-vector/cute-smiling-boy-avatar-flat-style-vector-illustration_710508-1241.jpg'/>
                        </div>
                        <div className='col-12 col-sm-4 form-group mb-2'>
                                <label>Số điện thoại </label>
                                <input className='form-control' type='text' required />
                                {/* <input className='form-control' type='text'  value={productData.Description}
                                    onChange={(event) => handleOnchangeInput( event.target.value, "Description" )}
                                /> */}
                            </div>
                        <div className='col-12 col-sm-4 form-group mb-2'>
                            <label>Ngày sinh:</label>
                            <div>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) =>[ setSelectedDate(date) , console.log("data: ", date)]}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-select"
                                    placeholderText="Năm sinh"
                                />
                            </div>
                        </div>
                        <div className='col-12 col-sm-4 form-group mb-2'>
                            <label>Giới tính <span className='red'>(*)</span> :</label>
                            <select className='form-select' > 
                                <option value={'1'}>Nam</option>
                                <option value={'2'}>Nữ</option>
                                <option value={'3'}>Khác</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-12 form-group mb-2'>
                            <label>Địa chỉ </label>
                            <input className='form-control' type='text' required />
                            {/* <input className='form-control' type='text'  value={productData.Description}
                                onChange={(event) => handleOnchangeInput( event.target.value, "Description" )}
                            /> */}
                        </div>
                        <div className='col-12 col-sm-12 form-group mb-2'>
                            <label>Quê quán </label>
                            <input className='form-control ' type='text' required />
                            {/* <input className='form-control' type='text'  value={productData.Description}
                                onChange={(event) => handleOnchangeInput( event.target.value, "Description" )}
                            /> */}
                        </div>
                        <div className='col-12 col-sm-6 form-group mb-2'>
                            <label>Cửa hàng <span className='red'>(*)</span> :</label>
                            <select className='form-select' > 
                                {
                                    listBranch && listBranch.length > 0 ? 
                                        <>
                                            {
                                                listBranch.map((item, index) => {
                                                    return (
                                                        <option value={item._id}>{item.Address}</option>
                                                    )
                                                })
                                            }
                                        </>
                                    : <></>
                                }
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group mb-2'>
                            <label>Chức vụ <span className='red'>(*)</span> :</label>
                            <select className='form-select' placeholderText='Chức vụ'> 
                                {
                                    listPosition ? 
                                    <>
                                        {
                                            listPosition.map((item, index) => {
                                                return (
                                                    <option value={item.Id}>{item.Name}</option>
                                                )
                                            }
                                        )}  
                                    </>
                                    : <>
                                        
                                    </>
                                }
                            </select>
                        </div>
                        <div className='col-12 col-sm-12 form-group mb-2'>
                            <label>Chú ý </label>
                            <input className='form-control' type='text' required />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant='success' 
                        onClick={ action === "CREATE" ? () => handleConfirmProduct() : () => handleUpdateProduct()  }> 
                        {action === "CREATE" ? 'Lưu' : 'Cập nhật'} 
                        
                    </Button>
                    <Button variant='secondary' onClick={() => handleCloseModalProduct()}>Hủy</Button> */}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCreateEmployee;