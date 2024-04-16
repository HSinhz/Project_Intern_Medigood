import { useEffect, useContext, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useUser } from '../../views/UserContext';
import './Medicine.scss';
import NavCategory from './NavCategory';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from 'react-toastify';
import { showMedicine } from '../../services/MedicineService';
const Medicine = () => {
    const { user } = useUser();
    const history = useHistory();
    const [listMedicine, setListMedicine] = useState([]);
    useEffect(() => {
        document.title = 'Dược Phẩm';
        console.log(user.isAuthenticated);
        if(!user.isAuthenticated){
            history.push('/login');
        }
        fetchDataMedicine();
    }, []);

    const fetchDataMedicine = async () => {
        try{
            let response = await showMedicine();
            console.log("Check data medicine: ", response.Data)
            if(response && response.Success === true){
                toast.success("OKKKK r ba");       
                setListMedicine(response.Data);
            }
        } catch (error){
            console.log("Error when fetch data medicine: ", error);
            toast.error("Có lỗi vui lòng thử lại sau");
        }
    }

    return (
        <>
            <div className='container medicine'>
                <div className='row'>
                    <div className='col col-sm-3'>
                        <h3>Dược Phẩm</h3>
                    </div>
                    <div className='col col-sm-7'>
                        <Form >
                            <Row>
                                <Col xs="" className='w-100'>
                                    <Form.Control
                                        type="text"
                                        placeholder='Mã hoặc tên dược phẩm'
                                        className=" mr-sm-2 "
                                        />
                                    </Col>
                                <Col xs="auto">
                                    <Button type="submit" className='btn-success'><span ><AiOutlineSearch/></span></Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className='col col-sm-2 d-flex justify-content-end'>
                        <button type="submit" className='btn btn-success' ><AiOutlinePlus className='pb-1 mx-2'/>Dược phẩm</button>
                    </div>
                </div>
                <div className='mt-4 nav-category'>
                    <NavCategory />
                </div>
                <div className='mt-4'>
                    <table class="table mt-4">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Danh mục</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Đơn vị</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            { listMedicine && listMedicine.length > 0  ? 
                                <>
                                    {listMedicine.map((item , index) => {
                                        return (
                                            <tr className='fs-20 vertical-align-middle'>
                                                <td className='w-60'><img className='img-personnel-container img-personnel img-fluid' src={item.ImgUrl}/></td>
                                                <td className=' witd-td-name'>
                                                    <div className='d-flex align-items-center justify-content-center '>
                                                        {item.MedicineName}
                                                    </div>                                                    
                                                </td>
                                                <td>
                                                    <a href='/ádasd'>{item.CategoryName}</a>
                                                </td>
                                                <td>{item.Price} VNĐ</td>
                                                <td>{item.Unit}</td>
                                                <td>
                                                    <div className=''>
                                                        <button className='btn btn-success mx-3'>Chi tiết</button>
                                                    </div>
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
        </>
    )
}

export default Medicine;
