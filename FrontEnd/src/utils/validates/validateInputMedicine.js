import _ from "lodash";

const validateInputMedicine = (validInputsDefault, medicineData, selectedImage) => {
    let _validInputs = validInputsDefault;
    let arr = ['MedicineName','TypeId', 'CategoryId' , 'Price' , 'Producer' , 'Ingredient', 'Specification',  'Description', 'Unit'];
    let arrVNI = ['Tên dược phẩm','Loại sản phẩm', 'Danh mục', 'Giá sản phẩm', 'Nhà cung cấp' , 'Thành phần', 'Quy cách' , 'Mô tả', 'Đơn vị'];
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
    return {success, _validInputs, ErrMess};
}

export {
    validateInputMedicine   
}