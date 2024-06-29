import HeaderCreateContext from "../../Medicine/UIUX/HeaderContext";
import SearchBranch from "../../Layout/Search/SearchBranch";
import SearchMeidic from "../../Layout/Search/SearchMeidic";
import './PurchaseBranch.scss';
import InforBranch from "../../Layout/LayoutDistribute/InforBranch";
import InforEmployee from "../../Layout/LayoutDistribute/InforEmployee";
import InforMedic from "../../Layout/LayoutDistribute/InforMedic";
import ResultSearchMedic from "../../Layout/FormResultSearch/ResultSearchMedic";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { handleSearchMedicine } from "../../../utils/HandleSearch/handleSearchMedicine";
import { UserContext } from "../../../views/UserContext";
import { handleChooseMedicine } from "../../../utils/handleChooseObject/handleChooseMedicine";
import { updateTotalQuantity } from "../../../utils/handleTotalQuantity/handleTotalQuantity";
import { getBranchById } from "../../../services/BranchService";
import { createDistributeBranch } from "../../../services/DistributeService";
import {fetchMedicineBranch} from "../../../services/StoreBranchService"


const CreateDistributeBranch = () => {
    const {user } = useContext(UserContext);

    const action = {
        textHeader: 'Xin phân phối hàng hóa',
        btnText: 'Xác nhận'
    }
    const [listMedic, setListMedic] = useState([]);
    const [listResultSearchMedic, setListResultSearchMedic] = useState([]);
    const [listChoosedMedic, setListChoosedMedic] = useState([]);
    const [totalQuantityDistribute, setTotalQuantityDistribute] = useState(0);

    const [dataBranch, setDataBranch] = useState({});

    const handleClear = () => {
        setListChoosedMedic([]);
        setTotalQuantityDistribute(0);
    }
    useEffect(() => {
        fetchDataMedic();
        fetchBranchWithId();
    }, [])
    
    const fetchDataMedic = async () => {
        try {
            let response = await fetchMedicineBranch();
            if( response && response.Success === true) {
                setListMedic(response.Data);
                console.log("response.Data: ", response.Data)
            } else {
                toast.error(response.Mess)
            }
        } catch(error) {
            toast.error("Vui lòng thử lại")
            console.log(error);
        }
    }

    const fetchBranchWithId = async () => {
        try {
            let response = await getBranchById();
            if( response && response.Success === true) {
                setDataBranch(response.Data);
                console.log("response.Data: ", response.Data)
            } else {
                toast.error(response.Mess)
            }
        } catch(error) {
            toast.error("Vui lòng thử lại")
            console.log(error);
        }
    }

    const handleSearchMedic = (value) => {
        let resultSearch = handleSearchMedicine(value, listMedic);
        setListResultSearchMedic(resultSearch);
    }

    const handleChooseProduct = (medicine) => {
        let addMedicine = handleChooseMedicine(medicine, listChoosedMedic);
        if( addMedicine.check === false ){
            toast.error("Sản phẩm đã tồn tại trong đơn hàng");
        } else {
            setListResultSearchMedic([])
            setListChoosedMedic([...listChoosedMedic, addMedicine.medicine]);
        }
    }
    
    const handleOnChangeQuantity = (quantity, Id) => {
        const updateDistributeMedic = listChoosedMedic.map(item => {
            if( item.Id === Id) {
                item.Quantity = quantity;
            }
            return item;
        })
        setListChoosedMedic(updateDistributeMedic);
        let currentTotalQuantity = updateTotalQuantity(updateDistributeMedic);
        setTotalQuantityDistribute(currentTotalQuantity);

    }

    const handleDeleteProduct = (Id) => {
        const updateDistributeMedic = listChoosedMedic.filter(medicine => medicine.Id !== Id);
        let currentTotalQuantity = updateTotalQuantity(updateDistributeMedic);
        setListChoosedMedic(updateDistributeMedic);
        setTotalQuantityDistribute(currentTotalQuantity);
    }

    const handleCreateDistributeOrder = async () => {
        console.log("listChoosedMedic: ", listChoosedMedic); 
        if( dataBranch === null) {
            toast.error("Vui lòng chọn chi nhánh")
        } else if( listChoosedMedic.length === 0 ){
            toast.error('Vui lòng chọn sản phẩm')
        } else {
            try {
                let medicinesDistribute = [];
                for ( let index = 0; index < listChoosedMedic.length ; index++) {
                    medicinesDistribute[index] = {
                        MedicineId: listChoosedMedic[index].MedicineId,
                        Quantity: listChoosedMedic[index].Quantity,
                        Stock: listChoosedMedic[index].Stock,
                        Inventory: listChoosedMedic[index].Inventory
                    }
                }
                let response = await createDistributeBranch( dataBranch.Id, totalQuantityDistribute, medicinesDistribute, user.Email, 2);
                if( response && response.Success === true) {
                    toast.success(response.Mess);
                    handleClear();
                } else {
                    toast.error(response.Mess);
                }
            } catch (error) {
                toast.error("Vui lòng thử lại");
                console.log(error)
            }
        }
    };
    return (
        <>
            <div className="create-distribute-branch ps-2">
                <HeaderCreateContext action={action} handleCreate={handleCreateDistributeOrder}/>
                <div className="d-flex mt-4 ">
                    <div className="infor-branch background-white p-4 me-3 ">
                        <h5>Thông tin chi nhánh</h5>
                        {/* <SearchBranch onSearch={handleSearchBranch}/> */}
                        <InforBranch branch={dataBranch}/>
                    </div>
                    <div className="infor-employee background-white p-4 ms-3 ">
                        <InforEmployee  employee={user}/>
                    </div>
                </div>
                <div className="infor-medic background-white mt-4">
                    <div className="p-4">
                        <h5 className="">Thông tin sản phẩm</h5>
                        <SearchMeidic onSearch={handleSearchMedic}/>
                        <ResultSearchMedic 
                            listResult={listResultSearchMedic} 
                            handleChooseProduct={handleChooseProduct} 
                        />
                    </div>
                    <InforMedic 
                        listMedic={listChoosedMedic}
                        handleOnChangeQuantity={handleOnChangeQuantity} 
                        handleDeleteProduct={handleDeleteProduct}
                        totalQuantityDistribute = {totalQuantityDistribute}  
                    />
                </div>
            </div>
        </>
    )
}

export default CreateDistributeBranch