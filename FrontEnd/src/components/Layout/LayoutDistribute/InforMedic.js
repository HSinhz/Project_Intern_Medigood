import { MdDelete } from "react-icons/md";
import './LayoutDistribute.scss'

const InforMedic = ({listMedic , action, handleDeleteProduct , handleOnChangeQuantity, totalQuantityDistribute}) => {
    return (
        <>
            <div className="table-medic ">
                <table>
                    <thead>
                        <tr>
                            <th className="ps-4 width-2"></th>
                            <th className="width-2"></th>
                            <th className="width-5">Mã sản phẩm</th>
                            <th className="width-5">Tên sản phẩm</th>
                            <th className="width-5">Số lượng nhập</th>
                            <th className="width-5">Số lượng hàng còn trong kho</th>
                            <th className="width-5">Đơn vị</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        listMedic && listMedic.length > 0 ?
                        <>
                            {
                                listMedic.map((item, index) =>{
                                    return (
                                        <tr className="">
                                            <td scope="col" className="text-center btn-delete ps-4">
                                                { 
                                                    action === 'VIEW' ? 
                                                    <></>
                                                    :
                                                    <>
                                                        <button className='btn btn-secondary' 
                                                            onClick={() => handleDeleteProduct(item.Id)}
                                                        >
                                                            <MdDelete />
                                                        </button>
                                                    </>
                                                }
                                                
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
                                                    disabled={action === 'VIEW' ? true : false}
                                                />
                                            </td>
                                            <td scope="col">{item.Stock}</td>
                                            <td scope="col">Hộp</td>
                                        </tr>
                                    )
                                })
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
                            <div className="muiListItemText"><span className="muiListItemText-alignRight">{listMedic.length}</span></div>
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
        </>
    )
}

export default InforMedic;
