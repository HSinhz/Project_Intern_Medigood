import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {deletePersonal} from '../services/PersonnelService';
import { deleteMedicine } from '../services/MedicineService';
import { toast } from 'react-toastify';
const ModalDeleteEmployee = (props) => {
    
    const handleDeletePersonnel = async (objId) => {
        let response = {}
        if(props.obj === 'PERSONNEL') {
        } 

        switch (props.obj) {
            case 'PERSONNEL' : {
                response = await deletePersonal(objId);
                break; 
            } 
            case 'MEDICINE' : {
                response = await deleteMedicine(objId);
                break;
            }
        }

        if( response && response.Success === true){
            toast.success(response.Mess);
            props.onHide();
        } else {
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
                <p>{props.dataDelete.titleId}: <span className='fw-bold'>{props.dataDelete.Id}</span></p>
                <p>{props.dataDelete.titleName}: <span className='fw-bold'>{props.dataDelete.Name} </span> </p>
                {
                    props.dataDelete.Position ?  <p>{props.dataDelete.titlePosition}: <span className='fw-bold'>{props.dataDelete.Position}</span></p> : <></>
                }
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Hủy</Button>
                <Button variant="danger" onClick={() => handleDeletePersonnel(props.dataDelete.Id)} >Xác nhận</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteEmployee;