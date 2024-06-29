import {Modal} from 'react-bootstrap';
import { FaAddressCard } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import './ComponentChildPrescription.scss';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import _, { tap } from 'lodash';
import { validateCustomer } from '../../../../utils/validates/validateCustomer';
import { toast } from 'react-toastify';
import {createCustomer} from '../../../../services/StoreBranchService';
const ModalCreateCustomer = (props) => {
    const defaultDataCustomer = {
        CustomerPhone: '',
        CustomerName: '',
    }
    const validDefault = {
        CustomerPhone: true,
        CustomerName: true
    }

    const [dataCustomer, setDataCustomer] = useState(defaultDataCustomer);
    const [validInput, setValidInput] = useState(validDefault);

    const handleOnChange = (value, name) => {
        let _dataCustomer = _.cloneDeep(dataCustomer);
        _dataCustomer[name] = value;
        setDataCustomer(_dataCustomer);
    }

    const handleCloseModal = () => {
        setDataCustomer({});
        props.onHide();
    }

    const handleCreateCustomer = async () => {
        let checkValid = validateCustomer(dataCustomer, validDefault );
        setValidInput(checkValid._validInputs)
        if(checkValid.success === false){
            toast.error(checkValid.ErrMess);
        } else {
            try {
                let respone = await createCustomer(dataCustomer);
                if(respone && respone.Success === true){
                    toast.success(respone.Mess);
                    handleCloseModal();
                } else {
                    toast.error(respone.Mess)
                }
            } catch (error) {
                console.log(error);
                toast.error("Vui lòng thử lại sau")
            }
        }
    }
    return (
        <>
            <Modal size="md-2" show={props.show}  className='modal-choose' onHide={() => handleCloseModal()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>Thêm mới khách hàng</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    <div className="form-create-customer">
                        <div className='form-customer' >  
                            <div className="input-container">
                                <FaAddressCard className="icon"/>
                                <input type='text' placeholder='Số điện thoại khách hàng' 
                                    className={validInput.CustomerPhone ?  'form-control input-customer w-100' : 'form-control is-invalid input-customer w-100'}
                                    value={dataCustomer.CustomerPhone} 
                                    onChange={(event) => handleOnChange(event.target.value, 'CustomerPhone')}
                                />
                            </div>
                            <div className='mt-4 form-customer'>
                                <div className='input-container'>
                                    <IoPersonSharp className='icon'/>
                                    <input  type='text' placeholder='Tên khách hàng'
                                        className={validInput.CustomerName ?  'form-control input-customer w-100' : 'form-control input-customer w-100 is-invalid'}
                                        value={dataCustomer.CustomerName}                                        
                                        onChange={(event) => handleOnChange(event.target.value , 'CustomerName')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' 
                        onClick={ () => handleCreateCustomer()}
                    >
                        Thêm mới
                    </Button>
                    <Button variant='secondary'
                        onClick={() => handleCloseModal()}
                    >Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCreateCustomer;
