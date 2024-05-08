import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../../../views/UserContext';
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import './ComponentChildPrescription.scss';
import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineSearch } from "react-icons/ai";
import {fetchMedicineBranch} from '../../../../services/StoreBranchService'
import { toast } from 'react-toastify';
const ModalChoose = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [listMedicine, setListMedicine] = useState([]);
    const [listResult, setListResult] = useState([]);
    const handleCloseModal = () => {
        props.onHide();
    }

    const handleSearch = (value) => {
        setSearchTerm(value);
        const filteredMedicine = listMedicine.filter(medicine =>
            medicine.MedicineName.toLowerCase().includes(value.toLowerCase())
        );
        setListResult(filteredMedicine);
    }

    const fetchDataMedicine = async () => {
        try {
            let response = await fetchMedicineBranch();
            if(response && response.Success === true ){
                setListMedicine(response.Data);
                console.log("CheckDataMedicinebranch: ", response.Data)
            } else {
                toast.error(response.Mess);
            }

        } catch (error){
            console.log("Error Use Effect: ", error);
            toast.error("Vui lòng thử lại");
        }
    }

    useEffect(() => {
        fetchDataMedicine()
    }, [])

    const handleChooseProduct = (medicine) => {
        // Thêm sản phẩm đã chọn vào danh sách orderItems
        const newOrderItem = {
            meidicineId: medicine.MedicineId,
            img: medicine.ImgUrl,
            product: medicine.MedicineName,
            price: medicine.Price,
            unit: medicine.UnitName,
            unitId: medicine.UnitId,
            unitId_main: medicine.UnitId,
            viePerBox: medicine.ViePerBox,
            viePerBlis: medicine.ViePerBlis,
            quantity: 1 // Số lượng mặc định
        };
        props.addOrderItem(newOrderItem);
        handleCloseModal();
    }
    return (
        <>
            <Modal size="lg" show={props.show} className='modal-choose' onHide={() => handleCloseModal()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    <div className='d-flex justify-content-around mb-4'>
                        <input type='text' className='form-control' onChange={(event) => handleSearch(event.target.value, 'SearchItem')} value={searchTerm}/>
                        <div className='mx-2'>
                            <button className='btn btn-success'
                            ><AiOutlineSearch/></button>
                        </div>
                    </div>
                    <div className=''>
                        {listResult.length > 0 && (
                            <>
                                {listResult.map((medicine, index) => (
                                    <a className='list-medicine text-decoration-none' href='#'  onClick={() => handleChooseProduct(medicine)}>
                                        <div className='d-flex row-medicine'>
                                            <img src={medicine.ImgUrl}  className='img-medicine'/>
                                            <div className='text-body mx-2 text-decoration-none'>{medicine.MedicineName}</div>
                                        </div>
                                    </a>
                                ))}
                            </>
                        )}
                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalChoose;
