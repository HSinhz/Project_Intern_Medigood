import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useRef } from 'react';
import { getCategory, getType } from '../../services/MedicineService';
import { toast } from 'react-toastify';
import _ from 'lodash';
import {validateInputMedicine} from '../../utils/validates/validateInputMedicine'
import { createMedicine } from '../../services/MedicineService';
const ModalMedicine = (props) => {
    const {action} = props;
    const [category, setCategory] = useState([]);
    const [typeMedicine, setTypeMedicine] = useState([]);
    // Xử lý chọn ảnh
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

    
    const defaultMedicineData = {
        MedicineName: '',
        TypeId: null,
        CategoryId: null,
        Price: '',
        Producer: '',
        Ingredient: '',
        Specification: '',
        Description: '',
        Unit: null
    }
    const validInputsDefault = {
        MedicineName: true,
        TypeId: true,
        CategoryId: true,
        Price: true,
        Producer: true,
        Ingredient: true,
        Specification: true,
        Description: true,
        Unit: true,
        Img : true,
    }
    const [medicineData, setMedicineData] = useState(defaultMedicineData);
    const [validInput, setValidInput] = useState(validInputsDefault);

    const handleOnChangeInput = (value, name) => {
        let _medicineData = _.cloneDeep(medicineData);
        _medicineData[name] = value;
        setMedicineData(_medicineData);
    }

    const handleCreateMedicine = async () => {
        let checkValidate = validateInputMedicine(validInputsDefault, medicineData, selectedImage);
        setValidInput(checkValidate._validInputs);
        if(checkValidate.success === true){
            let response = null;
            if( action === "CREATE"){
                const formDataCreate = new FormData();
                formDataCreate.append('image', file);
                formDataCreate.append('medicineData', JSON.stringify(medicineData)); 
                response = await createMedicine(formDataCreate);
            } else {

            }

            if( response && response.Success === true){
                toast.success(response.Mess);
                handleCloseModal();
                props.onHide();
            } else {
                toast.error(response.Mess);
            }
        } else {
            toast.error(checkValidate.ErrMess)
        }
        console.log('Data Create Medicine: ', medicineData);
    }

    useEffect(() => {
        fetchDataCategory();
        fetchDataType();
    }, []);

    const fetchDataCategory = async () => {
        try {
            let response = await getCategory();
            if(response && response.Success === true){
                setCategory(response.Data);
            } else {
                toast.error(response.Mess);
            }
        } catch(error){
            console.log("Error Fetch: ", error);
            toast.error("Vui lòng thử lại sau")
        }
    }

    const fetchDataType = async () => {
        try {
            let response = await getType();
            if(response && response.Success === true){
                setTypeMedicine(response.Data);
            } else {
                toast.error(response.Mess);
            }
        } catch(error){
            console.log("Error Fetch: ", error);
            toast.error("Vui lòng thử lại sau")
        }
    }


    const handleCloseModal = () => {
        setMedicineData(defaultMedicineData);
        setValidInput(validInputsDefault);
        setSelectedImage(null);
        setFile({});
        props.onHide();
    }
    return (
        <>
         <Modal size="lg" show={props.show} className='modal-user' onHide={() => handleCloseModal()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{action === 'CREATE' ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm"}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className='row'>
                        <div className='col-12 col-sm-7 '>
                            <div className='mb-2'>
                                <label>Tên sản phẩm <span className='red'>(*)</span> :</label>
                                <input className={validInput.MedicineName ? 'form-control w-60' : 'form-control is-invalid w-60'} type='text' required 
                                    value={medicineData.MedicineName}
                                    onChange={(event) => handleOnChangeInput(event.target.value, 'MedicineName')}
                                    disabled={action === 'CREATE' ? false : true}
                                />
                            </div>
                            <div className='mb-2'>
                                <label>Loại sản phẩm <span className='red'>(*)</span> :</label>
                                <select className={validInput.TypeId ? 'form-select' : 'form-select is-invalid'} defaultValue="" 
                                    onChange={(event) => handleOnChangeInput(event.target.value, 'TypeId')}
                                >
                                <option value="" disabled hidden>Chọn loại sản phảm</option> 
                                {
                                    typeMedicine && typeMedicine.length > 0 ?
                                    <>
                                        { 
                                            typeMedicine.map((item, index) => {
                                                return (
                                                    <option value={item.TypeId}>{item.TypeName}</option>
                                                )
                                            })
                                        }
                                    </> 
                                    : 
                                    <></>
                                }
                                </select>
                            </div>
                            <div className='mb-2'>
                                <label>Danh mục <span className='red'>(*)</span> :</label>
                                <select className={validInput.CategoryId ? 'form-select' : 'form-select is-invalid'} defaultValue="" 
                                    onChange={(event) => handleOnChangeInput(event.target.value, 'CategoryId')}
                                >
                                <option value="" disabled hidden>Chọn một danh mục</option> 
                                {
                                    category && category.length > 0 ?
                                    <>
                                        { 
                                            category.map((item, index) => {
                                                return (
                                                    <option value={item.CategoryId}>{item.CategoryName}</option>
                                                )
                                            })
                                        }
                                    </> 
                                    : 
                                    <></>
                                }
                                </select>
                            </div>
                            <div className='row mb-2'>
                                <div className='col-sm-6'>
                                    <label>Giá sản phẩm <span className='red'>(*)</span> :</label>
                                    <input className={validInput.Price ? 'form-control w-60' : 'form-control is-invalid w-60'} type='text' required 
                                        value={medicineData.Price}
                                        onChange={(event) => handleOnChangeInput(event.target.value, 'Price')}    
                                    />
                                </div>
                                <div className='col-sm-6'>
                                <label>Đơn vị <span className='red'>(*)</span> :</label>
                                <select className={validInput.Unit ? 'form-select' : 'form-select is-invalid'} defaultValue="" 
                                    onChange={(event) => handleOnChangeInput(event.target.value, 'Unit')}
                                >
                                    <option value="" disabled hidden>Chọn đơn vị</option> 
                                    <option value={1}>Viên</option>
                                    <option value={2}>Gói</option>
                                    <option value={3}>Tuýp</option>
                                    <option value={4}>Chai</option>
                                </select>
                                </div>
                               
                            </div>
                        </div>
                        <div  className='col-12 col-sm-5 mb-2 d-flex flex-column align-items-center justify-content-center'>
                            {action === "CREATE" ? 
                                (
                                    selectedImage ? (
                                        <img className='img-personnel-container img-personnel img-fluid w-50' src={selectedImage} alt="Selected Image" />
                                    ) : (
                                        <img className='img-personnel-container img-personnel img-fluid w-50' src='https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-cartoon-packaging-box-free-illustration-image_1191125.jpg' alt="Default Image" />
                                    )
                                )
                                    : 
                                (
                                    selectedImage ? (
                                        <img className='img-personnel-container img-personnel img-fluid w-50' src={selectedImage} alt="Selected Image" />
                                    ) : (
                                        <img className='img-personnel-container img-personnel img-fluid w-50' src='https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-cartoon-packaging-box-free-illustration-image_1191125.jpg' alt="Default Image" />
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
                        <div className='col-sm-4 mb-2'>
                            <label>Thành phần <span className='red'>(*)</span> :</label>
                            <input className={validInput.Ingredient ? 'form-control' : 'form-control is-invalid'} type='text' required 
                                value={medicineData.Ingredient}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'Ingredient')}  
                            />
                        </div>
                        <div className='col-sm-4 mb-2'>
                            <label>Quy cách <span className='red'>(*)</span> :</label>
                             <input className={validInput.Specification ? 'form-control' : 'form-control is-invalid'} type='text' required 
                                value={medicineData.Specification}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'Specification')}  
                            />
                        </div>
                        <div className='col-sm-4 mb-2'>
                            <label>Nhà sản xuất <span className='red'>(*)</span> :</label>
                             <input className={validInput.Producer ? 'form-control' : 'form-control is-invalid'} type='text' required 
                                value={medicineData.Producer}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'Producer')}  
                            />
                        </div>
                        <div className='col-sm-12'>
                            <label>Mô tả sản phẩm <span className='red'>(*)</span> :</label>
                            <textarea  className={validInput.Description ? 'form-control' : 'form-control is-invalid'} rows={5} type='text' required
                                value={medicineData.Description}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'Description')} 
                            ></textarea>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' 
                        onClick={ () => handleCreateMedicine()}
                    >
                        { props.action === "CREATE" ? 'Thêm mới' : 'Cập nhật'}
                    </Button>
                    <Button variant='secondary'
                        onClick={() => handleCloseModal()}
                    >Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalMedicine;