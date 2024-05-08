import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../views/UserContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from 'react-toastify';
import moment from 'moment';
import './Personnel.scss'
import ModalCreateEmployee from './ModalCreateEmployee';
import ModalDeleteEmployee from '../ModalDeleteEmployee';
import { getEmployeeWithPagination } from '../../services/PersonnelService';
const Personnel = () => {
    const { user } = useUser();
    const history = useHistory();
    const [isShowModalCreateEmployee, setIsShowModalCreateEmployee] = useState(false);
    const [acctionModal, setActionModal] = useState(''); 
    const [dataModalEmployee, setDataModalEmployee] = useState({});
    const [listPersonnel, setListPersonnel] = useState([]);

    const fectDataEmloyee = async () => {
        try {
            let response = await getEmployeeWithPagination();
            if( response && response.Success === true){
                setListPersonnel(response.Data);
                console.log("Check Data >>>>>>>>>", response.Data);
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Có lỗi vui lòng thử lại sau");
        }
    }

    useEffect(() => {
        document.title = 'Nhân sự';
        console.log(user.isAuthenticated);
        if(!user.isAuthenticated){
            history.push('/login');
        }
        fectDataEmloyee();
    }, []);

    const handleOpenModalCreateEmployee = () => {
        setIsShowModalCreateEmployee(true);
        setActionModal("CREATE");
    }

    const handleEditEmployee = (dataEmployee) => {
        console.log("dataEmployee: ", dataEmployee)
        setDataModalEmployee(dataEmployee);
        setIsShowModalCreateEmployee(true);
        setActionModal("UPDATE");
    }
    const  handleCloseModal = () => {
        setIsShowModalCreateEmployee(false);
        setActionModal("");
        setDataModalEmployee({});
        fectDataEmloyee();
    }

    // Xử lý dành cho Modal Delete Employee
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [objectDelete, setObjectDelete] = useState('')
    const [fullname, setFullName] = useState('')
    const handleOpenModalDelete = (employeeData) => {
        let fullname = employeeData.LastName + " " + employeeData.FirstName;
        setFullName(fullname);
        setObjectDelete('PERSONNEL');
        setIsShowModalDelete(true);
        setDataModalEmployee(employeeData);
    }
    const handleCloseModalDelete = () => {
        setIsShowModalDelete(false);
        setDataModalEmployee({});
        setFullName('');
        setObjectDelete('')
        fectDataEmloyee();
    }
    return (
        <>
            <div className='container'>
                <div className='row'> 
                    <div className=' col-md-3'>
                        <h3>Nhân viên</h3>
                        <div className='mt-4'>
                            <Form inline>
                                <Row>
                                    <Col xs="auto">
                                        <Form.Control
                                        type="text"
                                        placeholder='Mã nhân viên hoặc Email'
                                        className=" mr-sm-2"
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Button type="submit" className='btn-success'><span ><AiOutlineSearch/></span></Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className='w-100 mt-4'>
                            Chức vụ
                            <div className='mt-2'>
                                <Form.Select className='w-50' aria-label="Default select example">
                                    <option>Chức vụ</option>
                                    <option value="1">Dược sĩ</option>
                                    <option value="2">Cửa hàng trưởng</option>
                                    <option value="3">Quản lý hàng hóa</option>
                                    <option value="3">Quản lý cửa hàng</option>
                                    <option value="3">Quản lý nhân viên</option>
                                </Form.Select>
                            </div>
                        </div>
                        <div className='mt-4'>
                            Cửa hàng
                            <div className='mt-2'>
                                <Form.Select className='w-50' aria-label="Default select example">
                                    <option>Chọn cửa hàng</option>
                                    <option value="1">219 Lý Thường Kiệt</option>
                                    <option value="2">20 Cộng Hòa</option>
                                    <option value="3">Pandora Mall</option>
                                </Form.Select>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-9'>
                        <div className='d-flex justify-content-end'>
                            <button type="submit" className='btn btn-success' onClick={() => handleOpenModalCreateEmployee()}><AiOutlinePlus className='pb-1 mx-2'/>Nhân viên</button>
                        </div>
                        <div className='mt-4'>
                            <Accordion className=''>
                                {listPersonnel && listPersonnel.length > 0 ? 
                                    <>
                                        {listPersonnel.map((item, index) => {
                                            const startWork = moment(item.createdAt).local().format('DD-MM-YYYY');
                                            const birthDayFormat = moment(item.BirthDay).local().format('DD-MM-YYYY');
                                            return (
                                                <Accordion.Item eventKey={index.toString()} key={index}>
                                                    <Accordion.Header>
                                                        <div className='d-flex flex-wrap align-items-center'>
                                                            <img className='img-personnel-container img-personnel img-fluid' src={item.ImgUrl}/>
                                                            <div className='mx-4'>
                                                                <p className='mb-1'><span className='fw-bold'>Mã NV :  </span> {item._id}</p>
                                                                <p className='mb-1'><span className='fw-bold'>Email : </span>{item.Email}</p>
                                                                <p className='mb-1'><span className='fw-bold'>Họ tên : </span> {item.LastName} {item.FirstName}</p>
                                                                <p className='mb-1'><span className='fw-bold'>Chức vụ : </span> {item.Position}</p>
                                                            </div>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <div className='row mb-3'>
                                                            <div className='col'><span className='fw-bold'>Số điện thoại : </span> {item.Phone}</div>
                                                            <div className='col'><span className='fw-bold'>Giới tính : </span> {item.Gender == 1 ? 'Nam' : item.Gender == 2 ? 'Nữ' : 'Khác'}</div>
                                                            <div className='col'><span className='fw-bold'>Ngày sinh : </span>{birthDayFormat}</div>
                                                        </div>
                                                        <div className='row mb-3'>
                                                            <div className='col'><span className='fw-bold'>Địa chỉ : </span>{item.Address}</div>
                                                            <div className='col'><span className='fw-bold'>Quê quán : </span>{item.Country}</div>
                                                        </div>
                                                        <div className='row mb-3'>
                                                            <div className='col'><span className='fw-bold'>Ngày bắt đầu : </span> {startWork}</div>
                                                        </div>
                                                        <div className='line-accor-body'></div>
                                                        <div className='d-flex'>
                                                            <div className='mt-3 me-3'>
                                                                <button className='btn btn-success'
                                                                    onClick={() => handleEditEmployee(item)}
                                                                >Chỉnh sửa</button>
                                                            </div>
                                                            <div className='mt-3'>
                                                                <button className='btn btn-secondary'
                                                                    onClick={() => handleOpenModalDelete(item)}
                                                                >Xóa</button>
                                                            </div>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>     
                                            )
                                        })}
                                    </> : 
                                    <>
                                        <span >Chưa có nhân viên làm việc ở cửa hàng</span>     
                                    </>
                                }
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
            <ModalCreateEmployee 
                onHide = {handleCloseModal}
                show = {isShowModalCreateEmployee}
                action = {acctionModal}
                dataModalEmployee = {dataModalEmployee}
            />
            <ModalDeleteEmployee 
                title = {"Xác nhận xóa nhân viên"}
                body = {"Bạn có chắc muốn xóa nhân viên : "}
                obj = {objectDelete}
                show = {isShowModalDelete}
                dataDelete = {{
                    titleId: 'Mã nhân viên',
                    Id: dataModalEmployee._id,
                    titleName: 'Họ và tên',
                    Name: fullname,
                    titlePosition: 'Chức vụ',
                    Position: dataModalEmployee.Position
                }}
                onHide = {handleCloseModalDelete}
            />
        </>
    )
}

export default Personnel;
