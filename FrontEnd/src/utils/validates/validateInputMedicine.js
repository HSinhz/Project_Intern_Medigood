import _ from "lodash";
import { toast } from "react-toastify";

const validateInputMedicine = (validInputsDefault, medicineData, selectedImage) => {
    let _validInputs = validInputsDefault;
    let arr = ['MedicineName', 'MedicineDetailName','TypeId', 'CategoryId' , 'Price' , 'Unit', 'ViePerBox', 'Producer' , 'Ingredient', 'Specification',  'Description', 'Unit'];
    let arrVNI = ['Tên dược phẩm', 'Tên chi tiết sản phẩm', 'Loại sản phẩm', 'Danh mục', 'Giá sản phẩm', 'Đơn vị', 'Số lượng','Nhà cung cấp' , 'Thành phần', 'Quy cách' , 'Mô tả', 'Đơn vị'];
    let success = true;
    let ErrMess = '';
    for( let i = 0 ; i < arr.length; i++){
        if(!medicineData[arr[i]]){
            _validInputs = _.cloneDeep(validInputsDefault);
            _validInputs[arr[i]] = false;
            success = false;
            ErrMess = `Vui lòng nhập ${arrVNI[i]}`
            break;
        }
    }
    if(selectedImage == null ){
        success = false;
        _validInputs.Image = false;
        ErrMess = 'Vui lòng chọn ảnh'
    }
    if(medicineData.Unit == 7){
        if( !medicineData.ViePerBlis ){
            success = false;
            _validInputs.ViePerBlis = false;
            ErrMess = "Vui lòng nhập số viên mỗi vỉ"
        }
    }
    return {success, _validInputs, ErrMess};
}

const validSupplier = (validInputsDefault, supplierData) => {
    const _validInputs = validInputsDefault;
    let arr = ['SupplierName', 'SupplierPhone', 'SupplierEmail', 'SupplierAddress1'];
    let arrVNI = ['Tên', 'số điện thoại nhà cung cấp', 'Email', 'Địa chỉ'];
    let success = true;
    let ErrMess = '';
    for( let i = 0; i < arr.length ; i++) {
        if( !supplierData[arr[i]]){
            _validInputs = _.cloneDeep(validInputsDefault);
            _validInputs[arr[i]] = false;
            success = false;
            ErrMess = `Vui lòng nhập ${arrVNI[i]}`
            break;
        }
    }

    if( supplierData.SupplierPhone){
        const phoneNumberRegex = /^\d{10,11}$/;
            const isValid = phoneNumberRegex.test(supplierData.SupplierPhone);
            if( isValid === false) {
                _validInputs.SupplierPhone = false
                success = false;
                ErrMess = "Vui Lòng nhập đúng định dạng số điện thoại"
            } 
    }
    return {success, _validInputs, ErrMess};
}

export {
    validateInputMedicine,
    validSupplier 
}