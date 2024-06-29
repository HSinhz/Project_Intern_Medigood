import './ListMedicine.scss';
import Paginate from '../Paginate/Paginate';
import { documentTile } from '../../../utils/documentTitle';
import { useEffect } from 'react';

const LayoutListMedicine = ({ListMedicine}) => {

    

    return (
        <>
            <div className="list-medicine">
                <table className='table-medicine'>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Tồn kho</th>
                            <th scope="col">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        ListMedicine && ListMedicine.length > 0 ?
                        <>
                        {
                            ListMedicine.map((medicine, index) => {

                                return (
                                    <tr className='table-row '>
                                        <td className='w-60'><img className='img-personnel-container img-personnel img-fluid' src={medicine.ImgUrl}/></td>
                                        <td className=' witd-td-name'>
                                            <div className=''>
                                                {medicine.MedicineName}
                                            </div>                                                    
                                        </td>
                                        <td>
                                            {medicine.Price} VNĐ
                                        </td>
                                        <td>{medicine.Stock}</td>
                                        <td>{medicine.Inventory}</td>
                                        <td>
                                            <div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </>
                        : 
                        <>
                            <tr>
                                <td colSpan="6" className="text-center">
                                    <div className="mt-2">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/medigood-d7665.appspot.com/o/image%2Fempty-bill.svg?alt=media&token=9c7b0ab0-47d7-4984-80bc-1c77d5e7c6fc"
                                            alt="chưa có sản phẩm"
                                        />
                                        <h4>Chưa có sản phẩm</h4>
                                    </div>
                                </td>
                            </tr>
                        </>
                    }
                    </tbody>
                </table>
                {
                    ListMedicine && ListMedicine.length > 0 ? 
                    <>
                        <Paginate />
                    </> 
                    : 
                    <></>
                }
            </div>
        </>
    )
}


export default LayoutListMedicine