import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../views/UserContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from 'react-toastify';
import './Personnel.scss'
import ModalCreateEmployee from './ModalCreateEmployee';
import { getEmployeeWithPagination } from '../../services/PersonnelService';
const Personnel = () => {
    const { user } = useUser();
    const history = useHistory();
    const [isShowModalCreateEmployee, setIsShowModalCreateEmployee] = useState(false);
    const [acctionModal, setActionModal] = useState(''); 
    const [dataModalEmployee, setDataModalEmployee] = useState({});
    const [listPersonnel, setListPersonnel] = useState([]);

    useEffect(() => {
        console.log(user.isAuthenticated);
        if(!user.isAuthenticated){
            history.push('/login');
        }
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
        fectDataEmloyee();
    }, []);

    const handleOpenModalCreateEmployee = () => {
        setIsShowModalCreateEmployee(true);
        setActionModal("CREATE");
    }

    const  handleCloseModal = () => {
        setIsShowModalCreateEmployee(false);
        setActionModal("");
        setDataModalEmployee({});
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
                        <div className='table-responsive'>
                            <table class="table mt-4">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Họ tên</th>
                                        <th scope="col">Mã nhân viên</th>
                                        <th scope="col">Cửa hàng</th>
                                        <th scope="col">Chức vụ</th>
                                        <th scope="col">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listPersonnel && listPersonnel.length > 0 ? 
                                        <>
                                            {listPersonnel.map((item, index) => {
                                                return (
                                                    <tr className='fs-20'>
                                                        <td className='w-60'><img className='img-personnel-container img-personnel img-fluid' src='https://img.freepik.com/premium-vector/cute-smiling-boy-avatar-flat-style-vector-illustration_710508-1241.jpg'/></td>
                                                        <td >
                                                            <div>
                                                                {item.Name}
                                                            </div>
                                                            <div>
                                                                {item.Email}
                                                            </div>
                                                        </td>
                                                        <td>{item._id}</td>
                                                        <td>{item.Phone}</td>
                                                        <td>Dược sĩ</td>
                                                        <td>
                                                            {
                                                               item.Online === true ? "Online" : "Offline"
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </> : 
                                        <>
                                            <span >Chưa có nhân viên làm việc ở cửa hàng</span>     
                                        </>
                                    }
                                </tbody>
                            </table>
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
        </>
    )
}

export default Personnel;
