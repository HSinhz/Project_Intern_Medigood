import { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useUser } from '../../views/UserContext';
import NavCategory from './NavCategory';
import './Medicine.scss';
import '../style.scss';
import { getMedicineById } from '../../services/MedicineService';
import { toast } from 'react-toastify';
import ModalMedicine from './ModalMedicine';
import ModalDeleteEmployee from '../ModalDeleteEmployee';
const DetailMedicine = () => {
    const location = useLocation();
    const { medicineId, medicineDetailName } = location.state;
    const { user } = useUser();
    const history = useHistory();
    const [medicineData, setMedicneData] = useState({});
    const [priceByUnit, setPriceByUnit] = useState('');
    const [actionModal, setActionModal] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [objectDelete, setObjectDelete] = useState('')
    const fetchDetailMedicine = async () => {
        try {
            let response = await getMedicineById(medicineId);
            if(response && response.Success === true){
                setMedicneData(response.Data);
                setPriceByUnit(response.Data.Price);
                console.log("Check Data Detail Medicine: ", response.Data)
            } else {
                toast.error(response.Mess)
            }
        } catch( error){
            toast.error("Vui lòng thử lại sau");
            console.log("error fetch: ", error);
        }
    }
    useEffect(() => {
        document.title = medicineDetailName;
        console.log(medicineDetailName)
        console.log("medicineId: ", medicineId)
        console.log(user.isAuthenticated);
        if(!user.isAuthenticated){
            history.push('/login');
        }
        
        fetchDetailMedicine();
    }, [medicineId, user]);

    const handleOpenModal = () => {
        setShowModal(true);
        setActionModal('UPDATE')
    }

    const handleCloseModal = () => {
        setActionModal('');
        setShowModal(false);
        fetchDetailMedicine()
    }

    const handleOpenModalDelete = () => {
        setIsShowModalDelete(true);
        setObjectDelete("MEDICINE")
    }

    const handleCloseModalDelete = () => {
        history.push('/medicine')
        setIsShowModalDelete(false);
        fetchDetailMedicine();
        setObjectDelete('');
    }
    const handleChooseUnit = (Unit) => {
        switch (Unit){
            case 'Box' :{
                if( medicineData.Unit == 7 ){
                    let price = medicineData.Price * medicineData.ViePerBox * medicineData.ViePerBlis
                    setPriceByUnit(price);
                    break;
                }
                let price = medicineData.Price * medicineData.ViePerBox
                setPriceByUnit(price);
                break;
            } 
            case 'Viên' : {
                setPriceByUnit(medicineData.Price);
                break;
            }
            case 'Vỉ' : {
                let price = medicineData.Price * medicineData.ViePerBlis
                setPriceByUnit(price);
                break;
            }
            default: {
                setPriceByUnit(medicineData.Price);
                break;
            }
        }
        
    }
    return (
        <>
            <div className='container detail-medicine'>
            <NavCategory/>
            <div className='mt-4 border border-ra rounded'>
                    <div className='row m-4 mx-3'>
                        <div className='col-6 col-sm-5'>
                            <img className='img-personnel-container img-personnel img-fluid w-100' src={medicineData.ImgUrl} alt="Default Image" />
                        </div>
                        <div className='col-6 col-sm-7'>
                            <div className=''>
                                <h1>{medicineData.MedicineDetailName}</h1>
                            </div>
                            <div>
                                {medicineData.MedicineId}
                            </div>
                            <div>
                                <h1 className='primary-color'> {priceByUnit} Đ</h1>
                            </div>
                            <div>
                                <table className='table-content'>
                                    <tbody>
                                        <tr className='content-container'>
                                            <td>Chọn đơn vị</td>
                                            <td>
                                                <div className='d-flex '>
                                                    <button className='btn btn-unit mx-2' onClick={() => handleChooseUnit('Box')}>Hộp</button>
                                                    <button className='btn btn-unit mx-2' onClick={() => handleChooseUnit(medicineData.UnitName)}>{medicineData.UnitName}</button>
                                                    { medicineData.ViePerBlis > 0 ? 
                                                        <button className='btn btn-unit mx-2' onClick={() => handleChooseUnit('Viên')}>Viên</button> : <>
                                                        </> 
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className='content-container'>
                                            <td>Danh mục</td>
                                            <td>{medicineData.CategoryName}</td>
                                        </tr>
                                        <tr className='content-container'>
                                            <td>Nhà sản xuất</td>
                                            <td>{medicineData.Producer}</td>
                                        </tr>
                                        <tr className='content-container'>
                                            <td>Thành phần</td>
                                            <td>{medicineData.Ingredient}</td>
                                        </tr>
                                        <tr className='content-container'>
                                            <td>Quy cách</td>
                                            <td>{medicineData.Specification}</td>
                                        </tr>
                                        <tr className='content-container'>
                                            <td>Mô tả sản phẩm</td>
                                            <td>{medicineData.Description}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button className='btn btn-success w-100 mx-2' onClick={() => handleOpenModal()}>Cập nhật</button>
                                <button className='btn btn-secondary w-100 mx-2' onClick={() => handleOpenModalDelete()}>Xóa</button>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
            <ModalMedicine 
                show = {showModal}
                action = {actionModal}
                onHide = {handleCloseModal}
                dataMedicine = {medicineData}
            />
            <ModalDeleteEmployee 
                title = {"Xác nhận xóa sản phẩm"}
                body = {"Bạn có chắc muốn xóa sản phẩm : "}
                obj = {objectDelete}
                show = {isShowModalDelete}
                dataDelete = {{
                    titleId: 'Mã sản phẩm',
                    Id: medicineData.MedicineId,
                    titleName: 'Tên sản phẩm',
                    Name: medicineData.MedicineName,
                }}
                onHide = {handleCloseModalDelete}
            />
        </>
       
    )
}

export default DetailMedicine;
