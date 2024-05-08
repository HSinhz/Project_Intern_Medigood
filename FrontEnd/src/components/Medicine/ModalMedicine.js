import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useRef } from 'react';
import { getCategoryByIdType, getType, getUnit, getCategory } from '../../services/MedicineService';
import { toast } from 'react-toastify';
import _ from 'lodash';
import {validateInputMedicine} from '../../utils/validates/validateInputMedicine'
import { createMedicine, editMedicine } from '../../services/MedicineService';
const ModalMedicine = (props) => {
    const {action, dataMedicine} = props;
    const [category, setCategory] = useState([]);
    const [typeMedicine, setTypeMedicine] = useState([]);
    const [unit, setUnit] = useState([])
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
        MedicineDetailName: '',
        TypeId: '',
        CategoryId: null,
        ViePerBox: '',
        ViePerBlis: 0,
        Price: '',
        Producer: '',
        Ingredient: '',
        Specification: '',
        Description: '',
        Unit: null
    }
    const validInputsDefault = {
        MedicineName: true,
        MedicineDetailName: true,
        TypeId: true,
        CategoryId: true,
        Price: true,
        Producer: true,
        ViePerBox: true,
        ViePerBlis: true,
        Ingredient: true,
        Specification: true,
        Description: true,
        Unit: true,
        Img : true,
    }
    const [medicineData, setMedicineData] = useState(defaultMedicineData);
    const [validInput, setValidInput] = useState(validInputsDefault);
    const [valueTypeMedicine, setValueTypeMedicine] = useState('')

    const handleOnChangeInput = (value, name) => {
        let _medicineData = _.cloneDeep(medicineData);
        _medicineData[name] = value;
        setMedicineData(_medicineData);
        if (name === 'TypeId' && value !== '') {
            setValueTypeMedicine(value);
        } else if (name === 'CategoryId') {
            // Không cần gọi fetchDataCategory ở đây nữa
        }
    }

    const handleCreateMedicine = async () => {
        let checkValidate = validateInputMedicine(validInputsDefault, medicineData, selectedImage);
        setValidInput(checkValidate._validInputs);
        if(checkValidate.success === true){
            let response = null;
            if( action === "CREATE"){
                console.log("MedicineData: ", medicineData)
                const formDataCreate = new FormData();
                formDataCreate.append('image', file);
                formDataCreate.append('medicineData', JSON.stringify(medicineData)); 
                response = await createMedicine(formDataCreate);
            } else {
                const formDataEdit = new FormData();
                if(selectedImage !== null){
                    formDataEdit.append('image', file);
                }
                formDataEdit.append('medicineData', JSON.stringify(medicineData)); 
                response = await editMedicine(dataMedicine.MedicineId, formDataEdit );
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
        fetchDataType();
        fetchDataUnit();
    }, []);

    useEffect(() => {
        fetchDataCategory();
        console.log("category: ", category  )
    }, [valueTypeMedicine]);

    useEffect(() => {
        if( action === 'UPDATE'){
            setMedicineData(dataMedicine);
            setSelectedImage(dataMedicine.ImgUrl)
        }
    }, [action])

    const fetchDataCategory = async ( ) => {
        try {
            console.log("valueTypeMedicine ", valueTypeMedicine)
            let response = await getCategoryByIdType( valueTypeMedicine);
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

    const fetchDataUnit = async () => {
        try {
            let response = await getUnit();
            if( response && response.Success === true){
                setUnit(response.Data);
            } else {
                toast.error(response.Mess)
            }
        } catch (error){
            console.log("Error Fetch: ", error);
            toast.error("Vui lòng thử lại sau");
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
         <Modal size="lg" show={props.show} className='modal-medicine' onHide={() => handleCloseModal()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{action === 'CREATE' ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm"}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    <div className='row'>
                        <div className='col-12 col-sm-7 '>
                            <div className='mb-2'>
                                <label>Tên sản phẩm <span className='red'>(*)</span> :</label>
                                <input className={validInput.MedicineName ? 'form-control w-60' : 'form-control is-invalid w-60'} type='text' required 
                                    value={medicineData.MedicineName}
                                    onChange={(event) => handleOnChangeInput(event.target.value, 'MedicineName')}
                                />
                            </div>
                            <div className='mb-2'>
                                <label>Tên chi tiết sản phẩm <span className='red'>(*)</span> :</label>
                                <input className={validInput.MedicineDetailName ? 'form-control w-60' : 'form-control is-invalid w-60'} type='text' required 
                                    value={medicineData.MedicineDetailName}
                                    onChange={(event) => handleOnChangeInput(event.target.value, 'MedicineDetailName')}
                                />
                            </div>
                            <div className='mb-2'>
                                <label>Loại sản phẩm <span className='red'>(*)</span> :</label>
                                <select className={validInput.TypeId ? 'form-select' : 'form-select is-invalid'}
                                    onChange={(event) => handleOnChangeInput(event.target.value, 'TypeId')}
                                    value={medicineData.TypeId }
                                    defaultValue=""
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
                                <select className={validInput.CategoryId ? 'form-select' : 'form-select is-invalid'}
                                    onChange={(event) => handleOnChangeInput(event.target.value, 'CategoryId')}
                                    value={ medicineData.CategoryId }
                                    defaultValue=""
                                >
                                <option value="" disabled hidden>Chọn một danh mục</option> 
                                {
                                    category && category.length  > 0 ?
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
                                    <> asdasdasd</>
                                }
                                </select>
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
                                        <img className='img-personnel-container img-personnel img-fluid w-50' src={medicineData.ImgUrl} alt="Default Image" />
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
                        <div className='row mb-2'>
                                <div className='col-sm-3'>
                                    <label>Giá sản phẩm <span className='red'>(*)</span> :</label>
                                    <input type="number"   
                                            className={validInput.Price ? 'form-control w-60 text-center no-spinners' : 'form-control is-invalid w-60 text-center no-spinners'}
                                            value={medicineData.Price}
                                            onChange={(event) => handleOnChangeInput(event.target.value, 'Price')}  
                                            
                                        />
                                </div>
                                <div className='col-sm-3'>
                                    <label>Đơn vị <span className='red'>(*)</span> :</label>
                                    <select className={validInput.Unit ? 'form-select' : 'form-select is-invalid'}
                                        onChange={(event) => handleOnChangeInput(event.target.value, 'Unit')}
                                        value={medicineData.Unit}
                                        defaultValue=""
                                    >
                                        <option value="" disabled hidden>Chọn đơn vị</option> 
                                    {
                                        unit && unit.length > 0 ?
                                        <>
                                            { 
                                                unit.map((item, index) => {
                                                    return (
                                                        <option value={item.Id}>{item.UnitName}</option>
                                                    )
                                                })
                                            }
                                        </> 
                                        : 
                                        <></>
                                    }
                                    </select>
                                </div>
                                <div className='col-12 col-sm-3 form-group'>
                                    <label>Số lượng mỗi hộp <span className='red'>(*)</span> :</label>
                                    <div className="d-flex">
                                        <input type="number"   
                                            className={validInput.ViePerBox ? 'form-control w-60 text-center no-spinners' : 'form-control is-invalid w-60 text-center no-spinners'}
                                            value={medicineData.ViePerBox}
                                            onChange={(event) => handleOnChangeInput(event.target.value, 'ViePerBox')}  
                                        />
                                    </div>
                                </div>
                                <div className='col-12 col-sm-3 form-group'>
                                    <label>Số viên mỗi vỉ</label>
                                    <div className="d-flex">
                                        <input type="number"    
                                            className={validInput.ViePerBlis ? 'form-control w-60 text-center no-spinners' : 'form-control is-invalid w-60 text-center no-spinners'}
                                            value={medicineData.ViePerBlis}
                                            onChange={(event) => handleOnChangeInput(event.target.value, 'ViePerBlis')}  
                                        />
                                    </div>
                                </div>
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