import LayoutListMedicine from "../../Layout/ListMedicine/ListMedicine"
import { documentTile } from "../../../utils/documentTitle";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {  fetchMedicineBranch} from "../../../services/StoreBranchService";
const MedicineBranch = () => {
    const [listMedicine, setListMedicine] = useState([]);

    useEffect(() => {
        document.title = documentTile.Store.MedicineStroe;
        fetchDataMedicineBranch();
    }, [])
    
    const fetchDataMedicineBranch = async () => {
        try {
            let respone = await fetchMedicineBranch();
            if( respone && respone.Success === true) {
                console.log("respone.Data: ", respone.Data)
                setListMedicine(respone.Data);
            } else {
                toast.error(respone.Mess);
            }
        } catch (error) {
            console.log(error);
            toast.error("Vui lòng thử lại")
        }
    }
    return (
        <>
            <div className="medicine-branch">
                <div className="p-4">
                    <h2>Danh sách sản phẩm</h2>
                </div>
                <LayoutListMedicine ListMedicine={listMedicine}/>
            </div>
        </>
    )
}

export default MedicineBranch;