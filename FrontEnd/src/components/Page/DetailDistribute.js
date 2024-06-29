import InforBranch from '../Layout/LayoutDistribute/InforBranch';
import InforEmployee from '../Layout/LayoutDistribute/InforEmployee';
import InforMedic from '../Layout/LayoutDistribute/InforMedic';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getDistributeWithId, confirmDistributeOrder } from '../../services/DistributeService';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import './DetailDistribute.scss';
import moment from 'moment/moment';
import HeaderStatus from '../Layout/Header/HeaderStatus';
import { UserContext } from '../../views/UserContext';
import { getMedicineStockWithId } from '../../services/MedicineService';

const DetailDistributeOrder = () => {
    const { user } = useContext(UserContext);
    const action = {
        textHeader: 'Chi tiết đơn nhập hàng ',
        btnText: 'Xác nhận',
    };

    let { distributeId } = useParams();
    const [dataDistribute, setDataDistribute] = useState({});
    const [dataBranch, setDataBranch] = useState({});
    const [dataEmployee, setDataEmployee] = useState({});
    const [dataMedicine, setDataMedicine] = useState([]);
    const [personnelName, setPersonnelName] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [actionPage, setActionPage] = useState("VIEW");
    const [stockMedicine, setStockMedicine] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchDataDetailDistribute();
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (dataDistribute.ListMedicine) {
            getMedicineStock();
        }
    }, [dataDistribute]);

    const fetchDataDetailDistribute = async () => {
        try {
            let response = await getDistributeWithId(distributeId);
            if (response && response.Success === true) {
                setDataBranch(response.Data[0].InforBranch);
                setDataEmployee(response.Data[0].InforEmployee);
                setDataMedicine(response.Data[0].ListMedicine);
                setDataDistribute(response.Data[0]);
                let personnelName = response.Data[0].InforEmployee.EmployeeLastName + response.Data[0].InforEmployee.EmployeeFirstName;
                setPersonnelName(personnelName);
                const startCreated = moment(response.Data[0].createdAt).local().format('DD/MM/YYYY HH:mm');
                setCreatedAt(startCreated);
                console.log("response.Data[0]: ", response.Data[0]);
            }
        } catch (error) {
            console.log(error);
            toast.error("Vui lòng thử lại");
        }
    };

    const getMedicineStock = async () => {
        if (!dataDistribute.ListMedicine) {
            return;
        }
        try {
            console.log("dataDistribute.ListMedicine: ", dataDistribute.ListMedicine);
            let response = await getMedicineStockWithId(dataDistribute.ListMedicine);
            if (response && response.Success === true) {
                setStockMedicine(response.Data);
            } else {
                toast.error(response.Mess);
            }
        } catch (error) {
            console.log(error);
            toast.error("Vui lòng thử lại sau");
        }
    };

    const handleProcessDistribute = async (action) => {
        if (action === 'EDIT') {
            setActionPage("EDIT");
        } else if (action === 'CONFIRM') {
            try {
                for (let index = 0; index < dataDistribute.ListMedicine.length; index++) {
                    console.log("Confirm dataDistribute: ", dataDistribute.ListMedicine[index].MedicineId);
                    if (dataDistribute.ListMedicine[index].MedicineId === stockMedicine[index].MedicineId) {
                        console.log("Confirm dataDistribute Quantity: ", dataDistribute.ListMedicine[index].Quantity);
                        console.log("Confirm dataDistribute Stock: ", stockMedicine[index].Stock);
                        if (dataDistribute.ListMedicine[index].Quantity > stockMedicine[index].Stock) {
                            toast.error(dataDistribute.ListMedicine[index].MedicineName + " vượt quá số lượng có sẵn trong kho");
                            return false;
                        }
                    }
                }
                let response = await confirmDistributeOrder(dataDistribute);
                if (response && response.Success === true) {
                    toast.success(response.Mess);
                    fetchDataDetailDistribute();
                } else {
                    toast.error(response.Mess);
                }
            } catch (error) {
                console.log(error);
                toast.error("Vui lòng thử lại sau");
            }
        }
    };

    return (
        <>
            <div className="detail-distribute-order">
                <HeaderStatus 
                    action={action} 
                    Id={dataDistribute.DistributeId} 
                    statusId={dataDistribute.Status} 
                    statusName={dataDistribute.StatusName} 
                    handleProcessDistribute={handleProcessDistribute}
                    PositionId={user.Position}
                />
                <div className="d-flex mt-4">
                    <div className="infor-branch background-white p-4 me-3">
                        <h5>Thông tin chi nhánh</h5>
                        <InforBranch branch={dataBranch} />
                    </div>
                    <div className="infor-employee background-white p-4 ms-3">
                        <InforEmployee 
                            employee={{ PersonnelName: personnelName }}
                            date={createdAt}
                            Id={dataDistribute.DistributeId}
                        />
                    </div>
                </div>
                <div className="infor-medic background-white mt-4">
                    <div>
                        <h5 className='p-4'>Thông tin sản phẩm</h5>
                    </div>
                    <InforMedic
                        listMedic={dataMedicine}
                        action={actionPage}
                        totalQuantityDistribute={dataDistribute.TotalQuantity}
                    />
                </div>
            </div>
        </>
    );
};

export default DetailDistributeOrder;
