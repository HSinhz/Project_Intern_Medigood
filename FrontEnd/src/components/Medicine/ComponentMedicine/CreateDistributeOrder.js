import { useEffect, useState, useContext } from "react";
import HeaderCreateContext from "../UIUX/HeaderContext";
import SearchForm from "../UIUX/Input";
import { getBranch } from "../../../services/BranchService";
import { toast } from "react-toastify";
import { get } from "lodash";
import { getAllMedic, createDistributeOrder } from "../../../services/MedicineService";
import { compileString } from "sass";
import { FaCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {UserContext} from "../../../views/UserContext";
import { updateTotalQuantity } from "../../../utils/handleTotalQuantity/handleTotalQuantity";
import { handleSearchMedicine } from "../../../utils/HandleSearch/handleSearchMedicine";
import { handleChooseMedicine } from "../../../utils/handleChooseObject/handleChooseMedicine";
import { VscChromeClose } from "react-icons/vsc";

const CreateDistributeOrder = () => {
    const {user } = useContext(UserContext);
    const action = {
        textHeader: 'Tạo đơn phân phối hàng',
        btnText: 'Xác nhận'
    }
    const [listBranch, setListBranch] = useState([]);
    const [listResultSearchBranch, setListResultSearchBranch] = useState([]);
    const [choosedBranch, setChoosedBranch] = useState(null);

    const [listMedic, setListMedic] = useState([]);
    const [listResultSearchMedic, setListResultSearchMedic] = useState([]);
    const [listChoosedMedic, setListChoosedMedic] = useState([]);
    const [totalQuantityDistribute, setTotalQuantityDistribute] = useState(0);

    const handleClear = () => {
        setChoosedBranch(null);
        setListChoosedMedic([]);
        setTotalQuantityDistribute(0);
    }
    useEffect(() => {
        fetchDataBranch();
        fetchDataMedic();
        console.log("user: ", user)
    }, [])
    const fetchDataBranch = async () => {
        try {
            let response = await getBranch();
            if( response && response.Success === true) {
                setListBranch(response.Data);
                console.log("response.Data: ", response.Data)
            } else {
                toast.error(response.Mess)
            }
        } catch(error) {
            toast.error("Vui lòng thử lại")
            console.log(error);
        }
    }
    
    const fetchDataMedic = async () => {
        try {
            let response = await getAllMedic();
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

    const handleCreateDistributeOrder = async () => {
        console.log("listChoosedMedic: ", listChoosedMedic); 
        if( choosedBranch === null) {
            toast.error("Vui lòng chọn chi nhánh")
        } else if( listChoosedMedic.length === 0 ){
            toast.error('Vui lòng chọn sản phẩm')
        } else {
            let checkQuantity = true;
            for( let index = 0 ; index < listChoosedMedic.length ; index++ ){
            
                if( listChoosedMedic[index].Quantity > 0){
                    if( listChoosedMedic[index].Quantity > listChoosedMedic[index].Stock){
                        checkQuantity = false;
                        toast.error(listChoosedMedic[index].MedicineName + ' vượt quá số lượng có sẵn trong kho')
                    } 
                } else {
                    checkQuantity = false;
                    toast.error("Vui lòng nhập số lượng sản phẩm")
                }
            }
            if( checkQuantity === true ){
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
                    let response = await createDistributeOrder( choosedBranch.Id, totalQuantityDistribute, medicinesDistribute, user.Email);
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
        }
    };

    const handleSearchBranch = (value) => {
        if( value !== ''){
            const filteredBranch = listBranch.filter( branch => 
                branch.Address.toLowerCase().includes(value.toLowerCase())
            );
            setListResultSearchBranch(filteredBranch);
        } else {
            setListResultSearchBranch([]);
        }
    }

    const handleChooseBranch = (branch) => {
        setChoosedBranch(branch);
        setListResultSearchBranch([]);
    }

    const handleSearchMedic = (value) => {
        let resultSearch = handleSearchMedicine(value, listMedic);
        setListResultSearchMedic(resultSearch)
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
                if(quantity > item.Stock){
                    toast.error("Sản phẩm không đủ số lượng để phân phối")
                }
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

    const deleteBranch = () => {
        setChoosedBranch(null);

    }
    return (
        <>
            <div className="create-distribute-container">
                <HeaderCreateContext action={action} handleCreate={handleCreateDistributeOrder}/>
                <div className="d-flex mt-4">
                    <div className="infor-branch background-white p-4 me-3">
                        <h5>Thông tin chi nhánh</h5>
                        {
                            choosedBranch !== null ? 
                                <></>
                            : 
                            <>
                                <SearchForm onSearch={handleSearchBranch}/>
                            </>
                        }
                        <div className="results-container">
                            {listResultSearchBranch.length > 0 && (
                                <div className="results-list">
                                    {listResultSearchBranch.map((branch, index) => (
                                        <a key={index} className='result-item text-decoration-none'
                                            onClick={() => handleChooseBranch(branch)}
                                        >
                                            <div className='row-item'>
                                                <div className='text-body mx-2 text-decoration-none'>{branch.Id}</div>
                                                <div className='text-body mx-2 text-decoration-none fw-bold'>{branch.Address}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        {
                            choosedBranch && choosedBranch !== null ?
                            <>
                                <div className="mt-4 fs-4 form-infor gridViewLeft">
                                    <li className="muiListItem">
                                        <div className="muiListItemText">Địa chỉ:</div>
                                        <div className="muiListItemText d-flex justify-content-between">
                                            <span className="muiListItemRight">{choosedBranch.Address}</span>
                                            <div className="">
                                                <a className="text-dark btn-delete-branch"
                                                    onClick={() => deleteBranch()}
                                                ><VscChromeClose /></a>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="muiListItem">
                                        <div className="muiListItemText">Mã chi nhánh:</div>
                                        <div className="muiListItemText">
                                            <span className="muiListItemRight">{choosedBranch.Id}</span>    
                                        </div>
                                    </li>
                                    <li className="muiListItem">
                                        <div className="muiListItemText">Trạng thái:</div>
                                        <div className=" muiListItemText status">
                                            <span  className="muiListItemRight">
                                                <FaCircle/> <span>Đang hoạt động</span>
                                            </span>
                                        </div>
                                    </li>
                                </div>
                            </> : <></>
                        }
                    </div>
                    <div className="infor-employee background-white p-4 ms-2">
                        <h5>Thông tin đơn phân phối</h5>
                        <div className="mt-4 fs-4 form-infor gridViewLeft">
                            <li className="muiListItem">
                                <div className="muiListItemText">Đơn nhập hàng:</div>
                                <div className="muiListItemText">
                                    <span className="muiListItemRight"></span>
                                </div>
                            </li>
                            <li className="muiListItem">
                                <div className="muiListItemText">Tên nhân viên:</div>
                                <div className="muiListItemText">
                                    <span className="muiListItemRight">{user.PersonnelName}</span>
                                </div>
                            </li>
                            <li className="muiListItem">
                                <div className="muiListItemText">Ngày nhập:</div>
                                <div className="muiListItemText">
                                    <span className="muiListItemRight"></span>    
                                </div>
                            </li>
                        </div>
                    </div>
                </div>
                <div className="infor-medic background-white mt-4">
                    <div className="p-4">
                        <h5>Thông tin sản phẩm</h5>
                        <SearchForm onSearch={handleSearchMedic}/>
                        <div className="results-container ">
                            {listResultSearchMedic.length > 0 && (
                                <div className="results-list">
                                    {listResultSearchMedic.map((medicine, index) => (
                                        <a key={index} className='result-item text-decoration-none'
                                            onClick={() => handleChooseProduct(medicine)}
                                        >
                                            <div className='d-flex row-item'>
                                                <img src={medicine.ImgUrl} className='img-medicine' alt={medicine.MedicineName} />
                                                <div className='text-body mx-2 text-decoration-none'>{medicine.MedicineName}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="table-medic">
                        <table>
                            <thead>
                                <tr>
                                    <th className="ps-4 width-2"></th>
                                    <th className="width-2"></th>
                                    <th className="width-5">Mã sản phẩm</th>
                                    <th className="width-5">Tên sản phẩm</th>
                                    <th className="width-5">Số lượng nhập</th>
                                    <th className="width-5">Số lượng có thể phân phối</th>
                                    <th className="width-5">Đơn vị</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                listChoosedMedic && listChoosedMedic.length > 0 ?
                                <>
                                    {
                                        listChoosedMedic.map((item, index) =>{
                                            return (
                                                <tr className="">
                                                    <td scope="col" className="text-center btn-delete ps-4">
                                                        <button className='btn btn-secondary' 
                                                            onClick={() => handleDeleteProduct(item.Id)}
                                                        >
                                                            <MdDelete />
                                                        </button>
                                                    </td>
                                                    <td scope="col" className="p-2 img-medic">
                                                        <img src={item.ImgUrl} className="img-medicine"/>
                                                    </td>
                                                    <td scope="col">{item.MedicineId}</td>
                                                    <td scope="col">{item.MedicineName}</td>
                                                    <td scope="col">
                                                        <input type="number"   
                                                            className='form-control w-50' value={item.Quantity}
                                                            onChange={(event) => handleOnChangeQuantity(event.target.value, item.Id)}
                                                        />
                                                    </td>
                                                    <td scope="col">{item.Stock}</td>
                                                    <td scope="col">Hộp</td>
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
                        <div className="line mt-2"></div>
                        <div className="d-flex  confirm-purchase p-4 background-white">
                            <div className="muiGridLeft">
                                <p>Ghi chú đơn</p>
                                <textarea></textarea>
                                <p>Tags</p>
                                <textarea></textarea>
                            </div>
                            
                            <div className="muiGridRight">
                                <li className="d-flex muiListItem fw-bold totalQuantity">
                                    <div className="muiListItemText">
                                        Tổng sản phẩm:
                                    </div>
                                    <div className="muiListItemText"><span className="muiListItemText-alignRight">{listChoosedMedic.length}</span></div>
                                </li>
                                <li className="d-flex muiListItem fw-bold totalQuantity">
                                    <div className="muiListItemText">
                                        Tổng số lượng:
                                    </div>
                                    <div className="muiListItemText"><span className="muiListItemText-alignRight">{totalQuantityDistribute}</span></div>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateDistributeOrder;