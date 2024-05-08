import {Modal} from 'react-bootstrap';
const ModalSuccessfully = (props) => {
    
    const handleClose = () => {
        props.onHide();
    }

    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Title></Modal.Title>
                <Modal.Body>
                    <div className='d-flex flex-column align-items-center'>
                        <img className='img-fluid' src='https://firebasestorage.googleapis.com/v0/b/medigood-d7665.appspot.com/o/image%2Fsuccess.png?alt=media&token=892f66c8-294f-4a0e-a29b-77f7f797c221' />
                        <div className='mt-4'>
                            <button className='btn btn-primary'
                                onClick={() => handleClose()}
                            >Tuyệt vời</button>
                        </div>
                        
                    </div>
                    
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalSuccessfully;