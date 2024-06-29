import { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import './ComponentChildPrescription.scss';
import ModalChoose from './ModalChoose';
import ConfirmOrder from './ConfirmOrder';
import { handleTotalOrder } from '../../../../utils/handleTotalOrder';
import { toast } from 'react-toastify';
import { documentTile } from '../../../../utils/documentTitle';
const NewrOrder = (props) => {
    const location = useLocation();
    const history = useHistory();
    const [dataReOrder, setDataReOrder] = useState({});
   
    const [actionModal, setActionModal] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [totalOrder, setTotalOrder] = useState(0);
    const [orderItems, setOrderItems] = useState([]);
    const [dataCustomer, setDataCustomer] = useState({
        CustomerName: '',
        CustomerPhone: '',
        Point: null
    });
    const [acctionOrder, setActionOrder] = useState('NEWORDER')
    useEffect(() => {
        document.title = documentTile.Store.NewOrder
        if(location.state) {
            setActionOrder("REORDER");
            setDataReOrder(location.state.dataPrescription);
            const dataState =  location.state.dataPrescription;
            setDataCustomer({
                CustomerName: dataState.CustomerName,
                CustomerPhone: dataState.CustomerPhone,
                Point: dataState.Point
            })
            console.log("dataCustomer: ", dataState.CustomerName, dataState.CustomerPhone, dataState.Point)
            let nextId = 0;
            let totalOrder = 0;
            const dataReOrder = dataState.detailMedic.map(item => {
                nextId = nextId + 1;
                totalOrder = totalOrder + item.TotalPrice;
                return {
                    id: nextId,
                    medicineId: item.MedicineId,
                    img: item.MedicneImg,
                    price: item.MedicinePrice,
                    product: item.MedicineName,
                    totalPriceItem: item.TotalPrice,
                    unit: item.UnitNameMain,
                    unitId: item.Unit,
                    unitId_main: item.UnitMain,
                    viePerBlis: item.ViePerBlis,
                    viePerBox: item.ViePerBox,
                    quantity: item.Quantity
                }
            })
            setOrderItems(dataReOrder);
            setTotalOrder(totalOrder);
        }
    }, []);

    const addOrderItem = (newOrderItem) => {
        let check = true;
        orderItems.map(item => {
            if (item.medicineId === newOrderItem.medicineId) {
                toast.error("Sản phẩm đã tồn tại trong đơn hàng");
                check = false;
            }
        })
        if(check){
            let nextId = orderItems.length + 1;
            newOrderItem.id = nextId;
            newOrderItem.totalPriceItem = parseInt(newOrderItem.price) * parseInt(newOrderItem.quantity);
            if(newOrderItem.unitId === 7 ){
                newOrderItem.unitId = 1;
            }
            // Thêm sản phẩm vào danh sách orderItems
            setOrderItems([...orderItems, newOrderItem]);
            setTotalOrder(handleTotalOrder([...orderItems, newOrderItem]));
            console.log('orderItems: ', orderItems)
        }
    };

    const handleOnChangeNewOrder = (value, itemId) => {
        const updatedOrderItems = orderItems.map(item => {
            // Kiểm tra thuốc đó có đúng với thuốc cần chỉnh sửa số lượng không
            if(item.id === itemId){
                // Kiểm tra nếu đơn vị của thuốc là 'HỘP'
                if( item.unitId === 0){
                    // Kiểm tra thuốc trong hộp là Vỉ hay Viên
                    if( item.unitId_main === 7){
                        // Nếu là vỉ
                        item.quantity = value;
                        item.totalPriceItem = parseInt(item.price) * parseInt(item.viePerBox) * parseInt(item.viePerBlis) * parseInt(value) ;
                    } else if( item.unitId_main === 1 || item.unitId_main === 2){
                        // Các trường hợp còn lại 
                        item.quantity = value;
                        item.totalPriceItem = parseInt(item.price) * parseInt(value) * parseInt(item.viePerBox);
                    } 
                } else if (item.unitId == item.unitId_main) { // Kiểm tra các đơn vị hiện tại có phải là đơn vị ban đầu của thuốc
                    if(item.unitId_main == 7 ) { // Kiểm tra trường hợp khi nhân viên chọn đơn vị là Vỉ
                        item.quantity = value;
                        item.totalPriceItem = parseInt(item.price) * parseInt(value)  * parseInt(item.viePerBlis);
                    } else { // Các trường hợp còn lại
                        item.quantity = value;
                        item.totalPriceItem = parseInt(item.price) * parseInt(value) ;
                    }
                } else if( item.unitId === 1  ) { // Đây là trường hợp đặc biệt danh riêng cho thuốc có dạng vỉ khi nhân viên chọn đơn vị là Viên trên một vỉ
                    console.log("item.unitId: ", item.unitId);
                    item.totalPriceItem = parseInt(item.price) * parseInt(value);
                    item.quantity = value;
                }

            }
            return item;
        });
        setOrderItems(updatedOrderItems);
        setTotalOrder(handleTotalOrder(updatedOrderItems))
    }

    const handleOnChangeSelectUnit = (value, itemId) => {
        const updatedOrderItems = orderItems.map(item => {
            if (item.id === itemId) {
                item.unitId = parseInt(value);
                item.quantity = 1; // Đặt lại số lượng thành 1
                if( item.unitId === 0 ){
                    if( item.unitId_main === 7 ) {
                        item.totalPriceItem = parseInt(item.price) * parseInt(item.viePerBlis) * parseInt(item.viePerBox);
                    } else {
                        item.totalPriceItem = parseInt(item.price)  * parseInt(item.viePerBox);
                    }
                } else if ( item.unitId === item.unitId_main) {
                    if( item.unitId_main === 7 ){
                        item.totalPriceItem = parseInt(item.price)  * parseInt(item.viePerBlis);
                    } else {
                        item.totalPriceItem = parseInt(item.price)  
                    }
                } else if ( item.unitId === 1 ) {
                    item.totalPriceItem = parseInt(item.price)  
                }
            }
            return item;
        });
        setOrderItems(updatedOrderItems);
        setTotalOrder(handleTotalOrder(updatedOrderItems))
    };

    const handleDeleteProduct = (id) => {
        // Lọc ra các mục không chứa ID của dòng cần xóa
        const updatedOrderItems = orderItems.filter(item =>  item.id !== id);

        // Cập nhật danh sách orderItems mới
        for (let index = 0; index < updatedOrderItems.length; index++) {
            updatedOrderItems[index].id = index + 1;
        }
        setOrderItems(updatedOrderItems);
        setTotalOrder(handleTotalOrder(updatedOrderItems))

        console.log("updatedOrderItems after delete: ", updatedOrderItems)

    };

    const handleSuccessfullOrder = () => {
        setTotalOrder(0);
        setOrderItems([]);
    }

    const openModalChoose = () =>{
        setShowModal(true);
    }
    
    const handleCloseModal = () =>{
        setShowModal(false);
    }

    const btnDeleteAllItemOrder = () => {
        setOrderItems([]);
        setDataCustomer({
            CustomerName: '',
            CustomerPhone: '',
            Point: null
        })
        setTotalOrder(0);
        setActionOrder("NEWORDER")
    }

    return (
        <>
            <div className='component-neworder'>
                <div className='table-medicine-order'>
                    <div className='p-4'>
                        <table className=''>
                            <thead>
                                <tr>
                                    <th className='p-2 m-8' ></th>
                                    <th className='p-2 m-8' ></th>
                                    <th className='p-2 m-8 w-name-medicine' >Sản phẩm</th>
                                    <th className='p-2 m-8' >Giá</th>
                                    <th className='p-2 m-8' >Đơn vị</th>
                                    <th className='p-2 m-8' >Số lượng</th>
                                    <th className='p-2 m-8' ></th>
                                    <th>
                                        <button className='btn btn-danger'
                                            onClick={() => btnDeleteAllItemOrder()}
                                        >Xóa tất cả</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                { orderItems && orderItems.length > 0  ? 
                                    <>
                                        { orderItems.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td className='p-2'>
                                                        <button className='btn btn-secondary' onClick={() => handleDeleteProduct(item.id)}>
                                                            <MdDelete />
                                                        </button>
                                                    </td>
                                                    <td className='p-2'> 
                                                        <img className='img-medicine' src={item.img}/>
                                                    </td>
                                                    <td className='p-2'>{item.product}</td>
                                                    <td className='p-2'>{item.totalPriceItem}</td>
                                                    <td className='p-2'>
                                                        <select className='form-select' defaultValue={item.unitId === 7 ? 1 : item.unitId }
                                                            onChange={(event) => handleOnChangeSelectUnit(event.target.value, item.id)}
                                                        >
                                                            <option value='0'>Hộp</option>
                                                            <option value={item.unitId_main}>{item.unit}</option>
                                                            {item.unitId_main === 7 ?
                                                                <option value='1'>Viên</option>
                                                            : <></>}
                                                        </select>
                                                    </td>
                                                    <td className='p-2'>
                                                        <input type="number"   
                                                            className='form-control w-50' value={item.quantity}
                                                            onChange={(event) => handleOnChangeNewOrder(event.target.value, item.id)}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        
                                        }
                                    </>
                                    : <>Chưa có sản phẩm</>
                                }
                                
                            </tbody>
                        </table>
                    </div>
                    <div className='p-2'> 
                        <button className='btn' onClick={() => openModalChoose()}>Chọn sản phẩm</button>

                    </div>
                </div>
                <div className='confirm p-4'>
                    <ConfirmOrder 
                        actionOrder={acctionOrder}
                        total={totalOrder} 
                        listItemOrder={orderItems}
                        handleSuccess={handleSuccessfullOrder} 
                        customerData = {dataCustomer}
                    />
                </div>
            </div>

            <ModalChoose 
                show={showModal}
                onHide = {handleCloseModal}
                addOrderItem={addOrderItem}
            />
        </>
    )
}

export default NewrOrder;
