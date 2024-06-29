import { useEffect, useState } from "react";
import { documentTile } from "../../utils/documentTitle";
import { getSupplier } from "../../services/MedicineService";
import { toast } from "react-toastify";
import Status from './UIUX/Status/StatusPurchase';

const Supplier = ({onComponentClick}) => {
    const [listSupplier, setListSupplier] = useState([]);
    useEffect(() => {
        document.title = documentTile.Medicine.Supplier;
        fetchDataSupplier();
    }, []);

    const fetchDataSupplier = async () => {
        try {
            let response = await getSupplier();
            if(response && response.Success === true ){
                setListSupplier(response.Data);
                console.log("response.Data: ", response.Data)
            } else {
                toast.error(response.Mess)
            }
        } catch (error){
            console.log(error);
            toast.error("Vui lòng thử lại sau")
        }
    }
    return (
        <>
            <div className="supplier-container">
                <div className="header-context d-flex justify-content-between">
                    <h3>Nhà cung cấp</h3>
                    <button className="btn-create-supplier"
                    onClick={() =>  onComponentClick('CreateSupplier')}>
                        Thêm nhà cung cấp</button>
                </div>
                <div className="background-white mt-4 table-list-supplier pt-4">
                    <table className="w-100 ">
                        <thead className="">
                            <tr>
                                <th scope="col" className="ps-4">Mã nhà cung cấp</th>
                                <th scope="col">Tên nhà cung cấp</th>
                                <th scope="col">Email</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            listSupplier && listSupplier.length > 0 ? 
                            <>
                                {
                                    listSupplier.map((item, index) => {
                                        return (
                                            <tr className="table-row ">
                                                <td className="ps-4">{item.SupplierId}</td>
                                                <td>{item.SupplierName}</td>
                                                <td>{item.SupplierEmail}</td>
                                                <td>{item.SupplierPhone}</td>
                                                <td>
                                                   <Status statusId={item.Status} statusName={item.StatusName} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                               
                            </>
                            : <>
                                <tr>
                                    <td  colSpan='5' className='text-center'>
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
            </div>
        </>
    )
}

export default Supplier;