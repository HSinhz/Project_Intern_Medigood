import { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useUser } from '../../views/UserContext';
import NavCategory from './NavCategory';
import './Medicine.scss';
import '../style.scss';
import { getMedicineById } from '../../services/MedicineService';
import { toast } from 'react-toastify';
const DetailMedicine = () => {
    const location = useLocation();
    const medicinename = useParams();
    const { medicineId, medicineName } = location.state;
    const { user } = useUser();
    const history = useHistory();
    const [medicineData, setMedicneData] = useState({});

    useEffect(() => {
        document.title = medicineName;
        console.log(medicineName)
        console.log("medicineId: ", medicineId)
        console.log(user.isAuthenticated);
        if(!user.isAuthenticated){
            history.push('/login');
        }
        const fetchDetailMedicine = async () => {
            try {
                let response = await getMedicineById(medicineId);
                if(response && response.Success === true){
                    setMedicneData(response.Data);
                    console.log("Check Data Detail Medicine: ", response.Data)
                } else {
                    toast.error(response.Mess)
                }
            } catch( error){
                toast.error("Vui lòng thử lại sau");
                console.log("error fetch: ", error);
            }
        }
        fetchDetailMedicine();
    }, [medicineId, user]);

    
    return (
        <div className='container detail-medicine'>
           <NavCategory/>
           <div className='mt-4 border border-ra rounded'>
                <div className='row m-4 mx-3'>
                    <div className='col-6 col-sm-5'>
                        <img className='img-personnel-container img-personnel img-fluid w-100' src={medicineData.ImgUrl} alt="Default Image" />
                    </div>
                    <div className='col-6 col-sm-7'>
                        <div className=''>
                            <h1>{medicineData.MedicineName}</h1>
                        </div>
                        <div>
                            {medicineData.MedicineId}
                        </div>
                        <div>
                            <h1 className='primary-color'> {medicineData.Price} Đ</h1>
                        </div>
                        <div>
                            <table className='table-content'>
                                <tbody>
                                    <tr className='content-container'>
                                        <td>Danh mục</td>
                                        <td>{medicineData.CategoryId}</td>
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
                            
                            <button className='btn btn-success w-100 mx-2'>cập nhật</button>
                            <button className='btn btn-secondary w-100 mx-2'>Xóa</button>

                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default DetailMedicine;
