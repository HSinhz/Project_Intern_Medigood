import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {deletePersonal} from '../../services/PersonnelService'
import { toast } from 'react-toastify';
const ModalDeleteEmployee = (props) => {

    const handleDeletePersonnel = async (personalId) => {
        let response = await deletePersonal(personalId);
        if( response && response.Success === true){
            toast.success(response.Mess);
            props.onHide();
        } else {
            toast.error(response.Mess)
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <h5> {props.body}  </h5>
                <p>Mã nhân viên: <span className='fw-bold'>{props.dataModalEmployee._id}</span></p>
                <p>Họ Tên: <span className='fw-bold'>{props.dataModalEmployee.LastName} {props.dataModalEmployee.FirstName}</span> </p>
                <p>Chức vụ: <span className='fw-bold'>{props.dataModalEmployee.Position}</span></p>
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Hủy</Button>
                <Button variant="danger" onClick={() => handleDeletePersonnel(props.dataModalEmployee._id)} >Xác nhận</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteEmployee;