import _ from 'lodash';

const validateInputEmployee = (employeeData, validInputsDefault, birthDay , selectedImage) => {
    let _validInputs = validInputsDefault;
    let arr = ['Email', 'LastName' , 'FirstName' , 'Phone' , 'Address', 'Country',  'PositionId', 'Gender'];
    let arrVNI = ['Email', 'Họ' , 'Tên' , 'Điện Thoại', 'Địa chỉ', 'Quê Quán', 'Chức vụ', 'Giới tính']
    let success = true;
    let ErrMess = '';
    for( let i = 0 ; i < arr.length; i++){
        if(!employeeData[arr[i]]){
            _validInputs = _.cloneDeep(validInputsDefault);
            _validInputs[arr[i]] = false;
            success = false;
            ErrMess = `Vui lòng nhập ${arrVNI[i]}`
            break;
        }
        
    }
    if(employeeData.PositionId == 6 || employeeData.PositionId == 5){
        if(!employeeData.BranchId) {
            success = false;
            _validInputs.BranchId = false;
            ErrMess = 'Vui lòng chọn cửa hàng'
        }           
    }
    if(birthDay == null ){
        success = false;
        _validInputs.BirthDay = false;
        ErrMess = 'Vui lòng nhập ngày sinh'
    }
    if(selectedImage == null ){
        success = false;
        _validInputs.Image = false;
        ErrMess = 'Vui lòng chọn ảnh'
    }
    return {success, _validInputs, ErrMess};
}


export {
    validateInputEmployee   
}