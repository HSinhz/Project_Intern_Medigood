import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import './Personnel.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPosition } from '../../services/PersonnelService';
import { getBranch } from '../../services/BranchService';
import { validateInputEmployee } from '../../utils/validates/validateInputEmployee';
import {  createPersonal, editPersonal} from '../../services/PersonnelService';
import moment from 'moment';

const ModalCreateEmployee = (props) => {
    const {action, dataModalEmployee} = props;
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState({});
    const fileInputRef = useRef(null);
  
    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      setFile(file);
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      
      reader.readAsDataURL(file);

    };   

    const defaultEmployeeData = {
        Email: '',
        LastName: '',
        FirstName: '',
        Phone: '',
        Gender: null,
        Address: '',
        Country: '',
        BranchId: null,
        PositionId: null,
        Decscription: ''
    }
    const validInputsDefault = {
        Email: true,
        LastName: true,
        FirstName: true,
        Image: true,
        BirthDay: true,
        Phone: true,
        Gender: true,
        Address: true,
        Country: true,
        BranchId: true,
        PositionId: true,
        Decscription: true,
    }
    const [employeeData, setEmployeeData] = useState(defaultEmployeeData);
    const [validInput, setValidInput] = useState(validInputsDefault);
    const [listPosition, setListPosition] = useState([]);
    const [listBranch, setListBranch] = useState([]);
    const [birthDay, setBirthDay] = useState(null);
    
    const handleCloseModalProduct = () => {
        props.onHide();
        setEmployeeData(defaultEmployeeData);
        setValidInput(validInputsDefault);
        setSelectedImage(null);
        setBirthDay(null)
        setFile({});
    }
    const handleOnChangeInput = (value, name) => {
        let _employeeData = _.cloneDeep(employeeData);
        _employeeData[name] = value;
        setEmployeeData(_employeeData);
    }
    const handleCreateEmployee = async () => {
        console.log("employData: ", dataModalEmployee);
        let checkValidate = validateInputEmployee(employeeData, validInputsDefault, birthDay, selectedImage);
        setValidInput(checkValidate._validInputs);
        if(checkValidate.success === true ){
            try {
                let response = null;
                if( action === "CREATE") {
                    const formDataCreate = new FormData();
                    formDataCreate.append('image', file);
                    formDataCreate.append('employeeData', JSON.stringify(employeeData)); // Thêm employeeData
                    formDataCreate.append('BirthDay', birthDay); // Thêm selectedDate
                    console.log("formdata: ", formDataCreate)
                    response = await createPersonal(formDataCreate);
                } else {
                    const formDataEdit = new FormData();
                    if(selectedImage !== null){
                        formDataEdit.append('image', file);
                    }
                    formDataEdit.append('employeeData', JSON.stringify(employeeData));
                    formDataEdit.append('BirthDay', birthDay); // Thêm selectedDate
                    console.log("formdata: ", dataModalEmployee._id)
                    response = await editPersonal(dataModalEmployee._id, formDataEdit);
                }
                if( response && response.Success === true){
                    toast.success(response.Mess);
                    setEmployeeData(defaultEmployeeData);
                    setValidInput(validInputsDefault);
                    setSelectedImage(null);
                    setBirthDay(null);
                    setFile({});
                    props.onHide();

                } else {
                    toast.error(response.Mess);
                }
            } catch(error){
                console.log(error);
                toast.error("Có lỗi vui lòng thử lại sau");
            }
        } else {
            toast.error(checkValidate.ErrMess)
        }
    }

    useEffect(() => {
        if( action !== "CREATE") {
            setEmployeeData(dataModalEmployee);
            setBirthDay(dataModalEmployee.BirthDay);
            setSelectedImage(dataModalEmployee.ImgUrl);
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
    }, [dataModalEmployee])

    return (
        <>
            <Modal size="lg" show={props.show} className='modal-user' onHide={() => handleCloseModalProduct()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.action === 'CREATE' ? "Thêm nhân viên" : "Chỉnh sửa nhân viên"}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className='content-body row'>
                        <div className='col-sm-7'>
                            <div className='form-group mb-2'>
                                <label>Email <span className='red'>(*)</span> :</label>
                                <input className={validInput.Email ? 'form-control w-60' : 'form-control is-invalid w-60'} type='text' required 
                                    value={employeeData.Email}
                                    onChange={(event) => handleOnChangeInput(event.target.value, 'Email')}
                                    disabled={action === 'CREATE' ? false : true}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label>Họ <span className='red'>(*)</span> :</label>
                                <input className={validInput.LastName ? 'form-control w-50' : 'form-control is-invalid w-50'} type='text' required 
                                    value={employeeData.LastName}
                                    onChange={(event) => handleOnChangeInput(event.target.value, 'LastName')}
                                />
                                
                            </div>
                            <div className='form-group mb-2 '>
                                <label>Tên <span className='red'>(*)</span> :</label>
                                <div className='d-flex justify-content-between '>
                                    <input className={validInput.FirstName ? 'form-control w-50' : 'form-control is-invalid w-50'} type='text' required 
                                        value={employeeData.FirstName}
                                        onChange={(event) => handleOnChangeInput(event.target.value, 'FirstName')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-sm-5 d-flex flex-column align-items-center justify-content-center'>
                            {action === "CREATE" ? 
                                (
                                    selectedImage ? (
                                        <img className='img-personnel-container img-personnel img-fluid w-50' src={selectedImage} alt="Selected Image" />
                                    ) : (
                                        <img className='img-personnel-container img-personnel img-fluid w-50' src='https://img.freepik.com/premium-vector/cute-smiling-boy-avatar-flat-style-vector-illustration_710508-1241.jpg' alt="Default Image" />
                                    )
                                )
                                : 
                                (
                                    selectedImage ? (
                                        <img className='img-personnel-container img-personnel img-fluid w-50' src={selectedImage} alt="Selected Image" />
                                    ) : (
                                        <img className='img-personnel-container img-personnel img-fluid w-50' src={employeeData.ImgUrl} alt="Default Image" />
                                    )
                                ) 
                            }
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelect}
                                />
                                <button className='mt-2 btn btn-primary' onClick={() => fileInputRef.current.click()}>Chọn ảnh</button>
                        </div>
                        <div className='col-12 col-sm-4 form-group mb-2'>
                                <label>Số điện thoại <span className='red'>(*)</span> :</label>
                                <input className={validInput.Phone ? 'form-control ' : 'form-control is-invalid '} type='text' required 
                                    value={employeeData.Phone}
                                    onChange={(event) => handleOnChangeInput(event.target.value, 'Phone')}
                                />

                            </div>
                        <div className='col-12 col-sm-4 form-group mb-2'>
                            <label>Ngày sinh <span className='red'>(*)</span> :</label>
                            <div>
                                <DatePicker
                                    selected={birthDay}
                                    onChange={(date) =>[ setBirthDay(date) , console.log("data: ", date)]}
                                    dateFormat="dd/MM/yyyy"
                                    className={validInput.BirthDay ? 'form-select' : 'form-select is-invalid'}
                                    placeholderText="Năm sinh"
                                    value={ action !== "CREATE" ? moment(birthDay).local().format('DD-MM-YYYY') : birthDay}
                                />
                            </div>
                        </div>
                        <div className='col-12 col-sm-4 form-group mb-2'>
                            <label>Giới tính <span className='red'>(*)</span> :</label>
                            <select className={validInput.Gender ? 'form-select' : 'form-select is-invalid'}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'Gender')}
                                value={employeeData.Gender}
                            > 
                                <option value={1}>Nam</option>
                                <option value={2}>Nữ</option>
                                <option value={3}>Khác</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-12 form-group mb-2'>
                            <label>Địa chỉ <span className='red'>(*)</span> :</label>
                            <input className={validInput.Address ? 'form-control ' : 'form-control is-invalid '} type='text' required 
                                value={employeeData.Address}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'Address')}
                            />
                            
                        </div>
                        <div className='col-12 col-sm-12 form-group mb-2'>
                            <label>Quê quán <span className='red'>(*)</span> :</label>
                            <input className={validInput.Country ? 'form-control ' : 'form-control is-invalid '} type='text' required 
                                value={employeeData.Country}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'Country')}
                            />
                           
                        </div>
                        <div className='col-12 col-sm-6 form-group mb-2'>
                            <label>Cửa hàng</label>
                            <select className={validInput.BranchId ? 'form-select' : 'form-select is-invalid'}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'BranchId')}
                                value={action !== "CREATE" ? dataModalEmployee.BranchId : employeeData.BranchId}
                            > 
                                <option value="">Chi nhánh</option>
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
                            <select className={validInput.PositionId ? 'form-select' : 'form-select is-invalid'} placeholderText='Chức vụ'
                                onChange={(event) => handleOnChangeInput(event.target.value, 'PositionId')}
                                value={employeeData.PositionId}
                            > 
                                <option value="">Chức vụ</option>
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
                            <input className={validInput.Decscription ? 'form-control ' : 'form-control is-invalid '} type='text' required 
                                value={employeeData.Decscription}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'Decscription')}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' 
                        onClick={ () => handleCreateEmployee()}
                    >
                        { action === "CREATE" ? 'Thêm mới' : 'Cập nhật'}
                    </Button>
                    <Button variant='secondary'
                        onClick={() => handleCloseModalProduct()}
                    >Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCreateEmployee;