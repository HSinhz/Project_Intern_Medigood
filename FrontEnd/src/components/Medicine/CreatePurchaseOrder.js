import { useEffect, useState, useContext } from "react";
import { documentTile } from "../../utils/documentTitle";
import './Medicine.scss';
import SearchForm from "./UIUX/Input";
import { getAllMedic, getSupplier, createPurchaseOrder } from "../../services/MedicineService";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../../views/UserContext";

const CreatePureChaseOrder = () => {
    const { user } = useContext(UserContext);
    const [listMedicPurchase, setListMedicPurchase] = useState([]);
    const [listMedicine, setListMedicine] = useState([]);
    const [listResult, setListResult] = useState([]);
    const [listSupplier, setListSupplier] = useState([]);
    const [listResultSearchSupplier, setListResultSearchSupplier] = useState([]);
    const [supplierMain, setSupplierMain] = useState(null);
    const [totalQuantityPurchase, setTotalQuantityPurchase] = useState(0);
    const [totalPurchase, setTotalPurchase] = useState(0);
    const [totalPuchaseVNI, setTotalPurchaseVNI] = useState('');

    
    useEffect(() => {
        document.title = documentTile.Medicine.CreatePurchaseOrder
        fetchDataMedicine();
        fetchDataSupplier();
    }, [])

    const handleTotalPurchase = (total) => {
        setTotalPurchase(total);
        let totalVNI = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        setTotalPurchaseVNI(totalVNI);
    }
    
    const fetchDataMedicine = async () => {
        try {
            let response = await getAllMedic();
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

    const fetchDataSupplier = async () => {
        try {
            let response = await getSupplier();
            if(response && response.Success === true ){
                setListSupplier(response.Data);
            } else {
                toast.error(response.Mess);
            }

        } catch (error){
            console.log("Error Use Effect: ", error);
            toast.error("Vui lòng thử lại");
        }
    }

    const handleSearchMedic = (value) => {
        if(value !== ''){
            const filteredMedicine = listMedicine.filter(medicine =>
                medicine.MedicineName.toLowerCase().includes(value.toLowerCase())
            );
            setListResult(filteredMedicine);
        } else {
            setListResult([]);
        }
    };


    const handleSearchSupplier = (value) => {
        if( value !== ''){
            const filteredSupplier = listSupplier.filter( supplier => 
                supplier.SupplierName.toLowerCase().includes(value.toLowerCase())
            );
            setListResultSearchSupplier(filteredSupplier);
        } else {
            setListResult([]);
        }
    }
    const handleChooseProduct = (medicine) => {
        let check = true;
        listMedicPurchase.map(item => {
            if(item.MedicineId === medicine.MedicineId){
                toast.error("Sản phẩm đã tồn tại trong đơn hàng");
                check = false;
            }
        })
        if( check === true){
            setListResult([])
            let nextId = listMedicPurchase.length + 1;
            medicine.Id = nextId;
            medicine.Quantity = 0;
            if(medicine.Unit === 7){
                medicine.totalPriceMedicPurchase =parseInt(medicine.Price) * parseInt(medicine.ViePerBox) * parseInt(medicine.ViePerBlis);
                medicine.PriceMedic = parseInt(medicine.Price) * parseInt(medicine.ViePerBox) * parseInt(medicine.ViePerBlis);
            } else {
                medicine.totalPriceMedicPurchase =parseInt(medicine.Price) * parseInt(medicine.ViePerBox);
                medicine.PriceMedic = parseInt(medicine.Price) * parseInt(medicine.ViePerBox) ;

            }
            setListMedicPurchase([...listMedicPurchase, medicine]);
        }
    }

    const handleChooseSupplier = ( supplier) => {
        setSupplierMain(supplier);
        setListResultSearchSupplier([]);
    }
    const handleDeleteProduct = (id) => {
        const updatePurchaseItem = listMedicPurchase.filter(item => item.Id !== id);
        let currentTotalQuantity = 0;
        let currentTotalPurchase = 0;
        for( let index = 0;  index < updatePurchaseItem.length ; index++){
            updatePurchaseItem[index].Id = index + 1;
        }

        setListMedicPurchase(updatePurchaseItem);
        for( let index = 0; index < updatePurchaseItem.length; index++){
            console.log("dag xoa")
            console.log(updatePurchaseItem[index])
            currentTotalQuantity = parseInt(currentTotalQuantity) + parseInt(updatePurchaseItem[index].Quantity);
            currentTotalPurchase = currentTotalPurchase + parseInt(updatePurchaseItem[index].totalPriceMedicPurchase)
        }
        console.log("currentTotalPurchase: ", currentTotalPurchase)
        setTotalQuantityPurchase(currentTotalQuantity);
        handleTotalPurchase(currentTotalPurchase);

    }

    const handleOnChangeQuantity = (value, Id) => {
        let currentTotalPurchase = 0;
        let currentTotalQuantity = 0;

        const updatePurchaseItem = listMedicPurchase.map(item => {
            if(item.Id === Id){
                item.Quantity = value;
                item.totalPriceMedicPurchase = item.PriceMedic * parseInt(value);
            }
            return item;
        })
        for( let index = 0; index < updatePurchaseItem.length; index++){
            currentTotalQuantity = parseInt(currentTotalQuantity) + parseInt(updatePurchaseItem[index].Quantity)
            currentTotalPurchase = parseInt(currentTotalPurchase) + parseInt(updatePurchaseItem[index].totalPriceMedicPurchase)
            setTotalQuantityPurchase(currentTotalQuantity);
        }
        handleTotalPurchase(currentTotalPurchase)
        setListMedicPurchase(updatePurchaseItem);
    }
    
     
    const handleCreatePurchaseOrder = async () => {
        if( listMedicPurchase && listMedicPurchase.length === 0) {
            toast.error("Vui Lòng chọn sản phẩm")
        } else if( supplierMain === null) {
            toast.error("Vui lòng chọn nhà cung cấp")
        } else {
            for( let index = 0; index < listMedicPurchase.length; index++ ){
                if(listMedicPurchase[index].Quantity === 0) {
                    toast.error("Vui lòng chọn số lượng sản phẩm");
                    return 1;
                }
            }
            try {
                let dataMedicPurchase = [];
                for( let index = 0 ; index < listMedicPurchase.length; index++){
                    dataMedicPurchase[index] = {
                        MedicineId: listMedicPurchase[index].MedicineId,
                        QuantityMedic: listMedicPurchase[index].Quantity,
                        TotalMedicPurchase: listMedicPurchase[index].totalPriceMedicPurchase
                    }
                }
                let response = await createPurchaseOrder(supplierMain.SupplierId, dataMedicPurchase, totalQuantityPurchase, totalPurchase);

                if(response && response.Success === true ){
                    toast.success(response.Mess);
                    handleClear({ onComponentClick: () => console.log("ImportGoods") });
                } else {
                    toast.error(response.Mess);
                }
            } catch (error){
                console.log("Error Use Effect: ", error);
                toast.error("Vui lòng thử lại");
            }
        }
    }

    const handleClear = ({ onComponentClick } = {}) => {
        setListMedicPurchase([]);
        setListMedicine([]);
        setListResult([]);
        setListSupplier([]);
        setListResultSearchSupplier([]);
        setSupplierMain(null);
        setTotalQuantityPurchase(0);
        setTotalPurchase(0);
        setTotalPurchaseVNI('');
        if (onComponentClick) {
            onComponentClick('ImportGoods');
        }
    }
    
    return (
        <>
            <div className=  "create-purchase mt-4 p-4">
                <div className="p-4 background-white">
                    <div className="d-flex justify-content-between">
                        <h3>Tạo đơn nhập hàng</h3>
                        <button className="btn btn-primary"
                            onClick={() => handleCreatePurchaseOrder()}
                        >Tạo & nhập hàng</button>
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div className="infor-producer background-white me-2 p-4">
                        <h6>Thông tin nhà cung cấp</h6>
                        <SearchForm onSearch={handleSearchSupplier} />
                        <div className="results-container">
                            {listResultSearchSupplier.length > 0 && (
                                <div className="results-list">
                                    {listResultSearchSupplier.map((supplier, index) => (
                                        <a key={index} className='list-medicine text-decoration-none'
                                            onClick={() => handleChooseSupplier(supplier)}
                                        >
                                            <div className='row-medicine'>
                                                <div className='text-body mx-2 text-decoration-none'>{supplier.SupplierName}</div>
                                                <div className='text-body mx-2 text-decoration-none fw-bold'>{supplier.SupplierPhone}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        {
                            supplierMain && supplierMain !== null ?
                            <>
                                <div className="mt-4 fs-5">
                                    <a href="#" >{supplierMain.SupplierName}</a>
                                    <p className="mt-4">{supplierMain.SupplierPhone} </p >
                                    <p className="mt-4">{supplierMain.SupplierAddress} </p >
                                </div>
                            </> :
                            <></>
                        }
                        
                    </div>
                    <div className="infor-purchase-order background-white ms-3 p-4">
                        <h6>Thông tin đơn nhập hàng</h6>
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p>Nhân viên</p>
                                <input type="text"  disabled/>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <p>Ngày nhập</p>
                                <input type="text"  disabled/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="infor-detail background-white mt-4 ">
                    <div className="p-4">
                        <h6>Thông tin sản phẩm</h6>
                        <SearchForm onSearch={handleSearchMedic} />
                        <div className="results-container">
                            {listResult.length > 0 && (
                                <div className="results-list">
                                    {listResult.map((medicine, index) => (
                                        <a key={index} className='list-medicine text-decoration-none'
                                            onClick={() => handleChooseProduct(medicine)}
                                        >
                                            <div className='d-flex row-medicine'>
                                                <img src={medicine.ImgUrl} className='img-medicine' alt={medicine.MedicineName} />
                                                <div className='text-body mx-2 text-decoration-none'>{medicine.MedicineName}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="table-medicine mt-2">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col">Sản phẩm</th>
                                    <th scope="col">Đơn vị</th>
                                    <th scope="col">SL nhập</th>
                                    <th scope="col" className="text-right">Giá sản phẩm</th>
                                    <th scope="col" className="text-right">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>

                            {
                                listMedicPurchase && listMedicPurchase.length > 0 ?
                                <>
                                    {
                                        listMedicPurchase.map((item, index) =>{
                                            let medicPrice = item.PriceMedic.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                            let totalMedicItemPurchase = item.totalPriceMedicPurchase.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                            return (
                                                <tr className="">
                                                    <td scope="col" className="text-center">
                                                        <button className='btn btn-secondary' 
                                                            onClick={() => handleDeleteProduct(item.Id)}
                                                        >
                                                            <MdDelete />
                                                        </button>
                                                    </td>
                                                    <td scope="col" className="p-2">
                                                        <img src={item.ImgUrl} className="img-medicine"/>
                                                    </td>
                                                    <td scope="col">{item.MedicineName}</td>
                                                    <td scope="col">Hộp</td>
                                                    <td scope="col">
                                                        <input type="number"   
                                                            className='form-control w-50' value={item.Quantity}
                                                            onChange={(event) => handleOnChangeQuantity(event.target.value, item.Id)}
                                                        />
                                                    </td>
                                                    <td scope="col" className="text-right">{medicPrice}</td>
                                                    <td scope="col" className="text-right">{totalMedicItemPurchase}</td>
                                                </tr>
                                            )
                                        } )
                                    }
                                </>
                                : 
                                <>
                                        <tr>
                                            <td colSpan="7" className="text-center">
                                                <div className="mt-2">
                                                    <img
                                                        src="https://firebasestorage.googleapis.com/v0/b/medigood-d7665.appspot.com/o/image%2Fempty-bill.svg?alt=media&token=9c7b0ab0-47d7-4984-80bc-1c77d5e7c6fc"
                                                        alt="No orders"
                                                    />
                                                    <h4>Chưa có đơn hàng</h4>
                                                </div>
                                            </td>
                                        </tr>
                                </>
                            }
                            </tbody>

                        </table>
                    </div>
                    <div className="line mt-2"></div>
                    <div className="d-flex  confirm-purchase p-4 background-white">
                        <div className="muiGridLeft">
                            <p>Ghi chú đơn</p>
                            <textarea></textarea>
                            <p>Tags</p>
                            <textarea></textarea>
                        </div>
                        <div className="muiGridRight">
                            <li className="d-flex muiListItem">
                                <div className="muiListItemText">
                                    Số lượng
                                </div>
                                <div className="muiListItemText"><span className="muiListItemText-alignRight">{totalQuantityPurchase}</span></div>
                            </li>
                            <li className="d-flex muiListItem">
                                <div className="muiListItemText">
                                    Tổng tiền
                                </div>
                                <div className="muiListItemText"><span className="muiListItemText-alignRight">{totalPuchaseVNI}</span></div>
                            </li>
                            <li className="d-flex muiListItem">
                                <div className="muiListItemText">
                                    Chi phí nhập hàng
                                </div>
                                <div className="muiListItemText"><span className="muiListItemText-alignRight">0</span></div>
                            </li>
                            <li className="d-flex muiListItem fw-bold">
                                <div className="muiListItemText">
                                    Tổng tiền phải trả
                                </div>
                                <div className="muiListItemText"><span className="muiListItemText-alignRight">{totalPuchaseVNI}</span></div>
                            </li>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default CreatePureChaseOrder;