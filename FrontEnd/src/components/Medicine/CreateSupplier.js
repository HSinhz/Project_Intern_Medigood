import { useEffect, useState } from "react";
import { documentTile } from "../../utils/documentTitle";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import _ from "lodash";
import { validSupplier } from "../../utils/validates/validateInputMedicine";
import { toast } from "react-toastify";
import { createSupplier } from "../../services/MedicineService";

const CreateSupplier  = () => {
    const history = useHistory();
    const defaultSupplierData = {
        SupplierName: '',
        SupplierPhone: '',
        SupplierEmail: '',
        SupplierAddress1: '',
        SupplierAddress2: ''
    };
    const validateDefault = {
        SupplierName: true,
        SupplierPhone: true,
        SupplierEmail: true,
        SupplierAddress1: true,
        SupplierAddress2: true,
    }

    const [supplierData, setSupplierData] = useState(defaultSupplierData);
    const [validInput, setValidInput] = useState(validateDefault);
    useEffect(() => {
        document.title = documentTile.Medicine.CreateSupplier
    }, []);

    const handleOnChangeInput = (value, name) => {
        let _supplierData = _.cloneDeep(supplierData);
        _supplierData[name] = value;
        setSupplierData(_supplierData);
    }

    const handleCreateSupplier = async () => {
        let checkValidate = validSupplier(validateDefault, supplierData);
        setValidInput(checkValidate._validInputs);
        console.log("supplierData" , supplierData)
        if(checkValidate.success === true){
            try {
                let response = await createSupplier(supplierData);
                if( response && response.Success === true){
                    toast.success(response.Mess);
                    setValidInput(validateDefault);
                    setSupplierData(defaultSupplierData);
                } else {
                    toast.error(response.Mess);
                }
            } catch (error) {
                toast.error("Vui lòng thử lại sau");
                console.log(error);
            }
        } else {
            toast.error(checkValidate.ErrMess)
        }
    }

    const goBack = () => {
        history.goBack();
    }
    return (
        <>
            <div className="create-supplier-container p-4 container">
                <div className="header-context d-flex justify-content-between">
                    <h3>Thêm mới nhà cung cấp</h3>
                    <div className="" >
                        <button className="btn-cancel h-100 me-2"
                            onClick={() => goBack()}
                        >
                            Hủy
                        </button>
                        <button className="btn-create-supplier h-100 ms-2"
                            onClick={() => handleCreateSupplier()}
                        >
                            Lưu
                        </button>
                    </div>
                </div>
                <div className="input-context mt-4 p-4 background-white">
                    <div className="row">
                        <div className="col-12 col-sm-12">
                            <label>Tên nhà cung cấp <span className="red">(*)</span></label>
                            <input type="text" className={validInput.SupplierName ? 'form-control' : 'form-control is-invalid'}
                                value={supplierData.SupplierName}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'SupplierName')}
                            />
                        </div>
                    </div>
                    <div className="row mt-4"> 
                        
                        <div className="col-7 col-sm-7">
                            <label>Email <span className="red">(*)</span></label>
                            <input type="text" className={validInput.SupplierEmail ? 'form-control' : 'form-control is-invalid'}
                                value={supplierData.SupplierEmail}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'SupplierEmail')}
                            />
                        </div>
                        <div className="col-5 col-sm-5">
                            <label>Số điện thoại <span className="red">(*)</span></label>
                            <input type="text" className={validInput.SupplierPhone ? 'form-control' : 'form-control is-invalid'}
                                value={supplierData.SupplierPhone}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'SupplierPhone')}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label>Địa chỉ <span className="red">(*)</span></label>
                        <input type="text" className={validInput.SupplierAddress1 ? 'form-control' : 'form-control is-invalid'}
                                value={supplierData.SupplierAddress1}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'SupplierAddress1')}
                            />
                    </div>
                    <div className="mt-4">
                        <label>Địa chỉ 2</label>
                        <input type="text" className={validInput.SupplierAddress2 ? 'form-control' : 'form-control is-invalid'}
                                value={supplierData.SupplierAddress2}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'SupplierAddress2')}
                            />
                    </div>
                </div> 
            </div>
        </>
    )
}

export default CreateSupplier;